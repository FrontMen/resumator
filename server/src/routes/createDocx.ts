import express, { Request } from "express";
import PizZip from "pizzip";
// @ts-ignore
import Docxtemplater from "docxtemplater";
// @ts-ignore
import ImageModule from "docxtemplater-image-module";
import fs from "fs";
import path from "path";
import { getResume } from "../api";
import ResumeModel from "../models/ResumeModel";
import { Opts } from "../types";
const router = express.Router();

// @route    GET api/create?resume=q
// @desc     Create Docx Resume
// @access   Public

export default router.get("/create", async (req: Request, res) => {
  try {
    let opts: Opts = {};
    opts.centered = false;
    opts.getImage = function (tagValue: string, _tagName: string) {
      return fs.readFileSync(tagValue);
    };

    opts.getSize = function (_img, _tagValue, _tagName) {
      return [80, 200];
    };

    //Load the input.docx file as a binary
    // TODO rename variable
    const content = fs.readFileSync(
      path.resolve(__dirname, "../docx/input.docx"),
      "binary"
    );
    // rename opts to image options
    const imageModule = new ImageModule(opts);
    const zip = new PizZip(content);
    const doc = await new Docxtemplater().attachModule(imageModule).loadZip(zip);

    const data = await getResume(req.query.resume);

    if (data) {
      const resume = new ResumeModel(data);
      doc.setData({
        first_name: resume.firstName,
        introduction: resume.introduction,
        skills: resume.skills,
        education: resume.education,
        projects: resume.projects,
      });

      // The render function replaces the placeholder text from the input.docx with the  data
      doc.render();
    }

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    // TODO PATH change it ouput location to docx/output.docx
    if (path.resolve(__dirname, "/output.docx")) {
      fs.unlinkSync(__dirname + "/output.docx");
    }

    fs.writeFileSync(path.resolve(__dirname, "output.docx"), buffer);

    res.status(200).sendFile(__dirname + "/output.docx");
  } catch (error) {
    console.error(error.message);
  }
});
