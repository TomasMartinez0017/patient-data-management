import { useState } from "react";
import { usePatientsData } from "./hooks/usePatientsData";
import { Card } from "./components/card";
import { Spinner } from "../../components/spinner";
import { Modal } from "../../components/modal";
import { Patient } from "../../networking/types/patient";
import { useDebounce, useMediaQuery } from "../../shared/hooks";
import "./styles.css";

const Loading = () => <Spinner size={20} />;
const Error = () => <strong>Something went wrong</strong>;

const Patients: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    id: "",
    name: "",
    lastName: "",
    description: "",
    website: "",
    profilePicture: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const isSmallDevice = useMediaQuery("(max-width: 768px)");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [patients, setPatients, loading, error] =
    usePatientsData(debouncedSearchTerm);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const cleanPersonalInfo = () => {
    setPersonalInfo({
      id: "",
      name: "",
      lastName: "",
      description: "",
      website: "",
      profilePicture: "",
    });
  };

  const isButtonDisabled = () => {
    return !personalInfo.name || !personalInfo.lastName;
  };

  const openEditModal = (patient: Patient) => {
    setPersonalInfo({
      id: patient.id,
      name: patient.name.split(" ")[0],
      lastName: patient.name.split(" ")[1],
      description: patient.description,
      website: patient.website,
      profilePicture: patient.avatar,
    });
    setIsModalOpen(true);
    setEditingPatient(true);
  };

  const addPatient = () => {
    setPatients((prevPatients) => [
      {
        id: (prevPatients.length + 1).toString(),
        name: `${personalInfo.name} ${personalInfo.lastName}`,
        description: personalInfo.description,
        website: personalInfo.website,
        avatar: "",
      },
      ...prevPatients,
    ]);
    cleanPersonalInfo();
    setIsModalOpen(false);
  };

  const editPatient = () => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) => {
        if (patient.id === personalInfo.id) {
          return {
            ...patient,
            name: `${personalInfo.name} ${personalInfo.lastName}`,
            description: personalInfo.description,
            website: personalInfo.website,
          };
        }
        return patient;
      })
    );
    cleanPersonalInfo();
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="heading">Patients</h1>
      <div className="patientsContainer">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <>
            <Modal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                cleanPersonalInfo();
              }}
            >
              <h2>{editingPatient ? "Edit patient" : "Add patient"}</h2>
              <div className="inputsContainer">
                <strong>Personal information</strong>
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  onChange={handleInputChange}
                  name="name"
                  value={personalInfo.name}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Last name"
                  onChange={handleInputChange}
                  name="lastName"
                  value={personalInfo.lastName}
                />
                <textarea
                  className="textarea"
                  placeholder="Description"
                  onChange={handleInputChange}
                  name="description"
                  value={personalInfo.description}
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Website"
                  onChange={handleInputChange}
                  name="website"
                  value={personalInfo.website}
                />
                <div className="buttonModal">
                  <button
                    className="mainButton"
                    disabled={isButtonDisabled()}
                    onClick={editingPatient ? editPatient : addPatient}
                  >
                    {editingPatient ? "Edit patient" : "Add patient"}
                  </button>
                </div>
              </div>
            </Modal>
            <div
              className={
                isSmallDevice ? "actionsContainerSmall" : "actionsContainer"
              }
            >
              <button
                className="mainButton"
                onClick={() => {
                  setIsModalOpen(true);
                  setEditingPatient(false);
                }}
              >
                Add patient
              </button>
              <input
                type="text"
                placeholder="Search patient"
                className={isSmallDevice ? "searchInputSmall" : "searchInput"}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading || error}
                value={searchTerm}
              />
            </div>
            <div className="cardsContainer">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  patient={patient}
                  openModal={openEditModal}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { Patients };
