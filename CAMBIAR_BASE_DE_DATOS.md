# Guía Completa: Cambiar Conexión a Base de Datos Remota

## 📋 Índice
1. [Opciones de Proveedores de Base de Datos](#opciones-de-proveedores)
2. [Paso a Paso: Crear Nueva Base de Datos](#paso-a-paso)
3. [Configurar la Conexión](#configurar-la-conexión)
4. [Migrar el Schema](#migrar-el-schema)
5. [Pruebas Finales](#pruebas-finales)
6. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Opciones de Proveedores de Base de Datos

### Opción 1: Supabase (Recomendado - Gratis)
- ✅ **Gratis**: 500MB de base de datos
- ✅ **Fácil de usar**: Interfaz web intuitiva
- ✅ **PostgreSQL**: Compatible con tu proyecto
- ✅ **Rápido**: Configuración en 2 minutos
- 🌐 **URL**: https://supabase.com

### Opción 2: Neon (Recomendado - Gratis)
- ✅ **Gratis**: 3GB de almacenamiento
- ✅ **Serverless**: Escala automáticamente
- ✅ **PostgreSQL**: Compatible
- ✅ **Rápido**: Sin tarjeta de crédito
- 🌐 **URL**: https://neon.tech

### Opción 3: Railway (Gratis con límites)
- ✅ **Gratis**: $5 de crédito mensual
- ✅ **Simple**: Deploy automático
- ✅ **PostgreSQL**: Compatible
- 🌐 **URL**: https://railway.app

### Opción 4: Render (Gratis)
- ✅ **Gratis**: 90 días de prueba
- ✅ **PostgreSQL**: Compatible
- ⚠️ **Limitación**: Se suspende después de inactividad
- 🌐 **URL**: https://render.com

### Opción 5: ElephantSQL (Gratis)
- ✅ **Gratis**: 20MB
- ✅ **PostgreSQL**: Compatible
- ⚠️ **Limitación**: Espacio limitado
- 🌐 **URL**: https://www.elephantsql.com

---

## 📝 PASO A PASO: Crear Nueva Base de Datos

### 🟢 Opción Recomendada: SUPABASE

#### Paso 1: Crear Cuenta
1. Ve a https://supabase.com
2. Haz clic en **"Start your project"**
3. Regístrate con:
   - GitHub (recomendado)
   - Google
   - Email

#### Paso 2: Crear Proyecto
1. Haz clic en **"New Project"**
2. Completa los datos:
   ```
   Name: web-sales-platform
   Database Password: [Genera una contraseña segura]
   Region: South America (São Paulo) - Para mejor latencia
   Pricing Plan: Free
   ```
3. Haz clic en **"Create new project"**
4. ⏳ Espera 2-3 minutos mientras se crea

#### Paso 3: Obtener String de Conexión
1. En el dashboard, ve a **"Settings"** (⚙️ en la barra lateral)
2. Haz clic en **"Database"**
3. Busca la sección **"Connection string"**
4. Selecciona el modo **"URI"**
5. Copia el string que se ve así:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
6. **IMPORTANTE**: Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste

#### Paso 4: Configurar Pooling (Importante para evitar timeouts)
1. En la misma página de **"Database"**
2. Busca **"Connection pooling"**
3. Activa **"Use connection pooling"**
4. Copia el **"Connection string"** del pooler:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

---

### 🔵 Alternativa: NEON

#### Paso 1: Crear Cuenta
1. Ve a https://neon.tech
2. Haz clic en **"Sign up"**
3. Regístrate con GitHub o Email

#### Paso 2: Crear Proyecto
1. Haz clic en **"Create a project"**
2. Completa:
   ```
   Project name: web-sales-platform
   Postgres version: 16 (última versión)
   Region: AWS / South America (São Paulo)
   ```
3. Haz clic en **"Create project"**

#### Paso 3: Obtener String de Conexión
1. En el dashboard verás **"Connection Details"**
2. Copia el **"Connection string"**:
   ```
   postgresql://[user]:[password]@[host]/[database]?sslmode=require
   ```
3. Ya viene con la contraseña incluida

---

## ⚙️ Configurar la Conexión

### Paso 1: Actualizar el archivo .env

Abre el archivo `nextjs_space/.env` y reemplaza la línea de `DATABASE_URL`:

**ANTES:**
```env
DATABASE_URL='postgresql://role_10a21e9cee:vstIp4dG6F9fHysqZkD7rDbztSSGecGL@db-10a21e9cee.db003.hosteddb.reai.io:5432/10a21e9cee?connect_timeout=30&pool_timeout=30&connection_limit=5'
```

**DESPUÉS (ejemplo con Supabase):**
```env
DATABASE_URL='postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=5'
```

**O con Neon:**
```env
DATABASE_URL='postgresql://[user]:[password]@[host]/[database]?sslmode=require&connection_limit=5'
```

### Paso 2: Guardar el archivo
- Guarda el archivo `.env`
- **NO** lo subas a Git (ya está en `.gitignore`)

---

## 🔄 Migrar el Schema

### Paso 1: Verificar Conexión

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd nextjs_space
npx prisma db pull
```

**Resultado esperado:**
```
✔ Introspected 0 models and wrote them into prisma\schema.prisma
```

Si ves un error, verifica:
- ✅ La contraseña es correcta
- ✅ El host es correcto
- ✅ Tu firewall no bloquea la conexión

### Paso 2: Aplicar el Schema

Ejecuta este comando para crear todas las tablas:

```powershell
npx prisma db push
```

**Resultado esperado:**
```
🚀 Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

### Paso 3: Verificar las Tablas

```powershell
npx prisma studio
```

Esto abrirá http://localhost:5555 donde podrás ver:
- ✅ Tabla `User`
- ✅ Tabla `Lead`
- ✅ Tabla `Cotizacion`
- ✅ Tabla `Reunion`
- ✅ Tabla `ConversacionChatbot`
- ✅ Tabla `Pago`

---

## 🧪 Pruebas Finales

### Prueba 1: Crear un Lead de Prueba

Ejecuta este script:

```powershell
cd nextjs_space
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); (async () => { const lead = await prisma.lead.create({ data: { nombre: 'Test User', email: 'test@example.com', telefono: '1234567890', estado: 'nuevo' } }); console.log('Lead creado:', lead); await prisma.$disconnect(); })();"
```

**Resultado esperado:**
```
Lead creado: {
  id: 'clxxxxx...',
  nombre: 'Test User',
  email: 'test@example.com',
  ...
}
```

### Prueba 2: Verificar en Prisma Studio

1. Abre http://localhost:5555
2. Haz clic en **"Lead"**
3. Deberías ver el lead de prueba que acabas de crear

### Prueba 3: Probar el Endpoint de Pagos

1. Inicia el servidor de desarrollo:
   ```powershell
   npm run dev
   ```

2. Abre http://localhost:3000

3. Ve a la página de checkout y prueba el botón **"Proceder al Pago"**

**Resultado esperado:**
- ✅ No hay error 500
- ✅ Se crea un lead en la base de datos
- ✅ Se crea una cotización
- ✅ Se redirige a MercadoPago

---

## 🔧 Solución de Problemas

### Error: "Can't reach database server"

**Solución 1: Verificar Firewall**
```powershell
Test-NetConnection -ComputerName db.xxxxxxxxxxxxx.supabase.co -Port 5432
```

Si falla, tu firewall está bloqueando la conexión.

**Solución 2: Verificar Contraseña**
- Asegúrate de que la contraseña no tenga caracteres especiales sin escapar
- Si tiene caracteres especiales, usa URL encoding:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `&` → `%26`

**Solución 3: Usar Connection Pooling**
Si usas Supabase, usa el pooler:
```env
DATABASE_URL='postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
```

### Error: "Connection pool timeout"

**Solución:**
Reduce el `connection_limit` en la URL:
```env
DATABASE_URL='postgresql://...?connection_limit=3'
```

### Error: "SSL connection required"

**Solución:**
Agrega `sslmode=require` a la URL:
```env
DATABASE_URL='postgresql://...?sslmode=require'
```

---

## 📊 Comparación de Proveedores

| Proveedor | Gratis | Espacio | Conexiones | Latencia (SA) | Facilidad |
|-----------|--------|---------|------------|---------------|-----------|
| Supabase  | ✅ Sí  | 500MB   | Ilimitadas | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Neon      | ✅ Sí  | 3GB     | Ilimitadas | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Railway   | ⚠️ $5/mes | 1GB  | 20         | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Render    | ⚠️ 90d | 1GB     | 10         | ⭐⭐⭐ | ⭐⭐⭐ |
| ElephantSQL| ✅ Sí | 20MB    | 5          | ⭐⭐ | ⭐⭐⭐ |

**Recomendación:** Usa **Supabase** o **Neon** para este proyecto.

---

## 🎯 Resumen de Comandos

```powershell
# 1. Verificar conexión
cd nextjs_space
npx prisma db pull

# 2. Aplicar schema
npx prisma db push

# 3. Abrir Prisma Studio
npx prisma studio

# 4. Iniciar servidor
npm run dev

# 5. Crear lead de prueba (opcional)
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); (async () => { const lead = await prisma.lead.create({ data: { nombre: 'Test', email: 'test@test.com', estado: 'nuevo' } }); console.log(lead); await prisma.$disconnect(); })();"
```

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que la URL de conexión sea correcta
2. Asegúrate de que el firewall no bloquee el puerto 5432
3. Revisa los logs del servidor: `npm run dev`
4. Consulta la documentación del proveedor que elegiste

---

## ✅ Checklist Final

- [ ] Cuenta creada en el proveedor elegido
- [ ] Base de datos creada
- [ ] String de conexión copiado
- [ ] Archivo `.env` actualizado
- [ ] `npx prisma db push` ejecutado exitosamente
- [ ] Prisma Studio muestra las tablas
- [ ] Lead de prueba creado
- [ ] Servidor de desarrollo funcionando
- [ ] Endpoint de pagos probado

¡Listo! Tu base de datos remota está configurada y funcionando. 🎉
