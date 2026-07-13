import { useState, useRef } from "react";
import {
  MapPin,
  FileText,
  RefreshCw,
  TriangleAlert,
  Eye,
  Mic,
  MicOff,
  Type
} from "lucide-react";
import { Link } from "react-router-dom";
import useNearbyReports from "../../hooks/useNearbyReports";
import Modal from "../common/Modal";
import { reverseGeocode } from "../../utils/geocode";

export default function ReportForm({
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  reportId
}) {
  const [alertMessage, setAlertMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN");

  const { data: duplicates = [] } =
  useNearbyReports(reportId);

  const refreshLocation = () => {
    if (!navigator.geolocation) {
      setAlertMessage("Geolocation not supported.");
      return;
    }

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
      () => setAlertMessage("Unable to fetch location.")
    );
  };

  const recognitionRef = useRef(null);

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAlertMessage("Voice typing is not supported in your browser.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }
    
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setDescription((prev) => prev + (prev ? " " : "") + transcript);
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setAlertMessage("Microphone access denied. If you are on a phone using an IP address (like 192.168.x.x), you MUST use HTTPS or localhost.");
        } else if (event.error === 'network') {
          setAlertMessage("Network error. Voice typing requires an active internet connection.");
        } else {
          setAlertMessage(`Voice typing failed: ${event.error}. Ensure your browser supports it and you are on a secure connection.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setAlertMessage(`Failed to start microphone: ${err.message || 'Unknown error'}. Ensure you are on a secure connection.`);
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Duplicate Detection */}

      {duplicates.length > 0 && (
        <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-6">

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-yellow-600" />

            <div>

              <h2 className="font-bold text-lg">
                Similar reports found nearby
              </h2>

              <p className="text-sm text-gray-600">
                Check before creating a duplicate report.
              </p>

            </div>

          </div>

          <div className="space-y-4 mt-6">

            {duplicates.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center rounded-2xl border bg-white p-4"
              >
                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📍 {item.location}
                  </p>

                  <div className="flex gap-4 mt-2 text-sm">

                    <span>
                      {item.distance} km away
                    </span>

                    <span className="font-semibold text-green-600">
                      {item.similarity}% Match
                    </span>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button className="rounded-xl bg-green-600 text-white px-4 py-2">
                    Confirm
                  </button>

                  <Link
                    to={`/reports/${item._id}`}
                    className="rounded-xl border px-4 py-2 flex items-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* Location */}

      <div>

        <label className="text-sm font-semibold mb-3 block">
          Location Details
        </label>

        <div className="flex items-center justify-between rounded-2xl border px-5 py-4 bg-awaaz-background">

          <div className="flex gap-3">

            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">

              <MapPin className="text-awaaz-secondary" />

            </div>

            <div>

              <h3 className="font-semibold">
                {location.address || "Location not detected"}
              </h3>

              <p className="text-sm text-gray-500">

                {location.latitude
                  ? "Location coordinates captured"
                  : "Click refresh to detect"}

              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={refreshLocation}
            className="flex gap-2 items-center text-awaaz-secondary"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

        </div>

      </div>

      {/* Title */}
      <div>
        <label className="text-sm font-semibold mb-3 block">
          Issue Title
        </label>
        <div className="relative">
          <Type
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g. Broken pipe flooding the street"
            className="w-full rounded-2xl border pl-14 pr-5 py-4 bg-awaaz-background focus:outline-none focus:ring-2 focus:ring-awaaz-secondary"
          />
        </div>
      </div>

      {/* Description */}

      <div>

        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold">
            Description <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs bg-awaaz-background border rounded-lg px-2 py-1 outline-none"
          >
            <option value="en-IN">English</option>
            <option value="ur-PK">Urdu</option>
            <option value="ks-IN">Kashmiri</option>
          </select>
        </div>

        <div className="relative">

          <FileText
            className="absolute left-5 top-5 text-gray-400"
            size={20}
          />

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            maxLength={300}
            placeholder="Describe the issue or use voice typing..."
            className="w-full rounded-2xl border pl-14 pr-16 py-5 resize-none bg-awaaz-background focus:outline-none focus:ring-2 focus:ring-awaaz-secondary"
          />
          
          <button
            type="button"
            onClick={toggleListening}
            className={`absolute right-4 top-4 p-2 rounded-xl transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-awaaz-secondary/10 text-awaaz-secondary hover:bg-awaaz-secondary/20'}`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

        </div>

        <div className="flex justify-between mt-3 text-sm text-gray-500">

          <span>
            {isListening ? "Listening..." : "Click the mic to speak your description"}
          </span>

          <span>
            {description.length}/300
          </span>

        </div>

      </div>

      <Modal
        isOpen={!!alertMessage}
        onClose={() => setAlertMessage("")}
        title="Location Error"
        hideCancel={true}
        actionButton={
          <button
            onClick={() => setAlertMessage("")}
            className="px-4 py-2 rounded-xl bg-awaaz-secondary hover:bg-awaaz-secondary/90 text-white font-medium"
          >
            OK
          </button>
        }
      >
        <p className="text-gray-600">{alertMessage}</p>
      </Modal>

    </div>
  );
}