import http from "./index";
import { IDeleteEducationResponse, IEducation } from "../../store/educations/types";

class EducationApiService {

  createMany(educations: string[]) {
    return http.post<IEducation[]>(
      `${process.env.REACT_APP_CV_API}/educations/add-many`,
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

}

export default new EducationApiService()