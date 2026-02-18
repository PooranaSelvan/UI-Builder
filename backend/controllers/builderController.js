import con from "../db/config.js";
import { getProjectById, getUserById } from "../utils/finders.js";
import { deleteAllCustomComponentsQuery, deleteCustomComponentQuery, deletePageQuery, deleteProjectQuery, getPageByPageIdQuery, getPublishedPageQuery, saveNewComponent, saveNewPage, saveNewProject, selectProjectByUserId, updatePageData } from "../utils/queries.js";
import { getUserComponentsQuery } from "../utils/queries.js";
import { getUserPagesQuery } from "../utils/queries.js";


// Projects
const getProjects = async (req, res) => {
     const { userId } = req.params;

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
                    return res.status(200).json({ projects: [] });
               }

               let projects = result;

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

     if (projectName.length < 3 || projectName.length > 20) {
          return res.status(400).json({ message: "Name can't be less than 3 & more than 30 characters!" });
     }
     if (description.length < 10 || description.length > 90) {
          return res.status(400).json({ message: "Description can't be less than 10 & more than 90 Characters!" });
     }


     try {
          let user = getUserById(userId);

          if (user === null) {
               return res.status(404).json({ message: "User Not Found!" });
          }

          con.query(saveNewProject, [userId, projectName, description, false], (err, result) => {
               if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                         return res.status(401).json({ message: "Project Already Exists!" });
                    }

                    return res.status(500).json({ message: err?.sqlMessage, err });
               }

               return res.status(200).json({ message: "Project Created Successfully!", projectId: result.insertId });
          });
     } catch (error) {
          console.log(error);
     }
}

const deleteProject = async (req, res) => {
     const { projectId } = req.body;

     if (!projectId) {
          return res.status(400).json({ message: "All fields are required!" });
     }


     try {
          con.query(deleteProjectQuery, [projectId], (err, result) => {
               if (err) {
                    if (err.code === 'ER_BAD_NULL_ERROR') {
                         return res.status(400).json({ message: "Required inputs are missing" });
                    }

                    return res.status(400).json({ message: "Error Occurred" });
               }

               return res.status(200).json({ message: "Project & its Pages Deleted Successfully!" });
          });
     } catch (error) {
          console.log(error);
     }
}


// Pages
const getPages = async (req, res) => {
     const { userId } = req.params;

     if (!userId) {
          return res.status(400).json({
               message: "All fields are required"
          })
     }

     try {
          con.query(getUserPagesQuery, [userId], (err, result) => {
               if (err) {
                    return res.status(500).json({
                         message: "Error occured", err
                    })
               }

               if (!result.length) {
                    return res.status(200).json({
                         pages: []
                    })
               }

               let projects = result;

               return res.status(200).json({ pages: projects })
          });
     } catch (err) {
          console.log(err);
     }
}


const getPageByPageId = async (req, res) => {
     const { pageId } = req.params;

     if (!pageId) {
          return res.status(400).json({ message: "Page ID is required" });
     }

     con.query(getPageByPageIdQuery, [pageId], (err, result) => {
          if (err) {
               return res.status(500).json({ message: "Error occured", err });
          }

          if (result.length === 0) {
               return res.status(404).json({ message: "Page Not Found!" });
          }

          let page = result[0];

          let user = getUserById(page.userId);

          if (!user || user === null) {
               return res.status(404).json({ message: "User Not Found!" });
          }

          return res.status(200).json({
               id: page.pageId,
               name: page.pageName,
               description: page.description,
               data: page.data || [],
               lastModified: page.lastModified,
               isPublished: page.isPublished,
               userId: page.userId
          });
     });
}


const getPublishedPage = async (req, res) => {
     const { pageId } = req.params;

     if (!pageId) {
          return res.status(400).json({ message: "Invalid Page Id!" });
     }

     con.query(getPublishedPageQuery, [pageId], (err, result) => {
          if (err) {
               console.log(err);
               return res.status(500).json({ message: err?.sqlMessage, error: err });
          }

          if (result.length === 0) {
               return res.status(404).json({ message: "This Page is Not Published!" });
          }

          let page = result[0];

          return res.status(200).json({
               id: page.pageId,
               name: page.pageName,
               description: page.description,
               data: page.data || [],
               lastModified: page.lastModified,
               isPublished: page.isPublished
          });
     });
}


