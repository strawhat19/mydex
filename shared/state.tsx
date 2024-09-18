import { createContext, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

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
      <GestureHandlerRootView>
        <PanGestureHandler>
          {children}
        </PanGestureHandler>
      </GestureHandlerRootView>
    </state.Provider>
  )
}