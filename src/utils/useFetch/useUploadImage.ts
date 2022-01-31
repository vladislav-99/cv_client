
import { useState } from "react";
import { AxiosResponse } from 'axios';
import { ImageUploadedType } from '../../store/projects/types';
import projectImageApiService from '../../libs/api/projectImageApiService';

export const useUploadForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadProjectImage = async (image: File) => {
    setIsLoading(true);
    return  await projectImageApiService.create(
      image,
      (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 50;
      setProgress(progress);
      },
      (progressEvent) => {
      const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
      setProgress(progress);
    }
     ).then((res: AxiosResponse<ImageUploadedType>) => {
      setIsLoading(false)
      setIsSuccess(true)
      setProgress(0);
      return res
    });
  };

  return { uploadProjectImage, isSuccess, isLoading, progress };
};