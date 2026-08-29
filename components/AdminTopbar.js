export default function AdminTopbar({ title, action }) {
  return (
    <div className="admin-topbar">
      <h1>{title}</h1>
      {action}
    </div>
  );
}
