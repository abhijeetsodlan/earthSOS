import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { CarbonSourcesSinks } from "@/components/sections/CarbonSourcesSinks";
import { CrisisStats } from "@/components/sections/CrisisStats";
import { DeforestationMap } from "@/components/sections/DeforestationMap";
import { ForestsSection } from "@/components/sections/ForestsSection";
import { FutureGenerationsSection } from "@/components/sections/FutureGenerationsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LiveCountersSection } from "@/components/sections/LiveCountersSection";
import { MythsVsFacts } from "@/components/sections/MythsVsFacts";
import { QuoteStrip } from "@/components/sections/QuoteStrip";
import { SpeciesCounter } from "@/components/sections/SpeciesCounter";
import { TemperatureChart } from "@/components/sections/TemperatureChart";
import { ActionSteps } from "@/components/sections/ActionSteps";
import { TreeSimulator } from "@/components/features/TreeSimulator";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TreeSimulator />
        <QuoteStrip />
        <LiveCountersSection />
        <CarbonSourcesSinks />
        <TemperatureChart />
        <CrisisStats />
        <ForestsSection />
        <BeforeAfterSlider />
        <SpeciesCounter />
        <FutureGenerationsSection />
        <MythsVsFacts />
        <DeforestationMap />
        <ActionSteps />
      </main>
      <Footer />
    </>
  );
}
