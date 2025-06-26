import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getAdminBlogs,
  getBlogStats,
} from "../controllers/blog/index.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/admin/blogs",
  isAuthenticated,
  isAuthorized("admin"),
  getAdminBlogs
);
router.get(
  "/admin/stats",
  isAuthenticated,
  isAuthorized("admin"),
  getBlogStats
);

router.get("/", getAllBlogs);
router.get("/:id", isAuthenticated, getBlogById);

router.post("/", isAuthenticated, isAuthorized("admin"), createBlog);
router.put("/:id", isAuthenticated, isAuthorized("admin"), updateBlog);
router.delete("/:id", isAuthenticated, isAuthorized("admin"), deleteBlog);

export default router;
