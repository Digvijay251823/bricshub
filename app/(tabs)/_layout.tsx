import { Tabs } from "expo-router";
import React from "react";

import { AuditTabIcon, TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="audit"
        options={{
          title: "audit",
          tabBarIcon: ({ color, focused }) => (
            <AuditTabIcon
              name={focused ? "pluscircle" : "pluscircleo"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
