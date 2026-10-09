import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../../../components/Text';
import { useGlobalContext } from '../../../context/GlobalContext';

export default function CarritoPantalla() {
  const { carrito, deshacerUltimo, vaciarCarrito } = useGlobalContext();

  const total = carrito.reduce((acumulado, plato) => acumulado + plato.precio, 0);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Tu Carrito</Text>

      {carrito.length === 0 ? (
        <Text style={estilos.vacio}>El carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={estilos.item}>
                <Text style={estilos.nombrePlato}>{item.nombre}</Text>
                <Text style={estilos.precioPlato}>${item.precio}</Text>
              </View>
            )}
          />

          <View style={estilos.contenedorBotonesAccion}>
            <Pressable style={estilos.botonDeshacer} onPress={deshacerUltimo}>
              <Text style={estilos.textoBotonSecundario}>Deshacer último</Text>
            </Pressable>

            <Pressable style={estilos.botonVaciar} onPress={vaciarCarrito}>
              <Text style={estilos.textoBotonSecundario}>Vaciar carrito</Text>
            </Pressable>
          </View>

          <View style={estilos.footer}>
            <Text style={estilos.totalTexto}>Total: <Text style={estilos.precioPlato}>${total}</Text></Text>
            <Link href="/confirmar" asChild>
              <Pressable style={estilos.botonConfirmar}>
                <Text style={estilos.textoBotonPrincipal}>Confirmar pedido</Text>
              </Pressable>
            </Link>
          </View>
        </>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  vacio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombrePlato: {
    fontSize: 25,
    color: '#333',
  },
  precioPlato: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#17af1fff',
  },
  contenedorBotonesAccion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  botonDeshacer: {
    width: '45%',
    backgroundColor: '#FF9100',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    transform: [{ skewX: '-20deg' }],
  },
  botonVaciar: {
    width: '45%',
    backgroundColor: '#FF1744',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    transform: [{ skewX: '-20deg' }],
  },
  textoBotonSecundario: {
    color: '#ffffff',
    fontWeight: 'bold',
    transform: [{ skewX: '20deg' }],
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#888',
  },
  botonConfirmar: {
    backgroundColor: '#00C853',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    transform: [{ skewX: '-20deg' }],
  },
  textoBotonPrincipal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    transform: [{ skewX: '20deg' }],
  },
});