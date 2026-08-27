import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio Contact] ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; color: #e4ecf7; background: #0b1020; padding: 24px; border-radius: 12px;">
          <h2 style="color: #00d9b7; margin: 0 0 16px 0; font-size: 18px;">New Contact Form Submission</h2>
          <p style="margin: 4px 0;"><strong style="color: #7a8bad;">Name:</strong> <span style="color: #e4ecf7;">${name}</span></p>
          <p style="margin: 4px 0;"><strong style="color: #7a8bad;">Email:</strong> <span style="color: #e4ecf7;">${email}</span></p>
          <p style="margin: 4px 0;"><strong style="color: #7a8bad;">Subject:</strong> <span style="color: #e4ecf7;">${subject}</span></p>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #7a8bad; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="color: #e4ecf7; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: "Email sent successfully", id: info.messageId });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
