import http from "./index";
import { ImageUploadedType } from '../../store/projects/types';

export interface IProgressEvent {
  loaded: number,
  total: number
}

type OnUploadProgressType = (progressEvent: IProgressEvent) => void;
type OnDownloadProgressType = (progressEvent: IProgressEvent) => void;

class ProjectImageApiService {
  getUrl = (endpoint: string | number | undefined = '') => '/project-images/' + endpoint
  create(
    image: File,
    onUploadProgress: OnUploadProgressType,
    onDownloadProgress: OnDownloadProgressType
  ) {
    const formData = new FormData();
    formData.append('image', image);

    return http.post<ImageUploadedType>(
      this.getUrl(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress,
        onDownloadProgress
      }
    );
  }

  delete(id: number) {
    return http.delete(this.getUrl(id))
  }

  deleteMany(ids: number[]) {
    return http.delete(this.getUrl(), {
      data: { images: ids }
    })
  }


}

export default new ProjectImageApiService()