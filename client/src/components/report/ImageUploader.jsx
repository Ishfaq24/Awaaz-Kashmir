import { useRef } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  ImagePlus,
  Camera,
  Trash2,
} from "lucide-react";
import exifr from "exifr";
import { reverseGeocode } from "../../utils/geocode";

export default function ImageUploader({
  image,
  setImage,
  preview,
  setPreview,
  setLocation,
}) {
  const inputRef = useRef(null);

  const handleImage = async (file) => {
    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

    if (setLocation) {
      try {
        const gps = await exifr.gps(file);
        if (gps && gps.latitude && gps.longitude) {
          const { latitude, longitude } = gps;
          const address = await reverseGeocode(latitude, longitude);
          setLocation({
            latitude,
            longitude,
            address,
          });
        }
      } catch (err) {
        console.error("Failed to extract EXIF location", err);
      }
    }
  };

  const onChange = (e) => {
    handleImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Upload Evidence
          </h2>

          <p className="text-awaaz-muted mt-2">
            Upload an image of the civic issue.
          </p>
        </div>
      </div>

      {!preview ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => inputRef.current.click()}
          className="
            border-2
            border-dashed
            border-awaaz-border
            rounded-3xl
            bg-awaaz-background
            h-64 md:h-[420px]
            cursor-pointer
            flex
            flex-col
            justify-center
            items-center
            text-center
            transition-all
            hover:border-awaaz-secondary
          "
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <UploadCloud
              size={70}
              className="text-awaaz-secondary"
            />
          </motion.div>

          <h2 className="text-2xl font-bold mt-8">
            Drag & Drop Image
          </h2>

          <p className="text-awaaz-muted mt-3">
            JPG • PNG • WEBP
          </p>

          <button
            type="button"
            className="mt-8 bg-awaaz-secondary text-white px-7 py-4 rounded-2xl flex items-center gap-3"
          >
            <ImagePlus size={20} />

            Browse Files
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <img
            src={preview}
            alt="Preview"
            className="rounded-3xl w-full h-64 md:h-[420px] object-cover"
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => inputRef.current.click()}
              className="flex-1 rounded-2xl border border-awaaz-border py-4 flex justify-center items-center gap-3 hover:bg-awaaz-background"
            >
              <Camera size={20} />

              Change Image
            </button>

            <button
              type="button"
              onClick={removeImage}
              className="w-16 rounded-2xl border border-awaaz-border text-awaaz-accent flex justify-center items-center hover:bg-awaaz-background"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
}