import { MdxPage } from "@/components/MdxPage";
import { GeneratedCard } from "@/components/GeneratedCard";
import { generated } from "@/content/generated";

export function GeneratedPage() {
  return (
    <MdxPage title="Generated" subtitle="Interactive artifacts and experiments.">
      <div className="not-prose grid gap-6 sm:grid-cols-2">
        {generated.map((entry) => (
          <GeneratedCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </MdxPage>
  );
}
