# Guía de Deployment a Producción

## Dominio: https://devproapp.dev/

---

## Opción 1: Vercel (Recomendado - Más fácil)

Vercel es la plataforma oficial de Next.js y ofrece deployment automático, optimización y escalabilidad.

### Paso 1: Preparar el repositorio Git

```bash
# Si no tienes Git inicializado
cd nextjs_space
git init
git add .
git commit -m "Initial commit - Ready for production"

# Crear repositorio en GitHub/GitLab/Bitbucket y conectarlo
git remote add origin <tu-repositorio-url>
git push -u origin main
```

### Paso 2: Crear cuenta en Vercel

1. Ve a https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub/GitLab/Bitbucket
3. Autoriza a Vercel para acceder a tus repositorios

### Paso 3: Importar proyecto

1. En el dashboard de Vercel, haz clic en **"Add New Project"**
2. Selecciona tu repositorio
3. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 4: Configurar variables de entorno

En la sección **"Environment Variables"** de Vercel, agrega:

```
DATABASE_URL=postgresql://postgres:VWNyGbxfsBKjfOoBFRiGhJsqcEUPzlZL@shuttle.proxy.rlwy.net:10484/railway
NEXTAUTH_URL=https://devproapp.dev
NEXTAUTH_SECRET=AxtbJaf03tFOXftQs2Y2uLdSw7OpfAE9
MERCADOPAGO_ACCESS_TOKEN=APP_USR-8428072114082205-012716-71ab559cada2bc555d9e156612a09ae5-3163545348
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-3c18c084-028a-4046-917d-cac85a05e1d6
MERCADOPAGO_SANDBOX_MODE=false
ABACUSAI_API_KEY=0a1d6ca8b7dd43b8b794fe5bd9d8974b
WEB_APP_ID=5290b72c
NOTIF_ID_NUEVA_COTIZACIN_SOLICITADA=157e8d68c4
NOTIF_ID_NUEVA_REUNIN_AGENDADA=53e44e805
NOTIF_ID_NUEVO_LEAD_DEL_CHATBOT=c46734f46
```

**IMPORTANTE**: 
- Cambia `MERCADOPAGO_SANDBOX_MODE=false` para usar credenciales de producción
- Asegúrate de usar las credenciales de producción de MercadoPago (las que comienzan con `APP_USR-`)

### Paso 5: Configurar Build Command

En **"Build & Development Settings"**:
- **Build Command**: `prisma generate && next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next` (por defecto)

### Paso 6: Deploy

1. Haz clic en **"Deploy"**
2. Vercel construirá y desplegará tu aplicación
3. Te dará una URL temporal como `tu-proyecto.vercel.app`

### Paso 7: Configurar dominio personalizado

1. En el dashboard del proyecto, ve a **"Settings" > "Domains"**
2. Agrega tu dominio: `devproapp.dev`
3. Vercel te dará instrucciones para configurar DNS:

#### Configuración DNS en tu proveedor de dominio:

**Opción A: Usar nameservers de Vercel (Recomendado)**
```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
```

**Opción B: Usar registros A y CNAME**
```
Tipo: A
Nombre: @
Valor: 76.76.21.21

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

4. Espera la propagación DNS (puede tomar hasta 48 horas, pero usualmente es más rápido)
5. Vercel configurará automáticamente SSL/HTTPS

---

## Opción 2: Railway (Alternativa con PostgreSQL incluido)

Railway es excelente si quieres todo en un solo lugar (app + base de datos).

### Paso 1: Crear cuenta en Railway

1. Ve a https://railway.app/
2. Regístrate con GitHub

### Paso 2: Crear nuevo proyecto

1. Haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Conecta tu repositorio

### Paso 3: Configurar variables de entorno

En **"Variables"**, agrega las mismas variables que en Vercel.

### Paso 4: Configurar dominio

1. Ve a **"Settings" > "Domains"**
2. Agrega `devproapp.dev`
3. Configura DNS según las instrucciones de Railway

---

## Opción 3: VPS (DigitalOcean, AWS, etc.)

Si prefieres más control, puedes usar un VPS.

### Requisitos:
- Node.js 18+
- PostgreSQL
- Nginx (como reverse proxy)
- PM2 (para mantener la app corriendo)

### Pasos básicos:

```bash
# 1. Conectar al servidor
ssh root@tu-servidor-ip

# 2. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Instalar PM2
npm install -g pm2

# 4. Clonar repositorio
git clone <tu-repositorio-url> /var/www/devproapp
cd /var/www/devproapp/nextjs_space

# 5. Instalar dependencias
npm install

# 6. Configurar variables de entorno
nano .env.production
# Pega tus variables de entorno

# 7. Generar Prisma Client y construir
npx prisma generate
npm run build

# 8. Iniciar con PM2
pm2 start npm --name "devproapp" -- start
pm2 save
pm2 startup

# 9. Configurar Nginx
sudo nano /etc/nginx/sites-available/devproapp.dev
```

**Configuración de Nginx:**
```nginx
server {
    listen 80;
    server_name devproapp.dev www.devproapp.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/devproapp.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Instalar SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d devproapp.dev -d www.devproapp.dev
```

---

## Verificación Post-Deployment

Después del deployment, verifica:

1. ✅ La aplicación carga en `https://devproapp.dev`
2. ✅ SSL/HTTPS está funcionando
3. ✅ La base de datos se conecta correctamente
4. ✅ NextAuth funciona (login/logout)
5. ✅ MercadoPago procesa pagos correctamente
6. ✅ Las notificaciones de AbacusAI funcionan

### Comandos de verificación:

```bash
# Verificar build local antes de desplegar
npm run build
npm start

# Probar en http://localhost:3000
```

---

## Troubleshooting

### Error: "Prisma Client not initialized"
```bash
# Asegúrate de que el build command incluya:
prisma generate && next build
```

### Error: "Database connection failed"
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de que la base de datos permita conexiones externas

### Error: "NEXTAUTH_URL not set"
- Debe ser `https://devproapp.dev` (sin trailing slash)

### MercadoPago no funciona
- Verifica que uses credenciales de **producción** (`APP_USR-...`)
- Cambia `MERCADOPAGO_SANDBOX_MODE=false`
- Actualiza las `back_urls` en MercadoPago para usar tu dominio de producción

---

## Recomendación Final

**Para empezar rápido**: Usa **Vercel**
- Deployment en 5 minutos
- SSL automático
- Escalabilidad automática
- Integración perfecta con Next.js
- Plan gratuito generoso

**Para más control**: Usa **VPS**
- Control total del servidor
- Costos predecibles
- Requiere más configuración y mantenimiento
