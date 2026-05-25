import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateContent = async (req, res) => {
    try {
        const { wasteType } = req.body;

        if (!wasteType) {
            return res.status(400).json({ error: 'wasteType is required in the request body' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
Anda adalah seorang ahli daur ulang, pengolahan sampah organik, dan pembuatan produk kerajinan dari barang bekas.
Tolong buatkan 1 ide produk (kerajinan, pupuk, media tanam, atau lainnya) yang bisa dibuat dengan memanfaatkan bahan dasar sampah jenis: "${wasteType}".
Jawablah secara spesifik, praktis, dan kreatif. Gunakan bahasa Indonesia.

Anda HARUS mengembalikan respons HANYA dalam format JSON murni, tanpa awalan markdown \`\`\`json dan tanpa akhiran \`\`\`.
Pastikan struktur JSON yang dikembalikan persis seperti ini:
{
    "title": "Nama ide produk",
    "materials": ["Bahan 1", "Bahan 2", "Bahan 3"],
    "steps": ["Langkah 1", "Langkah 2", "Langkah 3"],
    "time": "Estimasi waktu pembuatan (misal: 1-2 Jam, 3 Minggu)",
    "tips": "Satu tips penting untuk pembuatan",
    "value": "Estimasi harga jual produk (misal: Rp20.000 - Rp50.000 / produk)",
    "marketplaces": ["Target pasar 1", "Target pasar 2"]
}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/ig, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(text);

        return res.json({ details: parsedData });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};