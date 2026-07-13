export default function Avatar({ name = "Ishfaq" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-awaaz-secondary flex items-center justify-center text-white font-semibold">
        {name.charAt(0).toUpperCase()}
      </div>

      <div>
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm text-awaaz-muted">Citizen</p>
      </div>
    </div>
  );
}