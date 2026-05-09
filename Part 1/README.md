# Full Stack Open — Part 1

Ejercicios completados de parte del curso [Full Stack Open](https://fullstackopen.com/) por parte de: University of Helsinki.

---

## Ejercicios completados

| Ejercicio | Descripción |
|-----------|-------------|
| 1.1 – 1.2 | **Course Info** — Componentes `Header`, `Content`, `Total` y `Part` con paso de props |
| 1.3 – 1.5 | **Course Info (cont.)** — Migración de variables sueltas a objetos y finalmente a un único objeto con array de partes |
| 1.6 – 1.11 | **Unicafe** — App de retroalimentación con estado, estadísticas y tabla HTML |
| 1.12 – 1.14 | **Anecdotes** — Visualizador de anécdotas aleatorias con sistema de votación |

---

## Reflexión sobre lo aprendido

### Pensamiento en componentes
El cambio conceptual más importante fue dejar de pensar en páginas HTML y empezar a pensar en **componentes reutilizables**. Descomponer la interfaz en `Header`, `Content`, `Part` y `Total` no solo organizó mejor el código, sino que dejó claro cómo React promueve la separación de responsabilidades: cada componente hace una sola cosa y la hace bien.

### Props como contrato entre componentes
Aprender a pasar datos mediante props reforzó la idea del **flujo unidireccional de datos**. El padre posee la información; el hijo solo la presenta. Este principio, simple en teoría, obliga a planificar conscientemente qué sabe cada componente y de dónde viene ese conocimiento.

### Estado con `useState`
La mayor revelación fue entender que el estado no es una variable cualquiera: cada vez que cambia, React re-renderiza el componente de forma eficiente. El ejercicio Unicafe lo hizo concreto: tres contadores independientes, cada uno con su propio `useState`, actualizando la interfaz sin manipular el DOM manualmente.

### Inmutabilidad en el estado
Al implementar el sistema de votos en Anecdotes, quedó claro por qué no se debe mutar el estado directamente. Usar el spread operator (`[...votes]`) para copiar el array antes de modificarlo no es un capricho estilístico: es lo que garantiza que React detecte el cambio y dispare el re-render correcto.

---

## Desafíos técnicos superados

**Estructura de props con arrays de objetos**  
En los pasos 1.3–1.5, refactorizar de variables individuales a un único objeto `course` con `parts` como array requirió ajustar simultáneamente cómo se pasan las props y cómo se accede a ellas. El error `Objects are not valid as a React child` apareció al intentar renderizar un objeto completo en lugar de una de sus propiedades — depurarlo enseñó a leer los mensajes de error de React con más cuidado.

**Renderizado condicional**  
En el paso 1.9, mostrar las estadísticas solo cuando existe retroalimentación introdujo el patrón de renderizado condicional con `&&`. La tentación inicial era usar un `if` fuera del `return`, pero la solución en línea dentro del JSX resultó más idiomática.

**Warning de `<tbody>` en la tabla**  
Al construir la tabla de estadísticas (1.11), el navegador generó un warning sobre `<tr>` sin `<tbody>`. Resolverlo implicó entender que React respeta la especificación HTML y que ciertos elementos como `<table>` requieren su estructura semántica completa para evitar que el navegador corrija el DOM silenciosamente, lo que puede causar bugs difíciles de rastrear.

**Encontrar el índice del máximo en un array**  
Para mostrar la anécdota con más votos (1.14), calcular el índice del valor máximo de un array con `indexOf(Math.max(...votes))` fue un pequeño pero satisfactorio ejercicio de JavaScript puro integrado dentro de la lógica de React.

---

## Estructura del repositorio

```
part1/
├── courseinfo/   # Ejercicios 1.1 – 1.5
├── unicafe/      # Ejercicios 1.6 – 1.11
└── anecdotes/    # Ejercicios 1.12 – 1.14
```
