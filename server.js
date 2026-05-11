const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Helper to simulate delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Endpoint to classify waste
app.post('/api/classify', upload.single('image'), async (req, res) => {
  try {
    // Simulate processing time
    await sleep(4000);

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const isOrganic = Math.random() > 0.5;

    if (isOrganic) {
      return res.json({
        category: 'Organik',
        confidence: '96%',
        processing: {
          title: 'Pembuatan Kompos Padat',
          steps: [
            'Siapkan wadah tertutup yang memiliki lubang udara.',
            'Cacah sampah organik menjadi ukuran lebih kecil agar cepat terurai.',
            'Masukkan selapis tanah, lalu lapisan sampah organik, dan tutup kembali dengan tanah (atau daun kering).',
            'Percikkan sedikit air atau cairan EM4 untuk mempercepat proses.',
            'Aduk kompos setiap minggu. Kompos siap panen dalam 3-4 minggu.'
          ]
        },
        value: 'Rp15.000 - Rp30.000 / karung (5kg)',
        marketplaces: ['Petani Lokal', 'Komunitas Berkebun', 'Marketplace Online']
      });
    } else {
      return res.json({
        category: 'Anorganik',
        confidence: '92%',
        processing: {
          title: 'Kerajinan Tas Belanja dari Plastik Lembaran',
          steps: [
            'Kumpulkan dan bersihkan sampah plastik kemasan (seperti bungkus kopi).',
            'Potong plastik menjadi lembaran-lembaran dengan ukuran seragam.',
            'Anyam atau jahit lembaran plastik tersebut hingga membentuk pola dasar tas.',
            'Tambahkan kain furing di bagian dalam dan pasang tali pegangan yang kuat.',
            'Rapikan jahitan, dan tas ramah lingkungan siap digunakan atau dijual.'
          ]
        },
        value: 'Rp35.000 - Rp100.000 / produk',
        marketplaces: ['UMKM Lokal', 'Marketplace Online', 'Pameran Ramah Lingkungan']
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to generate recommendation explicitly (if needed separately)
app.post('/api/generate', express.json(), async (req, res) => {
  try {
    const { category } = req.body;
    await sleep(1000);

    if (category === 'Organik') {
      const organicRecs = [
        {
          title: 'Pembuatan Eco-Enzyme',
          steps: [
            'Siapkan sisa kulit buah, gula merah (molase), dan air dengan rasio 3:1:10.',
            'Masukkan ke dalam botol plastik atau wadah kedap udara.',
            'Tutup rapat, buka setiap hari selama bulan pertama untuk membuang gas.',
            'Tunggu selama 3 bulan, lalu saring cairannya.',
            'Cairan eco-enzyme siap digunakan sebagai pembersih alami atau pupuk.'
          ]
        },
        {
          title: 'Pupuk Cair Organik',
          steps: [
            'Kumpulkan sisa sayuran dan buah busuk ke dalam ember tertutup.',
            'Tambahkan air cucian beras dan larutan EM4.',
            'Tutup rapat dan diamkan selama 1-2 minggu (fermentasi).',
            'Saring airnya, encerkan dengan air bersih sebelum disiram ke tanaman.'
          ]
        }
      ];
      return res.json({ processing: organicRecs[Math.floor(Math.random() * organicRecs.length)] });
    } else {
      const inorganicRecs = [
        {
          title: 'Pot Bunga Estetik dari Botol Plastik',
          steps: [
            'Bersihkan botol plastik bekas minuman ukuran besar.',
            'Potong botol menjadi dua bagian (gunakan bagian bawahnya).',
            'Bentuk pinggiran potongan menjadi pola hewan atau melengkung.',
            'Cat bagian luar botol dengan warna menarik dan biarkan kering.',
            'Lubangi bagian bawah untuk drainase air, pot siap ditanami.'
          ]
        },
        {
          title: 'Lampu Hias dari Kardus Bekas',
          steps: [
            'Potong kardus bekas membentuk pola segi lima atau lingkaran banyak sisi.',
            'Susun dan lem potongan tersebut hingga membentuk struktur bola berongga.',
            'Buat lubang di bagian atas untuk kabel dan dudukan lampu.',
            'Pasang lampu LED hemat energi di dalamnya.',
            'Gantung di ruangan untuk pencahayaan estetik yang hangat.'
          ]
        }
      ];
      return res.json({ processing: inorganicRecs[Math.floor(Math.random() * inorganicRecs.length)] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`SinomiAI Backend running on port ${port}`);
});
