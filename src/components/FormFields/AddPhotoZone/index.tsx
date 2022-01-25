import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import { useUploadForm } from "../../../utils/useFetch/useUploadImage";

const AddPhoto = styled('label')({
  cursor: 'pointer',
  height: '100%',
  width: '100%',
  backgroundColor: '#FBFBFB',
  border: '2px dashed #9EA9BA',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#535E6C',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#ECF2FC'
  },
  '&:active': {
    backgroundColor: '#DAE8FF'
  }
})

export type ImageUploadingProgress = {
  name: string,
  progress: number
}

export type ImageUploadedType = {
  url: string,
  name: string,
  size: number
}

interface AddPhotoZoneProps {
  onUpload: (image: ImageUploadedType) => void,
  handleUploading: (value: ImageUploadingProgress) => void
}

const AddPhotoZone: React.FC<AddPhotoZoneProps> = ({
  onUpload,
  handleUploading
}) => {
  const [photo, setPhoto] = useState<File | null>(null)

  const {
    uploadForm,
    progress
  } = useUploadForm()


  useEffect(() => {
    if (photo) {
      const formData = new FormData();
      formData.append('image', photo);

      uploadForm(formData).then((res) => {
        if (res.status === 200) {
          onUpload && onUpload({
            name: photo.name,
            size: photo.size,
            url: res.data.img_url as string
          })
        }

      }).then(() => {
        setPhoto(null)
      });
    }
  }, [photo])

  useEffect(() => {
    if (progress && photo) {
      handleUploading({
        name: photo.name,
        progress
      })
    }
  }, [progress, photo])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event.target.files ? event.target.files[0] : null)
    event.currentTarget.value = ''
  };


  return <>
    <AddPhoto >
      "Add a photo"
      <input
        onChange={handleImageChange}
        accept=".jpg, .jpeg, .png"
        type="file"
        hidden
      />
    </AddPhoto>
  </>
}

export default AddPhotoZone