const savePage = async (req, res) => {
     const { projectId, pageName, description, data } = req.body;

     if (!projectId || !pageName || !description || !data) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     if (pageName.length < 3 || pageName.length > 20) {
          return res.status(400).json({ message: "Name can't be less than 3 & more than 20 Characters!" });
     }
     if (description.length < 5 || description.length > 50) {
          return res.status(400).json({ message: "Description can't be less than 5 & more than 50 Characters!" });
     }


     try {
          let project = await getProjectById(projectId);

          if (project === null) {
               return res.status(404).json({ message: "Project Not Found!" });
          }

          con.query(saveNewPage, [projectId, pageName, description, JSON.stringify(data), false], (err, result) => {
               if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                         return res.status(401).json({ message: "Page Already Exists!" });
                    }

                    return res.status(500).json({ message: err?.sqlMessage, err });
               }

               return res.status(200).json({ message: "Page Created Successfully!", pageId: result.insertId });
          });
     } catch (error) {
          console.log(error);

     }
}

const updatePage = async (req, res) => {
     const { pageId } = req.params;
     const { data } = req.body;

     if (!pageId) {
          return res.status(400).json({ message: "Invalid Page Id!" });
     }

     con.query(updatePageData, [JSON.stringify(data), pageId], (err, result) => {
          if (err) {
               console.error(err);
               return res.status(500).json({ message: "Something went wrong" });
          }

          return res.status(200).json({
               message: "Page updated successfully"
          });
     });
}

const deletePage = async (req, res) => {
     const { pageId } = req.body;

     if (!pageId) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     con.query(deletePageQuery, [pageId], (err, result) => {
          if (err) {
               if (err.code === 'ER_BAD_NULL_ERROR') {
                    return res.status(400).json({ message: "Required inputs are missing" });
               }

               return res.status(400).json({ message: "Error Occurred" });
          }

          return res.status(200).json({ message: "Page Deleted Successfully!" });
     });
}


// Custom Components
const getCustomComponents = async (req, res) => {
     try {
          const { userId } = req.params;

          const [rows] = await con.promise().query(getUserComponentsQuery, [userId]);

          res.status(200).json({ components: rows || [] });

     } catch (error) {
          res.status(500).json({
               message: "Error fetching components"
          });
     }
};


const saveCustomComponent = async (req, res) => {
     const { userId, icon, componentName, data } = req.body;

     if (!userId || !icon || !componentName || !data) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     try {
          let user = await getUserById(userId);

          if (user === null) {
               return res.status(404).json({ message: "User Not Found!" });
          }

          con.query(saveNewComponent, [userId, icon, componentName, JSON.stringify(data), new Date()], (err, result) => {
               if (err) {
                    return res.status(500).json({ message: err?.sqlMessage, error: err });
               }

               return res.status(200).json({
                    message: "Component Created Successfully!"
               });
          }
          );
     } catch (error) {
          console.log("CATCH ERROR:", error);
     }
};



const deleteCustomComponent = async (req, res) => {
     const { userId } = req.body;
     const { componentId } = req.params;

     if (!userId || !componentId) {
          return res.status(400).json({ message: "All fields are required!" });
     }

     con.query(deleteCustomComponentQuery, [userId, componentId], (err, result) => {
          if (err) {
               if (err.code === 'ER_BAD_NULL_ERROR') {
                    return res.status(400).json({ message: "Required inputs are missing" });
               }

               return res.status(400).json({ message: "Error Occurred" });
          }

          return res.status(200).json({ message: "Component Deleted Successfully!" });
     });
}


const deleteAllCustomComponent = async (req, res) => {
     const { userId } = req.body;

     if (!userId) {
          return res.status(400).json({ message: "All fields are required!" });
     }


     con.query(deleteAllCustomComponentsQuery, [userId], (err, result) => {
          if (err) {
               if (err.code === 'ER_BAD_NULL_ERROR') {
                    return res.status(400).json({ message: "Required inputs are missing" });
               }

               return res.status(400).json({ message: "Error Occurred" });
          }

          return res.status(200).json({ message: "All Components Deleted Successfully!" });
     });
}

export { getProjects, saveProject, deleteProject, getPages, getPublishedPage, getPageByPageId, savePage, updatePage, deletePage, getCustomComponents, saveCustomComponent, deleteCustomComponent, deleteAllCustomComponent };