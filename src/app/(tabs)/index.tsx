import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../../components/Text';
import { useGlobalContext } from '../../context/GlobalContext';

export default function PantallaInicio() {
  const { usuario } = useGlobalContext();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Comedor IPF</Text>
      <Text style={estilos.subtitulo}>Seleccioná una sección para comenzar</Text>

      <View style={estilos.grid}>
        <Link href="/(tabs)/menu" asChild>
          <Pressable style={estilos.tarjeta}>
            <Text style={estilos.textoTarjeta}>Menú</Text>
          </Pressable>
        </Link>

        <Link href="/buscar" asChild>
          <Pressable style={estilos.tarjeta}>
            <Text style={estilos.textoTarjeta}>Buscar</Text>
          </Pressable>
        </Link>

        <Link href="/ayuda" asChild>
          <Pressable style={estilos.tarjeta}>
            <Text style={estilos.textoTarjeta}>Ayuda</Text>
          </Pressable>
        </Link>

        <Link href={usuario ? '/cocina' : '/login'} asChild>
          <Pressable style={estilos.tarjeta}>
            <Text style={estilos.textoTarjeta}>Cocina</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  grid: {
    width: '100%',
    gap: 25,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 7,
    transform: [{ skewX: '-20deg' }],
  },
  textoTarjeta: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    transform: [{ skewX: '20deg' }],
  },
});