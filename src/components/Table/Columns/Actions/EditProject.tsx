import React from "react"
import { useDispatch } from "react-redux"
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid"
import EditIcon from "../../../../icons/EditIcon"
import { editProject } from "../../../../store/projects/actions"


const EditProject: React.FC<{ params: GridRowParams }> = ({ params }) => {
  const dispatch = useDispatch()
  const handleOnClick = () => {
    dispatch(editProject({ id: Number(params.id) }))
  }

  return <GridActionsCellItem
    icon={<EditIcon />}
    sx={{
      borderRadius: 5,
      backgroundColor: '#F1F3F5'
    }}
    onClick={handleOnClick}
    label="Delete"
  />
}

export default EditProject