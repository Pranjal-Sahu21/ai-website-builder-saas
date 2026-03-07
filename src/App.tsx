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
import LoginPage from "./pages/LoginPage";
import GeneratePage from "./pages/GeneratePage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { pathname } = useLocation();

  const heightNavbar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/") ||
    pathname.startsWith("/login");

  return (
    <div>
      {!heightNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <GeneratePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview/:projectId"
          element={
            <ProtectedRoute>
              <PreviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview/:projectId/:versionId"
          element={
            <ProtectedRoute>
              <PreviewPage />
            </ProtectedRoute>
          }
        />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!heightNavbar && <Footer />}
    </div>
  );
};

export default App;
