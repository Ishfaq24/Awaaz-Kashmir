import { useState, useEffect } from "react";

import SectionTitle from "../components/ui/SectionTitle";
import ImageUploader from "../components/report/ImageUploader";
import ReportForm from "../components/report/ReportForm";
import TipsCard from "../components/report/TipsCard";
import AnalyzeButton from "../components/report/AnalyzeButton";
import { reverseGeocode } from "../utils/geocode";

export default function UploadIssue() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "",
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await reverseGeocode(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          address,
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
            setLocation={setLocation}
          />
        </div>

        <div className="space-y-6">
          <TipsCard />
        </div>
      </div>

      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border shadow-sm p-4 md:p-8">
      <ReportForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        location={location}
        setLocation={setLocation}
      />
        <div className="mt-10">
          <AnalyzeButton
            image={image}
            preview={preview}
            title={title}
            description={description}
            location={location}
          />
        </div>
      </div>
    </div>
  );
}