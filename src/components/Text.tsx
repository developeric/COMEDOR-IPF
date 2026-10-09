import { Text as RNText, TextProps, StyleSheet } from 'react-native';

export function Text(props: TextProps) {
  return <RNText {...props} style={[estilos.texto, props.style]} />;
}

const estilos = StyleSheet.create({
  texto: {
    fontFamily: 'Comic Sans MS',
  },
});
