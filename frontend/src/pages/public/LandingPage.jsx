import React from "react";
import HeroSection from "./HeroSection";
import FuncionalidadesSection from "./FuncionalidadesSection";
import PromocaoSection from "./PromocaoSection";
import CasesSection from "./CasesSection";
import SegmentosSection from "./SegmentosSection";
import ChamadaAcoesSection from "./ChamadaAcoesSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FuncionalidadesSection />
      <PromocaoSection />
      <CasesSection />
      <SegmentosSection />
      <ChamadaAcoesSection />
      {/* Footer fixo, se desejar */}
    </div>
  );
}
