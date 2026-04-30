import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CarbonCalculator } from "@/components/features/CarbonCalculator";

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-neutral-100 px-4 pt-8 md:px-8">
          <div className="mx-auto max-w-6xl">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded px-2 font-bold text-neutral-700 transition hover:text-primary-400">
              <ArrowLeft className="h-5 w-5" aria-hidden />
              Back
            </Link>
          </div>
        </div>
        <CarbonCalculator />
      </main>
      <Footer />
    </>
  );
}
