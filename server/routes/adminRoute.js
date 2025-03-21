import { Router } from "express";
import { handleAddQuestion, handleAddStudent, handleAdminLogin, handleDeleteStudent, handleGetStudent, handleGetSuffledQuestions, handleUpdateStudent } from "../controllers/adminController.js";


const adminRoute = Router()
adminRoute.post("/add-student", handleAddStudent)
adminRoute.post("/update-student", handleUpdateStudent)
adminRoute.post("/delete-student", handleDeleteStudent)
adminRoute.post("/get-student", handleGetStudent)
adminRoute.post("/auth", handleAdminLogin)

adminRoute.post("/add-question", handleAddQuestion)
adminRoute.post("/get-question", handleGetSuffledQuestions)





export default adminRoute