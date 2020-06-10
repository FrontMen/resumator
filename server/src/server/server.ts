import express from "express";
import create from "../routes/createDocx";

const app = express();
const port: string | number = process.env.PORT || 5000;

app.use("/", create);
//create a server object:
app.listen(port, () => console.log(`http://localhost:${port}`));
