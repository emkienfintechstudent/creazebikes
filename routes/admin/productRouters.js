import express from "express";
import AdminProductController from "../../controllers/admin/adminProductController.js";

import AdminProductCategoryController from "../../controllers/admin/adminProductCategoryController.js";
import AdminProductSubcategoryController from "../../controllers/admin/adminProductSubcategoryController.js";
const router = express.Router();

// GET
//  PRODUCTS
router.get("/admin/products", AdminProductController().index);
router.post("/admin/product/:id/edit", AdminProductController().editProduct);
router.get("/admin/products/detail", AdminProductController().AdminDetailProduct);
router.get("/admin/product/:id", AdminProductController().AdminDetailProduct)
router.post("/admin/add/product", AdminProductController().addNew);
router.post("/admin/product/updateproductsubcategory", AdminProductController().updateSubcategoryForProduct)

//  PRODUCT CATEGORIES
router.post("/admin/add/productcategory", AdminProductCategoryController().addNew);

router.post("/admin/product/updatecategory", AdminProductSubcategoryController().updateCategoryForSubcategory)
router.get("/admin/productcategory/:id", AdminProductCategoryController().detail)
router.get("/admin/productcategories", AdminProductCategoryController().index);
router.get("/admin/productcategory/:id", AdminProductCategoryController().detail);
router.post("/admin/productcategory/:id/edit", AdminProductCategoryController().editProductCategory);

//  PRODUCT SUBCATEGORIES
router.post("/admin/productsubcategory/:id/edit", AdminProductSubcategoryController().editProductSubcategory);

router.get("/admin/productsubcategory/:id", AdminProductSubcategoryController().detail)

router.post("/admin/add/productsubcategory", AdminProductSubcategoryController().addNew);
router.get("/admin/productsubcategories", AdminProductSubcategoryController().index);
router.get("/admin/productsubcategory/:id", AdminProductSubcategoryController().detail);

export default router;