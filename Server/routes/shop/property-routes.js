import express from "express";
import { getFilteredProperties, getPropertyDetails } from "../../controllers/shop/property-controller.js";
const router = express.Router();
router.get("/get", getFilteredProperties);
router.get("/get/:id", getPropertyDetails);
export default router;
