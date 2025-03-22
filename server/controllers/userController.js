import Student from "../models/studentModel.js";


const handleFinishExam = async (req, res) => {
    const { id, result } = req.body;

    if (!id) {
        return res.json({ success: false, message: "Id not provided" });
    }

    const student = await Student.findById(id);

    if (!student) {
        return res.json({ success: false, message: "Student not found" });
    }

    student.isComplateExam = true;  
    student.result.rightAns = result.rightAns;
    student.result.wrongAns = result.wrongAns;
    student.result.attempt = result.attempt;

    await student.save();

    return res.json({ success: true, message: "Your exam finished successfully" });
};




const getStudent = async (req, res) => {
    const { rollno } = req.body;
    if (!rollno) {
        return res.json({ success: false, data: null, message: "rollno not provided" });
    }

    try {

        const student = await Student.findOne({ rollno });
        if (!student) {
            return res.json({ success: false, data: null, message: "Student not found" });
        }

        return res.json({ success: true, data: student, message: "Student found" });
    } catch (error) {
        return res.json({ success: false, data: null, message: error.message });
    }
}


const getAllStudent = async (req, res) => {
    

    try {

        const students = await Student.find();
        if (!students) {
            return res.json({ success: false, data: null, message: "Student not found" });
        }

        return res.json({ success: true, data: students, message: "Student found" });
    } catch (error) {
        return res.json({ success: false, data: null, message: error.message });
    }
}


const verifyStudent = async (req, res) => {
    const { rollno, password } = req.body;

    // Check if both rollno and password are provided
    if (!rollno || !password) {
        return res.json({ data: null, success: false, message: "Please fill all fields" });
    }

    try {

        const student = await Student.findOne({ rollno, password });


        if (!student) {
            return res.json({ data: null, success: false, message: "Student not found or incorrect details" });
        }

        if(student.isComplateExam == "true"){
            return res.json({ data: null, success: false, message: "Your exam has been Allready complate " });
        }


        return res.json({ data: student, success: true, message: "Student verified successfully" });

    } catch (error) {

        return res.json({ data: null, success: false, message: error.message });
    }
};



export { getStudent, handleFinishExam , verifyStudent, getAllStudent}
