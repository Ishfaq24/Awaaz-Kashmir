const SectionTitle = ({ title, subtitle }) => {
  return (
   <div className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-awaaz-muted">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;