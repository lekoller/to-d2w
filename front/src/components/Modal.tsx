import React from "react";
import { Modal } from "antd";

interface D2WModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  id: number;
  itemDescription?: string;
  itemTitle?: string;
}

const D2WModal: React.FC<D2WModalProps> = ({
  open,
  setOpen,
  title,
  description,
  id,
}: D2WModalProps) => {
  const handleOk = () => {
    console.log(id);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
      >
        <p>{description}</p>
      </Modal>
    </>
  );
};

export default D2WModal;
