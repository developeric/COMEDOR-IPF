## **A1. Conceptos:**

***a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?***

- **FIFO** significa **"First In, First Out"**. En español: "El primero que entra, es el primero en salir". Esto corresponde al comportamiento de una **Cola**.
- **LIFO** significa **"Last In, First Out"**. En español: "El último que entra, es el primero en salir". Esto corresponde al comportamiento de una **Pila**.

***b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?***

- **La Cola:** Los elementos ingresan por la parte final (atrás) y van saliendo por el extremo opuesto (el frente). Igual que un tubo donde pones algo por un extremo y sale por el otro.
- **La Pila:** Los elementos entran y salen siempre por exactamente el *mismo* lugar. Ese único acceso se denomina tope (la parte superior).

***c) Ejemplos de la vida real y de aplicaciones móviles***

1. *FIFO (Cola):*
**Vida real:** La fila para pagar en el supermercado o para subir al colectivo; el primero que llegó a la fila es el primero en ser atendido.
**App móvil:** Cuando pones a descargar múltiples canciones, la app crea una cola interna y procesa primero la que se solicitó en primer lugar.

2. *LIFO (Pila):*
**Vida real:** Una pila de platos limpios. Apoyas el último plato arriba de todo, y cuando vas a usar uno, agarras justamente el de arriba, porque no puedes sacar el de abajo sin que se caiga el resto.
**App móvil:** El historial de navegación o botón de "Atrás". Las pantallas se apilan, y al presionar "Atrás", siempre vuelves a la pantalla que visitaste inmediatamente antes.

---

## **A2. Seguimiento de una pila**

- `p.push('Inicio');` -> Colocamos la pantalla 'Inicio'. Pila actual: `['Inicio']`
- `p.push('Productos');` -> Agregamos 'Productos' encima. Pila actual: `['Inicio', 'Productos']`
- `p.push('Detalle 3');` -> Colocamos 'Detalle 3' en el tope. Pila actual: `['Inicio', 'Productos', 'Detalle 3']`
- `p.pop();` -> Retiramos la pantalla de más arriba ('Detalle 3'). Pila actual: `['Inicio', 'Productos']`
- `p.push('Perfil');` -> Ponemos 'Perfil' en el tope. Pila actual: `['Inicio', 'Productos', 'Perfil']`

**Respuestas de la consola:**
- `console.log(p.tope());` -> Muestra el de arriba: `'Perfil'`
- `console.log(p.pop());` -> Saca el de arriba y lo muestra: `'Perfil'`
- `console.log(p.tope());` -> Ahora el tope es: `'Productos'`
- `console.log(p.vacia);` -> Aún quedan 'Inicio' y 'Productos', por lo que imprime: `false`

---

## **A3. Seguimiento de una cola**

- `c.encolar('Ana');` -> Ana llega y se posiciona primera. Cola actual: `['Ana']`
- `c.encolar('Beto');` -> Beto se posiciona detrás de Ana. Cola actual: `['Ana', 'Beto']`
- `c.desencolar();` -> Se atiende a Ana (frente) y Beto pasa a ser primero. Cola actual: `['Beto']`
- `c.encolar('Caro');` -> Caro se posiciona detrás de Beto. Cola actual: `['Beto', 'Caro']`
- `c.encolar('Dani');` -> Dani llega y se ubica al final. Cola actual: `['Beto', 'Caro', 'Dani']`

**Respuestas de la consola:**
- `console.log(c.frente());` -> Muestra al primero en fila: `'Beto'`
- `console.log(c.desencolar());` -> Saca al primero y lo muestra: `'Beto'`. La cola queda: `['Caro', 'Dani']`
- `console.log(c.vacia);` -> Como aún están Caro y Dani, imprime: `false`

---

## **A4. Análisis de la implementación**

