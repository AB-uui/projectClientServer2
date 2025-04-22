const multer = require('multer');
const path = require('path');

// הגדרת אחסון עם שם קובץ מיוחד
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();

    // ניקוי שם הפוסט: רווחים -> מקפים, תווים מיוחדים -> הסרה
    const rawTitle = req.body.title || 'untitled';
    const cleanTitle = rawTitle
      .toLowerCase()
      .replace(/\s+/g, '-')         // רווחים למקפים
      .replace(/[^a-z0-9\-]/g, ''); // הסרת תווים לא חוקיים
    const ext = path.extname(file.originalname);
    const filename = `${cleanTitle}-${timestamp}${ext}`;

    cb(null, filename);
  }
});

const upload = multer({ storage });
module.exports = upload;
