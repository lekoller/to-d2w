import { useState, createContext } from "react";
import { UpdateItemDTO } from "../interfaces";

const emptyItem: UpdateItemDTO = {
  id: 0,
  title: "",
  description: "",
};

export const EditItemContext: React.Context<UpdateItemDTO> =
  createContext<UpdateItemDTO>(emptyItem);

export const UpdateEditItemContext: React.Context<
  (state: UpdateItemDTO) => void
> = createContext<(state: UpdateItemDTO) => void>(() => {});

function EditItemProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<UpdateItemDTO>(emptyItem);

  const updateEditItem = (state: UpdateItemDTO) => {
    setItem(state);
  };

  return (
    <EditItemContext.Provider value={item}>
      <UpdateEditItemContext.Provider value={updateEditItem}>
        {children}
      </UpdateEditItemContext.Provider>
    </EditItemContext.Provider>
  );
}

export default EditItemProvider;
