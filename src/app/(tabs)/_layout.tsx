import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalContext';

export default function TabsLayout() {
  const { carrito } = useGlobalContext();

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: { backgroundColor: '#000000' },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="carrito/index"
        options={{
          title: 'Carrito',
          tabBarBadge: carrito.length > 0 ? carrito.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}