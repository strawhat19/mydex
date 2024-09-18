import { createContext, useState } from 'react';

export const state = createContext({});

export default function State({ children }: { children: React.ReactNode; }) {

  let [user, setUser] = useState(null);
  let [beta, setBeta] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);

  return (
    <state.Provider 
        value={{ // Globally Shared State Data
            user, setUser, 
            beta, setBeta, 
            modalOpen, setModalOpen,
        }}
    >
      {children}
    </state.Provider>
  )
}