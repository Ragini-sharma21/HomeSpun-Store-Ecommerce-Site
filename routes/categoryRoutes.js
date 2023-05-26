import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
   singleCategoryController,
 updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes   -all crud operations
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,           //and signed in user also compulsary   these all are middleware if all these are true then only you can perform further operations
  isAdmin,               //admin is must to update category 
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",    //enter id after url 
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;