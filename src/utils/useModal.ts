import React, { useState } from "react";

const useModal = (initialMode: boolean = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode)

  const toggle = () => setModalOpen(!modalOpen)

  return { modalOpen, setModalOpen, toggle }
}

export default useModal;