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
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// הגדרת OAuth2 עם הפרטים מהסביבה
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,     // Client ID מגוגל
  process.env.GOOGLE_CLIENT_SECRET // Client Secret מגוגל
  // 'http://localhost:5000' // Redirect URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
// פונקציה לשליחת מייל
const sendMail = async (to, subject, text) => {
  try {
    // קבלת Access Token
  // const accessToken = await oauth2Client.getAccessToken();
   //console.log('Access Token:', accessToken.token);
    // יצירת טרנספורטר לשליחת מיילים
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER, // כתובת המייל ששולחת
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: 'ya29.a0AZYkNZirfeZ0ZLiwFm_md96C7KzP2TEl5-SikDqctQVAzDnny-fmtssrn7JrtMT3rrKccEbdwDQYo-XCo8ZtEkLPmKWzG7cS2_wOtt_zvhyQlhUZvMoCy9Qov0Ju7ECjDqsPhBFbgyVQFDB5jrGo6F4OZvrDkjovQnBZ29WgYwaCgYKAVYSARESFQHGX2MilIYSIgFwyuMSACh_AQOU2w0177',//accessToken.token,
      },
    });

    // הגדרת פרטי המייל
    const mailOptions = {
      from: process.env.EMAIL_USER, // כתובת המייל ששולחת
      to,                           // כתובת המייל של הנמען
      subject,                      // נושא המייל
      text,                         // תוכן המייל
    };

    // שליחת המייל
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendMail;
