import AdminHeader from "../../components/admin/AdminHeader";


export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}