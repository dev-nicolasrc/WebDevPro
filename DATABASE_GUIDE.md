# Guía para Gestionar la Base de Datos PostgreSQL

## Problema Actual
La base de datos PostgreSQL remota en `db-10a21e9cee.db003.hosteddb.reai.io:5432` no está accesible actualmente.

## Soluciones

### Opción 1: Verificar Conectividad
Verifica si puedes conectarte a la base de datos:

```powershell
cd nextjs_space
npx prisma db pull
```

Si esto falla, verifica:
- Que tu conexión a internet esté funcionando
- Que el servidor de base de datos esté activo
- Que no haya un firewall bloqueando el puerto 5432

### Opción 2: Aplicar Migración Manualmente
Si tienes acceso a la base de datos por otro medio (pgAdmin, DBeaver, etc.), ejecuta este SQL:

```sql
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "empresa" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "origen" TEXT;
```

### Opción 3: Usar Base de Datos Local
Si prefieres trabajar con una base de datos local:

1. Instala PostgreSQL localmente
2. Crea una base de datos nueva
3. Actualiza el `.env` con la nueva URL:
   ```
   DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db"
   ```
4. Ejecuta:
   ```powershell
   npx prisma db push
   ```

## Comandos Útiles para Gestionar la Base de Datos

### 1. Ver y Editar Datos (Interfaz Gráfica)
```powershell
cd nextjs_space
npx prisma studio
```
Esto abrirá una interfaz web en `http://localhost:5555` donde podrás:
- Ver todas las tablas
- Editar registros
- Agregar nuevos datos
- Eliminar registros

### 2. Aplicar Cambios del Schema
```powershell
cd nextjs_space
npx prisma db push
```

### 3. Ver Estructura de la Base de Datos
```powershell
cd nextjs_space
npx prisma db pull --print
```

### 4. Generar Cliente de Prisma
```powershell
cd nextjs_space
npx prisma generate
```

### 5. Ejecutar Consultas SQL Personalizadas
Crea un archivo `query.sql` con tu consulta y ejecuta:
```powershell
Get-Content query.sql | npx prisma db execute --stdin
```

Ejemplos de consultas útiles:

**Ver todos los leads:**
```sql
SELECT * FROM "Lead";
```

**Ver todas las cotizaciones:**
```sql
SELECT * FROM "Cotizacion";
```

**Ver todos los pagos:**
```sql
SELECT * FROM "Pago";
```

**Ver leads con sus cotizaciones:**
```sql
SELECT l.nombre, l.email, c."tipoSitio", c."precioEstimado", c.estado
FROM "Lead" l
LEFT JOIN "Cotizacion" c ON l.id = c."leadId";
```

## Herramientas Recomendadas

### pgAdmin (Interfaz Gráfica Completa)
- Descarga: https://www.pgadmin.org/download/
- Permite gestionar completamente la base de datos
- Ideal para ejecutar consultas complejas

### DBeaver (Multiplataforma)
- Descarga: https://dbeaver.io/download/
- Soporta múltiples bases de datos
- Interfaz más simple que pgAdmin

### Prisma Studio (Incluido)
- Ya viene con Prisma
- Ejecuta: `npx prisma studio`
- Interfaz web simple y rápida

## Conectar con Herramientas Externas

Usa estos datos de conexión:
- **Host:** db-10a21e9cee.db003.hosteddb.reai.io
- **Puerto:** 5432
- **Base de datos:** 10a21e9cee
- **Usuario:** role_10a21e9cee
- **Contraseña:** vstIp4dG6F9fHysqZkD7rDbztSSGecGL

## Estado Actual del Proyecto

### Cambios Realizados:
1. ✅ Schema de Prisma actualizado con campos `empresa` y `origen`
2. ✅ API corregida para manejar el campo `caracteristicas`
3. ✅ Manejo de emails duplicados implementado
4. ✅ Variables de entorno configuradas (incluyendo NEXTAUTH_URL)
5. ✅ Cliente de Prisma generado

### Pendiente:
- ⏳ Aplicar migración a la base de datos (requiere conectividad)

Una vez que la base de datos esté accesible, ejecuta:
```powershell
cd nextjs_space
npx prisma db push
```

Esto aplicará automáticamente los cambios del schema a la base de datos.
