// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const pdf = require('html-pdf');
// require('dotenv').config();
// const path = require('path');

// // Import Models
// const User = require('./models/User');
// const Summary = require('./models/Summary');
// const Upload = require('./models/Upload');

// // Import Routes
// const authRoutes = require('./routes/auth');
// const uploadRoutes = require('./routes/upload');
// const analyzeRoutes = require('./routes/analyze');

// const app = express();

// // --- CORS Setup ---
// app.use(cors({
//     origin: '*',  // Replace '*' with your frontend URL for better security
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


// // --- In-Memory Store for OTPs ---
// let otpStore = {};

// // --- MongoDB Connection ---
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('✅ MongoDB connected'))
// //   .catch(err => console.error('❌ MongoDB connection error:', err));


// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // --- Multer Setup ---
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// // --- OTP APIs ---
// app.post('/api/send-otp', async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: 'Email is required.' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found.' });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: 'SafeStreet <safestreet3@gmail.com>',
//       to: email,
//       subject: 'Your OTP for SafeStreet Password Reset',
//       text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
//     });

//     res.json({ message: 'OTP sent successfully.' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ error: 'Failed to send OTP.' });
//   }
// });

// app.post('/api/verify-otp', (req, res) => {
//   const { email, otp } = req.body;
//   const record = otpStore[email];

//   if (!record) return res.status(400).json({ error: 'No OTP sent for this email.' });
//   if (record.otp !== otp || Date.now() > record.expiresAt) {
//     return res.status(400).json({ error: 'Invalid or expired OTP.' });
//   }

//   res.json({ message: 'OTP verified successfully.' });
// });

// app.post('/api/reset-password', async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     const record = otpStore[email];

//     if (!record) return res.status(400).json({ error: 'OTP not verified or expired.' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found.' });

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     delete otpStore[email];
//     res.json({ message: 'Password reset successful.' });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     res.status(500).json({ error: 'Server error during password reset.' });
//   }
// });

// // --- Image Analyze Route ---
// app.post('/analyze', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     const form = new FormData();
//     form.append('image', fs.createReadStream(req.file.path));

//     const flaskURL = 'https://2585-34-138-0-195.ngrok-free.app/analyze';
//     const response = await axios.post(flaskURL, form, {
//       headers: { ...form.getHeaders() },
//     });

//     const newSummary = new Summary({
//       imageUrl: `/uploads/${req.file.filename}`,
//       imageType: req.file.mimetype,
//       summary: response.data.summary || 'No summary available',
//       address: req.body.location || response.data.address || 'Address not provided',
//     });

//     await newSummary.save();

//     fs.unlink(req.file.path, err => {
//       if (err) console.error('Error deleting file:', err);
//     });

//     res.json({
//       message: 'Analysis successful!',
//       data: {
//         summary: newSummary.summary,
//         address: newSummary.address,
//         imageUrl: newSummary.imageUrl,
//         _id: newSummary._id,
//         createdAt: newSummary.createdAt,
//       },
//     });

//   } catch (err) {
//     console.error('🔥 Analyze error:', err);
//     if (req.file?.path) fs.unlink(req.file.path, () => {});
//     res.status(500).json({ error: 'Failed to analyze image', details: err.message });
//   }
// });

// // --- Upload New (for Mobile App) ---
// app.post('/api/upload/new', upload.single('image'), async (req, res) => {
//   try {
//     const { userId, location, summary } = req.body;
//     if (!userId || !location || !summary) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     let latitude = null;
//     let longitude = null;

//     try {
//       const geo = await axios.get('https://e18c-183-82-237-45.ngrok-free.app/search', {
//         params: { q: location, format: 'json', limit: 1 },
//         headers: { 'User-Agent': 'SafeStreetApp/1.0 (youremail@example.com)' }
//       });

//       if (geo.data.length > 0) {
//         latitude = parseFloat(geo.data[0].lat);
//         longitude = parseFloat(geo.data[0].lon);
//       }
//     } catch (geoErr) {
//       console.error('Geocoding error:', geoErr.message);
//     }

//     const newUpload = new Upload({
//       userId,
//       imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
//       location,
//       summary,
//       latitude,
//       longitude,
//       status: 'Pending',
//     });

//     await newUpload.save();
//     res.json({
//       message: 'Upload saved successfully!',
//       data: newUpload,
//     });

//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Failed to save upload' });
//   }
// });

