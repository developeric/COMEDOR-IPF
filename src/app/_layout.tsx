import { Stack } from 'expo-router';
import { GlobalProvider, useGlobalContext } from '../context/GlobalContext';
import { Text, TextInput } from 'react-native';

// @ts-ignore
if (Text.defaultProps == null) Text.defaultProps = {};
// @ts-ignore
Text.defaultProps.style = { fontFamily: 'Comic Sans MS' };
// @ts-ignore
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
// @ts-ignore
TextInput.defaultProps.style = { fontFamily: 'Comic Sans MS' };
function NavegacionRaiz() {
  const { usuario } = useGlobalContext();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen
        name="confirmar"
        options={{ presentation: 'modal', title: 'Confirmar pedido' }}
      />
      <Stack.Screen
        name="turno/[numero]"
        options={{ title: 'Tu turno', headerBackVisible: false, gestureEnabled: false }}
      />
      <Stack.Screen name="ayuda" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Ingreso' }} />
      <Stack.Screen name="+not-found" options={{ title: 'No encontrado' }} />

      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <GlobalProvider>
      <NavegacionRaiz />
    </GlobalProvider>
  );
}