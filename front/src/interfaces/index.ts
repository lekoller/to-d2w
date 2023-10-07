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