***a) El array se declara como #items. ¿Qué significa el # y qué problema evita?***
El símbolo `#` indica que la variable es **estrictamente privada**. Esto impide que código externo manipule los datos libremente (por ejemplo, previniendo que alguien haga `pila.items.push("basura")`). Al ser privada, solo se modifica a través de los métodos permitidos por el creador, asegurando que las reglas del juego se respeten siempre.

***b) Problemas de rendimiento con `array.shift()` y la solución seria***
El problema de `shift()` es que saca al primer elemento y luego debe desplazar a todos los demás un espacio hacia adelante para cubrir el hueco. En listas enormes, esto consume demasiados recursos y paraliza la aplicación.
Las estructuras profesionales lo solucionan usando una variable extra de lectura (ej. `#frenteIndex`). Cuando desencolan, solo avanzan el índice sumándole 1, ignorando el dato anterior sin necesidad de desplazar la lista entera.

---

## **A5. Programación: Una cola eficiente**

```javascript
class ColaEficiente {
    #items = []; // Lista estrictamente privada
    #frenteIndex = 0; // Puntero privado que arranca en 0

    encolar(x) { 
        // Agrega el nuevo dato al final de la lista
        this.#items.push(x); 
    }
    
    desencolar() { 
        if (this.vacia) return undefined; // Frena si no hay nada
        const elemento = this.#items[this.#frenteIndex]; // Lee la posición actual
        this.#frenteIndex++; // Avanza una posición sin borrar
        return elemento; // Entrega el dato
    }

    frente() {
        if (this.vacia) return undefined;
        return this.#items[this.#frenteIndex]; // Solo mira sin retirar
    }

    get vacia() { 
        // Si el puntero alcanzó el límite de elementos, está vacía
        return this.#frenteIndex >= this.#items.length; 
    }

    get tamanio() {
        // Resta la cantidad de elementos ingresados menos los que ya salieron
        return this.#items.length - this.#frenteIndex;
    }
}
```

---

## **A6. Pila y cola dentro de Expo Router**

***a) ¿Qué estructura describe el historial de un Stack? ¿Cuál es visible y qué hace "atrás"?***
- Estructura: Es exactamente una **pila**, como si apoyaras cartas una sobre otra.
- Visible: Solo se ve la pantalla que se encuentra en el **tope**.
- Acción "atrás": Funciona como la operación `pop()`. Toma la pantalla del tope, la descarta y revela la que estaba oculta abajo.

***b) ¿Qué estructura utiliza Expo Router para las acciones de navegación rápidas?***
Usa internamente una **Cola**. Si un usuario clickea muchos botones muy rápidamente, la app "encola" las acciones en orden y las ejecuta una detrás de otra para asegurar que la secuencia sea la correcta.

---

# Parte B · Rutas basadas en archivos

## B1. Del archivo a la URL

- `src/app/(tabs)/index.tsx`: 
  **URL:** `/` (Ruta raíz). 
  **Por qué:** Los paréntesis de `(tabs)` lo vuelven invisible, y el index define el inicio.
- `src/app/acerca.tsx`: 
  **URL:** `/acerca`. 
  **Por qué:** Archivo estándar, adopta su nombre exacto.
- `src/app/(tabs)/perfil.tsx`: 
  **URL:** `/perfil`. 
  **Por qué:** Se ignora el directorio `(tabs)`.
- `src/app/(tabs)/productos/index.tsx`: 
  **URL:** `/productos`. 
  **Por qué:** Es el archivo inicial dentro de la carpeta productos.
- `src/app/(tabs)/productos/[id].tsx`: 
  **URL:** `/productos/1` o similares. 
  **Por qué:** Los corchetes `[]` indican que ahí irá un dato dinámico en la URL.
- `src/app/docs/[...slug].tsx`: 
  **URL:** `/docs/react/hooks` u otros. 
  **Por qué:** Los `...` indican un comodín infinito para atrapar subrutas múltiples.
- `src/app/_layout.tsx`: 
  **URL/FUNCIÓN:** No tiene vista propia. 
  **Por qué:** El `_` indica que actúa como molde organizativo (cabeceras, menús inferiores) para las pantallas de esa carpeta.
