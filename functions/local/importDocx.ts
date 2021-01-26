/// <reference path="./types/mammoth/index.d.ts"/>
import { basename } from "path";
import slugify from "slugify";
import * as mammoth from "mammoth";
import {
  Education,
  Experience,
  Personalia,
  Project,
  Publication,
  SideProject,
  Skill,
  PartialResume,
} from "../../types/Resume.d";

type CollectionBySection<T> = {
  education: T;
  experience: T;
  intro: T;
  projects: T;
  publications: T;
  sideProjects: T;
  skills: T;
};
type SectionType = keyof CollectionBySection<any>;
type Section = {
  type: SectionType;
  lines: string[];
};

const headingRegexes: CollectionBySection<RegExp> = {
  education: /^Education/i,
  experience: /^Work experience/i,
  intro: /^Hi, I am ([^\n]+)$/i,
  projects: /^Projects/i,
  publications: /^Publications/i,
  sideProjects: /^Side Projects/i,
  skills: /^Skills/i,
};
const dateRegex = /(\b\w+)?\s*([1-9][0-9]{3})/;

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
/**
 * Parse a resume from a docx at path
 *
 * @export
 * @param {string} path
 * @returns {Promise<PartialResume>}
 */
export default async function importDocx(path: string): Promise<PartialResume> {
  const filename = basename(path, ".docx");

  return mammoth
    .extractRawText({ path })
    .then(({ value }) => value)
    .then(correctSpacing)
    .then(extractSections)
    .then((sections) => {
      const parsers: CollectionBySection<Function> = {
        education: parseEducation,
        experience: parseExperience,
        intro: parseIntro,
        projects: parseProjects,
        publications: parsePublications,
        sideProjects: parseSideProjects,
        skills: parseSkills,
      };

      return sections.reduce(
        (resume, section) => {
          const parser = parsers[section.type];
          let sectionData =
            section.type == "intro"
              ? parseIntro(section.lines, filename)
              : { [section.type]: parser(section.lines) };

          return {
            ...resume,
            ...sectionData,
          };
        },
        { isImport: true } as PartialResume
      );
    });
}

/**
 * Insert spaces before months
 *
 * @param {*} string
 * @returns {string}
 */
function correctSpacing(string: string): string {
  return string.replace(new RegExp(`(\\w)(${months.join("|")})`, "gi"), `$1 $2`);
}

/**
 * Convert plain text to an array of sections
 *
 * @param {string} string
 * @returns {Section[]}
 */
function extractSections(string: string): Section[] {
  const lines = string.split("\n");

  return lines.reduce((sections, line) => {
    for (const entry of Object.entries(headingRegexes) as [SectionType, RegExp][]) {
      const [type, value] = entry;
      if (line.search(value as RegExp) !== -1) {
        sections.push({ type, lines: [] });
        break;
      }
    }

    // skip leading empty lines
    if (!sections.length) {
      return sections;
    }

    const [{ type, lines }, ...otherSections] = sections.reverse();
    return [
      ...otherSections,
      {
        type,
        lines: [...lines, line],
      },
    ];
  }, [] as Section[]);
}

function parseIntro(
  lines: string[],
  filename: string
): { personalia: Personalia; introduction: string } {
  const headingMatch = lines[0].match(headingRegexes.intro) || [];
  const firstName = headingMatch[1] || "";
  const lastName = filename.substring(
    filename.indexOf(firstName) + firstName.length
  );
  const email = `${slugify(firstName.toLowerCase(), "")}.${slugify(
    lastName.toLowerCase(),
    ""
  )}@frontmen.nl`;
  const { city = "", dateOfBirth = "", introduction = "" } = lines.reduce(
    (acc, line) => {
      const cityAndDateMatch =
        line.match(
          new RegExp(`^(\\w+)\\sregion\\s–\\s[A-Z]{2}\\s–\\s(${dateRegex.source})`)
        ) || [];
      if (cityAndDateMatch.length) {
        acc.city = cityAndDateMatch[1] || "";
        acc.dateOfBirth = cityAndDateMatch[2] || "";
      } else if (acc.city) {
        // Everything after region and date of birth is considered introduction
        acc.introduction = acc.introduction ? `${acc.introduction} ${line}` : line;
      }
      return acc;
    },
    {} as { [key: string]: string }
  );
  return {
    personalia: {
      firstName,
      lastName,
      email,
      dateOfBirth: dateFromPartial(dateOfBirth),
      city,
      avatar: "",
    },
    introduction,
  };
}

function parseEducation(lines: string[]): Education[] {
  return lines
    .slice(1, lines.length)
    .filter(notEmpty)
    .reduce(
      (acc, line) => {
        let lastEntry = acc.pop() as Partial<Education>;
        let newEntry;

        if (lastEntry.name === undefined) {
          lastEntry.name = line;
        } else if (lastEntry.institute === undefined) {
          lastEntry.institute = line;
        } else if (lastEntry.startDate === undefined) {
          const [startDate, endDate] = getDateRange(line);
          lastEntry.startDate = dateFromPartial(startDate, { month: 9 });
          lastEntry.endDate = dateFromPartial(endDate, { month: 9 });
        } else {
          newEntry = {
            name: line,
          };
        }
        return [
          ...acc,
          lastEntry,
          ...(newEntry ? [newEntry] : []), // Add new entry at the end only when set
        ];
      },
      [{}] as Partial<Education>[]
    );
}

