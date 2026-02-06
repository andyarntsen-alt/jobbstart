"use client";

import type { CVData } from "@/types/cv";

interface CVPreviewProps {
  data: CVData;
}

export default function CVPreview({ data }: CVPreviewProps) {
  const { personal, summary, experience, education, skills, template } = data;

  const contactStr = [personal.email, personal.phone, personal.address, personal.linkedin]
    .filter(Boolean)
    .join("  ·  ");

  // Template-specific styles
  const isNordisk = template === "nordisk";
  const isOslo = template === "oslo";
  const isEksekutiv = template === "eksekutiv";
  const isKreativ = template === "kreativ";
  const isKompakt = template === "kompakt";

  const sectionTitle = isNordisk
    ? "text-[10px] uppercase tracking-[0.2em] text-gray-400 font-normal mb-2 mt-5"
    : isOslo
    ? "text-[10px] uppercase tracking-wider text-[#1A1F36] font-semibold mb-2 mt-4"
    : isEksekutiv
    ? "text-xs uppercase tracking-wider font-bold mb-2 mt-4 font-serif"
    : isKreativ
    ? "text-xs font-bold mb-2 mt-4 text-[#2B5F8A]"
    : isKompakt
    ? "text-[10px] uppercase font-bold mb-1.5 mt-3 bg-gray-100 px-2 py-0.5 -mx-2"
    : "text-xs uppercase tracking-wider font-semibold mb-2 mt-4";

  const divider = isNordisk
    ? "border-t border-gray-200 my-4"
    : isKreativ
    ? "border-t border-[#2B5F8A]/20 my-3"
    : "border-t border-foreground/10 my-3";

  const hasSkills = skills.technical.length > 0 ||
    skills.languages.length > 0 ||
    skills.certifications.length > 0;

  // Shared experience renderer
  const renderExperience = () =>
    experience.length > 0 && (
      <>
        <div className={divider} />
        <p className={sectionTitle}>Erfaring</p>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="flex items-baseline justify-between">
              <p className="font-semibold">
                {exp.title}
                {exp.company && (
                  <span className={`font-normal ${isEksekutiv ? "italic text-gray-500" : "text-gray-500"}`}>
                    {" "}— {exp.company}
                  </span>
                )}
              </p>
              <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                {exp.from} – {exp.to}
              </span>
            </div>
            {exp.bullets.length > 0 ? (
              <ul className="mt-1 space-y-0.5 text-gray-700">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={`shrink-0 ${isKreativ ? "text-[#2B5F8A]" : "text-gray-300"}`}>·</span>
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              exp.description && (
                <p className="mt-1 text-gray-700">{exp.description}</p>
              )
            )}
          </div>
        ))}
      </>
    );

  // Shared education renderer
  const renderEducation = () =>
    education.length > 0 && (
      <>
        <div className={divider} />
        <p className={sectionTitle}>Utdanning</p>
        {education.map((edu) => (
          <div key={edu.id} className="mb-1.5 flex items-baseline justify-between">
            <p>
              <span className="font-semibold">{edu.degree}</span>
              {edu.school && (
                <span className="text-gray-500"> — {edu.school}</span>
              )}
            </p>
            <span className="text-[11px] text-gray-400 shrink-0 ml-2">
              {edu.year}
            </span>
          </div>
        ))}
      </>
    );

  // Skills renderer (for non-Oslo, non-Kreativ templates)
  const renderSkills = () =>
    hasSkills && (
      <>
        <div className={divider} />
        <p className={sectionTitle}>Kompetanser</p>
        {skills.technical.length > 0 && (
          <p className="text-gray-700">
            <span className="font-semibold">Teknisk:</span>{" "}
            {skills.technical.join(", ")}
          </p>
        )}
        {skills.languages.length > 0 && (
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">Språk:</span>{" "}
            {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
          </p>
        )}
        {skills.certifications.length > 0 && (
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">Sertifiseringer:</span>{" "}
            {skills.certifications.join(", ")}
          </p>
        )}
      </>
    );

  // Kreativ skills with colored bars
  const renderKreativSkills = () =>
    hasSkills && (
      <>
        <div className={divider} />
        <p className={sectionTitle}>Kompetanser</p>
        {skills.technical.length > 0 && (
          <div className="space-y-1.5 mb-2">
            {skills.technical.map((skill, i) => (
              <div key={i}>
                <span className="text-[11px] text-gray-600">{skill}</span>
                <div className="h-1.5 bg-gray-100 rounded-full mt-0.5">
                  <div
                    className="h-1.5 bg-[#2B5F8A] rounded-full"
                    style={{ width: `${Math.max(40, 90 - i * 10)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {skills.languages.length > 0 && (
          <div className="mt-2">
            <span className="text-[11px] font-semibold text-[#2B5F8A]">Språk:</span>
            <p className="text-[11px] text-gray-700">
              {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
            </p>
          </div>
        )}
        {skills.certifications.length > 0 && (
          <p className="text-gray-700 mt-1 text-[11px]">
            <span className="font-semibold text-[#2B5F8A]">Sertifiseringer:</span>{" "}
            {skills.certifications.join(", ")}
          </p>
        )}
      </>
    );

  // ── Oslo: Two-column with navy sidebar ──
  if (isOslo) {
    return (
      <div className="rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm flex overflow-hidden p-0">
        {/* Navy sidebar */}
        <div className="w-[35%] bg-[#1A1F36] p-5 text-white shrink-0">
          <h2 className="text-base font-bold text-white mb-1">
            {personal.name || "Ditt Navn"}
          </h2>
          <div className="text-[10px] text-[#A0A8B8] space-y-0.5 mt-2">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.address && <p>{personal.address}</p>}
            {personal.linkedin && <p>{personal.linkedin}</p>}
          </div>
          {(skills.technical.length > 0 || skills.languages.length > 0) && (
            <div className="mt-4">
              {skills.technical.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-wider text-[#A0A8B8] font-semibold mb-1 mt-3">Kompetanser</p>
                  <p className="text-[10px] text-gray-300">{skills.technical.join(", ")}</p>
                </>
              )}
              {skills.languages.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-wider text-[#A0A8B8] font-semibold mb-1 mt-3">Språk</p>
                  <p className="text-[10px] text-gray-300">
                    {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          {summary && (
            <>
              <p className={sectionTitle}>Profil</p>
              <p className="text-gray-700">{summary}</p>
            </>
          )}
          {renderExperience()}
          {renderEducation()}
        </div>
      </div>
    );
  }

  // ── All other templates ──
  return (
    <div className={`rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm ${
      isKreativ ? "border-l-[3px] border-l-[#2B5F8A] p-6" : "p-6"
    }`}>
      {/* Header */}
      <div className={isEksekutiv ? "text-center" : isKompakt ? "flex items-baseline justify-between" : ""}>
        <h2
          className={
            isNordisk
              ? "text-xl font-normal uppercase tracking-[0.15em]"
              : isEksekutiv
              ? "text-lg font-normal uppercase tracking-wider font-serif"
              : isKreativ
              ? "text-2xl font-bold"
              : isKompakt
              ? "text-base font-bold"
              : "text-xl font-bold tracking-tight"
          }
        >
          {personal.name || "Ditt Navn"}
        </h2>
        <p className={`mt-0.5 ${
          isNordisk
            ? "text-[10px] text-gray-400"
            : isKompakt
            ? "text-[10px] text-gray-400 shrink-0"
            : "text-[11px] text-gray-500"
        }`}>
          {isNordisk ? contactStr.replace(/  ·  /g, "  /  ") : contactStr}
        </p>
      </div>

      {/* Eksekutiv header line */}
      {isEksekutiv && <div className="border-t border-gray-400 my-3" />}

      {/* Summary */}
      {summary && (
        <>
          <div className={divider} />
          <p className={sectionTitle}>Profil</p>
          <p className="text-gray-700">{summary}</p>
        </>
      )}

      {renderExperience()}
      {renderEducation()}
      {isKreativ ? renderKreativSkills() : renderSkills()}
    </div>
  );
}
