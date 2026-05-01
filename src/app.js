import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import booksRouter from "./routes/booksRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ── View engine ──────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/books", booksRouter);

// Root redirect
app.get("/", (req, res) => res.redirect("/books"));

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", { message: "Page not found", code: 404 });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { message: err.message, code: 500 });
});

export default app;
