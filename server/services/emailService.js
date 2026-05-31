import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transport configuration error:', error.message);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function sendContactEmail(data) {
  const { name, email, phone, comment } = data;

  // Email to site owner
  const ownerMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Новая заявка с сайта от ${name}`,
    html: `
      <h2>Новая заявка с контактной формы</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${comment}</p>
      <hr>
      <p><small>Отправлено: ${new Date().toLocaleString()}</small></p>
    `
  };

  // Email copy to user
  const userMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: 'Спасибо за вашу заявку',
    html: `
      <h2>Спасибо за интерес!</h2>
      <p>Здравствуйте, ${name}!</p>
      <p>Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
      <hr>
      <h3>Ваши данные:</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${comment}</p>
      <hr>
      <p><small>Это автоматическое письмо, пожалуйста, не отвечайте на него.</small></p>
    `
  };

  try {
    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    console.log('Owner email sent successfully');

    await transporter.sendMail(userMailOptions);
    console.log('User email sent successfully');

    return { success: true };
  } catch (error) {
    console.error('Error sending emails:', error);
    throw new Error('Failed to send email');
  }
}
