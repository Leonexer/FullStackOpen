# FullStackOpen - Parte 2

Este repositorio contiene los ejercicios de la Parte 2 del curso FullStackOpen, donde se profundiza en React, componentes, estado, hooks y llamadas a APIs.

## Proyectos incluidos

- `country-data/` - Ejercicio para buscar países y mostrar información con React.
- `courseinfo/` - Ejercicio sobre renderizado dinámico de datos de cursos usando componentes.
- `phonebook/` - Aplicación de agenda telefónica con creación, eliminación, actualización y persistencia a un backend local.

## Qué se aprendió

- Componentes funcionales y composición de UI.
- Uso de `useState` para manejar estado local y formularios controlados.
- Uso de `useEffect` para efectos secundarios y recuperación de datos desde APIs.
- Condicionales en renderizado y listas con `map` y `key`.
- Manejo de entradas de usuario con formularios controlados.
- Separación de lógica de datos en servicios (`services/persons.js`).
- Gestión de notificaciones y mensajes de error en la interfaz.
- Observación de efectos secundarios y dependencias para evitar renders infinitos.

## Guía para ejecutar el proyecto

Cada subcarpeta es un proyecto independiente con su propio `package.json`.

1. Abrir una terminal en la carpeta del proyecto que quieras ejecutar.

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir la URL que muestre Vite, normalmente `http://localhost:5173/`.

### Ejemplo de ejecución

```bash
cd country-data
npm install
npm run dev
```

Para `courseinfo` y `phonebook`, repetir el mismo flujo dentro de cada carpeta.

## Reflexión técnica

Durante los ejercicios de la Parte 2 se enfrentaron varios desafíos importantes:

- **Manejo de errores en promesas**: Al recuperar datos con `fetch` o `axios`, es clave capturar errores con `try/catch` o `.catch()` para informar al usuario y evitar que la aplicación se rompa. En la agenda telefónica se agrega lógica de notificación para mostrar errores de red o de validación.

- **Dependencias de efectos (`useEffect`)**: Comprender cuándo incluir una dependencia en el array de dependencias es fundamental. Si se omite una dependencia necesaria, el efecto puede usar datos obsoletos; si se incluyen demasiadas, el efecto puede ejecutarse en exceso. Esto ayuda a evitar bucles infinitos y a mantener el estado sincronizado.

- **Actualización de estado basada en el estado anterior**: Cuando una nueva actualización depende del estado previo, usar la forma funcional de `setState` evita inconsistencias.

- **Separación de responsabilidades**: Mover las llamadas a la API a servicios independientes facilita las pruebas y la reutilización, y mantiene los componentes centrados en la UI.

- **Interacción con un backend**: La parte del `phonebook` mostró cómo gestionar operaciones CRUD y cómo sincronizar el estado local con la respuesta del servidor.

## Conclusión

La Parte 2 refuerza los conceptos clave de React y la arquitectura de aplicaciones: componentes reutilizables, hooks bien diseñados, manejo de datos asíncronos y una UX más sólida mediante el manejo adecuado de errores y notificaciones.
