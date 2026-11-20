import React from 'react';
import { Calendar, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';

import consultationImg from '../assets/images/consultation-room.webp';
import doctorImg from '../assets/images/doctor.webp';
import laserImg from '../assets/images/equip-laser.webp';
import hydrafacialImg from '../assets/images/equip-hydrafacial-led.webp';
import fillerImg from '../assets/images/result-filler.webp';
import aestheticRoomImg from '../assets/images/aesthetic-room.webp';
import dermato1Img from '../assets/images/result-dermato-1.webp';
import dermato2Img from '../assets/images/result-dermato-2.webp';
import dermato3Img from '../assets/images/result-dermato-3.webp';

const IMAGE_MAP = {
  consultation: consultationImg,
  doctor: doctorImg,
  laser: laserImg,
  hydrafacial: hydrafacialImg,
  filler: fillerImg,
  aestheticRoom: aestheticRoomImg,
  dermato1: dermato1Img,
  dermato2: dermato2Img,
  dermato3: dermato3Img,
};

export default function Services({ onOpenBooking }) {
  const { t } = useLanguage();

  return (
    <section id="soins" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-8 sm:mb-10">
          <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase text-brand-plum">
            {t.services.eyebrow}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-brand-ink">
            {t.services.title}
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.services.items.map((service) => (
            <article
              key={service.id}
              className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-brand-soft/40">
                  <img
                    src={IMAGE_MAP[service.imageKey]}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-2.5 start-2.5 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-md text-brand-plum text-[11px] font-extrabold shadow-sm">
                    {service.category}
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-2.5">
                  <h3 className="text-base font-extrabold text-brand-ink leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-ink/75 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-soft/80 text-brand-plum text-[11px] font-bold"
                      >
                        <Check className="w-3 h-3 shrink-0" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenBooking(service.title)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-brand-plum/10 hover:bg-brand-plum text-brand-plum hover:text-white font-bold text-xs transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.services.bookServiceBtn}</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:mt-14">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <h3 className="text-lg sm:text-2xl font-extrabold text-brand-ink">
              {t.services.resultsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-brand-ink/75">
              {t.services.resultsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {t.services.resultsCards.map((card, idx) => (
              <div key={idx} className="glass-card glass-card-hover overflow-hidden">
                <div className="aspect-[4/4] overflow-hidden bg-brand-soft/30">
                  <img
                    src={IMAGE_MAP[card.imageKey]}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5">
                  <h4 className="text-xs sm:text-sm font-extrabold text-brand-ink">{card.title}</h4>
                  <p className="text-[11px] text-brand-ink/70 mt-0.5">{card.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
