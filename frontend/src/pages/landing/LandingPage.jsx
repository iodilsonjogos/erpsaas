import React from "react";
import BannerHero from "./BannerHero";
import BeneficiosSection from "./BeneficiosSection";
import DepoimentosSection from "./DepoimentosSection";
import FooterLanding from "./FooterLanding";

export default function LandingPage() {
  return (
    <div className="bg-gray-50">
      <BannerHero />
      <BeneficiosSection />
      <DepoimentosSection />
      <FooterLanding />
    </div>
  );
}