// // --- Get All Uploads ---
// app.get('/api/upload/all', async (req, res) => {
//   try {
//     const uploads = await Upload.find().sort({ createdAt: -1 });
//     res.json(uploads);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch uploads' });
//   }
// });

// // --- Mark Upload as Resolved ---
// app.put('/api/upload/resolve/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const upload = await Upload.findById(id);

//     if (!upload) return res.status(404).json({ error: 'Report not found' });

//     upload.status = 'Resolved';
//     await upload.save();
//     res.json({ message: 'Report marked as resolved ✅' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to resolve report' });
//   }
// });

// // --- Get Uploads for a Specific User ---
// app.get('/api/upload/user/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const uploads = await Upload.find({ userId }).sort({ createdAt: -1 });
//     res.json(uploads);
//   } catch (error) {
//     console.error('Error fetching user uploads:', error);
//     res.status(500).json({ error: 'Failed to fetch user uploads' });
//   }
// });



// // --- Generate PDF ---
// app.post('/api/generate-pdf', async (req, res) => {
//   const { html, fileName } = req.body;
//   if (!html || !fileName) {
//     return res.status(400).json({ error: 'Missing HTML or fileName' });
//   }

//   const filePath = path.join(__dirname, 'pdfs', `${fileName}.pdf`);
  
//   pdf.create(html).toFile(filePath, (err, result) => {
//     if (err) {
//       console.error('PDF generation error:', err);
//       return res.status(500).json({ error: 'Failed to create PDF' });
//     }

//     const publicUrl = `${req.protocol}://${req.get('host')}/pdfs/${fileName}.pdf`;
//     return res.status(200).json({ url: publicUrl });
//   });
// });




// app.post('/api/receive-report', async (req, res) => {
//     try {
//         const { imageUrl, location, summary, date, status } = req.body;

//         if (!imageUrl || !location || !summary || !date) {
//             return res.status(400).json({ message: "Missing required report fields" });
//         }

//         const newReport = new Upload({
//             imageUrl,
//             location,
//             summary,
//             date: new Date(date),  // Convert to Date object
//             status: status || "Pending",
//         });

//         await newReport.save();
//         res.status(200).json({ message: "Report received successfully" });
//     } catch (error) {
//         console.error("Error receiving report:", error);
//         res.status(500).json({ message: "Failed to receive report" });
//     }
// });


// // // --- Chatbot (RAG) Endpoint ---
// // app.post('/api/chat', async (req, res) => {
// //   try {
// //     console.log("➡️ Received question from app:", req.body.question);

// //     const response = await axios.post('https://8222-113-193-19-90.ngrok-free.app/chat', {
// //       question: req.body.question,
// //     });

// //     console.log("✅ Flask responded with:", response.data);
// //     res.json(response.data);
// //   } catch (error) {
// //     console.error('❌ Error talking to Flask chatbot server:', error.message);
// //     if (error.response) {
// //       console.error("📦 Flask error response:", error.response.data);
// //     }
// //     res.status(500).json({ error: 'Failed to get response from chatbot server' });
// //   }
// // });




// // --- Register Routes ---
// app.use('/api/auth', authRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/analyze', analyzeRoutes);

// // --- Start Server ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const pdf = require('html-pdf');
require('dotenv').config();
const path = require('path');

// Import Models
const User = require('./models/User');
const Summary = require('./models/Summary');
const Upload = require('./models/Upload');

// Import Routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const analyzeRoutes = require('./routes/analyze');

const app = express();

// --- CORS Setup ---
app.use(cors({
    origin: '*',  // Replace '*' with your frontend URL for better security
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


// --- In-Memory Store for OTPs ---
let otpStore = {};

// --- MongoDB Connection ---
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// --- Multer Setup ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// --- OTP APIs ---
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: 'SafeStreet <safestreet3@gmail.com>',
      to: email,
      subject: 'Your OTP for SafeStreet Password Reset',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ error: 'No OTP sent for this email.' });
  if (record.otp !== otp || Date.now() > record.expiresAt) {
    return res.status(400).json({ error: 'Invalid or expired OTP.' });
  }

  res.json({ message: 'OTP verified successfully.' });
});

app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ error: 'OTP not verified or expired.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    delete otpStore[email];
    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Server error during password reset.' });
  }
});

