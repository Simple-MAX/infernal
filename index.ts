import express from "express";
import Gun from "gun";
const app = express();
const port = 3030;
app.use(Gun);
const server = app.listen(port, () => {
  console.log("localhost:3030");
});
Gun({ web: server });
