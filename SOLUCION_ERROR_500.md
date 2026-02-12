# 🔧 Solución al Error 500 en API de Pagos

## 🚨 Problema

Cuando intentas proceder al pago, obtienes:
```
POST http://localhost:3000/api/pagos/create-package-payment 500 (Internal Server Error)
```

## ✅ Soluciones

### Solución 1: Verificar que el Servidor Esté Corriendo

1. **Abre una terminal en `nextjs_space`:**
   ```powershell
   cd nextjs_space
   ```

2. **Inicia el servidor:**
   ```powershell
   npm run dev
   ```

3. **Espera a ver este mensaje:**
   ```
   ✓ Ready in 3.5s
   ○ Local:   http://localhost:3000
   ```

4. **Abre el navegador en:** `http://localhost:3000`

---

### Solución 2: Ver los Logs del Servidor

El archivo `create-package-payment/route.ts` ahora tiene logging mejorado. Cuando hagas clic en "Proceder al Pago", verás en la terminal:

```
📦 Received payment request: { nombre, email, telefono, ... }
🔍 Looking for lead with email: ...
✅ Lead found/created: ...
📝 Creating cotizacion...
✅ Cotizacion created: ...
💳 Getting MercadoPago config...
✅ MercadoPago config loaded
🔐 Creating MercadoPago preference...
```

Si hay un error, verás:
```
❌ Error creating package payment: [error message]
Error details: [detailed message]
Error stack: [stack trace]
```

---

### Solución 3: Verificar Credenciales de MercadoPago

1. **Abre el archivo `.env`:**
   ```powershell
   notepad .env
   ```

2. **Verifica que tengas estas variables:**
   ```env
   MERCADOPAGO_ACCESS_TOKEN="APP_USR-..."
   NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="APP_USR-..."
   ```

3. **Si faltan, agrégalas y reinicia el servidor:**
   ```powershell
   # Ctrl+C para detener el servidor
   npm run dev
   ```

---

### Solución 4: Verificar Conexión a la Base de Datos

1. **Prueba la conexión:**
   ```powershell
   npx prisma db pull
   ```

2. **Si falla, verifica `DATABASE_URL` en `.env`:**
   ```env
   DATABASE_URL='postgresql://postgres:VWNyGbxfsBKjfOoBFRiGhJsqcEUPzlZL@shuttle.proxy.rlwy.net:10484/railway'
   ```

3. **Regenera el cliente de Prisma:**
   ```powershell
   npx prisma generate
   ```

---

### Solución 5: Limpiar Caché y Reiniciar

1. **Detén el servidor** (Ctrl+C)

2. **Limpia la caché:**
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

3. **Reinstala dependencias:**
   ```powershell
   npm install
   ```

4. **Reinicia el servidor:**
   ```powershell
   npm run dev
   ```

---

## 🧪 Probar la API Manualmente

He creado un script de prueba en `test-payment-api.js`. Para usarlo:

1. **Asegúrate de que el servidor esté corriendo**

2. **En otra terminal, ejecuta:**
   ```powershell
   node test-payment-api.js
   ```

3. **Verás el resultado:**
   ```
   🧪 Testing payment API...
   Response status: 200
   ✅ Payment API test successful!
   Init Point: https://www.mercadopago.com/...
   ```

   O si hay error:
   ```
   ❌ Payment API test failed!
   Error: Error al crear la preferencia de pago
   Details: [error message]
   ```

---

## 🔍 Errores Comunes y Soluciones

### Error: "MercadoPago credentials not configured"

**Causa:** Faltan las credenciales de MercadoPago en `.env`

**Solución:**
1. Ve a https://www.mercadopago.com.co/developers/panel/app
2. Copia tu `Access Token` y `Public Key`
3. Agrégalos al archivo `.env`:
   ```env
   MERCADOPAGO_ACCESS_TOKEN="APP_USR-tu-access-token"
   NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="APP_USR-tu-public-key"
   ```
4. Reinicia el servidor

---

### Error: "PrismaClientInitializationError"

**Causa:** No se puede conectar a la base de datos

**Solución:**
1. Verifica que `DATABASE_URL` sea correcta
2. Prueba la conexión: `npx prisma db pull`
3. Si falla, revisa `SOLUCION_FIREWALL.md`

---

### Error: "MercadoPago API error: ..."

**Causa:** Error en la API de MercadoPago

**Soluciones posibles:**
1. **Credenciales inválidas:** Verifica que sean de producción
2. **Moneda no soportada:** Asegúrate de usar USD, COP, MXN, ARS, CLP o PEN
3. **Precio inválido:** Debe ser un número positivo
4. **Email inválido:** Verifica el formato del email

---

## 📋 Checklist de Verificación

Antes de probar el pago, verifica:

- [ ] Servidor corriendo en `http://localhost:3000`
- [ ] Base de datos conectada (prueba con `npx prisma studio`)
- [ ] Credenciales de MercadoPago en `.env`
- [ ] Variables de entorno cargadas (reinicia el servidor)
- [ ] No hay errores en la consola del servidor
- [ ] No hay errores en la consola del navegador (F12)

---

## 🎯 Pasos para Probar el Flujo Completo

1. **Inicia el servidor:**
   ```powershell
   cd nextjs_space
   npm run dev
   ```

2. **Abre el navegador:** `http://localhost:3000`

3. **Scroll hasta los paquetes** y click en "Contratar"

4. **Completa el formulario:**
   - Nombre: Tu Nombre
   - Email: tu@email.com
   - Teléfono: +57 300 123 4567
   - Empresa: (opcional)

5. **Click en "Proceder al Pago"**

6. **Observa la terminal del servidor** para ver los logs

7. **Si hay error:**
   - Copia el mensaje de error completo
   - Revisa los logs del servidor
   - Aplica las soluciones de esta guía

---

## 💡 Tip: Ver Logs en Tiempo Real

Para ver mejor los logs del servidor:

```powershell
# En la terminal donde corre el servidor
npm run dev | Tee-Object -FilePath server.log
```

Esto guardará los logs en `server.log` para revisarlos después.

---

## 📞 Si Nada Funciona

1. **Copia el error completo** de la terminal del servidor
2. **Copia el error** de la consola del navegador (F12)
3. **Verifica que todas las variables de entorno estén configuradas**
4. **Intenta con credenciales de prueba de MercadoPago**

---

## 🎉 Una Vez que Funcione

Cuando el pago funcione correctamente:
1. Serás redirigido a MercadoPago
2. Completa el pago con datos de prueba
3. Serás redirigido a `/pago/success`
4. El pago se guardará en la base de datos

¡Listo! 🚀
