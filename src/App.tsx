import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
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
import Loading from "./pages/Loading";

const App = () => {
  const location = useLocation();
  const { pathname } = location;

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
      <AnimatePresence mode="wait">
        <Routes location={location} key={pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/generate" element={<PageTransition><GeneratePage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><MyProjects /></PageTransition>} />
          <Route path="/projects/:projectId" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/preview/:projectId" element={<PageTransition><PreviewPage /></PageTransition>} />
          <Route
            path="/preview/:projectId/:versionId"
            element={<PageTransition><PreviewPage /></PageTransition>}
          />
          <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
          <Route path="/view/:projectId" element={<PageTransition><View /></PageTransition>} />
          <Route path="/auth/:pathname" element={<PageTransition><AuthPage /></PageTransition>} />
          <Route path="/account/settings" element={<PageTransition><Settings /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          <Route path="/loading" element={<PageTransition><Loading /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      {!heightNavbar && <Footer />}
    </div>
  );
};
export default App;
