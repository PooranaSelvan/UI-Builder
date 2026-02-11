import mysql from "mysql2";

const con = mysql.createConnection({
     host : "localhost",
     user : "root",
     password : process.env.DB_USER_PASSWORD,
     database : "sirpamuibuilder"
});


con.connect(err => {
     if(err){
          console.log(err);
     } else {
          console.log("Database Connected Successfully!");
     }
});

export default con;