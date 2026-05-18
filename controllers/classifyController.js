const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const organicProducts = [
    { id: 'org-1', name: 'Pupuk Kompos', icon: 'Leaf', value: 'Rp15.000 - Rp30.000', difficulty: 'Mudah', time: '3-4 Minggu' },
    { id: 'org-2', name: 'Eco Enzyme', icon: 'Droplet', value: 'Rp20.000 - Rp50.000', difficulty: 'Sedang', time: '3 Bulan' },
    { id: 'org-3', name: 'Pakan Maggot', icon: 'Bug', value: 'Rp25.000 - Rp40.000', difficulty: 'Sedang', time: '2-3 Minggu' },
    { id: 'org-4', name: 'Media Tanam', icon: 'Sprout', value: 'Rp10.000 - Rp20.000', difficulty: 'Mudah', time: '1-2 Minggu' },
    { id: 'org-5', name: 'Kompos Cair', icon: 'FlaskConical', value: 'Rp20.000 - Rp40.000', difficulty: 'Mudah', time: '2 Minggu' }
];

const anorganicProducts = [
    { id: 'ano-1', name: 'Pot Tanaman Estetik', icon: 'Flower2', value: 'Rp25.000 - Rp50.000', difficulty: 'Mudah', time: '1-2 Jam' },
    { id: 'ano-2', name: 'Eco Brick', icon: 'Box', value: 'Rp5.000 - Rp10.000', difficulty: 'Mudah', time: '1-2 Jam' },
    { id: 'ano-3', name: 'Tempat Alat Tulis', icon: 'PenTool', value: 'Rp15.000 - Rp35.000', difficulty: 'Mudah', time: '1 Jam' },
    { id: 'ano-4', name: 'Lampu Dekorasi', icon: 'Lightbulb', value: 'Rp50.000 - Rp150.000', difficulty: 'Sulit', time: '3-5 Jam' },
    { id: 'ano-5', name: 'Kerajinan Organizer', icon: 'Layers', value: 'Rp30.000 - Rp80.000', difficulty: 'Sedang', time: '2-4 Jam' }
];

export const classifyWaste = async (req, res) => {
    try {
        await sleep(2000);

        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const isOrganic = Math.random() > 0.5;

        if (isOrganic) {
            return res.json({
                category: 'Organik',
                confidence: '96%',
                products: organicProducts
            });
        } else {
            return res.json({
                category: 'Anorganik',
                confidence: '92%',
                products: anorganicProducts
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
