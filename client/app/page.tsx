import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import UploadSection from "../components/UploadSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureCards />
      <UploadSection />
    </>
  );
}
