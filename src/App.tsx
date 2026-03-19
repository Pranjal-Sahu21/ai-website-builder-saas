import { Route, Routes, useLocation } from "react-router-dom";
import PreviewPage from "./pages/PreviewPage";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";
import Home from "./pages/Home";
import View from "./pages/View";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import GeneratePage from "./pages/GeneratePage";
import { Toaster } from "sonner";
import AuthPage from "./pages/auth/AuthPage";
import Settings from "./pages/Settings";

const App = () => {
  const { pathname } = useLocation();

  const heightNavbar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/login");

  return (
    <div>
      <Toaster />
      {!heightNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/preview/:projectId" element={<PreviewPage />} />
        <Route
          path="/preview/:projectId/:versionId"
          element={<PreviewPage />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path="/auth/:pathname" element={<AuthPage />} />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!heightNavbar && <Footer />}
    </div>
  );
};

export default App;
