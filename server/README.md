# Node DOCX API

This Node middleware will create a Word/ Docx document from resume data that is fetched from the Frontmen Firebase `fm-Resume` project.

endpoint is currently:

`<YOUR HEROKU URL>/create?resume=<ADDED RESUME UUID>`

## Updating the template

The `input.docx` file can be found in the `/docx` folder.
documentation on how to use the placeholders can be found [here](https://docxtemplater.readthedocs.io/en/latest/)

## Running the app locally

There are two ways of running the app.

`npm run start`
`npm run dev`

## Heroku commands / deploy steps

In order to deploy you need a Heroku account. and install the Heroku node package👇.

```
npm install -g heroku
```

When logged in you can create a new Heroku project

```
heroku create
```

To deploy the you need to point to a sub directory like so:

```
git subtree push --prefix server heroku master
```

Server refers to the server folder.

In the Heroku app settings the env variables needs to be added.
_Please note that the Heroku endpoint needs to be updated in the React project._

## To Do

- Map all properties in Resume Model
  The model can be found in the `/model` folder.

- Add the properties in the createdocx

- Update the template
  The template needs to have placeholders for all the properties from the resume object.
  the input.docx can be found in the `/docx` folder

- Add output.docx in docx folder
  currently it creates the output.docx in the `/routes` folder. it would be better to move it in the `/docx` folder.

_**Bug to Fix**_

- The API needs to be logged in as a Firebase user in order to get permission to fetch the resume data.
