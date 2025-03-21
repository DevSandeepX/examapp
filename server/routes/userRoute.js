import { Router } from "express";
import { getAllStudent, getStudent, handleFinishExam, verifyStudent } from "../controllers/userController.js";



const userRoute = Router()
userRoute.post("/finish-exam", handleFinishExam)
userRoute.post("/get-student", getStudent)
userRoute.get("/get-students", getAllStudent)
userRoute.post("/verify-student", verifyStudent)





export default userRoute