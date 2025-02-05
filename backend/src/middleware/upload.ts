import multer from 'multer';

// Konfigurasi multer dengan MemoryStorage
const storage = multer.memoryStorage(); // ✅ Inisialisasi MemoryStorage

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Batas ukuran file: 5MB
    }
});

export default upload;
