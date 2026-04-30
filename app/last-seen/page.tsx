import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ExtinctionPulseCounter } from "@/components/sections/ExtinctionPulseCounter";
import { LastSeenSection } from "@/components/sections/LastSeenSection";
import { LostSpeciesHero } from "@/components/sections/LostSpeciesHero";

export default function LastSeenPage() {
  return (
    <>
      <Navbar />
      <main>
        <LostSpeciesHero />
        <ExtinctionPulseCounter />
        <LastSeenSection showPageLink={false} infiniteScroll />
      </main>
      <Footer />
    </>
  );
}
