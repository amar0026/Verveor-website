

import Abouthero from "../Components/Abouthero";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import OurStory from "../Components/Ourstory";
import TeamSection from "../Components/Teamsection";



const About = () => {
  return (
    <>
      <Navbar />
      <Abouthero/>
      <OurStory/>
      <TeamSection/>
      <Footer />
    </>
  );
};

export default About;