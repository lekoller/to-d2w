import { FormInstance } from "antd";

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CreateItemDTO {
  title: string;
  description: string;
}

export interface UpdateItemDTO {
  id: number;
  title: string;
  description: string;
}

export interface TimelineSetters {
  setOpenEdit: (open: boolean) => void;
  setSelectedId: (id: number) => void;
  setSelectedTitle: (title: string) => void;
  setSelectedDescription: (description: string) => void;
  setOpenMarkDone: (open: boolean) => void;
  setOpenDelete: (open: boolean) => void;
}

export interface FormProps {
  instance: FormInstance;
  onSubmit: (values: CreateItemDTO) => void;
  initialValues?: CreateItemDTO;
  flexDirection?: "row" | "column";
  titleWidth?: string;
  descriptionWidth?: string;
  noSubmitButton?: boolean;
  setTitle?: (title: string) => void;
  setDescription?: (description: string) => void;
}

export interface D2WModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  itemDescription?: string;
  itemTitle?: string;
  itemId?: number;
  commit?: () => void;
}
