import Question from "../models/questionModels.js"
import Student from "../models/studentModel.js"
import generateToken from "../utils/generateToken.js";
import shuffleArray from "../utils/suffleQuestion.js"

const handleAddStudent = async (req, res) => {
    console.log('Request Body:', req.body); // Debugging the request body
    const {  rollno, password, course } = req.body;
    if ( !rollno || !password || !course) {
        return res.json({ success: false, message: "Fields are missing" });
    }

    try {
        const existStudent = await Student.findOne({ rollno });
        if (existStudent) {
            return res.json({ success: false, message: "Already exists" });
        }
        const student = await Student.create({  rollno, password, course });
        console.log(student);
        return res.json({ success: true, message: "Student added" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



const handleUpdateStudent = async (req, res) => {
    const { id,  rollno, password, course } = req.body;

    if (!id) {
        return res.json({ success: false, message: "Id Not provided" });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id, // Only need the ID as the filter
            {  rollno, password, course }, // Fields to update
            { new: true } // Option to return the updated document
        );

        if (!updatedStudent) {
            return res.json({ success: false, message: "Student not found" });
        }

        return res.json({ success: true, message: "Student Updated", data: updatedStudent });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const handleDeleteStudent = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.json({ success: false, message: "Id not provided" });
    }

    try {
        const studentDelete = await Student.findByIdAndDelete(id); // No need for {_id: id}

        if (!studentDelete) {
            return res.json({ success: false, message: "Student not found" });
        }

        return res.json({ success: true, message: "Student Deleted" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


const handleGetStudent = async (req, res) => {
    const { id } = req.body;
    
    try {
        let student;
        if (id) {
            // Find student by ID
            student = await Student.findById(id);
            if (!student) {
                return res.json({ success: false, message: "Student not found" });
            }
        } else {
            // Find all students
            student = await Student.find();
        }

        return res.json({ success: true, data: student });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};






const handleAddQuestion = async (req, res) => {
    // get data from frontend
    // validate not empty
    // create a new document and store into db
    // return response with a message Question added

    const { course, question, option1, option2, option3, option4, answer } = await req.body
    if (!course || !question || !option1 || !option2 || !option3 || !option4 || !answer) {
        return res.json({ success: false, message: "Feilds is missing" })
    }

    try {
        const newQuestion = await Question.create({ course, question, option1, option2, option3, option4, answer })
        if (!newQuestion) {
            return res.json({ success: false, message: "Error while creation document" })

        }

        return res.json({ success: true, message: "Question added" })
    } catch (error) {

        return res.json({ success: false, message: error.message })
    }

}

const handleGetSuffledQuestions = async (req, res) => {
    try {
       let questions;
        const {course} = req.body
        if(course){
            questions = await Question.find({course});
        }else{
            questions = await Question.find();
        }
        const shuffledQuestions = shuffleArray(questions);

        
        return res.json({ success: true, data: shuffledQuestions.slice(0, 100) });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


 

const handleAdminLogin = async (req, res) => {
  const { userId, password } = req.body;

  // Check if both userId and password are provided
  if (!userId || !password) {
    return res.json({ success: false, data: null, message: "Fields are missing" });
  }

  try {
    // Check if user credentials match the stored ones
    // Corrected the condition to compare userId and password correctly
    if (userId !== process.env.USER_ID || password !== process.env.PASSWORD) {
      return res.json({ success: false, data: null, message: "Invalid credentials" });
    }

    // Generate a JWT token for successful login
    const token = generateToken(userId); // Passing userId as a payload

    // Return a success response with the token
    return res.json({ success: true, token, message: "Login successfully" });

  } catch (error) {
    // Handle any unexpected errors
    return res.json({ success: false, data: null, message: error.message });
  }
}





export {handleAdminLogin, handleAddStudent, handleUpdateStudent, handleDeleteStudent, handleGetStudent, handleAddQuestion, handleGetSuffledQuestions }