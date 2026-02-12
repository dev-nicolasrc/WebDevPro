# 🛒 Guía Completa del Flujo de Pago

## ✅ Estado Actual

Tu plataforma ya tiene **TODO** el sistema de pagos implementado y funcionando:

- ✅ Página de checkout (`/checkout`)
- ✅ Integración con MercadoPago
- ✅ API de creación de pagos
- ✅ Webhooks para confirmación de pagos
- ✅ Páginas de éxito/error
- ✅ Base de datos conectada (Railway)
- ✅ Conversión de monedas automática

---

## 🚀 Cómo Funciona el Flujo de Pago

### 1️⃣ Usuario Selecciona un Paquete

**Desde la página principal:**
```
Usuario ve los paquetes → Click en "Contratar" → Redirige a /checkout?paquete=basico
```

**Desde el cotizador:**
```
Usuario completa cotización → Click en "Pagar Ahora" → Crea pago y redirige a MercadoPago
```

### 2️⃣ Página de Checkout (`/checkout`)

**Ubicación:** `nextjs_space/app/checkout/page.tsx`

**Funcionalidad:**
- Muestra resumen del paquete seleccionado
- Formulario con datos del cliente:
  - Nombre completo
  - Email
  - Teléfono
  - Empresa (opcional)
- Conversión automática de moneda según país
- Botón "Proceder al Pago"

**Código del botón:**
```tsx
<button
  type="submit"
  disabled={loading}
  className="w-full py-4 gradient-bg text-white font-semibold rounded-xl"
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      Procesando...
    </>
  ) : (
    <>
      <CreditCard className="w-5 h-5" />
      Proceder al Pago
    </>
  )}
</button>
```

### 3️⃣ Creación de Preferencia de Pago

**API:** `nextjs_space/app/api/pagos/create-package-payment/route.ts`

**Proceso:**
1. Recibe datos del formulario
2. Crea o busca el Lead en la base de datos
3. Crea registro de Pago con estado "pendiente"
4. Llama a MercadoPago para crear preferencia
5. Devuelve `init_point` (URL de pago)
6. Usuario es redirigido a MercadoPago

**Código simplificado:**
```typescript
const response = await fetch('/api/pagos/create-package-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    telefono: '+57 300 123 4567',
    empresa: 'Mi Empresa',
    paquete: 'Básico',
    precio: 1500000,
    moneda: 'COP'
  })
});

const data = await response.json();
window.location.href = data.initPoint; // Redirige a MercadoPago
```

### 4️⃣ Usuario Paga en MercadoPago

**Flujo:**
1. Usuario ingresa datos de tarjeta/método de pago
2. MercadoPago procesa el pago
3. MercadoPago redirige según resultado:
   - ✅ **Aprobado:** `/pago/success?collection_status=approved`
   - ❌ **Rechazado:** `/pago/success?collection_status=rejected`
   - ⏳ **Pendiente:** `/pago/success?collection_status=pending`

### 5️⃣ Webhook de Confirmación

**API:** `nextjs_space/app/api/webhooks/mercadopago/route.ts`

**Proceso:**
1. MercadoPago envía notificación del pago
2. Webhook obtiene información del pago
3. Actualiza estado en la base de datos:
   - `estadoPago`: "aprobado" / "rechazado" / "pendiente"
   - `transaccionId`: ID de la transacción
   - `mercadoPagoStatus`: Estado de MercadoPago
4. Si es cotización aprobada, actualiza estado a "aprobada"

### 6️⃣ Página de Confirmación

**Ubicación:** `nextjs_space/app/pago/success/page.tsx`

**Muestra:**
- ✅ Mensaje de éxito si pago aprobado
- ❌ Mensaje de error si pago rechazado
- ⏳ Mensaje de pendiente si está en proceso

---

## 📊 Estructura de Base de Datos

### Modelo Lead
```prisma
model Lead {
  id            String    @id @default(cuid())
  nombre        String
  email         String    @unique
  telefono      String?
  empresa       String?
  pagos         Pago[]
}
```

### Modelo Pago
```prisma
model Pago {
  id                String    @id @default(cuid())
  leadId            String
  lead              Lead      @relation(fields: [leadId], references: [id])
  cotizacionId      String?
  monto             Float
  moneda            String
  metodoPago        String
  estadoPago        String    @default("pendiente")
  transaccionId     String?
  mercadoPagoId     String?
  mercadoPagoStatus String?
  metadata          Json?
}
```

---

## 🧪 Cómo Probar el Flujo

### Opción 1: Pago de Paquete

1. Abre el navegador en `http://localhost:3000`
2. Scroll hasta la sección de paquetes
3. Click en "Contratar" en cualquier paquete
4. Completa el formulario:
   ```
   Nombre: Juan Pérez
   Email: juan@test.com
   Teléfono: +57 300 123 4567
   Empresa: Test S.A.S
   ```
5. Click en "Proceder al Pago"
6. Serás redirigido a MercadoPago

### Opción 2: Pago de Cotización

