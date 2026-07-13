import { useUser } from "@clerk/clerk-react";

import useProfile from "../hooks/useProfile";
import Loading from "../components/common/Loading";

import {
  User,
  ShieldCheck,
  Trophy,
  ClipboardList,
  CheckCircle2,
  Star,
  Settings,
} from "lucide-react";

export default function Profile() {
  const { user } = useUser();

  const {
    data,
    isLoading,
  } = useProfile(user?.id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full overflow-hidden bg-awaaz-background flex items-center justify-center">

            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User
                size={50}
                className="text-awaaz-secondary"
              />
            )}

          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {user?.fullName || "Citizen"}
            </h1>

            <p className="text-awaaz-muted mt-2">
              {data?.role || "Community Contributor"}
            </p>

            <div className="flex gap-3 mt-5 flex-wrap">

              <span className="px-4 py-2 rounded-full bg-awaaz-background text-awaaz-secondary font-medium">
                Trust Score {data?.trustScore ?? 0}%
              </span>

              <span className="px-4 py-2 rounded-full bg-awaaz-background text-awaaz-muted font-medium">
                Level {data?.level ?? 1}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <ProfileCard
          title="Reports"
          value={data?.reports ?? 0}
          icon={ClipboardList}
          color="bg-awaaz-background text-awaaz-secondary"
        />

        <ProfileCard
          title="Resolved"
          value={data?.resolved ?? 0}
          icon={CheckCircle2}
          color="bg-awaaz-background text-awaaz-secondary"
        />

        <ProfileCard
          title="Trust"
          value={`${data?.trustScore ?? 0}%`}
          icon={ShieldCheck}
          color="bg-awaaz-background text-awaaz-accent"
        />

        <ProfileCard
          title="Badges"
          value={data?.badges ?? 0}
          icon={Trophy}
          color="bg-awaaz-background text-awaaz-muted"
        />

      </div>

      {/* Bottom */}

      <div className="grid xl:grid-cols-2 gap-8">

        {/* Achievements */}

        <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Achievements
          </h2>

          <div className="space-y-5">

            {(data?.achievements || [
              {
                title: "Top Reporter",
                description: "Submitted verified reports.",
              },
              {
                title: "Trusted Citizen",
                description: "Maintained high trust score.",
              },
              {
                title: "Community Hero",
                description: "Resolved multiple civic issues.",
              },
            ]).map((item, index) => (
              <Achievement
                key={index}
                title={item.title}
                desc={item.description}
              />
            ))}

          </div>

        </div>

        {/* Settings */}

        <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Settings
          </h2>

          <div className="space-y-4">

            <Setting title="Edit Profile" />

            <Setting title="Notification Preferences" />

            <Setting title="Privacy" />

            <Setting title="Language" />

            <Setting title="Account Security" />

          </div>

        </div>

      </div>

    </div>
  );
}

function ProfileCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6 hover:shadow-lg transition">

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={22} />
      </div>

      <p className="text-awaaz-muted mt-5">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-1">
        {value}
      </h2>

    </div>
  );
}

function Achievement({
  title,
  desc,
}) {
  return (
    <div className="flex gap-4">

      <div className="w-11 h-11 rounded-xl bg-awaaz-background flex items-center justify-center">

        <Star
          className="text-awaaz-accent"
          size={20}
        />

      </div>

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-awaaz-muted">
          {desc}
        </p>

      </div>

    </div>
  );
}

function Setting({
  title,
}) {
  return (
    <button className="w-full border border-awaaz-border rounded-2xl p-5 flex justify-between items-center hover:bg-awaaz-background transition">

      <span className="font-medium">
        {title}
      </span>

      <Settings size={18} />

    </button>
  );
}