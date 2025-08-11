"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BookOpen, ChevronDown, ChevronUp, Info, Volume2 } from "lucide-react";
import { NoteExample } from "@/lib/types";
import { getDifficultyColor } from "@/lib/utils";

export function NoteExampleCard({
  example,
  index,
}: {
  example: NoteExample;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTokensOpen, setIsTokensOpen] = useState(false);
  const [isMorphologyOpen, setIsMorphologyOpen] = useState(false);

  const handlePlayAudio = (text?: string) => {
    if (!text) return;
    // In a real PWA, you'd implement text-to-speech here
    console.log("Playing audio for:", text);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="w-full">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start flex-col">
                <span className="text-lg font-semibold ">
                  Example {index + 1}
                </span>
                <Badge className={getDifficultyColor(example.difficulty)}>
                  {example.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Native Language */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Native
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayAudio(example.native)}
                  className="h-6 w-6 p-0"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-base font-medium">{example.native}</p>
            </div>

            {/* Target Language */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Learning
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayAudio(example.learning)}
                  className="h-6 w-6 p-0"
                >
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-lg font-semibold text-right" dir="rtl">
                {example.learning}
              </p>
            </div>

            {/* Pronunciation */}
            {example.pronunciation && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Pronunciation
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayAudio(example.pronunciation)}
                    className="h-6 w-6 p-0"
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-base italic text-muted-foreground">
                  {example.pronunciation}
                </p>
              </div>
            )}

            {/* Explanation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Explanation
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {example.explanation}
              </p>
            </div>

            {/* Word Breakdown */}
            {example.tokens?.length > 0 && (
              <Collapsible open={isTokensOpen} onOpenChange={setIsTokensOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Word Breakdown
                    </div>
                    {isTokensOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="grid gap-2">
                    {example.tokens.map((token, tokenIndex) => (
                      <div
                        key={tokenIndex}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-right" dir="rtl">
                            {token.word}
                          </span>
                          {token.translit && (
                            <span className="text-sm text-muted-foreground">
                              ({token.translit})
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {token.gloss}
                          </div>
                          {token.pos && (
                            <div className="text-xs text-muted-foreground">
                              {token.pos}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Morphology */}
            {example.morphology && (
              <Collapsible
                open={isMorphologyOpen}
                onOpenChange={setIsMorphologyOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Grammar Notes
                    </div>
                    {isMorphologyOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="p-3 bg-muted rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Gender:</span>
                      <Badge variant="secondary">
                        {example.morphology.gender}
                      </Badge>
                    </div>
                    {example.morphology.notes && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {example.morphology.notes}
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