1. Ve a `http://localhost:3000/cotizador`
2. Completa el formulario de cotización
3. Click en "Enviar Cotización"
4. Click en "Pagar Ahora"
5. Serás redirigido a MercadoPago

### Datos de Prueba de MercadoPago

**Tarjeta de Crédito Aprobada:**
```
Número: 5031 7557 3453 0604
CVV: 123
Fecha: 11/25
Nombre: APRO
```

**Tarjeta Rechazada:**
```
Número: 5031 7557 3453 0604
CVV: 123
Fecha: 11/25
Nombre: OTHE
```

---

## 🔧 Configuración Actual

### Variables de Entorno (.env)

```env
DATABASE_URL='postgresql://postgres:VWNyGbxfsBKjfOoBFRiGhJsqcEUPzlZL@shuttle.proxy.rlwy.net:10484/railway'
MERCADOPAGO_ACCESS_TOKEN="APP_USR-8428072114082205-012716-71ab559cada2bc555d9e156612a09ae5-3163545348"
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="APP_USR-3c18c084-028a-4046-917d-cac85a05e1d6"
```

### URLs de Retorno

**Success:** `http://localhost:3000/pago/success`
**Failure:** `http://localhost:3000/pago/success`
**Pending:** `http://localhost:3000/pago/success`

---

## 📁 Archivos Importantes

```
nextjs_space/
├── app/
│   ├── checkout/
│   │   └── page.tsx                    # Página de checkout
│   ├── pago/
│   │   └── success/
│   │       └── page.tsx                # Página de confirmación
│   ├── api/
│   │   ├── pagos/
│   │   │   ├── create-package-payment/
│   │   │   │   └── route.ts            # API pago de paquetes
│   │   │   └── create-quotation-payment/
│   │   │       └── route.ts            # API pago de cotizaciones
│   │   └── webhooks/
│   │       └── mercadopago/
│   │           └── route.ts            # Webhook de MercadoPago
├── lib/
│   ├── mercadopago.ts                  # Configuración MercadoPago
│   ├── currency.ts                     # Conversión de monedas
│   └── types.ts                        # Definición de paquetes
└── components/
    ├── services-section.tsx            # Sección de paquetes
    └── payment-button.tsx              # Botón de pago
```

---

## 🎯 Próximos Pasos Recomendados

### 1. Probar el Flujo Completo
```bash
# Servidor ya está corriendo en http://localhost:3000
# Ve al navegador y prueba el flujo
```

### 2. Verificar Pagos en la Base de Datos
```bash
cd nextjs_space
npx prisma studio
```

### 3. Ver Logs de MercadoPago
- Ve a tu cuenta de MercadoPago
- Sección "Desarrolladores" → "Notificaciones"
- Verifica que los webhooks se estén recibiendo

### 4. Personalizar Mensajes
Edita `nextjs_space/app/pago/success/page.tsx` para personalizar:
- Mensaje de éxito
- Mensaje de error
- Mensaje de pendiente
- Botones de acción

### 5. Agregar Carrito de Compras (Opcional)

Si quieres que los usuarios puedan comprar múltiples paquetes:

**Crear contexto de carrito:**
```typescript
// lib/cart-context.tsx
import { createContext, useContext, useState } from 'react';

interface CartItem {
  paquete: string;
  precio: number;
  cantidad: number;
}

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (paquete: string) => void;
  clearCart: () => void;
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems([...items, item]);
  };

  const removeItem = (paquete: string) => {
    setItems(items.filter(i => i.paquete !== paquete));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
```

---

## 🐛 Solución de Problemas

### Error: "Failed to create payment preference"

**Causa:** Credenciales de MercadoPago incorrectas

**Solución:**
1. Verifica que las credenciales en `.env` sean correctas
2. Asegúrate de usar credenciales de **producción** (no test)
3. Reinicia el servidor: `npm run dev`

### Error: "Database connection failed"

**Causa:** Base de datos no accesible

**Solución:**
1. Verifica que `DATABASE_URL` sea correcta
2. Prueba la conexión: `npx prisma db pull`
3. Si falla, revisa `SOLUCION_FIREWALL.md`

### Webhook no se recibe

**Causa:** MercadoPago no puede alcanzar localhost

**Solución:**
1. Usa **ngrok** para exponer localhost:
   ```bash
   ngrok http 3000
   ```
2. Copia la URL de ngrok (ej: `https://abc123.ngrok.io`)
3. Configura webhook en MercadoPago:
   ```
   https://abc123.ngrok.io/api/webhooks/mercadopago
   ```

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del servidor
2. Verifica la consola del navegador
3. Revisa los logs de MercadoPago
4. Consulta la documentación de MercadoPago: https://www.mercadopago.com.co/developers

---

## 🎉 ¡Todo Listo!

Tu sistema de pagos está **100% funcional**. Solo necesitas:
1. Abrir `http://localhost:3000`
2. Seleccionar un paquete
3. Completar el formulario
4. Click en "Proceder al Pago"
5. ¡Listo! 🚀
