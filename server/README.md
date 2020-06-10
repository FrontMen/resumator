# Node DOCX API

This Node middleware will create a Word/ Docx document from resume data that is fetched from the Frontmen Firebase `fm-Resume` project.

endpoint is currently:
`<YOUR HEROKU URL>/create?resume=<ADDED RESUME UUID`

## Heroku commands / deploy steps

```
npm install -g heroku
```

```
heroku create
```

```
git subtree push --prefix server heroku master
```
