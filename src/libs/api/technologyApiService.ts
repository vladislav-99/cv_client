import http from "./index";
import { CreatedTehnologyType, IDeleteTechnologyResponse, ITechnology } from "../../store/technologies/types";

class TechnologyApiService {

  createMany(technologies:CreatedTehnologyType[]) {
    return http.post<ITechnology[]>(
      `/technologies/add-many`,
      {
        technologies
      }
    );
  }

  getAll() {
    return http.get<ITechnology[]>('/technologies')
  }

  delete(id: number) {
    return http.delete<IDeleteTechnologyResponse>(`/technologies/${id}`)
  }

  edit({ id, ...technology }: ITechnology) {
    return http.patch<ITechnology>(`/technologies/${id}`, technology)
  }
}

export default new TechnologyApiService()