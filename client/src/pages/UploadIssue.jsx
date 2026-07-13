import { useState, useEffect } from "react";

import SectionTitle from "../components/ui/SectionTitle";
import ImageUploader from "../components/report/ImageUploader";
import ReportForm from "../components/report/ReportForm";
import TipsCard from "../components/report/TipsCard";
import AnalyzeButton from "../components/report/AnalyzeButton";
import UploadProgress from "../components/report/UploadProgress";

export default function UploadIssue() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "",
  });

  const [uploading, setUploading] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "Current Location",
        });
      },
      () => {
        console.log("Location permission denied");
      }
    );
  }, []);

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Report a Civic Issue"
        subtitle="Upload an image and let AI identify the issue."
      />

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ImageUploader
            image={image}
            setImage={setImage}
            preview={preview}
            setPreview={setPreview}
          />
        </div>

        <div className="space-y-6">
          <UploadProgress
            uploading={uploading}
            progress={progress}
          />

          <TipsCard />
        </div>
      </div>

      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-8">
      <ReportForm
    description={description}
    setDescription={setDescription}
    location={location}
    setLocation={setLocation}
/>
        <div className="mt-10">
<AnalyzeButton
  image={image}
  description={description}
  location={location}
  setUploading={setUploading}
  setProgress={setProgress}
/>
        </div>
      </div>
    </div>
  );
}