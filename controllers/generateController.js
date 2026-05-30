import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProducts = async (req, res) => {
    try {
        const { wasteType } = req.body;

        if (!wasteType) {
            return res.status(400).json({ error: 'wasteType is required' });
        }

        const prompt = `
Anda adalah seorang ahli daur ulang, pengolahan sampah organik, dan pembuatan produk kerajinan dari barang bekas.
Tolong berikan 3 ide produk bernilai ekonomi yang bisa dibuat dengan memanfaatkan sampah jenis: "${wasteType}".
Berikan respons dalam format JSON array murni tanpa awalan markdown \`\`\`json.
Formatnya HARUS persis seperti ini:
[
  {
    "id": "1",
    "name": "Nama Produk 1",
    "value": "Rp20.000",
    "difficulty": "Mudah",
    "time": "1 Jam"
  },
  {
    "id": "2",
    "name": "Nama Produk 2",
    "value": "Rp50.000",
    "difficulty": "Sedang",
    "time": "3 Jam"
  },
  {
    "id": "3",
    "name": "Nama Produk 3",
    "value": "Rp15.000",
    "difficulty": "Mudah",
    "time": "30 Menit"
  }
]
`;

        let result;
        let retries = 3;
        for (let i = 0; i < retries; i++) {
            try {
                // Menggunakan model gemini-2.5-flash yang aktif dan didukung penuh
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                result = await model.generateContent(prompt);
                break; // sukses, keluar dari loop
            } catch (err) {
                if (i === retries - 1) throw err; // Jika sudah coba berkali-kali tetap gagal
                console.log(`[Products] Gemini API overloaded (503). Retrying in ${i + 1} seconds...`);
                await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000));
            }
        }

        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/ig, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(text);

        return res.json({ products: parsedData });
    } catch (error) {
        console.error("Error generating products:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const generateSteps = async (req, res) => {
    try {
        const { wasteType, productName } = req.body;

        if (!wasteType || !productName) {
            return res.status(400).json({ error: 'wasteType and productName are required' });
        }

        const prompt = `
Anda adalah seorang ahli daur ulang dan pembuatan produk kerajinan dari barang bekas.
Pengguna ingin membuat "${productName}" menggunakan bahan dasar utama yaitu sampah jenis: "${wasteType}".
Jawablah secara spesifik, praktis, dan kreatif. Gunakan bahasa Indonesia.

Anda HARUS mengembalikan respons HANYA dalam format JSON murni, tanpa awalan markdown \`\`\`json dan tanpa akhiran \`\`\`.
Pastikan struktur JSON yang dikembalikan persis seperti ini:
{
    "title": "${productName}",
    "materials": ["Bahan 1", "Bahan 2", "Bahan 3"],
    "steps": ["Langkah 1", "Langkah 2", "Langkah 3"],
    "time": "Estimasi waktu pembuatan (misal: 1-2 Jam, 3 Minggu)",
    "tips": "Satu tips penting untuk pembuatan",
    "value": "Estimasi harga jual produk (misal: Rp20.000 - Rp50.000 / produk)",
    "marketplaces": ["Target pasar 1", "Target pasar 2"]
}
`;

        let result;
        let retries = 3;
        for (let i = 0; i < retries; i++) {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                result = await model.generateContent(prompt);
                break;
            } catch (err) {
                if (i === retries - 1) throw err;
                console.log(`[Steps] Gemini API overloaded (503). Retrying in ${i + 1} seconds...`);
                await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000));
            }
        }

        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/ig, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(text);

        return res.json({ details: parsedData });
    } catch (error) {
        console.error("Error generating steps:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};