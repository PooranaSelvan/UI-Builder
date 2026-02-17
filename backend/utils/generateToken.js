import jwt from "jsonwebtoken";


export const generateToken = (res, userId) => {
     let token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
          expiresIn: "7d"
     });

     let isLive = process.env.SITE_TYPE === "production";

     console.log(isLive);

     res.cookie("authauth", token, {
          httpOnly: true,
          secure: isLive,
          sameSite: isLive ? "none" : "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path : "/"
     });
}


export const verifyUser = (req, res, next) => {
     try {
          let token = req.cookies.authauth;

          if (!token) {
               return res.status(401).json({ message: "Unauthorized - No Token Provided" });
          }

          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          next();
     } catch (err) {
          return res.status(401).json({ message: "Unauthorized - Invalid Token" });
     }
};