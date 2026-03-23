import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Input } from 'antd';
import './NewItemModal.modules.css';

const NewItemModal = ({ isOpen, handleOk, handleCancel = () => {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  const emitData = () => {
    const payload = { name, isSelected };
    handleOk(payload);
    setIsModalOpen(false);
  }

  const cancel = () => {
    setIsModalOpen(false);
    handleCancel();
  }

  return (
    <>
      <Modal
        title="Добавить запись"
        open={isModalOpen}
        onOk={emitData}
        onCancel={cancel}
         okButtonProps={{ 
          disabled: !name
        }}
      >
        <div className="add-item-modal">
          <div className="add-item-modal__name">
            <div className="add-item-modal__label">Название</div>
            <div className="add-item-modal__name-input">
              <Input
                type='text'
                id="search-input"
                onChange={(e) => setName(e.target.value)}>
              </Input>
            </div>
          </div>

          <div className="add-item-modal__is-selected">
            <div className="add-item-modal__label">Выбран?</div>
            <div className="add-item-modal__checkbox">
              <Checkbox onChange={() => setIsSelected(!isSelected)}></Checkbox>
            </div>
          </div>

        </div>
      </Modal>
    </>
  );
};

export default NewItemModal;
