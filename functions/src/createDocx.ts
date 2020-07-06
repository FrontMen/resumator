import * as functions from "firebase-functions";
import { Request } from "firebase-functions/lib/providers/https";
import { Bucket } from "@google-cloud/storage";

import * as ImageModule from "docxtemplater-image-module";
import * as DocxTemplater from "docxtemplater";
import * as PizZip from "pizzip";

import { Opts } from "./types";
import ResumeModel from "./models/ResumeModel";

import { getResume } from "./api/getResume";

const admin = require("firebase-admin");

const resumeTemplatePath = "input.docx";

const getBucketFile = async (filename: string): Promise<Buffer> => {
  const bucket: Bucket = admin.storage().bucket();
  const buffers = await bucket.file(filename).download();
  return buffers[0];
};

const avatars = new Map<String, Buffer>();

export const createDocx = functions.https.onRequest(async (req: Request, res) => {
  if (!req.query.resume) {
    const message = "no resume param provided";
    console.log(message);
    res.status(400).send(message);
    return;
  }

  const data = await getResume(req.query.resume as string);
  if (!data) {
    const message = "could not find resume with provided id";
    console.log(message);
    res.status(404).send(message);
    return;
  }

  const resume = new ResumeModel(data);

  // load avatar if not loaded yet (function beyond won't work async)
  if (!avatars.has(resume.avatar)) {
    const avatarName = `avatars/${resume.avatar}.png`;
    avatars.set(resume.avatar, await getBucketFile(avatarName));
  }

  // Set up avatar options
  const opts: Opts = {};
  opts.centered = false;
  opts.getImage = (tagValue: string) => avatars.get(tagValue);
  opts.getSize = () => [80, 200];
  const imageModule = new ImageModule(opts);

  // Load the input.docx file as a binary
  const resumeTemplate: Buffer = await getBucketFile(resumeTemplatePath);

  // rename opts to image options
  const zip = new PizZip(resumeTemplate);
  const doc = await new DocxTemplater().attachModule(imageModule).loadZip(zip);

  doc.setData({
    first_name: resume.firstName,
    introduction: resume.introduction,
    skills: resume.skills,
    education: resume.education,
    projects: resume.projects,
    image: resume.avatar,
  });

  // The render function replaces the placeholder text from the input.docx with the  data
  doc.render();

  const buffer = doc.getZip().generate({ type: "nodebuffer" });

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${data.personalia.firstName}-${data.personalia.lastName}-resume.docx`
  );

  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml"
  );

  res.setHeader("Content-Transfer-Encoding", "binary");

  res.status(200).send(buffer);
});
