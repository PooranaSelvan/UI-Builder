import express from "express";
import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const PORT = 5000;
const app = express();


app.get("/", (req, res) => {
     res.send("hello World!");
});


// User Routes
app.use("/users/", userRoutes);
// app.use("/auth/", authRoutes);

app.get("/auth/zoho/callback", async (req, res) => {
     try {
          const { code } = req.query;
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

          const zohoUser = profileRes.data;
          console.log("Zoho User:", zohoUser);

          return res.status(200).json({ success: true, user: zohoUser });
     } catch (err) {
          console.error("Zoho login error:", err.response?.data || err.message);
          return res.status(500).json({ error: "Zoho login failed" });
     }
});



app.get("/auth/zoho/login", async (req, res) => {
     let result = await axios.get(`https://accounts.zoho.in/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=AaaServer.profile.Read&redirect_uri=${process.env.ZOHO_REDIRECT_URI}&access_type=offline`);
});



app.listen(PORT, () => {
     console.log("Server is Running on PORT :", PORT);
});