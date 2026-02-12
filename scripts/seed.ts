import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('Admin user created');

  // Create sample leads
  const leads = [
    { nombre: 'Carlos Mendoza', email: 'carlos@restaurante.com', telefono: '+57 300 111 2222', tipoNegocio: 'restaurante', fuente: 'chatbot' },
    { nombre: 'Maria Santos', email: 'maria@hotel.com', telefono: '+57 300 333 4444', tipoNegocio: 'hotel', fuente: 'cotizador' },
    { nombre: 'Dr. Roberto Kim', email: 'roberto@clinica.com', telefono: '+57 300 555 6666', tipoNegocio: 'clinica', fuente: 'contacto' },
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.upsert({
      where: { email: leadData.email },
      update: {},
      create: leadData,
    });

    // Create sample cotizacion for each lead
    await prisma.cotizacion.create({
      data: {
        leadId: lead.id,
        tipoSitio: leadData.tipoNegocio === 'restaurante' ? 'profesional' : leadData.tipoNegocio === 'hotel' ? 'premium' : 'profesional',
        caracteristicas: { numeroPaginas: 5, formularioContacto: true, galeriaImagenes: true },
        precioEstimado: leadData.tipoNegocio === 'hotel' ? 2499 : 1299,
        descripcion: `Sitio web para ${leadData.tipoNegocio}`,
        estado: 'pendiente',
      },
    });
  }
  console.log('Sample leads and cotizaciones created');

  // Create sample reunion
  const firstLead = await prisma.lead.findFirst();
  if (firstLead) {
    await prisma.reunion.create({
      data: {
        leadId: firstLead.id,
        fechaReunion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        horaReunion: '10:00',
        estado: 'programada',
        notas: 'Reunion inicial para discutir proyecto',
      },
    });
    console.log('Sample reunion created');
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });