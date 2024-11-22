const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Ou outro provedor como Outlook, Yahoo, etc.
      auth: {
        user: 'seuemail@gmail.com', // Substitua pelo seu email
        pass: 'suasenha' // Substitua pela senha do seu email
      }
    });

    const mailOptions = {
      from: email,
      to: 'seuemail@gmail.com', // Email para onde as mensagens serão enviadas
      subject: `Mensagem de ${name}`,
      text: message
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      res.status(500).json({ error: 'Erro ao enviar email' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
