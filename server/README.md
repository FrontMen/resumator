# Node DOCX API

This API will create a Word/ Docx document from resume data that is fetched from the Frontmen Firebase `fm-Resume` project.

endpoint is currently:

`<YOUR HEROKU URL>/create?resume=<ADDED RESUME UUID>`

## Updating the template

The `input.docx` file can be found in the `/docx` folder.
documentation on how to use the placeholders can be found [here](https://docxtemplater.readthedocs.io/en/latest/)

## Running the app locally

There is a dev server script and a start script in place.

`npm run dev`

`npm run start`

## Heroku commands / deploy steps

To deploy the App you need a Heroku account and install the Heroku node package👇.

```
npm install -g heroku
```

When logged in you can create a new Heroku project

```
heroku create
```

To deploy the app you need to point to a subdirectory like so:

```
git subtree push --prefix server heroku master
```

In the above command `server` refers to the server folder.

To make the app work on Heroku it needs the env variables and can be added in the Heroku app settings.

_Please note that the Heroku endpoint needs to be updated when a new endpoint is created as it currently is pointing to my heroku account._

## To Do

- Map all properties in Resume Model
  The model can be found in the `/model` folder.

- Add the properties in the createdocx file which can be found in the `/routes/createDocx.ts` file
  The current status of the rendered properties in the docx file is set like so:

  ```
  doc.setData({
          first_name: resume.firstName,
          introduction: resume.introduction,
          skills: resume.skills,
          education: resume.education,
          projects: resume.projects,
      });
  ```

  it needs more mapping from what the docxtemplater needs and what the ResumeModel has.

- Update the template
  The template needs to have placeholders for all the properties from the resume object.
  the input.docx can be found in the `/docx` folder

- Add output.docx in docx folder
  currently, it creates the output.docx in the `/routes` folder. it would be better to move it in the `/docx` folder.

- Other chores.
  - it probably needs some refactoring here in there like using more async calls over .then.
  - missing typings: not everything is typed or typed correctly at this point.

_**Bug to Fix**_

- The API needs to be logged in as a Firebase user to get permission to fetch the resume data.
