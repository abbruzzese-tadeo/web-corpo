// /pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, company, message } = req.body;

  // Validación básica
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // 🧠 Configuración del transporte (SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail", // también puede ser: "hotmail", "outlook", etc.
      auth: {
        user: process.env.CONTACT_EMAIL, // 👉 tu correo (oculto en .env)
        pass: process.env.CONTACT_PASSWORD, // 👉 contraseña de app (no tu clave normal)
      },
    });

    // ✉️ Contenido del correo
    const mailOptions = {
      from: `"Website Contact" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_RECEIVER || process.env.CONTACT_EMAIL, // a quién llega
      subject: `Nuevo mensaje del sitio — ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${
          company
            ? `<p><strong>Empresa:</strong> ${company}</p>`
            : ""
        }
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
        <hr />
        <p>Enviado desde el formulario de contacto de Further Corporate.</p>
      `,
    };

    // 🚀 Enviar el correo
    await transporter.sendMail(mailOptions);

    console.log("✅ Email enviado correctamente.");
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error enviando correo:", err);
    return res.status(500).json({ error: "Error sending email" });
  }
}
