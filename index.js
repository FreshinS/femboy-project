const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const multer = require('multer');
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5500
const { serverPassword } = require("./config")
const path = require('path');

const app = express()

app.use(cors());
app.use(express.json())
app.use("/auth", authRouter)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Добавляем дату и расширение файла
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    // Возвращаем URL загруженного файла
    res.json({ url: `http://localhost:5500/uploads/${req.file.filename}` });
});

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://FreshinS:${serverPassword}@cluster0.rxv9znl.mongodb.net/?retryWrites=true&w=majority&appName=cluster0`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))       
    } catch (e) {
        console.log(e)
    }
}

start();
