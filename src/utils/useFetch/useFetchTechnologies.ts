import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { fetchTechnologies } from "../../store/technologies/actions"

const useFetchTecnologies = () => {
  const dispatch = useDispatch()

  const {technologiesIds} = useSelector(({technologiesState}: RootState) => technologiesState )

  useEffect(() => {
    if(!technologiesIds.length) dispatch(fetchTechnologies.started())
  }, [])

}

export default useFetchTecnologies