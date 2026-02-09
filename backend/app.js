import express from "express";
import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import { generateToken, verifyUser } from "./utils/generateToken.js";
import cookieParser from "cookie-parser";

const PORT = 5000;
const app = express();
dotenv.config();
app.use(cors({
     origin: "http://localhost:5173",
     credentials : true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
let siteUrl = process.env.SITE_TYPE === "development" ? "http://localhost:5173" : "";




app.get("/", (req, res) => {
     res.send("Close This!");
});


// User Routes
app.use("/users/", userRoutes);
// app.use("/auth/", authRoutes);

app.get("/checkme", verifyUser, (req, res) => {
     res.json({ user: req.user });
});


app.get("/auth/zoho/callback", async (req, res) => {
     try {
          const { code, state } = req.query;
          if (!code) {
               return res.status(400).send("Auth Code Not Found");
          }

          const tokenRes = await axios.post("https://accounts.zoho.in/oauth/v2/token", null,
               {
                    params: {
                         grant_type: "authorization_code",
                         client_id: process.env.ZOHO_CLIENT_ID,
                         client_secret: process.env.ZOHO_CLIENT_SECRET,
                         redirect_uri: process.env.ZOHO_REDIRECT_URI,
                         code
                    }
               }
          );

          const accessToken = tokenRes.data.access_token;
          const profileRes = await axios.get("https://accounts.zoho.in/oauth/user/info",
               {
                    headers: {
                         Authorization: `Zoho-oauthtoken ${accessToken}`
                    }
               }
          );


          if (profileRes.status === 200) {
               const zohoUser = profileRes.data;

               generateToken(req, res, zohoUser);

               let sendSameUrl = decodeURIComponent(state || "/");
               res.redirect(`${siteUrl}${sendSameUrl}`);

               return;
          } else {
               console.log(profileRes.status);
               res.status(404).json({ message: "Authentication Failed!" });
          }
     } catch (err) {
          console.error("Zoho login error:", err.response?.data || err.message);
          return res.status(500).json({ error: "Zoho login failed" });
     }
});



app.get("/auth/zoho/login", async (req, res) => {
     let redirectPath = req.query.redirect || "/";

     let redirectUrl = `https://accounts.zoho.in/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=AaaServer.profile.Read&redirect_uri=${process.env.ZOHO_REDIRECT_URI}&access_type=offline&state=${encodeURIComponent(redirectPath)}`;

     res.redirect(redirectUrl);
});


app.get("/auth/zoho/logout", async (req, res) => {
     try {
          res.clearCookie("authauth");

          return res.status(201).json({message : "Logged out successfully!"});
     } catch (error) {
          return res.status(400).json({message : "Logged out failed!"});
     }
});



app.listen(PORT, () => {
     console.log("Server is Running on PORT :", PORT);
});