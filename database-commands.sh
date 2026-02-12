# Script para gestionar la base de datos PostgreSQL

## 1. Ver el estado de la base de datos
npx prisma db pull

## 2. Aplicar cambios del schema a la base de datos
npx prisma db push

## 3. Abrir Prisma Studio para ver y editar datos
npx prisma studio

## 4. Ver todas las tablas y datos
npx prisma db execute --stdin < query.sql

## 5. Ejecutar una consulta SQL específica
# Ejemplo: Ver todos los leads
# echo "SELECT * FROM \"Lead\";" | npx prisma db execute --stdin

## 6. Ver estructura de la base de datos
npx prisma db pull --print
