import { log } from './shared';
import { View } from '@/components/Themed';
import { createContext, useEffect, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

export const state = createContext({});

export default function State({ children }: { children: React.ReactNode; }) {

  let [user, setUser] = useState(null);
  let [beta, setBeta] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);
  let [vertImageCards, setVertImageCards] = useState([]);

  useEffect(() => {
    
  })

  return (
    <state.Provider 
      value={{ // Globally Shared State Data
        user, setUser, 
        beta, setBeta, 
        modalOpen, setModalOpen,
      }}
    >
      <GestureHandlerRootView>
        {/* <PanGestureHandler
          onGestureEvent={(e) => log(`gestureEvent`, e)}
          onHandlerStateChange={(e) => log(`handleGestureStateChange`, e)}
        > */}
          <View style={{ flex: 1, width: `100%` }}>
            {children}
          </View>
        {/* </PanGestureHandler> */}
      </GestureHandlerRootView>
    </state.Provider>
  )
}