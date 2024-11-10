import express from "express";
import { handleImageUpload, addProperty,fetchAllProperties,editProperty,deleteProperty } from "../../controllers/admin/property-controller.js";
import { upload } from "../../helpers/cloudinary.js";

const router= express.Router();
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post('/add',addProperty);
router.put('/edit/:id',editProperty);
router.delete('/delete/:id',deleteProperty);
router.get('/get',fetchAllProperties);
export default router;