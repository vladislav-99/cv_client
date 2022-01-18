import http from "./index";
import { IDeleteProjectResponse, IProject, CreateProjectType } from "../../store/projects/types";

class ProjectApiService {

  create(project: CreateProjectType) {
    return http.post<IProject>(
      `/projects`,
      project
    );
  }

  getAll() {
    return http.get<IProject[]>('/projects')
  }

  getById(id: number) {
    return http.get<IProject>(`/projects/${id}`)
  }

  delete(id: number) {
    return http.delete<IDeleteProjectResponse>(`/projects/${id}`)
  }

  edit({id, ...project}: IProject) {
    return http.patch<IProject>(`/projects/${id}`, project)
  }
}

export default new ProjectApiService()