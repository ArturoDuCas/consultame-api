# Consultame API

Este repositorio contiene el código fuente de la API "Consultame". Está construido utilizando Node.js, Express.js y Prisma. La base de datos utilizada es PostgreSQL.

## 🛠 Tecnologías utilizadas

- **Node.js**: Plataforma de ejecución para JavaScript.
- **Express.js**: Framework para construir aplicaciones web y APIs en Node.js.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js y TypeScript.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.

## 🚀 Rutas disponibles

- `/user`: Rutas relacionadas con los usuarios.
- `/sex`: Rutas relacionadas con el sexo.
- `/disease`: Rutas relacionadas con enfermedades.
- `/vaccine`: Rutas relacionadas con vacunas.
- `/user/vaccine`: Rutas relacionadas con las vacunas que han sido administradas a los usuarios.
- `/count`: Rutas relacionadas con conteos.

## 🔧 Proceso de instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ArturoDuCas/consultame-api.git
```
2. Instala las dependencias:
```bash
npm install
```
3. Configura el archivo `.env`:
En este paso, la única configuración que debes realizar es crear el archivo  en la raíz de tu proyecto. El contenido del archivo debe ser el siguiente:
- PORT=3000
- DATABASE_URL=[tu base de datos]
- NODE_ENV=development

4. Ejecuta el siguiente comando para generar los modelos de Prisma:
```bash
npm run generate
```

## 🏃‍♂️ Cómo correrlo

- **Ambiente de desarrollo:**
```bash
npm run dev
```
Este comando utilizará nodemon para reiniciar automáticamente la aplicación cuando se realicen cambios en los archivos.

- **Ambiente de producción:**
```bash
npm run start
```
Este comando generará primero los modelos de Prisma y luego iniciará la aplicación.

**Para visualizar y gestionar tu base de datos con Prisma Studio, puedes utilizar:**
```bash
npm run studio
```

