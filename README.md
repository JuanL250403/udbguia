# UDB Guía Campus 🎓📍

Aplicación móvil de orientación universitaria desarrollada para estudiantes de nuevo ingreso de la **Universidad Don Bosco**Esta herramienta funciona como una guía interactiva que permite localizar edificios, laboratorios y oficinas mediante GPS, gestionar reseñas y capturar fotografías del campus, todo funcionando de manera **offline**
## Creadores
**MG250290** Valeria del Rosario Montano Gonzalez
**LM250403**Juan Manuel Leiva Montes

## ✨ Características principales
**Gestión de Lugares:** Información detallada de edificios, salones y oficinas con persistencia local.
**Geolocalización (GPS):** Cálculo de distancia en tiempo real y listado de lugares cercanos ordenados por proximidad.
**Multimedia:** Captura de fotos con la cámara o selección desde la galería vinculadas a cada lugar.
**Comunidad:** Sistema de reseñas y calificaciones por lugar.
**Diseño Adaptable:** Interfaz responsiva que soporta orientación vertical y horizontal.
**Persistencia Local:** Uso de `AsyncStorage` para funcionamiento sin internet.

---

## 🛠️ Tecnologías utilizadas
**Framework:** Expo (React Native) 
**Navegación:** React Navigation (Stack Navigator) 
**Almacenamiento:** AsyncStorage
**Sensores:** Expo Location (GPS) y Expo Camera 

---

##  Instalación y Configuración

Sigue estos pasos para montar el entorno de desarrollo en tu máquina local:

### 1. Requisitos previos
* Tener instalado [Node.js](https://nodejs.org/) (versión LTS).
* Tener instalado [Git](https://git-scm.com/).
* Instalar la app **Expo Go** en tu dispositivo móvil (iOS/Android) para pruebas físicas.

### 2. Clonar el repositorio
```bash
git clone https://github.com/JuanL250403/udbguia.git)
en la terminal de donde ha sido clonado haz: cd udbguia
```

### 3. Instalar dependencias
Ejecuta el siguiente comando para instalar todas las librerías necesarias (React Navigation, AsyncStorage, Location, etc.):
```bash
npm install
```

---

## 💻 Ejecución (Desarrollo)

Para iniciar el servidor de desarrollo de Expo:

```bash
npx expo start
```

* **Para Android/iOS:** Escanea el código QR que aparece en la terminal con la app **Expo Go**.
**Permisos:** Al iniciar, la aplicación solicitará permisos de **Ubicación** y **Cámara/Galería**; asegúrate de aceptarlos para el correcto funcionamiento de las funciones de GPS y fotos.

---

## 🏗️ Compilación (Generar APK)

Para generar el archivo ejecutable final (APK) para Android, se utiliza el servicio EAS de Expo:

1.  **Instalar EAS CLI:**
    ```bash
    npm install -g eas-cli
    ```
2.  **Iniciar sesión en Expo:**
    ```bash
    eas login
    ```
3.  **Configurar el proyecto:**
    ```bash
    eas build:configure
    ```
4.  **Compilar APK de prueba:**
    ```bash
    eas build --platform android --profile preview
    ```
    *Al finalizar, se proporcionará un enlace de descarga o un código QR para instalar la APK estable en dispositivos Android.*

---

## 📁 Estructura del Proyecto
Basado en el esquema modular del proyecto:
screens/: Pantallas de Inicio, Listado de Lugares, Lugares Cercanos y Detalles.
components/: Componentes como LugarCard, CarruselFotos, MapaLugar y CapturaFoto.
Configuración: App.js para navegación (Stack Navigator) y data.js para almacenamiento local.

---

## 👥 Créditos
Desarrollado para el **Segundo Desafío Práctico** de la materia **Diseño y Programación de Software Multiplataforma**.
