import http from "./index";
import { IDeleteEducationResponse, IEducation } from "../../store/educations/types";

class EducationApiService {

  createMany(educations: string[]) {
    return http.post<IEducation[]>(
      `/educations/add-many`,
      {
        educations
      }
    );
  }

  getAll() {
    return http.get<IEducation[]>('/educations')
  }

  delete(id: number) {
    return http.delete<IDeleteEducationResponse>(`/educations/${id}`)
  }

  edit({id, ...education}: IEducation) {
    return http.patch<IEducation>(`/educations/${id}`, education)
  }
}

export default new EducationApiService()