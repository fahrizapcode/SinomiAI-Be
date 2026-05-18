
const productDetails = {
    'org-1': {
        title: 'Pembuatan Pupuk Kompos',
        materials: ['Wadah tertutup berlubang udara', 'Sampah organik cacah', 'Tanah atau daun kering', 'Air atau cairan EM4'],
        steps: [
            'Siapkan wadah tertutup yang memiliki lubang udara.',
            'Cacah sampah organik menjadi ukuran lebih kecil agar cepat terurai.',
            'Masukkan selapis tanah, lalu lapisan sampah organik, dan tutup kembali dengan tanah (atau daun kering).',
            'Percikkan sedikit air atau cairan EM4 untuk mempercepat proses.',
            'Aduk kompos setiap minggu. Kompos siap panen dalam 3-4 minggu.'
        ],
        time: '3-4 Minggu',
        tips: 'Jaga kelembaban kompos, jangan terlalu basah atau terlalu kering.',
        value: 'Rp15.000 - Rp30.000 / karung (5kg)',
        marketplaces: ['Petani Lokal', 'Komunitas Berkebun', 'Marketplace Online']
    },
    'org-2': {
        title: 'Pembuatan Eco Enzyme',
        materials: ['Sisa kulit buah/sayur', 'Gula merah/molase', 'Air', 'Wadah kedap udara'],
        steps: [
            'Siapkan sisa kulit buah, gula merah (molase), dan air dengan rasio 3:1:10.',
            'Masukkan ke dalam botol plastik atau wadah kedap udara.',
            'Tutup rapat, buka setiap hari selama bulan pertama untuk membuang gas.',
            'Tunggu selama 3 bulan, lalu saring cairannya.',
            'Cairan eco-enzyme siap digunakan sebagai pembersih alami atau pupuk.'
        ],
        time: '3 Bulan',
        tips: 'Gunakan wadah plastik, jangan kaca karena gas bisa membuatnya pecah.',
        value: 'Rp20.000 - Rp50.000 / botol',
        marketplaces: ['Komunitas Zero Waste', 'Toko Organik', 'Marketplace Online']
    },
    'org-3': {
        title: 'Budidaya Pakan Maggot',
        materials: ['Bibit BSF', 'Sampah organik', 'Biopond (wadah budidaya)'],
        steps: [
            'Siapkan biopond atau wadah budidaya yang ternaungi.',
            'Masukkan sampah organik sisa makanan.',
            'Tebarkan bibit larva BSF ke dalam wadah.',
            'Tambahkan sampah organik secara berkala sebagai makanan maggot.',
            'Panen maggot setelah 2-3 minggu sebelum menjadi prepupa.'
        ],
        time: '2-3 Minggu',
        tips: 'Pastikan sirkulasi udara baik dan hindari genangan air.',
        value: 'Rp25.000 - Rp40.000 / kg',
        marketplaces: ['Peternak Ayam', 'Peternak Lele', 'Penghobi Burung']
    },
    'org-4': {
        title: 'Pembuatan Media Tanam',
        materials: ['Sampah organik kering', 'Sekam bakar', 'Tanah subur'],
        steps: [
            'Hancurkan sampah organik kering seperti daun dan ranting kecil.',
            'Campurkan dengan tanah dan sekam bakar dengan perbandingan 1:1:1.',
            'Aduk rata hingga tercampur sempurna.',
            'Simpan dalam karung dan diamkan selama 1-2 minggu.',
            'Media tanam siap dikemas dan digunakan.'
        ],
        time: '1-2 Minggu',
        tips: 'Campurkan pupuk kandang untuk hasil yang lebih maksimal.',
        value: 'Rp10.000 - Rp20.000 / karung',
        marketplaces: ['Toko Tanaman Hias', 'Komunitas Berkebun', 'Marketplace Online']
    },
    'org-5': {
        title: 'Pembuatan Kompos Cair',
        materials: ['Sisa sayuran/buah busuk', 'Ember tertutup', 'Air cucian beras', 'Larutan EM4'],
        steps: [
            'Kumpulkan sisa sayuran dan buah busuk ke dalam ember tertutup.',
            'Tambahkan air cucian beras dan larutan EM4.',
            'Tutup rapat dan diamkan selama 1-2 minggu (fermentasi).',
            'Saring airnya.',
            'Encerkan dengan air bersih sebelum disiram ke tanaman.'
        ],
        time: '2 Minggu',
        tips: 'Aroma asam segar menandakan fermentasi berhasil.',
        value: 'Rp20.000 - Rp40.000 / liter',
        marketplaces: ['Toko Pertanian', 'Komunitas Berkebun', 'Marketplace Online']
    },
    'ano-1': {
        title: 'Kreasi Pot Tanaman Estetik',
        materials: ['Botol plastik bekas', 'Cutter/Gunting', 'Cat akrilik', 'Kuas'],
        steps: [
            'Bersihkan botol plastik bekas minuman ukuran besar.',
            'Potong botol menjadi dua bagian (gunakan bagian bawahnya).',
            'Bentuk pinggiran potongan menjadi pola hewan atau melengkung.',
            'Cat bagian luar botol dengan warna menarik dan biarkan kering.',
            'Lubangi bagian bawah untuk drainase air, pot siap ditanami.'
        ],
        time: '1-2 Jam',
        tips: 'Gunakan cat dasar putih sebelum melukis motif agar warna lebih terang.',
        value: 'Rp25.000 - Rp50.000 / produk',
        marketplaces: ['Toko Tanaman Hias', 'Bazar Kerajinan', 'Marketplace Online']
    },
    'ano-2': {
        title: 'Pembuatan Eco Brick',
        materials: ['Botol plastik bekas air mineral', 'Sampah plastik lembaran', 'Tongkat pendorong'],
        steps: [
            'Cuci bersih dan keringkan botol plastik serta sampah plastik.',
            'Potong kecil-kecil sampah plastik lembaran.',
            'Masukkan potongan plastik ke dalam botol.',
            'Padatkan menggunakan tongkat hingga botol terisi penuh dan keras.',
            'Eco brick siap dirangkai menjadi furnitur atau dinding.'
        ],
        time: '1-2 Jam',
        tips: 'Pastikan tidak ada sampah organik atau basah yang masuk ke botol.',
        value: 'Rp5.000 - Rp10.000 / botol',
        marketplaces: ['Bank Sampah', 'Komunitas Eco Brick', 'Proyek Bangunan Ramah Lingkungan']
    },
    'ano-3': {
        title: 'Kreasi Tempat Alat Tulis',
        materials: ['Kaleng bekas/Botol plastik', 'Kain perca/Kertas kado', 'Lem kuat', 'Hiasan (kancing, pita)'],
        steps: [
            'Bersihkan kaleng atau botol plastik bekas.',
            'Ukur dan potong kain perca atau kertas kado sesuai tinggi wadah.',
            'Oleskan lem secara merata dan tempelkan kain/kertas menutupi wadah.',
            'Lipat sisa kain ke bagian dalam agar rapi.',
            'Tambahkan hiasan pita atau kancing di bagian luar.'
        ],
        time: '1 Jam',
        tips: 'Gunakan lem tembak untuk hasil yang lebih kuat dan tahan lama.',
        value: 'Rp15.000 - Rp35.000 / produk',
        marketplaces: ['Koperasi Sekolah', 'Toko Alat Tulis', 'Marketplace Online']
    },
    'ano-4': {
        title: 'Pembuatan Lampu Dekorasi',
        materials: ['Kardus bekas/Botol plastik', 'Fitting lampu', 'Kabel dan colokan', 'Lampu LED', 'Lem tembak'],
        steps: [
            'Potong kardus bekas membentuk pola segi lima atau lingkaran banyak sisi.',
            'Susun dan lem potongan tersebut hingga membentuk struktur bola berongga.',
            'Buat lubang di bagian atas untuk kabel dan dudukan lampu.',
            'Pasang kabel, fitting, dan lampu LED hemat energi di dalamnya.',
            'Gantung di ruangan untuk pencahayaan estetik yang hangat.'
        ],
        time: '3-5 Jam',
        tips: 'Gunakan lampu LED agar tidak menghasilkan panas berlebih pada kardus.',
        value: 'Rp50.000 - Rp150.000 / produk',
        marketplaces: ['Toko Dekorasi Rumah', 'Cafe/Resto', 'Marketplace Online']
    },
    'ano-5': {
        title: 'Pembuatan Kerajinan Organizer',
        materials: ['Kardus sepatu bekas', 'Kertas pelapis/Kain', 'Lem', 'Gunting/Cutter'],
        steps: [
            'Siapkan kardus sepatu bekas yang kokoh.',
            'Buat sekat-sekat dari potongan kardus lain sesuai ukuran yang diinginkan.',
            'Lapisi semua bagian kardus dengan kertas pelapis atau kain.',
            'Rakit dan lem sekat-sekat ke dalam kardus utama.',
            'Organizer siap digunakan untuk merapikan laci atau meja.'
        ],
        time: '2-4 Jam',
        tips: 'Ukur laci atau meja terlebih dahulu agar ukuran organizer pas.',
        value: 'Rp30.000 - Rp80.000 / produk',
        marketplaces: ['Toko Perabotan', 'Bazar Kerajinan', 'Marketplace Online']
    }
};

export const generateContent = async (req, res) => {
    try {
        const { productId } = req.body;
        await sleep(1500);

        if (!productId || !productDetails[productId]) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.json({ details: productDetails[productId] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};