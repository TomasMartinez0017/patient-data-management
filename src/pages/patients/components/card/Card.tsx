import { useState } from "react";
import { Patient } from "../../../../networking/types/patient";
import { getAvatar } from "./helpers";
import "./styles.css";

interface CardProps {
  patient: Patient;
  openModal: (patient: Patient) => void;
}

const Card: React.FC<CardProps> = ({ patient, openModal }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    patientName: string
  ) => {
    event.currentTarget.src = getAvatar(patientName, "213547", "fff");
  };

  return (
    <div className={`container ${collapsed ? "collapsed" : "expanded"}`}>
      <div className="content">
        <img
          className="image"
          src={patient.avatar}
          alt={patient.name}
          onError={(e) => handleImageError(e, patient.name)}
        />
        <strong>{patient.name}</strong>
      </div>
      <div className="buttonsContainer">
        <button onClick={toggleCollapsed}>
          {collapsed ? "View" : "Collapse"}
        </button>
        <button onClick={() => openModal(patient)}>Edit</button>
      </div>
      <div className={`expanded-content ${collapsed ? "hidden" : ""}`}>
        <div className="info">
          <span>
            <strong>Description:</strong> {patient.description || "N/A"}
          </span>
          <span>
            <strong>Website</strong> {patient.website || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export { Card };
