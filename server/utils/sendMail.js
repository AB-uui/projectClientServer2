// const nodemailer = require('nodemailer');      // חבילה לשליחת מיילים 

// const sendMail = async (to, subject, text) => {// הפונקציה מקבלת כתובת מייל, נושא ותוכן המייל
//   if (!to || !subject || !text) {
//     throw new Error('Missing required fields: to, subject, text');
//   }
//   const transporter = nodemailer.createTransport({// יוצר את הטרנספורטר לשליחת המיילים  
//     service: 'gmail',                             // שירות המיילים של גוגל
//     auth: {                                        // פרטי ההתחברות לשירות המיילים
//       user: process.env.EMAIL_USER,               // כתובת המייל ששולחת את המיילים
//       pass: process.env.EMAIL_PASS,               // הסיסמא של המייל שולח את המיילים
//     },
//   });

//   await transporter.sendMail({                     // שולח את המייל
//     from: process.env.EMAIL_USER,                   // כתובת המייל ששולחת את המיילים
//     to,                                            // כתובת המייל של הנמען
//     subject,
//     text,
//   });
// };

// module.exports = sendMail;

const nodemailer = require('nodemailer');
const { google } = require('nodemailer-google-oauth2');

const OAuth2 = google.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,     // Client ID שקיבלת מגוגל
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret שקיבלת מגוגל
  'http://localhost:5000/api/auth/verify-register' // כתובת ה-Redirect URI שלך
);

// הגדר את ה-Refresh Token (תצטרך לקבל אותו בפעם הראשונה - ראה שלב הבא)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

async function main() {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER, // כתובת המייל של Gmail שלך
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // שלח את המייל
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'alizatwito@gmail.com',
      subject: 'הודעת בדיקה מ-Nodemailer',
      text: 'היי, זהו מייל בדיקה!',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main().catch(console.error);