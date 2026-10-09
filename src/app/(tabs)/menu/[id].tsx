import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../../../components/Text';
import { useGlobalContext } from '../../../context/GlobalContext';
import { platos } from '../../../data/platos';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { agregarAlCarrito } = useGlobalContext();

  const platoId = parseInt(id, 10);
  const plato = platos.find((p) => p.id === platoId);

  useEffect(() => {
    if (plato) {
      navigation.setOptions({ title: plato.nombre });
    }
  }, [plato, navigation]);

  if (!plato) {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.error}>Lo sentimos, el plato solicitado no existe.</Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.nombre}>{plato.nombre}</Text>
      <Text style={estilos.categoria}>{plato.categoria.toUpperCase()}</Text>
      <Text style={estilos.precio}>${plato.precio}</Text>
      <Text style={estilos.descripcion}>{plato.descripcion}</Text>

      <Pressable
        style={estilos.boton}
        onPress={() => agregarAlCarrito(plato)}
      >
        <Text style={estilos.textoBoton}>Agregar al carrito</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  precio: {
    fontSize: 30,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  descripcion: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 40,
  },
  boton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    transform: [{ skewX: '-20deg' }],
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    transform: [{ skewX: '20deg' }],
  },
});