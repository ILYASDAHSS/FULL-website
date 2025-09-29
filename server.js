import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorhandler from "./middleware/Eroor.js"
import { error } from "console";
const app = express();
const port = process.env.PORT || 9000;

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//logger
app.use(logger)
// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api/posts", posts);

//catch error
app.use((res,req,next)=>{
  const eroor = new Error("NOT FOUND");
  eroor.status = 404;
  next(error)
})
//eroor
app.use(errorhandler)
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
