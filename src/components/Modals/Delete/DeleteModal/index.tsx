import React from 'react';
import CustomModal from '../../../CustomModal';
import useModal from '../../../../utils/useModal';
import useModalTrigger from '../../../../utils/useModalTrigger';
import DeleteContent from '../DeleteContent';

interface DeleteModalProps {
  handleAllowCb: () => void,
  handleCancelCb: () => void,
  trigger: boolean,
  title: string,
  contentLabel: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  contentLabel,
  handleAllowCb,
  handleCancelCb,
  trigger,
  title,
}) => {
  const { modalOpen: deleteModalOpen, toggle: toggleDeleteModal } = useModal();
  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: trigger,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggleDeleteModal
  })

  return (
    <CustomModal
      title={title}
      isActive={deleteModalOpen}
      handleClose={handleCancel}
      style={{
        maxWidth: '500px',
        pl: '30px',
        pb: '40px'
      }}
    >
      <DeleteContent
        label={contentLabel}
        onDelete={handleAllow}
      />
    </CustomModal>
  );
};

export default DeleteModal;

