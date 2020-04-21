import * as yup from "yup";

export const MIN_NUMBER_OF_EXPERIENCE = 1;
export const MIN_NUMBER_OF_EDUCATION = 1;

yup.setLocale({
  mixed: {
    default: "Invalid value",
    notType: "Invalid value",
    required: "Cannot be empty",
  },
  number: {
    // eslint-disable-next-line
    min: "Should atleast contain ${min} entry",
  },
});

const skillOrStackSchema = yup.object().shape({
  name: yup.string().required(),
});

const experienceSchema = yup.object().shape({
  company: yup.string().required(),
  role: yup.string().required(),
  startDate: yup.date().required(),
  endDate: yup.string(), // FIXME: should be date format (see: https://github.com/jquense/yup/issues/764)
  description: yup.string().required().max(400),
  stackAndTechniques: yup.array().min(1).of(skillOrStackSchema),
});

export default yup.object().shape({
  personalia: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    dateOfBirth: yup.date().required(),
    city: yup.string().required(),
  }),
  introduction: yup.string().required().max(400),
  experience: yup.array().min(MIN_NUMBER_OF_EXPERIENCE).of(experienceSchema),
  projects: yup.array().of(experienceSchema),
  education: yup
    .array()
    .min(MIN_NUMBER_OF_EDUCATION)
    .of(
      yup.object().shape({
        institute: yup.string().required(),
        name: yup.string().required(),
        level: yup.string(),
        startDate: yup.date().required(),
        endDate: yup.date().required(),
      })
    ),
  skills: yup.array().min(1).of(skillOrStackSchema),
});
