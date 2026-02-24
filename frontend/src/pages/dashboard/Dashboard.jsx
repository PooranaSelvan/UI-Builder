import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FolderCard from "./FolderCard";
import CreateForm from "./CreateForm";
import { Plus, MoreVertical, FileText, Search, ChevronRight, Copy, Edit3, Eye, Trash2, Rocket, Undo2, Download } from "lucide-react";
import "./Dashboard.css";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import api from "../../utils/axios.js";
import Button from "../../components/Button.jsx";
import DeleteModal from "./components/DeleteModal.jsx";
import UpdateForm from "./components/UpdateForm.jsx";

const Dashboard = () => {
  let navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
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


  useEffect(() => {
    const getUserId = async () => {
      try {
        let res = await api.get("/checkme/");
        setUserId(res.data.user.userId);
      } catch (error) {
        navigate("/login", { replace: true });
      }
    };

    getUserId();
  }, []);


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
          projectId: projectId,
          name: data.pageName,
          description: data.pageDescription,
          pageUrl: data.url,
          modified: data.lastModified,
          data: data.pageData || [],
          isPublished: !!data.pagePublished
        });
      }
    });
    return Object.values(project);
  }

  async function fetchPages() {
    if (!userId) {
      return;
    }

    try {
      let res = await api.get(`/builder/pages/${userId}`);

      let formattedJSON = buildJSON(res.data.pages);
      setProjects(formattedJSON);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userId) return;

    fetchPages();
  }, [userId]);

  const handleCreateNewPage = async (name, description, url) => {
    if (userId < 1) {
      toast.error("Invalid User!");
      return;
    }

    if (!selectedApp) {
      toast.error("Something Went Wrong! Refresh & Try Again!");
      return;
    }

    if (!name || !description || !url) {
      toast.error("All fields Required!");
      return;
    }

    try {
      setLoading(true);
      let res = await api.post("/builder/pages/", {
        projectId: selectedApp.id,
        pageName: name,
        description,
        pageUrl: url,
        data: []
      });

      let projectId = selectedApp.id;

      let newPage = {
        id: res.data.pageId,
        projectId,
        name: name,
        description,
        pageUrl: url,
        status: "Draft",
        modified: new Date().toLocaleString(),
        data: [],
        isPublished: false
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
    if (userId < 1) {
      toast.error("Invalid User! Refresh & Try Again!");
      return;
    }

    if (!name || !description) {
      toast.error("All fields Required!");
      return;
    }

    try {
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
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      setLoading(false);
    }

  }

  const deleteProject = async () => {
    if (!deleteInfo.id) {
      return;
    }

    if (userId < 1) {
      toast.error("Invalid User! Refresh & Try Again!");
      return;
    }

    try {
      let res = await api.delete("/builder/projects/", {
        data: {
          projectId: deleteInfo.id
        }
      });

      setProjects(projects => projects.filter(ele => ele.id !== deleteInfo.id));
      if (selectedApp?.id === deleteInfo.id) {
        setSelectedApp(null);
      }
      toast.success("Project Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete error");
    } finally {
      setActiveMenu(null);
      setLoading(false);
      setShowDelete(false);
      setDeleteInfo(null);
    }
  }

  const deletePage = async () => {
    if (!deleteInfo.id) {
      return;
    }

    if (userId < 1) {
      toast.error("Invalid User! Refresh & Try Again!");
      return;
    }

    try {
      let res = await api.delete("/builder/pages/", {
        data: {
          pageId: deleteInfo.id
        }
      });

      setSelectedApp(project => ({
        ...project,
        pages: project.pages.filter(page => page.id !== deleteInfo.id)
      }));
      setProjects(ele => ele.map(project => project.id === selectedApp.id ? { ...project, pages: project.pages.filter(page => page.id !== deleteInfo.id) } : project));
      toast.success("Page Deleted Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    } finally {
      setActiveMenu(null);
      setLoading(false);
      setShowDelete(false);
      setDeleteInfo(null);
    }
  }


  const handlePublishPage = async (pageId, projectId) => {
    if (!pageId || !projectId) {
      toast.error("Invalid Page or Project Id!");
      return;
    }

    try {
      let res = await api.post("/builder/publish", {
        pageId,
        projectId
      });

      setSelectedApp(project => ({
        ...project,
        pages: project.pages.map(pg => pg.id === pageId ? { ...pg, isPublished: true } : pg)
      }));
      setProjects(ele => ele.map(project => project.id === selectedApp.id ? { ...project, pages: project.pages.map(pg => pg.id === pageId ? { ...pg, isPublished: true, status: "Published" } : pg) } : project));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response?.data.message);
    }
  }

  const handleUnPublishPage = async (pageId, projectId) => {
    if (!pageId || !projectId) {
      toast.error("Invalid Page or Project Id!");
      return;
    }

    try {
      let res = await api.post("/builder/publish/un", {
        pageId,
        projectId
      });

      setSelectedApp(project => ({
        ...project,
        pages: project.pages.map(pg => pg.id === pageId ? { ...pg, isPublished: false } : pg)
      }));
      setProjects(ele => ele.map(project => project.id === selectedApp.id ? { ...project, pages: project.pages.map(pg => pg.id === pageId ? { ...pg, isPublished: false, status: "Draft" } : pg) } : project));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(error.response?.data.message);
    }
  }

  const handleCopyLink = async (pageUrl) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/publish/${page.pageUrl}`);
      toast.success("Link Copied Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error Copying Link!");
    }
  }

  const renameProject = async () => {

  }

  const renamePage = async (pageId, pageName, pageDescription, url) => {
    if (!pageId || !pageName || !pageDescription || !url) {
      toast.error("All fields are Required!");
      return;
    }

    try {
      let res = await api.post("/builder/page/rename", {
        pageId,
        name: pageName,
        description: pageDescription,
        url
      });

      setSelectedApp((projects) => ({
        ...projects,
        pages: projects.pages.map((page) => page.id === pageId ? { ...page, pageName, pageDescription, pageUrl : url } : page)
      }));

      setProjects((projects) =>
        projects.map((project) =>
          project.id === selectedApp.id ? {
            ...project,
            pages: project.pages.map((page) =>
              page.id === pageId ? { ...page, pageName, pageDescription, pageUrl : url } : page
            )
          } : project
        )
      );

      setIsUpdateFormOpen(false);
      toast.success("Page Renamed Successfully!");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(error.response?.data.response);
    }
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
        localStorage.setItem("previewComponents", JSON.stringify(res?.data.data));
        window.open("/preview", "_blank");
      } else {
        toast.error("No preview Found!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
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
                Convert your ideas into Projects
              </p>
            </div>

            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search..." />
            </div>
          </div>

          <div className="card-grid" id="cards-grid">
            <div
              className="create-card"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="create-icon">
                <Plus size={28} />
              </div>
              <h3>Create New Project</h3>
            </div>

            {projects.map((app, index) => (
              <FolderCard key={app.id} app={app} index={index} activeMenu={activeMenu} setActiveMenu={setActiveMenu} setSelectedApp={setSelectedApp} setDeleteInfo={setDeleteInfo} setShowDelete={setShowDelete} />
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
        {showDelete && deleteInfo?.type === "project" && (
          <DeleteModal title="Project" onDelete={deleteProject} onCancel={() => { setShowDelete(false); setDeleteInfo(null) }} />
        )}
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
            <div key={page.id} className="page-card" onClick={() => navigate(`/workspace/${page.id}`)}>
              <div className="page-top">
                {/* HEADER */}
                <div className="page-header">
                  <div className="folder-icon folder-color">
                    <FileText size={26} />
                  </div>
                  <br />
                  <div className="page-header-right">
                    <span className={`status ${page.isPublished ? "published" : "draft"}`}>
                      {page.isPublished ? "Published" : "Draft"}
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
                            <Button onClick={(e) => { e.stopPropagation(); setCurrentPage(page); setIsUpdateFormOpen(true); }} style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Edit3 size={16} />
                              Rename
                            </Button>
                          </div>
                          <div className="menu-item">
                            <Button onClick={(e) => { e.stopPropagation(); handlePreviewpage(page.id) }} style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Eye size={16} />
                              Preview
                            </Button>
                          </div>
                          {page.isPublished ? (
                            <div className="menu-item">
                              <Button style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }} onClick={() => handleUnPublishPage(page.id, page.projectId)}>
                                <Undo2 size={16} />
                                Un Publish
                              </Button>
                            </div>
                          ) : (
                            <div className="menu-item">
                              <Button style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }} onClick={() => handlePublishPage(page.id, page.projectId)}>
                                <Rocket size={16} />
                                Publish
                              </Button>
                            </div>
                          )}
                          <div className="menu-item">
                            <button onClick={(e) => { e.stopPropagation(); handlePreviewpage(page.id) }} style={{ width: "100%", borderRadius: "5px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Download size={16} />
                              Export
                            </button>
                          </div>
                          <div className="menu-divider" />
                          <div className="menu-item delete">
                            <Button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); setDeleteInfo({ type: "page", id: page.id }); setShowDelete(true) }} style={{ width: "100%", borderRadius: "5px", color: "var(--primary)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", backgroundColor: "transparent" }}>
                              <Trash2 size={16} />
                              Delete
                            </Button>
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
                <h3>{page.name}</h3>
                <p className="page-description">{page.description}</p>
              </div>

              {/* FOOTER */}
              <div className="page-footer" style={{ justifyContent: page.isPublished ? "space-between" : "flex-end" }}>
                {page.isPublished && (
                  <div className="page-link">
                    <p onClick={() => window.open(`/publish/${page.pageUrl}`, "_blank")}>Link</p>
                    <Copy size={15} onClick={() => handleCopyLink(page.pageUrl)} />
                  </div>
                )}
                <div className="open-page" onClick={() => navigate(`/workspace/${page.id}`)}>
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          ))
          }
        </div>
        <CreateForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Page" nameLabel="Page Name" descriptionLabel="Page Description" buttonText="Create Page" createNewPage={handleCreateNewPage} />
      </div >
      {showDelete && deleteInfo?.type === "page" && (
        <DeleteModal title="Page" onDelete={deletePage} onCancel={() => { setShowDelete(false); setDeleteInfo(null) }} />
      )}
      {isUpdateFormOpen && currentPage && (
        <UpdateForm isOpen={isUpdateFormOpen} onClose={() => setIsUpdateFormOpen(false)} pageData={{ name: currentPage.name, description: currentPage.description, url: currentPage.pageUrl }} onRename={(name, description, url) => renamePage(currentPage.id, name, description, url)} />
      )}
    </div >
  );
};
export default Dashboard;