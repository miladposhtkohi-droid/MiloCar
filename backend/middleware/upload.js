import multer from "multer";
import path from "path";

// Konfigurera multer för bild-uppladdning
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Spara bilder i uploads-mappen
  },
  filename: function (req, file, cb) {
    // Skapa unikt filnamn
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Acceptera bara bild-filer
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
    error.message = "Endast bildfiler är tillåtna";
    cb(error, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

export default upload;
