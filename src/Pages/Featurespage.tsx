import DownloadBanner from "../Components/Downloadbanner";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import SmartFeatures from "../Components/Smartfeature";
import WhyChooseUs from "../Components/Whychooseus";



const Features = () => {
  return (
    <>
      <Navbar />
      <WhyChooseUs />
      <SmartFeatures />
      <DownloadBanner/>
      <Footer />
    </>
  );
};

export default Features;