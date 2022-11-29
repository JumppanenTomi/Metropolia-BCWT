// Router
"use strict";
const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController");

router.post("/", userController.user_post);

router.get("/", userController.user_list_get);

router.get("/:id", userController.user_get);

router.get("/token", userController.checkToken);

module.exports=router;