# 📦 Products API #

API REST para gestión de productos e inventario, desarrollada con Node.js, Express, TypeScript y MongoDB.
Incluye documentación con Swagger y exportación de movimientos de stock en CSV.

## 🚀 Funcionalidades principales ##

- CRUD de productos
- Gestión de stock mediante movimientos de inventario
- Exportación de movimientos de stock a CSV
- Documentación interactiva con Swagger (OpenAPI)

## 🧭 Documentación con Swagger ##

La API está documentada utilizando Swagger (OpenAPI 3.0), lo que permite explorar y probar los endpoints desde el navegador.

## ▶️ Acceso a Swagger UI ##

Una vez levantada la API, ingresar a:
http://localhost:3000/api/docs

Desde allí podés:
- Ver todos los endpoints disponibles
- Consultar schemas (Product, StockMovement, etc.)
- Probar requests directamente desde la UI

## 📚 Schemas documentados ##

Swagger incluye los siguientes schemas:
- Product: estructura de un producto
- ProductInput: payload para crear/actualizar productos
- StockMovement: movimientos de inventario (IN / OUT)
- ErrorResponse: errores estándar de la API
Esto permite entender rápidamente:
- Qué datos espera cada endpoint
- Qué devuelve la API en cada caso

## 📤 Exportación de Stock Movements en CSV ##

La API permite exportar los movimientos de stock de un producto en formato CSV, ideal para reportes o análisis externos.

▶️ Endpoint
GET /products/:id/movements/csv

- Parámetros
  - id (path): ID del producto
- Respuesta
  - Archivo .csv descargable
  - Contiene información como:
    - Tipo de movimiento (IN / OUT)
    - Cantidad
    - Motivo
    - Fecha
- Ejemplo de uso
  - Desde navegador
  - Desde Postman
  - Desde cualquier cliente HTTP

## 🛠 Tecnologías utilizadas ##

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Swagger (swagger-jsdoc + swagger-ui-express)
- json2csv

## 📌 Notas ##

- Este proyecto está pensado como API de portfolio
- La autenticación puede integrarse con una API externa (Auth API)
- El enfoque está en claridad, buenas prácticas y escalabilidad básica

## 📄 Licencia ##
- MIT
