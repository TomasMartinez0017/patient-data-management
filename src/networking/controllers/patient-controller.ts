import { Patient, RawPatient } from "../types/patient";
import { apiService } from "../api-service";
import { PatientSerializer } from "../serializers/patient-serializer";

class PatientController {
  static async getPatients(): Promise<Patient[]> {
    const response = await apiService.get<RawPatient[]>(
      // For simplicity I'm hardcoding the URL here, but in a real-world app this would be a environment variable
      "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users"
    );
    return response.data.map(PatientSerializer.deserialize);
  }
}

export { PatientController };
