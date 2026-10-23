import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
      >
        <Stack.Screen name="index" options={{ title: "Sleep Tracker"}}/>
        <Stack.Screen name="sleep-entry" options={{ title: "Sleep Log"}}/>
        <Stack.Screen name="sleep-list" options={{ title: "Sleep Log History"}}/>
        <Stack.Screen name="sleep-statistics" options={{ title: "Sleep Statistics"}}/>
      </Stack>
  );
}