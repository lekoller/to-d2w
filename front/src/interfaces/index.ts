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

export interface AuthDTO {
  name: string;
  password: string;
}

export interface TimelineSetters {
  setOpenEdit: (open: boolean) => void;
  setSelectedId: (id: number) => void;
  setSelectedTitle: (title: string) => void;
  setSelectedDescription: (description: string) => void;
  setOpenMarkDone: (open: boolean) => void;
  setOpenDelete: (open: boolean) => void;
}

export interface ItemFormProps {
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

export interface ItemModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  itemDescription?: string;
  itemTitle?: string;
  itemId?: number;
  commit?: () => void;
  editionMode?: boolean;
}

export interface EntranceFormProps {
  instance: FormInstance;
  onSubmit: (values: AuthDTO) => void;
  loginMode: boolean;
  setLoginMode: (state: boolean) => void;
}

export interface LoginResponse {
  token: string;
}