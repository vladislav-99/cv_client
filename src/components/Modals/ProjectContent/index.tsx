import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputField from '../../FormFields/InputField';
import Button from '../../Button';
import SelectField from '../../FormFields/SelectField';
import { getOptionsFromEnum } from '../../FormFields/SelectField/helpers';
import { CreateProjectType, ImageUploadedType, ProjectTypes } from '../../../store/projects/types';
import MultipleAutocompleteField from '../../FormFields/MultipleAutocompleteField';
import { RootState } from '../../../store';
import { fetchTechnologies } from '../../../store/technologies/actions';
import AddPhotoZone, { ImageUploadingProgress } from '../../FormFields/AddPhotoZone';
import PhotoCard from '../../FormFields/PhotoCard';
import projectImageApiService from '../../../libs/api/projectImageApiService';


export type CreatingProjectType = Omit<CreateProjectType, 'type'> & {
  type: string,
}

const initialProjectState: CreatingProjectType = {
  name: '',
  type: '',
  country: '',
  link: '',
  technologies: [],
  description: '',
  photos: []
};

interface ProjectContentProps {
  onAdd?: (project: CreatingProjectType) => void,
  isEdit?: boolean,
  initialProject?: CreatingProjectType,
  initialPhotos?: ImageUploadedType[],
}

