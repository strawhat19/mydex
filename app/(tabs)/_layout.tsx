import { state } from '@/shared/state';
import { Pressable } from 'react-native';
import { Link, Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { appleBlue, Colors } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  let { modalOpen } = useContext<any>(state);
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: `white`,
        tabBarActiveTintColor: appleBlue,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          paddingTop: 5,
          minHeight: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontWeight: 400
        }
      }}>
      <Tabs.Screen
        name={`index`}
        options={{
          title: `MyDex`,
          tabBarIcon: ({ color }) => <FontAwesome name={`home`} color={color} size={18} />,
          headerRight: () => (
            <Link href={`/modal`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    size={18}
                    name={modalOpen ? `times` : `bars`}
                    color={Colors[colorScheme ?? `dark`].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name={`trainerid`}
        options={{
          title: `Trainer ID`,
          tabBarIcon: ({ color }) => <FontAwesome name={`id-card`} color={color} size={15} />,
        }}
      />
      <Tabs.Screen
        name={`settings`}
        options={{
          title: `Settings`,
          tabBarIcon: ({ color }) => <FontAwesome name={`cog`} color={color} size={18} />,
        }}
      />
    </Tabs>
  );
}
