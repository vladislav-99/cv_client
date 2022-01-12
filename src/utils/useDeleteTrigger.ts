import { useEffect, useState } from 'react';

const useModalTrigger = (
  {
    trigger = false,
    onAllow = () => { },
    onCancel = () => { },
    onToggleModal = () => { },
  }: {
    trigger: boolean,
    onAllow?: () => void
    onCancel?: () => void
    onToggleModal?: () => void
  }

) => {
  const [deleteAllow, setDeleteAllow] = useState(false)

  useEffect(() => {
    if (trigger) {
      onToggleModal()
    }
  }, [trigger])


  useEffect(() => {
    if (trigger && deleteAllow) {
      onAllow()
      setDeleteAllow(false)
    }
  }, [trigger, deleteAllow])

  const handleDeleteAllow = () => {
    onToggleModal()
    setDeleteAllow(true)
  }

  const handleDeleteCancel = () => {
    onCancel()
    onToggleModal()
    setDeleteAllow(false)
  }

  return {
    handleDeleteAllow,
    handleDeleteCancel
  }
};

export default useModalTrigger;
