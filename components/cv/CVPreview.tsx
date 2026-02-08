"use client";

import type { CVData } from "@/types/cv";
import PaywallOverlay from "@/components/PaywallOverlay";

interface CVPreviewProps {
  data: CVData;
  hasFullPreview: boolean;
  onUpgrade: () => void;
}

export default function CVPreview({ data, hasFullPreview, onUpgrade }: CVPreviewProps) {
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
                    {" "}, {exp.company}
                  </span>
                )}
              </p>
              <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                {exp.from} - {exp.to}
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
                <span className="text-gray-500">, {edu.school}</span>
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

  function wrapWithPaywall(content: React.ReactNode) {
    if (hasFullPreview) return content;
    return (
      <PaywallOverlay
        visiblePercent={0.3}
        ctaText="Lås opp full CV-forhåndsvisning og PDF-nedlasting"
        onUpgrade={onUpgrade}
        watermarkText="CVPILOT.NO"
      >
        {content}
      </PaywallOverlay>
    );
  }

  // ── Oslo: Two-column with navy sidebar ──
  if (isOslo) {
    return wrapWithPaywall(
      <div className="rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm flex overflow-hidden p-0">
        {/* Navy sidebar */}
        <div className="w-[35%] bg-[#1A1F36] p-5 text-white shrink-0">
          {personal.photo && (
            <img
              src={personal.photo}
              alt=""
              className="h-16 w-16 rounded-full object-cover border-2 border-white/20 mb-3 mx-auto"
            />
          )}
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

  // ── Fjord: Right sidebar with warm terracotta ──
  if (template === "fjord") {
    return wrapWithPaywall(
      <div className="rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm flex overflow-hidden p-0">
        {/* Main content left */}
        <div className="flex-1 p-5">
          {summary && (
            <>
              <p className="text-xs uppercase tracking-wider font-bold mb-2 mt-1 text-[#B27857] font-serif">Profil</p>
              <p className="text-gray-700 font-serif">{summary}</p>
            </>
          )}
          {experience.length > 0 && (
            <>
              <div className="border-t border-[#B27857]/20 my-3" />
              <p className="text-xs uppercase tracking-wider font-bold mb-2 text-[#B27857] font-serif">Erfaring</p>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold font-serif">
                      {exp.title}
                      {exp.company && <span className="font-normal italic text-gray-500">, {exp.company}</span>}
                    </p>
                    <span className="text-[11px] text-gray-400 shrink-0 ml-2">{exp.from} - {exp.to}</span>
                  </div>
                  {exp.bullets.length > 0 ? (
                    <ul className="mt-1 space-y-0.5 text-gray-700 font-serif">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2"><span className="text-[#B27857] shrink-0">·</span>{b}</li>
                      ))}
                    </ul>
                  ) : exp.description && <p className="mt-1 text-gray-700 font-serif">{exp.description}</p>}
                </div>
              ))}
            </>
          )}
          {education.length > 0 && (
            <>
              <div className="border-t border-[#B27857]/20 my-3" />
              <p className="text-xs uppercase tracking-wider font-bold mb-2 text-[#B27857] font-serif">Utdanning</p>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1.5 flex items-baseline justify-between">
                  <p className="font-serif"><span className="font-semibold">{edu.degree}</span>{edu.school && <span className="text-gray-500">, {edu.school}</span>}</p>
                  <span className="text-[11px] text-gray-400 shrink-0 ml-2">{edu.year}</span>
                </div>
              ))}
            </>
          )}
        </div>
        {/* Terracotta sidebar right */}
        <div className="w-[35%] bg-[#B27857] p-5 text-white shrink-0">
          {personal.photo && (
            <img src={personal.photo} alt="" className="h-16 w-16 rounded-full object-cover border-2 border-white/20 mb-3 mx-auto" />
          )}
          <h2 className="text-base font-bold text-white mb-1">{personal.name || "Ditt Navn"}</h2>
          <div className="text-[10px] text-[#F0E0D2] space-y-0.5 mt-2">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.address && <p>{personal.address}</p>}
            {personal.linkedin && <p>{personal.linkedin}</p>}
          </div>
          {hasSkills && (
            <div className="mt-4 border-t border-white/20 pt-3">
              {skills.technical.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-wider text-white font-semibold mb-1">Kompetanser</p>
                  <p className="text-[10px] text-[#F0E0D2]">{skills.technical.join(", ")}</p>
                </>
              )}
              {skills.languages.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-wider text-white font-semibold mb-1 mt-3">Språk</p>
                  <p className="text-[10px] text-[#F0E0D2]">{skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>
                </>
              )}
              {skills.certifications.length > 0 && (
                <>
                  <p className="text-[10px] uppercase tracking-wider text-white font-semibold mb-1 mt-3">Sertifiseringer</p>
                  <p className="text-[10px] text-[#F0E0D2]">{skills.certifications.join(", ")}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Stavanger: Dark banner header with coral accent ──
  if (template === "stavanger") {
    return wrapWithPaywall(
      <div className="rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm overflow-hidden p-0">
        {/* Dark banner */}
        <div className="bg-[#2A363B] p-5 pb-0">
          <div className="flex items-start gap-4 pb-4">
            {personal.photo && (
              <img src={personal.photo} alt="" className="h-16 w-16 rounded-full object-cover border-2 border-white/20 shrink-0" />
            )}
            <div>
              <h2 className="text-xl font-bold text-white">{personal.name || "Ditt Navn"}</h2>
              <p className="text-[10px] text-[#B4C0C4] mt-1">{contactStr}</p>
            </div>
          </div>
          <div className="h-[3px] bg-[#DC6C52] -mx-5" />
        </div>
        {/* Content */}
        <div className="p-6">
          {summary && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#DC6C52] shrink-0" />
                <p className="text-xs uppercase tracking-wider font-bold text-[#2A363B]">Profil</p>
              </div>
              <p className="text-gray-700">{summary}</p>
            </>
          )}
          {experience.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#DC6C52] shrink-0" />
                <p className="text-xs uppercase tracking-wider font-bold text-[#2A363B]">Erfaring</p>
              </div>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold">{exp.title}{exp.company && <span className="font-normal text-[#DC6C52]">, {exp.company}</span>}</p>
                    <span className="text-[11px] text-gray-400 shrink-0 ml-2">{exp.from} - {exp.to}</span>
                  </div>
                  {exp.bullets.length > 0 ? (
                    <ul className="mt-1 space-y-0.5 text-gray-700">
                      {exp.bullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-[#DC6C52] shrink-0">·</span>{b}</li>)}
                    </ul>
                  ) : exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#DC6C52] shrink-0" />
                <p className="text-xs uppercase tracking-wider font-bold text-[#2A363B]">Utdanning</p>
              </div>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1.5 flex items-baseline justify-between">
                  <p><span className="font-semibold">{edu.degree}</span>{edu.school && <span className="text-gray-500">, {edu.school}</span>}</p>
                  <span className="text-[11px] text-gray-400 shrink-0 ml-2">{edu.year}</span>
                </div>
              ))}
            </div>
          )}
          {hasSkills && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 bg-[#DC6C52] shrink-0" />
                <p className="text-xs uppercase tracking-wider font-bold text-[#2A363B]">Kompetanser</p>
              </div>
              {skills.technical.length > 0 && <p className="text-gray-700">{skills.technical.join("  |  ")}</p>}
              {skills.languages.length > 0 && <p className="text-gray-700 mt-1"><span className="font-semibold">Språk:</span> {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>}
              {skills.certifications.length > 0 && <p className="text-gray-700 mt-1"><span className="font-semibold">Sertifiseringer:</span> {skills.certifications.join(", ")}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Tidslinje: Timeline with circle nodes ──
  if (template === "tidslinje") {
    return wrapWithPaywall(
      <div className="rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold font-mono">{personal.name || "Ditt Navn"}</h2>
            <div className="text-[10px] text-gray-400 font-mono mt-1 space-y-0.5">
              {personal.email && <p>{personal.email}</p>}
              {personal.phone && <p>{personal.phone}</p>}
              {personal.address && <p>{personal.address}</p>}
            </div>
          </div>
          {personal.photo && <img src={personal.photo} alt="" className="h-14 w-14 rounded-full object-cover border border-border shrink-0" />}
        </div>
        <div className="border-t border-[#225743] my-4" />
        {summary && (
          <>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#225743] font-bold font-mono mb-2">Profil</p>
            <p className="text-gray-700">{summary}</p>
          </>
        )}
        {experience.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#225743] font-bold font-mono mb-2">Erfaring</p>
            <div className="border-l-2 border-[#225743] pl-4 ml-1 space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#225743] bg-white" />
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold">{exp.title}{exp.company && <span className="font-normal text-gray-500">, {exp.company}</span>}</p>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-2 font-mono">{exp.from} - {exp.to}</span>
                  </div>
                  {exp.bullets.length > 0 ? (
                    <ul className="mt-1 space-y-0.5 text-gray-700">
                      {exp.bullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-[#225743] shrink-0">·</span>{b}</li>)}
                    </ul>
                  ) : exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#225743] font-bold font-mono mb-2">Utdanning</p>
            <div className="border-l-2 border-[#225743] pl-4 ml-1 space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="relative flex items-baseline justify-between">
                  <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#225743] bg-white" />
                  <p><span className="font-semibold">{edu.degree}</span>{edu.school && <span className="text-gray-500">, {edu.school}</span>}</p>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2 font-mono">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {hasSkills && (
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#225743] font-bold font-mono mb-2">Kompetanser</p>
            {skills.technical.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skills.technical.map((skill, i) => (
                  <span key={i} className="text-[11px] border border-[#225743] px-2 py-0.5 text-gray-700">{skill}</span>
                ))}
              </div>
            )}
            {skills.languages.length > 0 && <p className="text-gray-700 text-[12px]"><span className="font-semibold text-[#225743]">Språk:</span> {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>}
            {skills.certifications.length > 0 && <p className="text-gray-700 text-[12px] mt-1"><span className="font-semibold text-[#225743]">Sertifiseringer:</span> {skills.certifications.join(", ")}</p>}
          </div>
        )}
      </div>
    );
  }

  // ── Diplomatisk: Formal double border, courier ──
  if (template === "diplomatisk") {
    return wrapWithPaywall(
      <div className="rounded-lg border-2 border-gray-700 bg-white text-[13px] leading-relaxed text-black shadow-sm p-1">
        <div className="border border-gray-500 p-6">
          <div className="text-center">
            {personal.photo && <img src={personal.photo} alt="" className="h-14 w-14 rounded-full object-cover border border-gray-400 mx-auto mb-3" />}
            <h2 className="text-lg font-bold uppercase tracking-[0.2em] font-mono">{personal.name || "DITT NAVN"}</h2>
            <p className="text-[10px] text-gray-500 font-mono mt-1">{contactStr.replace(/  ·  /g, "  |  ")}</p>
            <div className="w-10 border-t border-gray-500 mx-auto my-4" />
          </div>
          {summary && (
            <>
              <div className="text-center mb-1">
                <div className="w-8 border-t border-gray-400 mx-auto mb-1.5" />
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold font-mono text-gray-600">Profil</p>
                <div className="w-8 border-t border-gray-400 mx-auto mt-1.5" />
              </div>
              <p className="text-gray-700 font-mono text-[12px] mt-2">{summary}</p>
            </>
          )}
          {experience.length > 0 && (
            <div className="mt-4">
              <div className="text-center mb-1">
                <div className="w-8 border-t border-gray-400 mx-auto mb-1.5" />
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold font-mono text-gray-600">Erfaring</p>
                <div className="w-8 border-t border-gray-400 mx-auto mt-1.5" />
              </div>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-3 mt-2">
                  <div className="flex items-baseline justify-between">
                    <p className="font-bold font-mono">{exp.title}{exp.company && <span className="font-normal text-gray-500"> ({exp.company})</span>}</p>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-2 font-mono">{exp.from} - {exp.to}</span>
                  </div>
                  {exp.bullets.length > 0 ? (
                    <ul className="mt-1 space-y-0.5 text-gray-700 font-mono text-[12px]">
                      {exp.bullets.map((b, i) => <li key={i}>- {b}</li>)}
                    </ul>
                  ) : exp.description && <p className="mt-1 text-gray-700 font-mono text-[12px]">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div className="mt-4">
              <div className="text-center mb-1">
                <div className="w-8 border-t border-gray-400 mx-auto mb-1.5" />
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold font-mono text-gray-600">Utdanning</p>
                <div className="w-8 border-t border-gray-400 mx-auto mt-1.5" />
              </div>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1.5 mt-2 flex items-baseline justify-between">
                  <p className="font-mono"><span className="font-bold">{edu.degree}</span>{edu.school && <span className="text-gray-500"> ({edu.school})</span>}</p>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-2 font-mono">{edu.year}</span>
                </div>
              ))}
            </div>
          )}
          {hasSkills && (
            <div className="mt-4">
              <div className="text-center mb-1">
                <div className="w-8 border-t border-gray-400 mx-auto mb-1.5" />
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold font-mono text-gray-600">Kompetanser</p>
                <div className="w-8 border-t border-gray-400 mx-auto mt-1.5" />
              </div>
              {skills.technical.length > 0 && (
                <ol className="mt-2 text-gray-700 font-mono text-[12px] list-decimal list-inside">
                  {skills.technical.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              )}
              {skills.languages.length > 0 && <p className="text-gray-700 font-mono text-[12px] mt-2"><span className="font-bold">Språk:</span> {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>}
              {skills.certifications.length > 0 && <p className="text-gray-700 font-mono text-[12px] mt-1"><span className="font-bold">Sertifiseringer:</span> {skills.certifications.join(", ")}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Bergen: Three-tier header + table layout ──
  if (template === "bergen") {
    return wrapWithPaywall(
      <div className="rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm overflow-hidden p-0">
        {/* Header block 1 — dark plum */}
        <div className="bg-[#48283E] p-5 flex items-start justify-between">
          <h2 className="text-xl font-bold text-white">{personal.name || "Ditt Navn"}</h2>
          {personal.photo && <img src={personal.photo} alt="" className="h-14 w-14 rounded-full object-cover border-2 border-white/20 shrink-0" />}
        </div>
        {/* Header block 2 — medium plum */}
        <div className="bg-[#785069] px-5 py-2">
          <p className="text-[10px] text-white">{contactStr}</p>
        </div>
        {/* Header block 3 — light lavender */}
        <div className="bg-[#E6DAE2] px-5 py-3">
          {summary && <p className="text-[12px] text-[#48283E]">{summary}</p>}
        </div>
        {/* Table content */}
        <div className="p-5">
          {experience.length > 0 && (
            <div className="flex gap-4 mb-4">
              <div className="w-[25%] text-right shrink-0 border-r border-[#48283E]/20 pr-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#48283E]">Erfaring</p>
              </div>
              <div className="flex-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex items-baseline justify-between">
                      <p className="font-semibold">{exp.title}{exp.company && <span className="font-normal text-gray-500">, {exp.company}</span>}</p>
                      <span className="text-[10px] text-[#785069] shrink-0 ml-2">{exp.from} - {exp.to}</span>
                    </div>
                    {exp.bullets.length > 0 ? (
                      <ul className="mt-1 space-y-0.5 text-gray-700">
                        {exp.bullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-[#48283E] shrink-0">·</span>{b}</li>)}
                      </ul>
                    ) : exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div className="flex gap-4 mb-4">
              <div className="w-[25%] text-right shrink-0 border-r border-[#48283E]/20 pr-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#48283E]">Utdanning</p>
              </div>
              <div className="flex-1">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-1.5 flex items-baseline justify-between">
                    <p><span className="font-semibold">{edu.degree}</span>{edu.school && <span className="text-gray-500">, {edu.school}</span>}</p>
                    <span className="text-[10px] text-[#785069] shrink-0 ml-2">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {hasSkills && (
            <div className="flex gap-4">
              <div className="w-[25%] text-right shrink-0 border-r border-[#48283E]/20 pr-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#48283E]">Kompetanser</p>
              </div>
              <div className="flex-1">
                {skills.technical.length > 0 && <p className="text-gray-700">{skills.technical.join(", ")}</p>}
                {skills.languages.length > 0 && <p className="text-gray-700 mt-1"><span className="font-semibold text-[#48283E]">Språk:</span> {skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}</p>}
                {skills.certifications.length > 0 && <p className="text-gray-700 mt-1"><span className="font-semibold text-[#48283E]">Sertifiseringer:</span> {skills.certifications.join(", ")}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── All other templates (Nordisk, Eksekutiv, Kreativ, Kompakt) ──
  return wrapWithPaywall(
    <div className={`rounded-lg border border-border bg-white text-[13px] leading-relaxed text-black shadow-sm ${
      isKreativ ? "border-l-[3px] border-l-[#2B5F8A] p-6" : "p-6"
    }`}>
      {/* Header */}
      <div className={isEksekutiv ? "text-center" : isKompakt ? "flex items-baseline justify-between" : ""}>
        {personal.photo && isEksekutiv && (
          <img
            src={personal.photo}
            alt=""
            className="h-16 w-16 rounded-full object-cover border border-gray-300 mx-auto mb-3"
          />
        )}
        {personal.photo && !isEksekutiv && (
          <div className={`flex items-center gap-4 mb-3 ${isKompakt ? "w-full" : ""}`}>
            <img
              src={personal.photo}
              alt=""
              className="h-14 w-14 rounded-full object-cover border border-border shrink-0"
            />
          </div>
        )}
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
