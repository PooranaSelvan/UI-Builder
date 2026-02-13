import con from "../db/config.js";
import { getProjectById, getUserById } from "../utils/finders.js";
import { saveNewComponent, saveNewPage, saveNewProject, selectProjectByUserId } from "../utils/queries.js";
import { getUserComponentsQuery } from "../utils/queries.js";
import { getUserPagesQuery } from "../utils/queries.js";


// Projects
const getProjects = async (req, res) => {
     const { userId } = req.body;

     if (!userId) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     try {
          let user = getUserById(userId);

          if (user === null) {
               return res.status(404).json({ message: "User Not Found!" });
          }

          con.query(selectProjectByUserId, [userId], (err, result) => {
               if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error Occured", err });
               }

               if (result.length === 0) {
                    return res.status(401).json({ message: "No Projects Found!" });
               }

               let projects = result[0];

               return res.status(200).json({ projects });
          });
     } catch (error) {
          console.log(error);
     }
}

const saveProject = async (req, res) => {
     const { userId, projectName, description } = req.body;

     if (!userId || !projectName || !description) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     if (projectName.length < 3) {
          return res.status(400).json({ message: "Name Must be More than 3 Characters!" });
     }
     if (description.length < 10 || description.length > 50) {
          return res.status(400).json({ message: "Description Can't be Less than 10 & more than 50 Characters!" });
     }


     try {
          let user = getUserById(userId);

          if (user === null) {
               return res.status(404).json({ message: "User Not Found!" });
          }

          con.query(saveNewProject, [userId, projectName, description, false], (err, result) => {
               if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                         return res.status(401).json({ message: "Page Already Exists!" });
                    }

                    return res.status(500).json({ message: err?.sqlMessage, err });
               }

               return res.status(200).json({ message: "Project Created Successfully!" });
          });
     } catch (error) {
          console.log(error);
     }
}


// Pages
const getPages = async (req, res) => {
     try {
          const { userId } = req.params;
          const result = await con.promise().query(getUserPagesQuery, [userId]);

          res.json({ result: result.rows || [] });
     } catch (error) {
          res.status(500).json({
               message: "error fetching file"
          });
     }
}

const savePage = async (req, res) => {
     const { projectId, pageName, description, data } = req.body;

     if (!projectId || !pageName || !description || !data) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     if (pageName.length < 3) {
          return res.status(400).json({ message: "Name Must be More than 3 Characters!" });
     }
     if (description.length < 10 || description.length > 50) {
          return res.status(400).json({ message: "Description Can't be Less than 10 & more than 50 Characters!" });
     }


     try {
          let project = await getProjectById(projectId);

          if (project === null) {
               return res.status(404).json({ message: "Project Not Found!" });
          }

          con.query(saveNewPage, [projectId, pageName, description, data, false, new Date().toLocaleString()], (err, result) => {
               if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                         return res.status(401).json({ message: "Page Already Exists!" });
                    }

                    return res.status(500).json({ message: err?.sqlMessage, err });
               }

               return res.status(200).json({ message: "Page Created Successfully!" });
          });
     } catch (error) {
          console.log(error);

     }
}



// Custom Components
const getCustomComponents = async (req, res) => {
     try {
          const { userId } = req.params;
          const result = await con.promise().query(getUserComponentsQuery, [userId]);

          res.json({ result: result.rows || [] });
     } catch (error) {
          res.status(500).json({
               message: "error fetching file"
          });
     }
}

const saveCustomComponent = async (req, res) => {
     const { userId, icon, componentName, data } = req.body;

     if (!userId || !icon || !componentName || !data) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     if (componentName.length < 3) {
          return res.status(400).json({ message: "Name Must be More than 3 Characters!" });
     }

     try {
          let user = getUserById(userId);

          if (user === null) {
               return res.status(404).json({ message: "User Not Found!" });
          }

          con.query(saveNewComponent, [userId, icon, componentName, data, new Date().toLocaleString()], (err, result) => {
               if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                         return res.status(401).json({ message: "Component Already Exists!" });
                    }

                    return res.status(500).json({ message: err?.sqlMessage, err });
               }

               return res.status(200).json({ message: "Component Created Successfully!" });
          });
     } catch (error) {
          console.log(error);
     }
}



export { getProjects, saveProject, getPages, savePage, getCustomComponents, saveCustomComponent };
