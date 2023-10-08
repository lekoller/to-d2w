import { useState, createContext } from "react";

export const SpinContext: React.Context<boolean> =
  createContext<boolean>(false);

export const UpdateSpinContext: React.Context<(state: boolean) => void> =
  createContext<(state: boolean) => void>(() => {});

function SpinProvider({ children }: { children: React.ReactNode }) {
  const [spinning, setSpinning] = useState<boolean>(false);

  const updateSpin = (state: boolean) => {
    setSpinning(state);
  };

  return (
    <SpinContext.Provider value={spinning}>
      <UpdateSpinContext.Provider value={updateSpin}>
        {children}
      </UpdateSpinContext.Provider>
    </SpinContext.Provider>
  );
}

export default SpinProvider;
