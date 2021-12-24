import React, { useState } from 'react';
import useModal from './useModal';

export const useModalWithData = <T>(
  initialMode: boolean = false,
  initialSelected: T | null = null
) => {
  const { modalOpen, setModalOpen } = useModal(initialMode);

  const [selected, setSelected] = useState(initialSelected);

  const setModalState = (state: boolean) => {
    setModalOpen(state);
    if (state === false) {
      setSelected(null);
    }
  };

  return { modalOpen, setModalOpen, selected, setSelected, setModalState };
};
