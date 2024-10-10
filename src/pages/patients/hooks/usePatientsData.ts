import { useEffect, useState } from "react";
import { PatientController } from "../../../networking/controllers/patient-controller";
import { Patient } from "../../../networking/types/patient";

const usePatientsData = (
  searchTerm: string
): [
  patients: Patient[],
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>,
  loading: boolean,
  error: boolean
] => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const patients = await PatientController.getPatients();
      setPatients(patients);
      setFilteredPatients(patients);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPatients(filteredPatients);
  }, [searchTerm]);

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  return [filteredPatients ?? patients, setPatients, loading, error];
};

export { usePatientsData };
