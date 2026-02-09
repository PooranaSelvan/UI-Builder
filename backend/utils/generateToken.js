import jwt from "jsonwebtoken";


export const generateToken = (req, res, data) => {
     let userData = {
          zid: data.ZUID,
          name: data.Display_Name,
          email: data.Email
     };

     let token = jwt.sign(userData, process.env.JWT_SECRET, {
          expiresIn: "7d"
     });


     res.cookie("authauth", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000
     });
}


export const verifyUser = (req, res, next) => {
     let token = req.cookies.authauth;

     if (!token) {
          return res.status(401).json({ message: "Unauthorized - No Token Provided" });
     }

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     if (!decoded) {
          return res.status(401).json({ message: "Unauthorized" });
     }
     req.user = decoded;

     return next();
}