import con from "../db/config.js";
import validator from "validator";
import { loginUserQuery, signUpUserQuery } from "../utils/queries.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
     let { name, email, password } = req.body;

     if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     if (name.length < 3) {
          return res.status(400).json({ message: "Name Must be More than 3 Characters!" });
     }
     if (!validator.isEmail(email)) {
          return res.status(400).json({ message: "Invalid Email Format!" });
     }
     if (!validator.isStrongPassword(password)) {
          return res.status(400).json({ message: "Not a Strong Password!" });
     }

     try {
          let hashedPassword = bcrypt.hashSync(password, 12);

          con.query(signUpUserQuery, [name, email, hashedPassword, false], async (err, result) => {
               if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                         return res.status(401).json({ message: "User Already Exists!" });
                    }

                    return res.status(500).json({ message: err?.sqlMessage, err });
               }

               let userId = result.insertId;

               generateToken(res, userId);

               return res.status(200).json({ message: "SignUp Successful!" });
          });
     } catch (error) {
          console.log(error);
     }

}

const loginUser = async (req, res) => {
     const { email, password } = req.body;

     console.log(email, password);

     if (!email || !password) {
          return res.status(400).json({ message: "Email and password required" });
     }

     if (!validator.isEmail(email)) {
          return res.status(400).json({ message: "Invalid Email Format!" });
     }
     if (!validator.isStrongPassword(password)) {
          return res.status(400).json({ message: "Not a Strong Password!" });
     }

     con.query(loginUserQuery, [email], async (err, result) => {
          if (err) {
               console.log(err);
               return res.status(500).json({ message: "Error Occured : ", err });
          }

          if (result.length === 0) {
               return res.status(401).json({ message: "Invalid Credentials" });
          }

          let user = result[0];
          let isValidUser = await bcrypt.compare(password, user.password);

          if (!isValidUser) {
               return res.status(401).json({ message: "Invalid Credentials" });
          }

          generateToken(res, user.userId);


          if (result.length > 0) {
               return res.status(200).json({ message: "Login Successful!" });
          }
     });
}


export { registerUser, loginUser };