import { Badge } from "@/components/ui/badge";
import { GeneratedExamplesPayload, NoteExample } from "@/lib/types";
import { NoteExampleCard } from "@/components/note/NoteExampleCard";
type NoteExamplesPayload = {
  examples: NoteExample[];
  meta: {
    topic?: string;
    level: "beginner" | "intermediate" | "advanced";
    style?: "formal" | "casual" | "slang";
    maxWords?: number;
    model: string;
  };
};

interface LanguageExamplesProps {
  examples: NoteExamplesPayload;
}
export default function LanguageExamples({ examples }: LanguageExamplesProps) {
  return (
    <div className="w-full pb-24">
      <div className="space-y-4">
        {examples.examples.map((example, index) => (
          <NoteExampleCard key={index} example={example} index={index} />
        ))}
      </div>
    </div>
  );
}
