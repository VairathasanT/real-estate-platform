import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}