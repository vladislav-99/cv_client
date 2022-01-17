import { useEffect, useState } from 'react';

const useModalTrigger = <T>(
  {
    trigger = false,
    onAllow = () => { },
    onCancel = () => { },
    onToggleModal = () => { },
  }: {
    trigger: boolean,
    onAllow?: (value?: T) => void
    onCancel?: () => void
    onToggleModal?: () => void
  }

) => {
  const [deleteAllow, setDeleteAllow] = useState(false)
  const [allowProps, setAllowProps] = useState<T>()

  useEffect(() => {
    if (trigger) {
      onToggleModal()
    }
  }, [trigger])


  useEffect(() => {
    if (trigger && deleteAllow) {
      onAllow(allowProps)
      setDeleteAllow(false)
    }
  }, [trigger, allowProps, deleteAllow])

  const handleAllow = (props?: T) => {
    setAllowProps(props)
    onToggleModal()
    setDeleteAllow(true)
  }

  const handleCancel = () => {
    onCancel()
    onToggleModal()
    setDeleteAllow(false)
  }

  return {
    handleAllow,
    handleCancel
  }
};

export default useModalTrigger;
