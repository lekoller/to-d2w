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