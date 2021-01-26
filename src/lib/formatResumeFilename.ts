export default function formatResumeFilename(
  firstName: string,
  lastName: string,
  extension = "pdf"
) {
  return `CV Frontmen - ${firstName} ${lastName}.${extension}`;
}
