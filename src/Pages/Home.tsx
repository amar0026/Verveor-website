import AppSection from "../Components/Appsection";
import Footer from "../Components/Footer";
import Hero from "../Components/HeroSection";
import HowItWorks from "../Components/Howitwork";
import Navbar from "../Components/Navbar";
import FeaturesSection from "../Components/FeatureSection";

import PricingSection from "../Components/Price";
import StatsBar from "../Components/Statsbar";
import Testimonials from "../Components/Testimonials";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero/>
      <StatsBar/>
      <FeaturesSection/>
      <HowItWorks/>
     <AppSection/>
     <Testimonials/>
     <PricingSection/>
     <Footer/>
    </>
  );
};

export default Home;