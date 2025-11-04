
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      route: '/(tabs)/(home)',
      label: 'Home',
      icon: 'house.fill',
    },
    {
      route: '/(tabs)/equipment',
      label: 'Equipment',
      icon: 'wrench.and.screwdriver',
    },
    {
      route: '/(tabs)/documents',
      label: 'Documents',
      icon: 'doc.text',
    },
    {
      route: '/(tabs)/profile',
      label: 'Profile',
      icon: 'person.fill',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(home)" />
          <Stack.Screen name="equipment" />
          <Stack.Screen name="documents" />
          <Stack.Screen name="profile" />
        </Stack>
        <FloatingTabBar tabs={tabs} />
      </>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="equipment" />
        <Stack.Screen name="documents" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
