import LandingPage from "@/components/LandingPageAnmol";
import FeaturePage from "@/components/FeaturesAnmol";
import Assessments from "@/components/Assessments";
import PersonasPage from "@/components/PersonasPageAnmol";
import Partnership from "@/components/PartnershipsPage";
import TestimonialsPage from "@/components/TestimonialsPage";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Landing section with padding if needed */}
      <div className="w-full">
        <LandingPage />
      </div>

      {/* Full-width section - let components handle their own backgrounds */}
      <div className="w-full">
        <FeaturePage />
        <PersonasPage />
        <Partnership />
        <TestimonialsPage />
        <Assessments />
      </div>

      <Footer />
    </div>
  );
}