function parseExperience(lines: string[]): Partial<Experience>[] {
  return lines
    .slice(1, lines.length)
    .filter(notEmpty)
    .reduce(
      (acc, line, index, lines) => {
        let lastEntry = acc.pop() as Partial<Experience>;
        let newEntry;

        // Try to guess what type of data the current line holds
        if (line.search(dateRegex) !== -1) {
          // If there is a line with a date, the previous line would have been a role.
          const previousLine = lines[index - 1];
          const [startDateString, endDateString] = getDateRange(line);
          const startDate = dateFromPartial(startDateString);
          const endDate = dateFromPartial(endDateString);
          const entry = {
            ...(isDate(startDate) ? { startDate } : {}),
            ...(isDate(endDate) ? { endDate } : {}),
            company: line.substring(0, line.indexOf(startDateString)).trim(),
            role: previousLine,
          };
          // If we were already adding found lines to the description, we have to revert that
          if (lastEntry.description) {
            lastEntry.description = lastEntry.description.replace(previousLine, "");
            newEntry = entry;
          } else {
            lastEntry = {
              ...lastEntry,
              ...entry,
            };
          }
        } else if (line.indexOf(" – ") !== -1) {
          // If there is a line of techniques (separated by ' - '), it is always the last line
          lastEntry.stackAndTechniques = line
            .replace(/Techniques:\s*/, "")
            .replace(/\s*[–-]\s*/g, " - ") // normalize divider
            .split(" - ")
            .map((v) => ({ name: v })); // split on divider
          newEntry = {};
        } else if (lastEntry.role) {
          lastEntry.description = lastEntry.description
            ? `${lastEntry.description}\n${line}`
            : line;
        } else {
          lastEntry.role = line;
        }

        return [
          ...acc,
          lastEntry,
          ...(newEntry ? [newEntry] : []), // Add new entry at the end only when set
        ];
      },
      [{}]
    );
}

function parseProjects(lines: string[]): Partial<Project>[] {
  return parseExperience(lines); // Experience and Project are similar
}

function parsePublications(lines: string[]): Partial<Publication>[] {
  return lines
    .slice(1, lines.length)
    .filter(notEmpty)
    .reduce(
      (acc, line, index) => {
        let lastEntry = acc.pop() as Partial<Publication>;
        let newEntry;
        if (index === 0) {
          lastEntry = {
            title: line,
            description: line,
          };
        } else if (index % 2) {
          newEntry = {
            title: line,
            description: line,
          };
        } else {
          lastEntry.link = line;
        }
        return [
          ...acc,
          lastEntry,
          ...(newEntry ? [newEntry] : []), // Add new entry at the end only when set
        ];
      },
      [{}]
    );
}

function parseSideProjects(lines: string[]): Partial<SideProject>[] {
  return lines
    .slice(1, lines.length)
    .filter(notEmpty)
    .reduce(
      (acc, line, index) => {
        let lastEntry = acc.pop() as Partial<Publication>;
        let newEntry;
        if (index === 0) {
          lastEntry = {
            title: line,
          };
        } else if (line.split(" ").length < 5) {
          newEntry = {
            title: line,
          };
        } else {
          if (line.match(/^http(s):\/\//)) {
            lastEntry.link = line;
          } else {
            lastEntry.description = `${
              lastEntry.description ? lastEntry.description + "\n" : ""
            }${line}`;
          }
        }
        return [
          ...acc,
          lastEntry,
          ...(newEntry ? [newEntry] : []), // Add new entry at the end only when set
        ];
      },
      [{}]
    );
}

function parseSkills(lines: string[]): Skill[] {
  return lines
    .slice(1, lines.length)
    .filter((line) => line !== "Languages – Frameworks - Libraries") // remove heading
    .filter(notEmpty) // remove lines with only whitespace
    .reduce((lines, line) => [...lines, ...line.split("/")], [] as string[]) // split single line lists
    .map((name) => ({ name }));
}

function getDateRange(line: string): [string, string] {
  const dateRangeRegex = new RegExp(
    `(?<start>${dateRegex.source})\\s+[–-]\\s+(?<end>${dateRegex.source}|current)`,
    "i"
  );
  const matches = line.match(dateRangeRegex) || [];
  // 1 full hit and 6 capture groups, 1 (start) and 4 (end) are full match of date RegExp
  return [matches[1] || "", matches[4] || ""];
}

function notEmpty(line: string) {
  return !line.match(/^\s*$/); // remove lines with only whitespace
}

function dateFromPartial(
  partialDate: string,
  defaults?: { day?: number; month?: number }
): Date {
  const { day: defaultDay = 1, month: defaultMonth = 1 } = defaults || {};
  const [
    year,
    month = months[defaultMonth - 1],
    day = defaultDay,
  ] = partialDate.split(" ").reverse();
  const date = new Date(`${day} ${month} ${year} UTC`);
  return date;
}

function isDate(date: Date) {
  // Invalid date would return NaN as ms since UNIX epoch
  return !isNaN(date.valueOf());
}
