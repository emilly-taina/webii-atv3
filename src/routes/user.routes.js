import {Router} from "express";

import {

getUsers,
getUserById,
postUser,
patchUser,
deleteUser

} from "../controllers/user.controller.js";


const router = Router();



router.get("/",getUsers);

router.get("/:id",getUserById);

router.post("/",postUser);

router.patch("/:id",patchUser);

router.delete("/:id",deleteUser);



export default router;