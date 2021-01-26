import React from "react";
import { pdf as createPdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

import formatResumeFilename from "./formatResumeFilename";
import createDocx from "./createDocx";
import getAvatarDataUri from "./getAvatarDataUri";
import PDFTemplate from "../components/PDFTemplate/PDFTemplate";
import Resume from "../../types/Resume";

export default async function downloadResume(resume: Resume, type = "PDF") {
  const { firstName, lastName, avatar: avatarName } = resume.personalia;
  let file: Blob;
  switch (type.toLowerCase()) {
    case "docx":
      const [docxTemplate, avatar] = await Promise.all([
        fetch("/template.docx").then((res) => res.arrayBuffer()),
        fetch(getAvatarDataUri(avatarName)).then((res) => res.arrayBuffer()),
      ]);
      const docx = await createDocx(resume, docxTemplate, avatar);
      file = new Blob([docx], {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      break;
    case "pdf":
      debugger;
      const pdfTemplate = <PDFTemplate {...{ resume }} />;
      const pdf = await createPdf(pdfTemplate).toBlob();
      file = new Blob([pdf], {
        type: "application/pdf",
      });
      break;
    default:
      return;
  }
  const filename = formatResumeFilename(firstName, lastName, type);

  saveAs(file, filename);
}