- `src/app/+not-found.tsx`: 
  **URL/FUNCIÓN:** Representa los Errores 404. 
  **Por qué:** El `+` designa un archivo con funciones especiales de rescate.
- `src/app/Boton.tsx`: 
  **URL/FUNCIÓN:** Mala práctica. 
  **Por qué:** Expo intentará renderizar una pantalla `/Boton`. Este código debería guardarse fuera, en `src/components/`.

---

## B2. De la URL al archivo

- **URL:** `/categorias/bebidas`
  **Archivo:** `src/app/categorias/[categoria].tsx`. 
  **Por qué:** Empleamos una variable dinámica entre corchetes para capturar variaciones infinitas.
- **URL:** `/buscar?q=mate&categoria=kiosco`
  **Archivo:** `src/app/buscar.tsx`. 
  **Por qué:** Todo aquello posterior al `?` se considera parámetros de búsqueda y no altera la ruta real de archivos.
- **URL:** `/ayuda/pagos/tarjeta` y `/ayuda/horarios`
  **Archivo:** `src/app/ayuda/[...slug].tsx`. 
  **Por qué:** Como varía la profundidad, requerimos el comodín infinito `[...]` para atrapar todo tras la carpeta base.
- **URL:** `/ayuda`
  **Archivo:** `src/app/ayuda/index.tsx`. 
  **Por qué:** Almacenar un index es la forma correcta de definir la portada de ese directorio.

---

## B3. Verdadero o falso

- **a)** En Expo, cada pantalla nueva debe registrarse en tablas de configuración. -> **Falso**. Con crear el archivo ya es automáticamente una ruta.
- **b)** Los archivos layout.tsx son pantallas visitables por el usuario. -> **Falso**. Son marcos, el usuario visualiza las pantallas internas.
- **c)** Las carpetas entre paréntesis `(tabs)` no aparecen en URL. -> **Verdadero**.
- **d)** Para añadir librerías es mejor `npm install`. -> **Falso**. Siempre usa `npx expo install` para vincular versiones totalmente compatibles.
- **e)** "main": "expo-router/entry" suplanta al viejo App.tsx. -> **Verdadero**.
- **f)** /sitemap expone todas las rutas y sirve en depuración. -> **Verdadero**.
- **g)** Si existen el index.tsx y un comodín `[...slug].tsx`, la raíz cargará el index. -> **Verdadero**.
- **h)** expo-router en SDK 57 comparte el número de versión mayor (57). -> **Verdadero**.

---

# Parte C · Navegación: Link, router y la pila

## C1. Resumen de métodos de router

- `router.push(href)`: Coloca una pantalla 100% nueva encima del tope.
- `router.navigate(href)`: Revisa si la pantalla está en el historial para volver a ella, de lo contrario la apila.
- `router.replace(href)`: Saca la pantalla actual de la pila y pone la nueva (ideal para bloquear regresar al Login).
- `router.back()`: Retira la pantalla de arriba (`pop`), volviendo hacia atrás.
- `router.dismissTo(href)`: Se deshace de múltiples pantallas de golpe hasta toparse con la indicada.
- `router.dismissAll()`: Tira todas las pantallas al basurero, dejando solo el fondo de la base.
- `router.canGoBack()`: Confirma (`true`/`false`) si el historial tiene profundidad para retroceder.
- `router.setParams({...})`: Actualiza los datos paramétricos de la pantalla en primer plano sin causar recargas.

---

## C2. Simulación de la pila paso a paso

1. `push("/productos/1")` -> Queda: `[/productos, /productos/1]`
2. `push("/productos/2")` -> Queda: `[..., /1, /productos/2]`
3. `navigate("/productos/5")` -> Queda: `[..., /2, /productos/5]`
4. `push("/perfil")` -> Queda: `[..., /5, /perfil]`
5. `replace("/buscar")` -> Ojo, reemplaza perfil. Queda: `[..., /5, /buscar]`
6. `back()` -> Descarta buscar. Queda: `[..., /2, /productos/5]`
7. `dismissTo("/productos")` -> Barre intermedias. Queda: `[/productos]`
8. `canGoBack()` -> Como queda solo una, devuelve: `false`.

