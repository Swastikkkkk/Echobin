import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="reports" options={{ title: 'Reports' }} />
      <Stack.Screen name="scan" options={{ title: 'Scan' }} />
      <Stack.Screen name="tasks" options={{ title: 'Tasks' }} />
    </Stack>
  );
}
