export default function SkeletonCard() {
  return (
    <div className="bg-awaaz-surface rounded-3xl border border-awaaz-border p-6 animate-pulse">

      <div className="w-14 h-14 rounded-xl bg-awaaz-border" />

      <div className="w-28 h-4 bg-awaaz-border rounded mt-6" />

      <div className="w-36 h-8 bg-awaaz-border rounded mt-3" />

      <div className="w-full h-2 bg-awaaz-border rounded mt-8" />

    </div>
  );
}