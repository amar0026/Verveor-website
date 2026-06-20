import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Featurespage from "./Pages/Featurespage";
import Contactpage from "./Pages/Contactpage";
import About from "./Pages/About";
import Pricepage from "./Pages/Pricepage";
import HowItWorks from "./Pages/Howitsworkpage";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Featurespage />} />
        <Route path="/pricing" element={<Pricepage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;