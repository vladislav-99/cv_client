import http from "./index";
import {
  IDeleteExperienceResponse,
  IExperience
} from "../../store/experiences/types";

class ExperienceApiService {

  createMany(experiences: string[]) {
    return http.post<IExperience[]>(
      `/experiences/add-many`,
      {
        experiences
      }
    );
  }

  getAll() {
    return http.get<IExperience[]>('/experiences')
  }

  delete(id: number) {
    return http.delete<IDeleteExperienceResponse>(`/experiences/${id}`)
  }

  edit({ id, ...experience }: IExperience) {
    return http.patch<IExperience>(`/experiences/${id}`, experience)
  }
}

export default new ExperienceApiService()