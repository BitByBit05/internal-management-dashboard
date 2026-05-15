import express from "express";
const router = express.Router();
import ctrl from "./booksController.js";
import { isAuthorized } from "../middleware/auth.js";

// Support PUT/DELETE from HTML forms via ?_method=
import methodOverride from "method-override";
router.use(methodOverride("_method"));

router.get("/", isAuthorized, ctrl.index); // List all books
router.get("/new", ctrl.newForm); // Show create form  ← must be BEFORE /:id
router.get("/:id", ctrl.show); // Show single book
router.post("/", ctrl.create); // Create book
router.get("/:id/edit", ctrl.editForm); // Show edit form
router.put("/:id", ctrl.update); // Update book
router.delete("/:id", ctrl.destroy); // Delete book

export default router;
