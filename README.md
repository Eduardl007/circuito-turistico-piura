# Circuito Turistico Piura - Catacaos

<p align="center">
  <img src="assets/favicon.svg" alt="Logo Circuito Turistico" width="100">
</p>

<p align="center">
  <strong>Descubre la magia de Piura y Catacaos</strong><br>
  Artesania ancestral, gastronomia tradicional y cultura viva del norte peruano
</p>

<p align="center">
  <a href="#caracteristicas">Caracteristicas</a> •
  <a href="#demo">Demo</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#instalacion">Instalacion</a> •
  <a href="#estructura">Estructura</a>
</p>

---

## Acerca del Proyecto

Plataforma web interactiva para promocionar el circuito turistico Piura - Catacaos, ofreciendo:

- **Tours y experiencias** culturales, gastronomicas y artesanales
- **Talleres vivenciales** de filigrana, paja toquilla, ceramica y cocina
- **Paquetes turisticos** con opciones para todos los presupuestos
- **Mapa interactivo** con puntos de interes
- **Sistema de reservas** con carrito de compras

## Caracteristicas

- Diseno responsive y moderno
- Animaciones fluidas con AOS
- Slider de hero interactivo
- Filtros de experiencias por categoria
- Chatbot asistente virtual "Cholo Piurano"
- Galeria gastronomica interactiva
- Testimonios de viajeros
- Formulario de contacto funcional
- Sistema de carrito de compras
- Integracion con Google Analytics
- Soporte multilenguaje (ES/EN)

## Demo

**Demo en vivo:** [Ver sitio web](#)

### Capturas de pantalla

| Inicio | Experiencias | Gastronomia |
|--------|--------------|-------------|
| Hero con slider | Tours filtrados | Platos tipicos |

## Tecnologias

- **HTML5** - Estructura semantica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Funcionalidad interactiva
- **AOS** - Animaciones on scroll
- **Font Awesome** - Iconografia
- **Google Fonts** - Tipografias (Poppins, Playfair Display)
- **Google Maps API** - Mapa interactivo
- **Google Sheets** - Backend para analytics

## Instalacion

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/circuito-turistico-piura.git
cd circuito-turistico-piura
```

### Servidor local

Puedes usar cualquier servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con VS Code
# Instalar extension "Live Server" y hacer clic derecho en index.html
```

### Configuracion

1. Reemplazar `YOUR_API_KEY` en index.html con tu API key de Google Maps
2. Configurar el archivo `js/analytics.js` con tu Google Sheets Script URL
3. Actualizar `robots.txt` y `sitemap.xml` con tu dominio

## Estructura

```
circuito-turistico-piura/
├── index.html              # Pagina principal
├── 404.html                # Pagina de error
├── robots.txt              # Configuracion SEO
├── sitemap.xml             # Mapa del sitio
├── netlify.toml            # Configuracion de despliegue
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── app.js              # JavaScript principal
│   ├── analytics.js        # Sistema de analytics
│   └── google-apps-script.js # Script para Google Sheets
└── assets/
    ├── favicon.svg         # Icono del sitio
    └── images/             # Imagenes del proyecto
        ├── Piura.jpg
        ├── Catacaos.jpg
        └── ...
```

## Despliegue

### GitHub Pages

1. Ir a Settings > Pages
2. Seleccionar la rama `main` y carpeta `/ (root)`
3. Guardar y esperar el despliegue

### Netlify

1. Conectar repositorio de GitHub
2. El archivo `netlify.toml` configurara automaticamente el sitio
3. Deploy!

## Funcionalidades Principales

### Sistema de Reservas
- Seleccion de experiencias/tours
- Eleccion de fecha y numero de personas
- Carrito de compras persistente
- Formulario de datos del cliente

### Chatbot Interactivo
- Asistente virtual "Cholo Piurano"
- Respuestas predefinidas sobre tours, talleres y paquetes
- Sugerencias rapidas de acciones

### Mapa Interactivo
- Puntos de interes por categoria
- Panel de detalle con informacion completa
- Filtros por tipo de lugar
- Integracion con Google Maps

## Creditos

- **Imagenes:** Archivo local de Piura y Catacaos
- **Iconos:** [Font Awesome](https://fontawesome.com)
- **Tipografias:** [Google Fonts](https://fonts.google.com)
- **Animaciones:** [AOS Library](https://michalsnik.github.io/aos/)

## Licencia

Este proyecto esta bajo la Licencia MIT. Ver el archivo `LICENSE` para mas detalles.

---

<p align="center">
  Desarrollado con ❤️ en Piura, Peru
</p>
