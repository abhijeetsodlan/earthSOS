import { Building2, CircleHelp, Megaphone, Scale, ShieldQuestion, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const actions = [
  {
    title: "Ask for carbon transparency",
    description: "Public figures, celebrities, teams, and events should be asked to disclose travel and lifestyle emissions when their footprint is unusually large.",
    Icon: ShieldQuestion
  },
  {
    title: "Question big companies",
    description: "Ask brands, factories, and platforms for clear carbon footprint reports, reduction plans, and proof that their targets are more than marketing.",
    Icon: Building2
  },
  {
    title: "Push governments for policy",
    description: "Ask elected leaders what they are doing on clean energy, public transport, forest protection, industrial emissions, and climate adaptation.",
    Icon: Scale
  },
  {
    title: "Educate and spread awareness",
    description: "Share simple climate facts, explain terms like ppm and carbon sinks, and help people understand the crisis without turning it into noise.",
    Icon: Megaphone
  },
  {
    title: "Consume less, choose better",
    description: "Avoid overconsumption. Buy durable goods, repair what you can, waste less food, and treat every purchase as a resource decision.",
    Icon: ShoppingBag
  },
  {
    title: "Keep asking uncomfortable questions",
    description: "The earth belongs to us and to the next generation. A better generation does not stay silent when responsibility is being avoided.",
    Icon: CircleHelp
  }
];

export const ActionSteps = () => (
  <SectionWrapper id="act" eyebrow="Act" title="What we can do that really matters">
    <p className="mb-6 max-w-3xl text-sm leading-6 text-neutral-500 md:text-base">
      Individual action matters, but public pressure matters too. Ask for accountability from the people, companies, and governments with the biggest power to reduce emissions.
    </p>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {actions.map(({ title, description, Icon }) => (
        <Card key={title} className="h-full">
          <Icon className="mb-4 h-9 w-9 text-primary-300" aria-hidden />
          <h3 className="text-xl font-bold text-neutral-700">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
        </Card>
      ))}
    </div>
  </SectionWrapper>
);
