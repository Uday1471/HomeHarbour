const router = require("express").Router();
const { createProperty, getAllProperties, deleteProperty, getProperty, getUserProperties } = require("../controllers/property.js");
const verifyToken = require("../middleware/verfiyToken.js");

router.post("/", verifyToken, createProperty);
router.get("/", getAllProperties);
router.get("/user", verifyToken, getUserProperties);
router.route("/:id").get(getProperty).delete(verifyToken, deleteProperty);

module.exports = router;