import http from "./index";
import { CreatedTehnologyType, IDeleteTechnologyResponse, ITechnology } from "../../store/technologies/types";

class TechnologyApiService {

  createMany(technologies:CreatedTehnologyType[]) {
    return http.post<ITechnology[]>(
      `${process.env.REACT_APP_CV_API}/technologies/add-many`,
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

}

export default new TechnologyApiService()