---

## C3. Cuándo usar Link o router

- **a) Usuario presiona un producto:** Usar `<Link>`. Viaje directo sin cálculo interno.
- **b) Tras guardar un formulario:** Usar `router.replace`. Requiere que el servidor procese la petición antes de redirigir.
- **c) Botón Cancelar:** Usar `router.back()`. Solo queremos que desaparezca la capa actual.
- **d) Posterior al Login:** Usar `router.replace('/')`. Previene regresar a la pantalla de la contraseña al retroceder.
- **e) Volver desde muy profundo:** Usar `router.dismissTo('/pedidos')`.

---

## C4. Programando Links

**a)** Link pasándole la ruta mediante un objeto paramétrico:
```javascript
<Link href={{ pathname: "/productos/[id]", params: { id: 8 } }}>
  Ver Producto
</Link>
```

**b)** Link que apile a la fuerza ignorando si la vista existe:
```javascript
<Link href="/perfil" push>
  Ir a mi Perfil
</Link>
```

**c)** Envío asChild a un componente personalizado:
```javascript
<Link href="/carrito" asChild>
  <Pressable><Text>Ir al Carrito</Text></Pressable>
</Link>
```

---

## C5. Analizando Links web vs Móvil

- **En computadoras:** `<Link>` genera una verdadera etiqueta HTML `<a>`. El usuario logra interactuar ("Abrir en pestaña"), ver el destino, y los buscadores optimizan el SEO.
- **En móviles:** Expo convierte al `<Link>` en un botón nativo. Al tocar, sencillamente emite la acción de integrar una carta más a la pila del navegador sin abrir ventanas nuevas.

---

# Parte D · Navegadores Especiales

## D1. Stack, Tabs y Drawer

- **Stack (Pila):** Navegador base que amontona pantallas en eje Z. Fundamental para bucear en listados de artículos.
- **Tabs (Pestañas):** Barra de accesos directos inferiores. Intercambia vistas maestras en paralelo, pero no las apila.
- **Drawer (Lateral):** Menú escondido izquierdo. Similar a los Tabs, salta de sección maestra pero se emplea para ajustes y utilidades de bajo uso.

## D2. Las memorias de los Tabs

En apps como Instagram, cada pestaña retiene su propia pila interna. 
Si navegas por "Productos" y dejas algo a la mitad para ir al "Inicio", al retornar a "Productos" el sistema reactivará exactamente el punto del historial en que quedaste, pues no destruyó la pila, solo la minimizó.

## D3. Colocación de Pantallas

1. **Detalle con barra inferior fija:** Dentro de la Tab correspondiente (en su stack interior).
2. **Modal confirmar ocultando menú:** En el Stack principal (raíz), logrando que cubra el ancho de la aplicación entera.
3. **Login inicial:** Stack raíz. Deseamos bloquear 100% de la UI hasta autenticar.
4. **Pantalla Mis Pedidos:** Dentro de la sección perfil (Tab). Así el menú principal permanece al alcance.

---

## D4. Configuraciones de Stack

1. La propiedad `screenOptions` asigna mandamientos generales al grupo completo de pantallas. Por su parte, la `options` del `Stack.Screen` personaliza un entorno en particular de forma prioritaria.
2. La directiva `(tabs)` se ajusta con `headerShown: false` para silenciar la cabecera del Stack maestro e impedir que colisione doblemente con los propios títulos de la zona Tabs.
3. El archivo dicta la ruta. Se declara únicamente si necesitamos imponer modalidades gráficas como `presentation: 'modal'`.
4. Tipos: `'card'`, `'modal'`, `'transparentModal'`, `'formSheet'` (ideal si deseas ventanas al 50%).
5. El título de cabecera se modifica inyectando `<Stack.Screen options={{ title: 'El Producto 7' }} />` dentro de tu bloque renderizable.

