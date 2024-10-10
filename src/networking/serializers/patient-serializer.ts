import { Patient, RawPatient } from "../types/patient";

class PatientSerializer {
  static deserialize(rawPatient: RawPatient): Patient {
    return {
      name: rawPatient.name,
      avatar: rawPatient.avatar,
      description: rawPatient.description,
      website: rawPatient.website,
      id: rawPatient.id,
    };
  }
}

export { PatientSerializer };