// --- Image Analyze Route ---
app.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const form = new FormData();
    form.append('image', fs.createReadStream(req.file.path));

    const flaskURL = 'https://0e4f-34-106-97-9.ngrok-free.app/analyze';
    const response = await axios.post(flaskURL, form, {
      headers: { ...form.getHeaders() },
    });

    const newSummary = new Summary({
      imageUrl: `/uploads/${req.file.filename}`,
      imageType: req.file.mimetype,
      summary: response.data.summary || 'No summary available',
      address: req.body.location || response.data.address || 'Address not provided',
    });

    await newSummary.save();

    fs.unlink(req.file.path, err => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({
      message: 'Analysis successful!',
      data: {
        summary: newSummary.summary,
        address: newSummary.address,
        imageUrl: newSummary.imageUrl,
        _id: newSummary._id,
        createdAt: newSummary.createdAt,
      },
    });

  } catch (err) {
    console.error('🔥 Analyze error:', err);
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    res.status(500).json({ error: 'Failed to analyze image', details: err.message });
  }
});

// --- Upload New (for Mobile App) ---
app.post('/api/upload/new', upload.single('image'), async (req, res) => {
  try {
    const { userId, location, summary } = req.body;
    if (!userId || !location || !summary) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let latitude = null;
    let longitude = null;

    try {
      const geo = await axios.get('https://e18c-183-82-237-45.ngrok-free.app/search', {
        params: { q: location, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'SafeStreetApp/1.0 (youremail@example.com)' }
      });

      if (geo.data.length > 0) {
        latitude = parseFloat(geo.data[0].lat);
        longitude = parseFloat(geo.data[0].lon);
      }
    } catch (geoErr) {
      console.error('Geocoding error:', geoErr.message);
    }

    const newUpload = new Upload({
      userId,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
      location,
      summary,
      latitude,
      longitude,
      status: 'Pending',
    });

    await newUpload.save();
    res.json({
      message: 'Upload saved successfully!',
      data: newUpload,
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to save upload' });
  }
});

// --- Get All Uploads ---
app.get('/api/upload/all', async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

// --- Mark Upload as Resolved ---
app.put('/api/upload/resolve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Upload.findById(id);

    if (!upload) return res.status(404).json({ error: 'Report not found' });

    upload.status = 'Resolved';
    await upload.save();
    res.json({ message: 'Report marked as resolved ✅' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resolve report' });
  }
});

// --- Get Uploads for a Specific User ---
app.get('/api/upload/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const uploads = await Upload.find({ userId }).sort({ createdAt: -1 });
    res.json(uploads);
  } catch (error) {
    console.error('Error fetching user uploads:', error);
    res.status(500).json({ error: 'Failed to fetch user uploads' });
  }
});



// --- Generate PDF ---
app.post('/api/generate-pdf', async (req, res) => {
  const { html, fileName } = req.body;
  if (!html || !fileName) {
    return res.status(400).json({ error: 'Missing HTML or fileName' });
  }

  const filePath = path.join(__dirname, 'pdfs', `${fileName}.pdf`);
  
  pdf.create(html).toFile(filePath, (err, result) => {
    if (err) {
      console.error('PDF generation error:', err);
      return res.status(500).json({ error: 'Failed to create PDF' });
    }

    const publicUrl = `${req.protocol}://${req.get('host')}/pdfs/${fileName}.pdf`;
    return res.status(200).json({ url: publicUrl });
  });
});




app.post('/api/receive-report', async (req, res) => {
    try {
        const { imageUrl, location, summary, date, status } = req.body;

        if (!imageUrl || !location || !summary || !date) {
            return res.status(400).json({ message: "Missing required report fields" });
        }

        const newReport = new Upload({
            imageUrl,
            location,
            summary,
            date: new Date(date),  // Convert to Date object
            status: status || "Pending",
        });

        await newReport.save();
        res.status(200).json({ message: "Report received successfully" });
    } catch (error) {
        console.error("Error receiving report:", error);
        res.status(500).json({ message: "Failed to receive report" });
    }
});


// // --- Chatbot (RAG) Endpoint ---
// app.post('/api/chat', async (req, res) => {
//   try {
//     console.log("➡️ Received question from app:", req.body.question);

//     const response = await axios.post('https://8222-113-193-19-90.ngrok-free.app/chat', {
//       question: req.body.question,
//     });

//     console.log("✅ Flask responded with:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error('❌ Error talking to Flask chatbot server:', error.message);
//     if (error.response) {
//       console.error("📦 Flask error response:", error.response.data);
//     }
//     res.status(500).json({ error: 'Failed to get response from chatbot server' });
//   }
// });




// --- Register Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analyze', analyzeRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


