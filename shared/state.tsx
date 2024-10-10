import 'react-native-gesture-handler';

import { log } from './shared';
import { View } from '@/components/Themed';
import { VertImageCard } from '@/common/types';
import { createContext, useEffect, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

export const state = createContext({});

export default function State({ children }: { children: React.ReactNode; }) {

  let [user, setUser] = useState(null);
  let [beta, setBeta] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);

  // Bottom Sheet
  let [indx, setIndx] = useState(0);
  let [blur, setBlur] = useState<any>(100);
  let [selected, setSelected] = useState<VertImageCard | null>(null);

  return (
    <state.Provider 
      value={{ // Globally Shared State Data
        user, setUser, 
        beta, setBeta, 
        modalOpen, setModalOpen,
        indx, setIndx,
        blur, setBlur,
        selected, setSelected,
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