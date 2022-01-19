import React from "react"
import { useDispatch } from "react-redux"
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid"
import DeleteIcon from "../../../../icons/DeleteIcon"
import { deleteProjectAllow } from "../../../../store/projects/actions"


const DeleteProject: React.FC<{ params: GridRowParams }> = ({ params }) => {
  const dispatch = useDispatch()
  const handleOnClick = () => {
    dispatch(deleteProjectAllow({ id: Number(params.id) }))
  }

  return <GridActionsCellItem
    icon={<DeleteIcon />}
    sx={{
      borderRadius: 5,
      backgroundColor: '#F1F3F5'
    }}
    onClick={handleOnClick}
    label="Delete"
  />
}

export default DeleteProject