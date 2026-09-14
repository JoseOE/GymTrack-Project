import { Stack } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';

export default function RootLayout() {
  return (
    <Stack>
      {/* Grupo de autenticación (Login, Registro) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
      {/* Grupo principal de pestañas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Modal o página de error no encontrada */}
      <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />
    </Stack>
  );
}
