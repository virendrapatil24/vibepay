import Hero from "../components/Hero";
import Features from "../components/Features";
import FAQs from "../components/FAQs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface LandingPageProps {
  user: boolean;
}

const LandingPage = ({ user }: LandingPageProps) => {
  return (
    <>
      <Navbar user={user} />
      <Hero />
      <Features />
      <FAQs />
      <Footer />
    </>
  );
};

export default LandingPage;
