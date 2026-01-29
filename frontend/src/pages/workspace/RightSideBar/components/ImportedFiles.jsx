import {
  Folder,
  FileText,
  Eye,
  Pencil,
  Trash2,
  RefreshCcw
} from "lucide-react";
import "./ImportedFile.css";

const files = [
  {
    id: 1,
    name: "sales_data_2024.csv",
    size: "1.2 MB",
    meta: "2,450 rows",
    type: "csv",
    status: "done"
  },
  {
    id: 2,
    name: "user_analytics.json",
    size: "856 KB",
    meta: "1,024 records",
    type: "json",
    status: "done",
    actions: true
  },
  {
    id: 3,
    name: "inventory_report.xlsx",
    status: "uploading",
    progress: 65,
    type: "xlsx"
  }
];

export default function ImportedFiles() {
  return (
    <div className="imported-files">
      <div className="imported-header">
        <div className="title">
          <Folder size={16} color="red"/>
          <span>Imported Files</span>
          <span className="count">{files.length}</span>
        </div>
      </div>

      {files.map((file) => (
        <FileRow key={file.id} file={file} />
      ))}
    </div>
  );
}

function FileRow({ file }) {
  const iconMap = {
    csv: "green",
    json: "orange",
    xlsx: "blue"
  };

  return (
    <div className={`file-card ${file.status === "uploading" ? "uploading" : ""}`}>
      <div className={`file-icon ${iconMap[file.type]}`}>
        {file.status === "uploading" ? (
          <RefreshCcw size={16} />
        ) : (
          <FileText size={16} />
        )}
      </div>

      <div className="file-info">
        <strong>{file.name}</strong>

        {file.status === "done" && (
          <small>
            {file.size} • {file.meta}
          </small>
        )}

        {file.status === "uploading" && (
          <>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${file.progress}%` }}
              />
            </div>
            <small className="upload-text">
              Uploading… {file.progress}%
            </small>
          </>
        )}
      </div>

      {file.actions && (
        <div className="file-actions">
          <Eye size={14} />
          <Pencil size={14} />
          <Trash2 size={14} />
        </div>
      )}

      {file.status === "uploading" && (
        <div className="file-actions">
          <Trash2 size={14} />
        </div>
      )}
    </div>
  );
}