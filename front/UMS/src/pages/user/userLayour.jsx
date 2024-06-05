import Header from "../../components/user/Header";

export default function UserLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
