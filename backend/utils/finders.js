import con from "../db/config.js";
import { selectProjectById, selectUserById } from "./queries.js";


export const getProjectById = (projectId) => {

     try {
          con.query(selectProjectById, [projectId], (err, result) => {
               if (err) {
                    console.log(err);
                    return null;
               }

               if (result.length === 0) {
                    return null;
               }

               let project = result[0];

               return project;
          });
     } catch (error) {
          console.log(error);
     }
}


export const getUserById = (userId) => {
     try {
          con.query(selectUserById, [userId], (err, result) => {
               if (err) {
                    console.log(err);
                    return null;
               }

               if (result.length === 0) {
                    return null;
               }

               let user = result[0];

               if(user){
                    return user;
               }
          });
     } catch (error) {
          console.log(error);
     }
}