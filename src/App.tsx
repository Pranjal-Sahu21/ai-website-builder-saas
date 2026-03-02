import { Route, Routes } from "react-router-dom";
import PreviewPage from "./pages/PreviewPage";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import MyProjects from "./pages/MyProjects";
import Home from "./pages/Home";
import View from "./pages/View";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/preview/:projectId" element={<PreviewPage />} />
        <Route
          path="/preview/:projectId/:versionId"
          element={<PreviewPage />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
