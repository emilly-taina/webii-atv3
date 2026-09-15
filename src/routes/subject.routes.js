import { Router } from "express";

import {
    getSubjects,
    getSubjectById,
    postSubject,
    patchSubject,
    deleteSubject
} from "../controllers/subject.controller.js";


const router = Router();


// GET /subjects
router.get("/", getSubjects);


// GET /subjects/:id
router.get("/:id", getSubjectById);


// POST /subjects
router.post("/", postSubject);


// PATCH /subjects/:id
router.patch("/:id", patchSubject);


// DELETE /subjects/:id
router.delete("/:id", deleteSubject);


export default router;