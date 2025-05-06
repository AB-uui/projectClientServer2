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
   //const accessToken = await oauth2Client.getAccessToken();
   //const accessToken = await oauth2Client.refreshAccessToken(); // קבלת Access Token חדש

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
        accessToken: 'ya29.a0AZYkNZjp_5G7RTd-fjA7V13huKipr0FUoRs95HT8iCxiqc43O9kr9kz7dedQoIWFoWDLahpYDOy6O2daSg_K5Taea3OKNyxQlI6sxyGEIvIEFCSSWqLQkB6Ps-_bt6UedIDCzaEN7bVEFGf4-GqtUV2lml7yHjWBVcVsWAvUaCgYKAQgSARESFQHGX2MiVqtOSUaReTPGFfrAkny47w0175'
        //accessToken.token, 
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
