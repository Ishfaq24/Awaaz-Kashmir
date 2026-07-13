import Breadcrumb from "./Breadcrumb";

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  action,
}) {
  return (
    <div className="flex items-center justify-between">

      <div>

        {breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} />
        )}

        <h1 className="text-4xl font-bold mt-2">
          {title}
        </h1>

        <p className="text-awaaz-muted mt-2">
          {subtitle}
        </p>

      </div>

      {action}

    </div>
  );
}