---

## D5. Contexto del SDK 57

1. Ahora los navegadores anidados de Tabs y Drawer residen oficialmente dentro de la gran paquetería de `expo-router` sin fricciones externas.
2. Si bien está integrado, un Drawer demanda `react-native-gesture-handler` y `react-native-reanimated` forzando el mapeo con `<GestureHandlerRootView>`.
3. Instalar librerías nativas antiguas (ej: `@react-navigation/drawer`) quebrará los puentes de compatibilidad de Expo Router. No lo hagas.
4. Ejecutar `router.back()` afectará invariablemente a la sub-pila más honda donde te ubiques actualmente, garantizando flujos predecibles.

---

# Parte E · Funciones Avanzadas y Hooks

## E1. Solucionando conflictos dinámicos

La URL viaja textualmente. Cuando le envías el producto `3`, Expo Router interpreta `"3"` (texto). Si la base de datos lo evalúa con el triple comparador idéntico `===`, resultará fallido contra un número entero. 
Para mitigarlo, parsea obligatoriamente el id:
```javascript
const idNumero = Number(id);
const producto = BD.find((p) => p.id === idNumero);
```

## E2. Resolviendo el Catch-all `[...slug]`

Para el archivo `/docs/[...slug].tsx`:
- URL `/docs/react` -> Entregará la matriz `["react"]`.
- URL `/docs/react/hooks/useState` -> Entregará `["react", "hooks", "useState"]`.
- URL `/docs` -> Emitirá un error de HTTP 404, pues esta sintaxis exige por lo menos un sub-nodo consecuente a la carpeta matriz.

## E3. Fragmentación de URLs complejas

URL analizada: `rutasipf://buscar?q=mate&categoria=bebidas`
1. **Scheme (Plataforma):** `rutasipf`
   **Ruta local:** `/buscar`
   **Parámetros dinámicos:** `q=mate` y `categoria=bebidas`.
2. El hook extrae limpiamente este objeto: `{ q: "mate", categoria: "bebidas" }`.
3. Estos parámetros viajan tras el carácter `?`. Por ello, son anexos invisibles en la tabla de ruteo físico de los componentes en la carpeta `app`.
4. Al teclear en el campo buscar, ejecutamos `router.setParams()` en lugar del pesado `push()`. Esto evita ensuciar permanentemente el historial con registros como "m", "ma", "mat", logrando a su vez transiciones instantáneas y de mayor rendimiento para el motor del celular.

---

## E4. Inspeccionando estados locales

1. Ubicados en `/productos/3`:
   - `usePathname()` -> Brindará `"/productos/3"`
   - `useSegments()` -> Brindará `["(tabs)", "productos", "[id]"]`
   - `useLocalSearchParams()` -> Brindará el objeto `{ id: "3" }`
2. Ubicados en `/buscar?q=chipa`:
   - `usePathname()` -> Brindará `"/buscar"`
   - `useSegments()` -> Brindará `["buscar"]`
   - `useLocalSearchParams()` -> Brindará el objeto `{ q: "chipa" }`

## E5. Conceptos Locales vs Globales

1. Se prioriza fuertemente a `useLocalSearchParams` para resguardar los parámetros exclusivos de la vista actual, aislando conflictos. La variante global recolecta los estados de la pila completa activa.
2. `useFocusEffect` dispara instrucciones cuando la pantalla vuelve al radar visible de la persona. Ideal para recalcular stock o refrescar la API que de otra manera habría quedado en caché.
3. Arribar a `/productos/mate` no representa una falencia del router. Él cumple en despacharte a la compuerta. Es tu trabajo evaluar la consulta local y dibujar alertas personalizadas de producto nulo.

---

# Parte F · Autenticación, Seguridad y Redireccionamiento

## F1. Componente Redirect

