import express from "express";
import userRoutes from "./routes/userRoutes.js";

const PORT = 5000;
const app = express();


app.get("/", (req, res) => {
     res.send("hello World!");
});


// User Routes
app.use("/users/", userRoutes);



app.listen(PORT, () => {
     console.log("Server is Running on PORT :", PORT);
});