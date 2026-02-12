import { X ,FolderCode } from "lucide-react";
import "./Dashboard.css";

export default function CreateForm({
  isOpen,
  onClose,
  title,
  nameLabel,
  descriptionLabel,
  buttonText
}) {
  if (!isOpen) return null;

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
          <label>{nameLabel}</label>
          <input
            type="text"
            placeholder={`Enter ${nameLabel.toLowerCase()}...`}
          />

          <label>{descriptionLabel}</label>
          <textarea placeholder="Brief description..." />
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn">
            {buttonText}
          </button>
        </div>

      </div>
    </div>
  );
}
