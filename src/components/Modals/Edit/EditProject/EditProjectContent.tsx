import React, { useMemo} from 'react';

import ProjectContent, { CreatingProjectType } from '../../ProjectContent';
import { IProject } from '../../../../store/projects/types';

interface EditProjectProps {
  onAdd: (project: CreatingProjectType) => void,
  project?: IProject
}

const EditProjectContent: React.FC<EditProjectProps> = ({
                                                        onAdd,
                                                        project
                                                      }) => {
  const editingProject: CreatingProjectType = useMemo(() => {
    const initialProject: CreatingProjectType = {
      name: '',
      type: '',
      country: '',
      link: '',
      technologies: [],
      description: '',
      photos: []
    };
    if (project) {
      const { technologies, photos, ...projectWithoutFields } = project;
      return {
        ...initialProject,
        ...projectWithoutFields,
        technologies: technologies.map(({ id }) => id)
      };
    }
    return initialProject;

  }, [project]);
  return (
    <ProjectContent
      isEdit
      onAdd={onAdd}
      initialProject={editingProject}
      initialPhotos={project ? project.photos: undefined}
    />
  );
};

export default EditProjectContent;
