import { useState } from "react";
import { Camera, Upload } from "lucide-react";

export default function ResolutionUploader({
  onUpload,
}) {
  const [preview, setPreview] =
    useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(
      URL.createObjectURL(file)
    );

    onUpload(file);
  };

  return (
    <div className="rounded-3xl border bg-white p-6">

      <h2 className="text-xl font-bold mb-6">
        Resolution Evidence
      </h2>

      {preview ? (
        <img
          src={preview}
          className="w-full h-72 rounded-2xl object-cover mb-5"
        />
      ) : (
        <div className="h-72 rounded-2xl border-2 border-dashed flex flex-col justify-center items-center text-gray-400">

          <Camera size={40} />

          <p className="mt-4">
            Upload completion photo
          </p>

        </div>
      )}

      <label className="mt-5 inline-flex items-center gap-3 bg-awaaz-secondary text-white px-5 py-3 rounded-xl cursor-pointer">

        <Upload size={18} />

        Choose Image

        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImage}
        />

      </label>

    </div>
  );
}