- Escribir `<Redirect href="/productos" />` gatilla la orden imperativa de trasladar instantáneamente al usuario. Desempeña el rol nativo equivalente a `router.replace`.
- Se requiere obligatoriamente que suplante (reemplace) a la ruta de origen, anulando que ésta caiga al historial. Caso contrario, tocar retroceder detonaría un bucle vicioso y frustrante de auto-redirección perpetua para la víctima.

## F2. Integridad mediante Stack.Protected

- Esta estructura condicional es superior. Si su directriz falla (`false`), el controlador extermina la vista afectada, removiéndola al completo del plano arquitectónico, impidiendo la navegación externa y bloqueando fugas de seguridad milimétricas.
- Gracias al sistema reactivo del SDK, apenas un usuario obtiene el verificado de la sesión (haciendo falso a `!conSesion`), la ventana del Login se desintegra espontáneamente sin requerir siquiera de comandos directos como `router.back()`.
- Toparse con `"NAVIGATE was not handled"` significa que quisiste forzar un salto a una compuerta eliminada temporalmente. Ocúltale esos links a sujetos sin los debidos permisos autorizados.

## F3. Detalles arquitectónicos selectos

- `+not-found.tsx`: Es el salvavidas para requerimientos ciegos o desorientaciones; rinde homenaje al protocolo Error 404 tradicional, dibujando vistas amenas de socorro.
- `unstable_settings = { anchor: "(tabs)" }`: Permiso avanzado para forzar el anclaje de barras bases de la aplicación cuando alguien ingresa bruscamente desde notificaciones y enlaces externos deep vinculantes (deep links).
- `typedRoutes`: Verificador automatizado en segundo plano, encargado de proteger la exactitud de tipeo en las rutas, evitando que redactes `prodcutos` con descuidos de ortografía en medio de tu código complejo y extenso.

---

## F4. Accediendo remotamente (Deep Links) a `/menu/7`

- **Si la app fue construida e instalada (Build final):** Recibirá peticiones por medio de `comedoripf://menu/7`
- **Si operas bajo entorno de desarrollo local (Expo Go):** Demandará el prefijo nativo en conjunto a tu red `exp://192.168.1.20:8081/--/menu/7`
- **Si desarrollas bajo emulador de Web local:** Reaccionará al clásico `http://localhost:8081/menu/7`
- **La magia del `/--/` en Expo Go:** Funge de tabique impenetrable. Ordena al sistema de desarrollo que los textos a la izquierda son directrices exclusivas del compilador Expo, mientras que los comandos derechos conciernen exclusivamente al mapa interno de la app que programaste.

---

## F5. Problemas Clásicos y Tratamientos Rápidos

- **Al vincular estilos múltiples dentro de AsChild en `<Link>`:** El sistema interno de copiado choca. Debes fusionar la lista a un bloque simple utilizando previamente `StyleSheet.flatten([estilos.boton, activo && estilos.activo])`.
- **Cifrado de Pantalla fantasma no deseada (ej. `Tarjeta.tsx`):** Un diseño estético guardado ingenuamente dentro del directorio `/app` se vuelve ruta navegable por el router. Guárdalo inmediatamente en otra jerarquía paralela externa, como ser `/components`.
- **Bucle perpetuo hacia área de Login:** Utilizar la instrucción base `router.push("/")` causará que el logueo subsista eternamente vivo, oculto tras la portada. Se reemplaza tajantemente con el `router.replace("/")` finalizando la autenticación.
- **Fractura de dependencias post-actualización:** Operar con comandos tradicionales puros (`npm install`) corrompe gravemente las sinergias. Sustitúyelo sin dudarlo por `npx expo install` y respira tranquilo, la máquina asegurará compatibilidad de punta a punta.

---
## ANEXO Y NOTAS IMPORTANTES
- Entiende muy bien cómo la navegación basada en LIFO y FIFO define los entornos interactivos del hoy en día, una pila para bucear profundamente y retroceder a placer, y una cola imperativa para gestionar solicitudes lógicas de lado al lado, todo manejado por la fluidez del router.
