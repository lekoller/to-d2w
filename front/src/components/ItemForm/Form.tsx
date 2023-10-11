import { Button, Form, Input, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CreateItemDTO, ItemFormProps } from "../../interfaces";

function ItemForm({
  onSubmit,
  initialValues,
  flexDirection,
  titleWidth,
  descriptionWidth,
  noSubmitButton,
  instance,
  setTitle,
  setDescription,
}: ItemFormProps) {
  
  const onFinish = async (values: CreateItemDTO) => {
    onSubmit(values);
  };

  function handleSetTitle(title: string ) {
    if (setTitle) {
      setTitle(title);
    }
  }

  function handleSetDescription(description: string) {
    if (setDescription) {
      setDescription(description);
    }
  }

  return (
    <Form
      form={instance}
      layout="vertical"
      style={{
        color: "white",
        display: "flex",
        flexDirection: flexDirection ? flexDirection : "row",
        width: "70vw",
        // alignItems: "center",
        // justifyContent: "space-between",
      }}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "self-start",
          width: "60%",
        }}
      >
        <Typography.Text style={{ color: "white" }}>Title</Typography.Text>
        <Form.Item
          name={"title"}
          style={{ marginRight: 10, width: titleWidth ? titleWidth : "20vw" }}
          rules={[{ required: true, message: "At least the task name is required!" }]}
        >
          <Input
            placeholder="Name the task"
            size={"large"}
            onChange={(event) => handleSetTitle(event.target.value)}
          />
        </Form.Item>
      </Space>
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "self-start",
          width: "100%",
        }}
      >
        <Typography.Text style={{ color: "white" }}>
          Description
        </Typography.Text>
        <Form.Item
          name={"description"}
          style={{
            marginRight: 10,
            width: descriptionWidth ? descriptionWidth : "40vw",
          }}
        >
          <Input
            placeholder="Describe the task"
            size={"large"}
            onChange={(event) => handleSetDescription(event.target.value)}
          />
        </Form.Item>
      </Space>

      {!noSubmitButton && (
        <Form.Item>
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"large"}
            style={{ marginInline: 10, marginTop: 26 }}
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default ItemForm;
