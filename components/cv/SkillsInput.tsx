"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import type { CVSkills } from "@/types/cv";

interface SkillsInputProps {
  skills: CVSkills;
  onChange: (updated: CVSkills) => void;
}

const LANGUAGE_LEVELS = ["Morsmål", "Flytende", "Godt", "Grunnleggende"];

export default function SkillsInput({ skills, onChange }: SkillsInputProps) {
  const [techInput, setTechInput] = useState("");
  const [certInput, setCertInput] = useState("");
  const [langName, setLangName] = useState("");
  const [langLevel, setLangLevel] = useState("Flytende");

  function addTechnical() {
    const value = techInput.trim();
    if (!value || skills.technical.includes(value)) return;
    onChange({ ...skills, technical: [...skills.technical, value] });
    setTechInput("");
  }

  function removeTechnical(index: number) {
    onChange({
      ...skills,
      technical: skills.technical.filter((_, i) => i !== index),
    });
  }

  function addLanguage() {
    const name = langName.trim();
    if (!name) return;
    onChange({
      ...skills,
      languages: [...skills.languages, { name, level: langLevel }],
    });
    setLangName("");
  }

  function removeLanguage(index: number) {
    onChange({
      ...skills,
      languages: skills.languages.filter((_, i) => i !== index),
    });
  }

  function addCertification() {
    const value = certInput.trim();
    if (!value || skills.certifications.includes(value)) return;
    onChange({
      ...skills,
      certifications: [...skills.certifications, value],
    });
    setCertInput("");
  }

  function removeCertification(index: number) {
    onChange({
      ...skills,
      certifications: skills.certifications.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-6">
      {/* Technical skills */}
      <div>
        <Label className="text-xs">Tekniske kompetanser</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="F.eks. React, Python, Prosjektledelse"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechnical();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addTechnical}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {skills.technical.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.technical.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-2.5 py-1 text-xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeTechnical(i)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div>
        <Label className="text-xs">Språk</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
            placeholder="F.eks. Norsk"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLanguage();
              }
            }}
          />
          <select
            value={langLevel}
            onChange={(e) => setLangLevel(e.target.value)}
            className="rounded border border-border bg-background px-3 py-2 text-sm"
          >
            {LANGUAGE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addLanguage}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {skills.languages.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.languages.map((lang, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-2.5 py-1 text-xs"
              >
                {lang.name} ({lang.level})
                <button
                  type="button"
                  onClick={() => removeLanguage(i)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Certifications */}
      <div>
        <Label className="text-xs">Sertifiseringer</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            placeholder="F.eks. PMP, AWS Solutions Architect"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCertification();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addCertification}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {skills.certifications.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.certifications.map((cert, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-2.5 py-1 text-xs"
              >
                {cert}
                <button
                  type="button"
                  onClick={() => removeCertification(i)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
