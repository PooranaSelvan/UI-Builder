import { X, FolderCode } from "lucide-react";
import "./Dashboard.css";
import Button from "../../components/Button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateForm({ isOpen, onClose, title, nameLabel, descriptionLabel, buttonText, createNewProject, createNewPage }) {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name || !description) {
      toast.error("All Fields are Required!");
      return;
    }

    if (name.length < 3 || name.length > 12) {
      toast.error("Name must be greater than 3 & less than 12 characters!");
      return;
    }
    if (description.length < 10 || description.length > 50) {
      toast.error("Description must be greater than 10 & less than 50 characters!");
      return;
    }

    if (createNewPage) {
      createNewPage(name, description);
    }

    if (createNewProject) {
      createNewProject(name, description);
    }

    setName("");
    setDescription("");
  }

  const formDatas = [
    {
      tag : "label",
      content : nameLabel
    }, 
    {
      tag : "input",
      type : "text",
      placeholder : `Enter ${nameLabel.toLowerCase()}...`,
      value : name,
      defaultProps : {
        onChange : (e) => setName(e.target.value)
      }
    }, 
    {
      tag : "label",
      content : descriptionLabel
    },
    {
      tag : "textarea",
      value : description,
      defaultProps : {
        onChange : (e) => setDescription(e.target.value)
      }
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-header">
          <div className="folder-icon folder-color">
            <FolderCode size={28} />
          </div>
          <h2>{title}</h2>
          <X size={20} className="close-icon" onClick={onClose} />
        </div>
        <div className="div">

        </div>

        <div className="modal-body">
          <form action="" onSubmit={handleCreate}>
            <label>{nameLabel}</label>
            <input type="text" placeholder={`Enter ${nameLabel.toLowerCase()}...`} value={name} onChange={(e) => setName(e.target.value)} />

            <label>{descriptionLabel}</label>
            <textarea placeholder="Brief description..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </form>
        </div>

        <div className="modal-footer">
          <Button className="cancel-btn" onClick={onClose}>
            Cancel
          </Button>
          <Button className="primary-btn" onClick={handleCreate}>
            {buttonText}
          </Button>
        </div>

      </div>
    </div>
  );
}
