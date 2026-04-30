import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CarbonCalculator } from "@/components/features/CarbonCalculator";

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <CarbonCalculator />
      </main>
      <Footer />
    </>
  );
}
