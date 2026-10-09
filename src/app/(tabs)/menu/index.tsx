import { Text } from '../../../components/Text';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { platos } from '../../../data/platos';

export default function ListaMenu() {
  return (
    <View style={estilos.contenedor}>
      <FlatList
        data={platos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/(tabs)/menu/${item.id}`} asChild>
            <Pressable style={estilos.tarjeta}>
              <View style={estilos.infoCentro}>
                <Text style={estilos.nombre}>{item.nombre}</Text>
                <Text style={estilos.categoria}>{item.categoria.toUpperCase()}</Text>
              </View>
              <Text style={estilos.precio}>${item.precio}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoria: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  infoCentro: {
    alignItems: 'center',
    paddingRight: 80,
  },
  precio: {
    position: 'absolute',
    right: 16,
    fontSize: 19,
    fontWeight: '600',
    color: '#22c55e',
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
});