// https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

import nodemailer from 'nodemailer';

const sendEmail = (to, subject, body) => {
  if (!to) throw new Error('provide recipient(s) email address');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: subject ?? 'You are in the right place.',
    // text: body ?? 'Hi from your nodemailer project',
    html:
      body ??
      `<h1>Welcome to <a href=${process.env.BLOG_APP_FRONTEND_URL}>Blogs</a> App</h1>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('nodemailer: ' + err);
    } else {
      console.log('nodemailer: Email sent successfully ', info);
    }
  });
};

export default sendEmail;
