import { Baby, Globe2, Scale, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const facts = [
  {
    icon: <Baby className="h-5 w-5" aria-hidden />,
    value: "58.6 tCO2e/yr",
    label: "Estimated reduction from having one fewer child in developed countries",
    detail: "This widely cited estimate includes a share of the child's future descendants, so it is not the direct footprint of a newborn."
  },
  {
    icon: <Globe2 className="h-5 w-5" aria-hidden />,
    value: "43 tCO2",
    label: "Approximate lifetime budget for a person born in 2017 in a 1.5C pathway",
    detail: "A child born today has a much smaller safe carbon budget than older generations because much of the global budget is already used."
  },
  {
    icon: <Scale className="h-5 w-5" aria-hidden />,
    value: "Income matters",
    label: "A child's footprint depends heavily on systems around them",
    detail: "Energy grids, city design, transport access, food systems, household income, and policy shape lifetime emissions more than birth alone."
  }
];

export const FutureGenerationsSection = () => {
  return (
    <SectionWrapper
      eyebrow="Future generations"
      title="Every birth adds pressure to an already overloaded planet."
      className="bg-white"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded bg-neutral-900 p-6 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-primary-300 text-neutral-900">
            <Users className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-6 text-2xl font-bold leading-tight md:text-3xl">
            In today&apos;s high-carbon world, every child born means decades of added energy use, food demand, transport, waste, and emissions.
          </p>
          <p className="mt-4 text-sm leading-6 text-neutral-300">
            This does not make a child morally responsible for climate damage. It means each additional birth increases the load on forests,
            water, land, energy systems, and the remaining carbon budget unless society changes fast.
          </p>
        </div>

        <div className="grid gap-4">
          {facts.map((fact) => (
            <Card key={fact.label} className="grid gap-3">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary-50 text-primary-400">
                  {fact.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-700">{fact.value}</p>
                  <p className="mt-1 font-semibold text-neutral-700">{fact.label}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{fact.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
        <p className="font-semibold text-neutral-700">Important context</p>
        <p className="mt-1">
          The environmental impact of birth is real because a new lifetime of consumption is added to the planet. The size of that impact depends
          on where and how a person lives, but in a high-emission system every additional lifetime makes the climate challenge harder.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold uppercase text-primary-400">
          <a href="https://portal.research.lu.se/en/publications/the-climate-mitigation-gap-education-and-government-recommendatio/" target="_blank" rel="noreferrer">
            ERL study
          </a>
          <a href="https://www.carbonbrief.org/analysis-why-children-must-emit-eight-times-less-co2-than-their-grandparents/" target="_blank" rel="noreferrer">
            Carbon Brief analysis
          </a>
          <a href="https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-2/" target="_blank" rel="noreferrer">
            IPCC context
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};
