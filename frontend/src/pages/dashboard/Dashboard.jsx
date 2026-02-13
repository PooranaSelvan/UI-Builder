import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FolderCard from "./FolderCard";
import CreateForm from "./CreateForm";
import { Plus, MoreVertical, FileText, Search, Clock, ArrowRight, Pencil, Copy, Edit3, Eye, Trash2 } from "lucide-react";
import "./Dashboard.css";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;

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
    let res = await axios.get(`${baseUrl}checkme/`, { withCredentials: true });

    return res.data.user.id;
  }


  const handleCreateNewPage = async (name, description) => {
    let userId = await getUserId();

    if (userId < 1) {
      toast.error("Invalid User!");
      return;
    }

    // try {
    //   let res = await axios.post(`${baseUrl}builder/projects/`, {
    //     userId,
    //     projectName: name,
    //     description
    //   });

    //   console.log("Success:", res.data);

    // } catch (err) {
    //   toast.error(err.response?.data.message);
    // }
  }

  const handleCreateNewProject = async (name, description) => {
    let userId = await getUserId();


    if (userId < 1) {
      toast.error("Invalid User!");
      return;
    }

    try {
      let res = await axios.post(`${baseUrl}builder/projects/`, {
        userId,
        projectName: name,
        description
      });

      console.log("Success:", res.data);

    } catch (err) {
      toast.error(err.response?.data.message);
    }

  }


  const applications = [
    {
      id: 1,
      name: "E-commerce Platform",
      desc: "Online store management system",
      color: "yellow",
      pages: [
        {
          name: "Home Page",
          description: "Main landing page of the website",
          status: "Published",
          modified: "3 days ago"
        },
        {
          name: "Products Page",
          description: "Displays all available products",
          status: "Published",
          modified: "20 mins ago"
        },
        {
          name: "Cart Page",
          description: "Shows selected items before checkout",
          status: "Draft",
          modified: "15 hrs ago"
        },
        {
          name: "Product Summary",
          description: "Detailed overview of selected product",
          status: "Published",
          modified: "2 days ago"
        }
      ]
    },
    {
      id: 2,
      name: "Travel Tourism Management",
      desc: "Explore World, Enjoy life",
      color: "blue",
      pages: []
    },
    {
      id: 3,
      name: "Periodic Table",
      desc: "Can become a geek of chemistry",
      color: "green",
      pages: []
    }
  ];
  // ================= DASHBOARD VIEW =================
  if (!selectedApp) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-inner">

          <div className="top-bar">
            <div>
              <h1>My Workspace</h1>
              <p className="sub-text">
                Organize your projects into folders
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

            {applications.map((app, index) => (
              <FolderCard
                key={app.id}
                app={app}
                index={index}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                setSelectedApp={setSelectedApp}
                menuRef={menuRef}
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

          {selectedApp.pages.map((page, index) => (
            <div key={index} className="page-card">
              <div className="page-top">
                {/* HEADER */}
                <div className="page-header">
                  <div className="folder-icon folder-color">
                    <FileText size={26} />
                  </div>
                  <br />
                  <div className="page-header-right">
                    <span
                      className={`status ${page.status === "Published"
                        ? "published"
                        : "draft"
                        }`}>
                      {page.status}
                    </span>
                    <div className="menu-wrapper" ref={menuRef}>
                      <MoreVertical
                        size={20}
                        className="three-dots"
                        onClick={() =>
                          setActiveMenu(activeMenu === index ? null : index)
                        } />
                      {activeMenu === index && (
                        <div className="dropdown-menu">
                          <div className="menu-item">
                            <Pencil size={16} />
                            Edit Page
                          </div>
                          <div className="menu-item">
                            <Copy size={16} />
                            Duplicate
                          </div>
                          <div className="menu-item">
                            <Edit3 size={16} />
                            Rename
                          </div>
                          <div className="menu-item">
                            <Eye size={16} />
                            Preview
                          </div>
                          <div className="menu-divider" />
                          <div className="menu-item delete">
                            <Trash2 size={16} />
                            Delete
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
                <div className="last-modified">
                  <Clock size={14} />
                  <span>
                    {page.modified}
                  </span>
                </div>
                <div
                  className="open-page"
                  onClick={() => navigate("/workspace")}>
                  <ArrowRight size={24} />
                </div>
              </div>
            </div>
          ))}
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