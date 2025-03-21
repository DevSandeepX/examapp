import express from "express";
import "dotenv/config";
import cors from "cors"
import connectDb from "./config/connectDb.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
const port = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))
connectDb();
app.get("/", (req, res) => {
    res.send("Server is Live")
})

app.use("/api/admin/", adminRoute)
app.use("/api/user/", userRoute)


app.listen(port, () => {
    console.log(`App is Live http://localhost:${port}`)
})
