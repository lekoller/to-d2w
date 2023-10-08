import { useEffect, useState } from "react";
import { Modal, Form as AntdForm } from "antd";
import { Form } from "./Form";
import { D2WModalProps } from "../interfaces";
import { 
  useUpdateEditItem, 
  useEditItem 
} from "../contexts";

function D2WModal({
  open,
  setOpen,
  title,
  description,
  itemDescription,
  itemTitle,
  itemId,
  commit,
}: D2WModalProps) {
  const updateEditItem = useUpdateEditItem();
  const editItem = useEditItem();

  const [form] = AntdForm.useForm();

  const [editTitle, setEditTitle] = useState(itemTitle);
  const [editDescription, setEditDescription] = useState(itemDescription);
  
  const handleOk = () => {
    if (commit) {
      commit();
    }
    if (itemId) {
      clearAll();
    }
    setOpen(false);
  };

  const handleCancel = () => {
    if (itemId) {
      clearAll();
    }

    setOpen(false);
  };

  const clearAll = () => {
    setEditTitle("");
    setEditDescription("");
    form.setFieldsValue({
      title: "",
      description: "",
    });
    updateEditItem({
      id: 0,
      title: "",
      description: "",
    });
  }

  useEffect(() => {
    if (itemId) {
      form.setFieldsValue({
        title: itemTitle ? itemTitle : "",
        description: itemDescription ? itemDescription : "",
      });
    }
  }, [itemTitle, itemDescription, itemId, form]);

  useEffect(() => {
    if (itemId && (editTitle !== editItem.title || editDescription !== editItem.description)) {
      updateEditItem({
        id: itemId,
        title: editTitle ? editTitle : "",
        description: editDescription ? editDescription : "",
      });
    }
  }, [itemId, editTitle, editDescription, updateEditItem, editItem, form]);

  const setTitle = (title: string) => {
    setEditTitle(title);
  }

  const setDescription = (description: string) => {
    setEditDescription(description);
  }

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
        style={{ width: "70vw" }}
      >
        <p>{description}</p>
        {itemId && (
          <Form
            instance={form}
            onSubmit={() => {}}
            initialValues={{
              title: itemTitle ? itemTitle : "",
              description: itemDescription ? itemDescription : "",
            }}
            flexDirection="column"
            titleWidth="20vw"
            descriptionWidth="20vw"
            noSubmitButton
            setTitle={setTitle}
            setDescription={setDescription}
          />
        )}
      </Modal>
    </>
  );
}

export default D2WModal;
