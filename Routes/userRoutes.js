const express = require("express");
const {Register,Login, GetAllUser, GetSingleUser, editUser, deleteUser} = require("../Controllers/userControllers");
const router = express.Router()

router.post("/register",Register)

router.post("/login",Login)

router.get("/all-users",GetAllUser)

router.get("/:userId" ,GetSingleUser)

router.put("/editUser/:userId",editUser)

router.delete("/:userId",deleteUser)

module.exports = router;