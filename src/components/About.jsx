import React from 'react';
import { GraduationCap, Stethoscope, Baby, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import receptionImg from '../assets/images/reception.webp';

export default function About() {
  const { t } = useLanguage();
  const pillarIcons = [Stethoscope, Baby, Sparkles];

  return (
    <section id="medecin" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="glass-card p-2 shadow-glass max-w-sm mx-auto">
              <div className="rounded-xl overflow-hidden aspect-[4/4]">
                <img
                  src={receptionImg}
                  alt="Accueil du Cabinet Dr. Ghita Filali Baba à Rabat"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase text-brand-plum">
              {t.about.eyebrow}
            </span>

            <h2 className="text-xl sm:text-3xl font-extrabold text-brand-ink leading-tight">
              {t.about.title}
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-brand-ink/90 leading-relaxed">
              {t.about.lead}
            </p>

            <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed">
              {t.about.bio}
            </p>

            <div className="glass-card p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-plum text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-brand-ink">
                  {t.about.credentialsTitle}
                </h3>
              </div>

              <ul className="space-y-1.5 pt-0.5">
                {t.about.credentials.map((cred, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-plum shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13px] font-medium text-brand-ink/85">
                      {cred}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 sm:mt-10">
          {t.about.pillars.map((pillar, index) => {
            const IconComponent = pillarIcons[index % pillarIcons.length];
            return (
              <div key={index} className="glass-card glass-card-hover p-4 sm:p-5 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand-plum flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-brand-ink">
                  {pillar.title}
                </h3>
                <p className="text-xs text-brand-ink/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
