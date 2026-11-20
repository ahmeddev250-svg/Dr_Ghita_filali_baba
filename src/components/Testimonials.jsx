import React from 'react';
import { Star, Quote, ExternalLink, CornerDownRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="avis" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-8">
          <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase text-brand-plum">
            {t.testimonials.eyebrow}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-brand-ink">
            {t.testimonials.title}
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-brand-plum/15 shadow-sm text-xs">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-brand-ink">{CLINIC_INFO.rating} / 5</span>
            <span className="text-brand-ink/70">({CLINIC_INFO.reviewCount} avis Google)</span>
          </div>

          <p className="text-xs sm:text-sm text-brand-ink/75">{t.testimonials.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          <span className="text-xs font-bold text-brand-ink/70 me-1">
            {t.testimonials.keywordsLabel}
          </span>
          {t.testimonials.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 border border-brand-plum/15 text-xs font-bold text-brand-plum"
            >
              <span>{kw.word}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-brand-soft text-brand-deep font-extrabold">
                {kw.count}
              </span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {t.testimonials.reviews.map((rev, idx) => (
            <article
              key={idx}
              className="glass-card glass-card-hover p-4 sm:p-5 flex flex-col justify-between space-y-3.5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-brand-plum/30" />
                </div>

                <p lang="fr" dir="ltr" className="text-xs text-brand-ink/85 leading-relaxed">
                  « {rev.text} »
                </p>

                {rev.reply && (
                  <div
                    lang="fr"
                    dir="ltr"
                    className="p-2.5 rounded-xl bg-brand-soft/60 border border-brand-plum/10 text-[11px] text-brand-ink/80 space-y-0.5"
                  >
                    <div className="flex items-center gap-1 font-extrabold text-brand-plum">
                      <CornerDownRight className="w-3 h-3" />
                      <span>Dr. Ghita Filali Baba</span>
                    </div>
                    <p>{rev.reply}</p>
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-brand-plum/10">
                <p className="font-extrabold text-brand-ink text-xs sm:text-sm">{rev.author}</p>
                <p className="text-[11px] font-semibold text-brand-plum">{rev.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-plum text-brand-plum hover:text-white border border-brand-plum/25 font-bold text-xs shadow-sm transition-all"
          >
            <span>{t.testimonials.googleBtn}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
