import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/shared/Footer";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts OPEN
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("admin_id");
    navigate("/admin/login");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const sidebarWidth = isMobile
    ? isSidebarOpen
      ? "100%"
      : "0"
    : isSidebarOpen
    ? "290px"
    : "90px";

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <Header
          onLogout={handleLogout}
          onToggleMenu={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      </header>

      {/* Fixed sidebar */}
      <aside
        id="admin-sidebar"
        className={`fixed top-14 sm:top-16 left-0 bottom-0 bg-white overflow-y-auto md:transition-all md:duration-300`}
        style={{ width: sidebarWidth }}
      >
        <div>
          <Sidebar aria-hidden={!isSidebarOpen} isOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Wrap the main and footer together */}
      <div
        className="flex flex-col min-h-screen pt-14 md:pt-16 md:transition-all md:duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <main className="flex-1 p-6 md:p-10 pb-[100px] overflow-y-auto">
          <Outlet />
        </main>

        <footer>
          <Footer variant="copyright" />
        </footer>
      </div>
    </div>
  );
};

export default AdminPage;
