import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FolderCard from "./FolderCard";
import CreateForm from "./CreateForm";
import { Plus, MoreVertical, FileText, Search, Clock, ArrowRight, Pencil, Copy, Edit3, Eye, Trash2, Rocket } from "lucide-react";
import "./Dashboard.css";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import api from "../../utils/axios.js";

const Dashboard = () => {
  let navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const getUserId = async () => {
    let res = await api.get("/checkme/");

    return res.data.user.userId;
  }

  function buildJSON(rows) {
    let project = {};

    rows.forEach((data) => {
      const projectId = data.projectId;

      if (!project[projectId]) {
        project[projectId] = {
          id: projectId,
          name: data.projectName,
          desc: data.description,
          pages: []
        }
      }

      if (data.pageName) {
        project[projectId].pages.push({
          id: data.pageId,
          name: data.pageName,
          description: data.pageDescription,
          status: data.pagePublished ? "Published" : "Draft",
          modified: data.lastModified,
          data: data.pageData || {}
        });
      }
    });
    return Object.values(project);
  }

  async function fetchPages() {
    setLoading(true);
    let userId = await getUserId();

    try {
      let res = await api.get(`/builder/pages/${userId}`);

      let formattedJSON = buildJSON(res.data.pages);
      setProjects(formattedJSON);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreateNewPage = async (name, description) => {
    let userId = await getUserId();

    if (userId < 1) {
      toast.error("Invalid User!");
      return;
    }

    if (!selectedApp) {
      toast.error("Something Went Wrong! Refresh & Try Again!");
      return;
    }

    try {
      setLoading(true);
      let res = await api.post("/builder/pages/", {
        projectId: selectedApp.id,
        pageName: name,
        description,
        data: []
      });

      let projectId = selectedApp.id;

      let newPage = {
        id: res.data.pageId,
        name: name,
        description,
        status: "Draft",
        modified: new Date().toLocaleString(),
        data: []
      };

      setSelectedApp(ele => ({
        ...ele,
        pages: [...ele.pages, newPage]
      }));

      setProjects(data =>
        data.map(project => project.id === projectId ? { ...project, pages: [...project.pages, newPage] } : project)
      );

      setIsModalOpen(false);
      toast.success("Page Created Successfully!");
      setLoading(false);
      navigate(`/workspace/${res.data.pageId}`, { replace: true });
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      toast.error(err.response?.data.message);
    }
  }

  const handleCreateNewProject = async (name, description) => {
    let userId = await getUserId();

    if (userId < 1) {
      toast.error("Invalid User! Refresh & Try Again!");
      return;
    }

    try {
      setLoading(true);
      let res = await api.post("/builder/projects/", {
        userId,
        projectName: name,
        description
      });

      setProjects(projects => [
        ...projects,
        {
          id: res.data.projectId,
          name,
          desc: description,
          pages: []
        }
      ]);

      setIsModalOpen(false);
      toast.success("Project Created Successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response?.data.message);
    }

  }

  const deleteProject = async (projectId) => {
    let userId = await getUserId();

    if (userId < 1) {
      toast.error("Invalid User! Refresh & Try Again!");
      return;
    }

    try {
      let res = await api.delete("/builder/projects/", {
        data: {
          projectId
        }
      });

      setProjects(projects => projects.filter(ele => ele.id !== projectId));
      if (selectedApp?.id === projectId) {
        setSelectedApp(null);
      }
      setActiveMenu(null);
      toast.success("Project is Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data.message);
    }
  }

  const deletePage = async (pageId) => {
    let userId = await getUserId();

    if (userId < 1) {
      toast.error("Invalid User! Refresh & Try Again!");
      return;
    }

    try {
      let res = await api.delete("/builder/pages/", {
        data: {
          pageId
        }
      });

      setActiveMenu(null);
      setSelectedApp(project => ({
        ...project,
        pages: project.pages.filter(page => page.id !== pageId)
      }));
      setProjects(ele => ele.map(project => project.id === selectedApp.id ? { ...project, pages: project.pages.filter(page => page.id !== pageId) } : project));
      toast.success("Page Deleted Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    }
  }

  const renameProject = async () => {

  }

  const renamePage = async () => {

  }

  const handlePreviewpage = async (pageId) => {
    if (!pageId) {
      toast.error("Invalid Page Id!");
      return;
    }

    setLoading(true);
    try {
      let res = await api.get(`/builder/page/${pageId}`);

      if (res.data.data) {
        console.log(res.data.data);
        localStorage.setItem("previewComponents", JSON.stringify(res?.data.data));
        window.open("/preview", "_blank");
      } else {
        toast.error("No preview Found!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <Loading />
      </div>
    );
  }

  // ================= DASHBOARD VIEW =================
  if (!selectedApp) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-inner">

          <div className="top-bar">
            <div>
              <h1>My Workspace</h1>
              <p className="sub-text">
                Organize your ideas into Projects
              </p>
            </div>

            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search..." />
            </div>
          </div>

          <div className="card-grid">
            <div
              className="create-card"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="create-icon">
                <Plus size={28} />
              </div>
              <h3>Create New Project</h3>
              <p>Organize your projects</p>
            </div>

            {projects.map((app, index) => (
              <FolderCard
                key={app.id}
                app={app}
                index={index}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                setSelectedApp={setSelectedApp}
                handleDeleteProject={deleteProject}
              />
            ))}
          </div>

        </div>
        <CreateForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Project"
          nameLabel="Project Name"
          descriptionLabel="Project Description"
          buttonText="Create Project"
          createNewProject={handleCreateNewProject}
        />

      </div>

    );
  }
  // ================= PAGES VIEW =================
  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">

        <div className="top-bar">
          <div className="breadcrumb">
            <span
              className="breadcrumb-link"
              onClick={() => setSelectedApp(null)}>
              My Workspace
            </span>

            <span className="breadcrumb-separator">/</span>

            <span className="breadcrumb-current">
              {selectedApp.name}
            </span>
          </div>

          <div className="search-box">
            <Search size={16} />
            <input placeholder="Search..." />
          </div>
        </div>

        <div className="card-grid">
          <div
            className="create-card"
            onClick={() => setIsModalOpen(true)} >
            <div className="create-icon">
              <Plus size={28} />
            </div>
            <h3>Create New Page</h3>
            <p>Add a new page to this project</p>
          </div>

          {selectedApp?.pages?.map((page, index) => (
            <div key={index} className="page-card">
              <div className="page-top">
                {/* HEADER */}
                {console.log(page)}
                <div className="page-header">
                  <div className="folder-icon folder-color">
                    <FileText size={26} />
                  </div>
                  <br />
                  <div className="page-header-right">
                    <span className={`status ${page.status === "Published" ? "published" : "draft"}`}>
                      {page.status}
                    </span>
                    <div className="menu-wrapper">
                      <MoreVertical
                        size={20}
                        className="three-dots"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === index ? null : index)
                        }} />
                      {activeMenu === index && (
                        <div className="dropdown-menu" onClick={(e) => e.stopPropagation()} ref={menuRef}>
                          <div className="menu-item">
                            <button style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Edit3 size={16} />
                              Rename
                            </button>
                          </div>
                          <div className="menu-item">
                            <button onClick={(e) => { e.stopPropagation(); handlePreviewpage(page.id) }} style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Eye size={16} />
                              Preview
                            </button>
                          </div>
                          <div className="menu-item">
                            <button style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Rocket size={16} />
                              Publish
                            </button>
                          </div>
                          <div className="menu-divider" />
                          <div className="menu-item delete">
                            <button onClick={(e) => { e.stopPropagation(); deletePage(page.id) }} style={{ width: "100%", borderRadius: "5px", color: "var(--primary)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
              {/* DIVIDER */}
              <div className="page-divider"></div>
              <br />
              {/* TITLE */}
              <div className="page-title">
                <p>{page.name}</p>
              </div>
              <p className="page-description">{page.description}</p>

              {/* FOOTER */}
              <div className="page-footer">
                <div
                  className="open-page"
                  onClick={() => navigate(`/workspace/${page.id}`)}>
                  <ArrowRight size={24} />
                </div>
              </div>
            </div>
          ))
          }
        </div>
        <CreateForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Page"
          nameLabel="Page Name"
          descriptionLabel="Page Description"
          buttonText="Create Page"
          createNewPage={handleCreateNewPage}
        />
      </div>
    </div>
  );
};
export default Dashboard;