const px = '3px';
const ProjectContent: React.FC<ProjectContentProps> = (
  {
    onAdd,
    isEdit = false,
    initialProject = initialProjectState,
    initialPhotos
  }
  ) => {
    const [project, setProject] = useState<CreatingProjectType>(initialProject);
    const [isSaved, setIsSaved] = useState(false);
    const [uploadingImage, setUploadingImage] = useState<ImageUploadingProgress>({
      name: '',
      progress: 0
    });

    const [photos, setPhotos] = useState<ImageUploadedType[]>([]);
    const [photosCanDeleteAfterCancelEditing, setPhotosCanDeleteAfterCancelEditing] = useState<number[]>([]);


    const dispatch = useDispatch();
    const { technologiesIds, technologies } = useSelector(({ technologiesState }: RootState) => technologiesState);

    useEffect(() => {
      if (!technologiesIds.length)
        dispatch(fetchTechnologies.started());
    }, []);

    useEffect(() => {
      const imageIds = photos.map(({ id }) => id);
      setProject(prevProject => ({
        ...prevProject,
        photos: imageIds
      }));
    }, [photos]);

    useEffect(() => {
      if (initialPhotos)
        setPhotos(initialPhotos);
    }, [initialPhotos]);

    useUnmount(async () => {
      const imageIds = photos.map(({ id }) => id);
      if (photos.length && isEdit && !isSaved) {
        await projectImageApiService.deleteMany(photosCanDeleteAfterCancelEditing)
      }
      if (photos.length && !isSaved && !isEdit) {
        await projectImageApiService.deleteMany(imageIds);
      }
    });


    const handleChangeStringField = (
      fieldName: keyof Omit<CreatingProjectType,
        'technologies' | 'photos'>) => (value: string) => {
      setProject((projectState) => {
        const copyProject = { ...projectState };
        copyProject[fieldName] = value;
        return copyProject;
      });
    };

    const handleChangeTechnologies =
      (value: number[]) => {
        setProject((projectState) => {
          const copyProject = { ...projectState };
          copyProject.technologies = value;
          return copyProject;
        });
      };

    const handleChangePhotos =
      (value: ImageUploadedType) => {

        setPhotos((prevPhotos) => {
          return [value, ...prevPhotos];
        });

        setPhotosCanDeleteAfterCancelEditing(prev => [value.id, ...prev]);

        setUploadingImage({
          name: '',
          progress: 0
        });

      };

    const isHasEmptyField = useMemo(
      () => {
        const {
          name,
          type
        } = project;
        return !name.trim() || !type;


      },
      [project]
    );

    const handleSaveProject = () => {
      // dispatch(fetchCreateProject.started(project as CreateProjectType))
      onAdd && onAdd(project);
      setProject(initialProjectState);
      setIsSaved(true);
    };

    const projectOptions = useMemo(() => getOptionsFromEnum(ProjectTypes), []);

    const handleSelectProjectType = (selected?: {
      value: string;
      label: string;
    }) => {
      handleChangeStringField('type')(selected ? selected.value : project.type);
    };

    const handleSelectTechnologies = (selected: {
      value: string;
      label: string;
    }[]) => {
      const selectedIds = selected.map(({ value }) => Number(value));
      handleChangeTechnologies(selectedIds);
    };

    const technologiesOptions = useMemo(() => {
      return technologiesIds.map(id => ({
        value: String(id),
        label: technologies[id].name
      }));
    }, [technologiesIds]);

    const initialTechnologiesOptions = useMemo(() => {

      if (technologiesIds.length)
        return initialProject.technologies.map(id => ({
          value: String(id),
          label: technologies[id].name
        }));

      return [];
    }, [technologiesIds, initialProject.technologies, technologies]);

    const handleUploadingImage = useCallback((uploading: ImageUploadingProgress) => {
      setUploadingImage(uploading);
    }, []);

    const handleCloseCard = (id: number) => {
      if (id !== -1) {
        let index: number | null = null;
        let photo: ImageUploadedType | null = null;

        const returnDeletedPhotoIntoState = () => {
          setPhotos(prevPhotos => {
            const copiedPhoto = [...prevPhotos];
            if (index !== null && !!photo) {
              copiedPhoto.splice(index, 0, photo);
            }
            return copiedPhoto;
          });
        }
        // update view
        setPhotos((prevPhotos) => {
          index = prevPhotos.findIndex((photo) => photo.id === id);
          const copiedPhoto = [...prevPhotos];
          photo = copiedPhoto.splice(index, 1) as unknown as ImageUploadedType;
          return copiedPhoto;
        });

        if(!isEdit) {
          //when creating project
          projectImageApiService.delete(id).then(res => {
              if (res.status !== 200) {
                returnDeletedPhotoIntoState()
              }
            }
          );
        } else {
          //when need delete new photo in editing project
          if(photosCanDeleteAfterCancelEditing.indexOf(id) !== -1) {
            projectImageApiService.delete(id).then(res => {
                if (res.status !== 200) {
                  returnDeletedPhotoIntoState()
                }
              }
            );
          }
        }
      }
    };

    const handleCloseUploadingCard = () => {
      setUploadingImage({
        name: '',
        progress: 0
      });
    };

    return (
      <>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          px={px}
        >
          <Box
            sx={{
              width: '450px'
            }}
          >
            <InputField
              value={project.name}
              label='Project name'
              placeholder='Project name'
              onChangeHandler={handleChangeStringField('name')}
            />
          </Box>

          <Box
            sx={{
              width: '230px'
            }}
          >
            <SelectField
              label='Type'
              initialValue={project.type}
              options={projectOptions}
              optionLabelKey={'label'}
              optionValueKey={'value'}
              onSelect={handleSelectProjectType}
              placeholder='Technology Type'
            />
          </Box>

        </Stack>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          px={px}
        >
          <Box
            sx={{
              width: '250px'
            }}
          >
            <InputField
              value={project.country || ''}
              label='Country'
              placeholder='Country'
              onChangeHandler={handleChangeStringField('country')}
            />
          </Box>
          <Box
            sx={{
              width: '430px'
            }}
          >
            <InputField
              value={project.link || ''}
              label='Link'
              placeholder='Link'
              onChangeHandler={handleChangeStringField('link')}
            />
          </Box>
        </Stack>
        <Box
          px={px}
        >
          <MultipleAutocompleteField
            label='Technologies'
            options={technologiesOptions}
            onSelect={handleSelectTechnologies}
            initialValue={initialTechnologiesOptions}
            placeholder='Select technologies'
          />
        </Box>
        <Box
          px={px}
        >
          <InputField
            multiline
            value={project.description || ''}
            label='Description'
            placeholder='Description'
            onChangeHandler={handleChangeStringField('description')}
          />
        </Box>
        <Box
          px={px}
          my={1}
          sx={{
            height: '60px'
          }}
        >
          <AddPhotoZone
            onUpload={handleChangePhotos}
            handleUploading={handleUploadingImage}
          />
        </Box>
        <Grid
          my={2}
          container
          rowGap={1}
          columnGap={2.5}
          columns={2}
        >
          {
            uploadingImage.name && <PhotoCard
              image={{
                name: uploadingImage.name,
                progress: uploadingImage.progress
              }}
              onClose={handleCloseUploadingCard}
            />
          }
          {
            photos.map((image, index) => {
              return <PhotoCard
                onClose={handleCloseCard}
                image={image}
                key={index} />;
            })
          }
        </Grid>
        <Box
          px={px}
        >
          <Button
            title='Save Project'
            disabled={isHasEmptyField}
            cb={handleSaveProject}
          />
        </Box>
      </>
    );
  }
;

export default ProjectContent;
