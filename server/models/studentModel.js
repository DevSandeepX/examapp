import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true, },
  password: { type: String, required: true },
  course: { type: String, required: true },
  isComplateExam: { type: String, default: false },
  result: {
    rightAns: { type: Number, default: 0 },
    wrongAns: { type: Number, default: 0 },
    attempt: { type: Number, default: 0 },
  },  
},{timestamps: true});

const Student = mongoose.model("Student", studentSchema);
export default Student;
