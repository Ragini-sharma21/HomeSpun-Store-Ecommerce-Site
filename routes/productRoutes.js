import express from "express";
import {
  createProductController,
   deleteProductController,
  getProductController,
  getSingleProductController,
  productFiltersController,
   productPhotoController,
   updateProductController,
   productCountController,
   productListController,
   searchProductController,
   productCategoryController,
   realtedProductController,
   brainTreePaymentController,          //for payment braintree package is used
  braintreeTokenController,

} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters",productFiltersController);
//product count 
router.get("/product-count",productCountController);

//product per page 
router.get("/product-list/:page",productListController)  //page ko dynamically get kr rhe hai
//search product
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/related-product/:pid/:cid',realtedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router;