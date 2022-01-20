
import { useState } from "react";
import axios from "axios";

export const useUploadForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData) => {
    setIsLoading(true);
    return await axios.post(process.env.REACT_APP_CV_API + '/image/', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
        console.log(progress);
        setProgress(progress);
      },
    }).then(res => {
      setIsLoading(false)
      setIsSuccess(true)
      setProgress(0);
      return res
    });
  };

  return { uploadForm, isSuccess, isLoading, progress };
};