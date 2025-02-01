import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures", // Stores user profile images
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const uploadProductImage = multer({ storage: productStorage });
export const uploadProfileImage = multer({ storage: profileStorage });
