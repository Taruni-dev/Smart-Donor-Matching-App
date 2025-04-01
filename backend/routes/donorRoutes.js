const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");

console.log("donorController:", donorController);  // ✅ Debugging log

router.get("/", donorController.getAllDonors); 
router.post("/register", donorController.register);  // Changed "register-donor" to "register"
router.get("/:id", donorController.getDonorById);
router.put("/:id", donorController.updateDonor);
router.delete("/:id", donorController.deleteDonor);
router.get("/match", donorController.matchDonors);

module.exports = router;
