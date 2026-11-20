import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  Star,
  MapPin,
  Clock,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import { getClinicStatus } from '../utils/clinicStatus';
import doctorImg from '../assets/images/doctor.webp';
import logoImg from '../assets/images/logo.png';

export default function Hero({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => {
      setStatus(getClinicStatus(lang));
    }, 60000);
    return () => clearInterval(timer);
  }, [lang]);

  return (
    <section
      id="accueil"
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-brand-plum/15 text-brand-ink/80 text-xs font-semibold shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-brand-plum shrink-0" />
                <span>Menzeh CYM • Av. Al Massira, Rabat</span>
              </span>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-brand-plum/15 shadow-sm hover:border-brand-plum/35 transition-colors text-xs font-bold text-brand-ink"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{t.hero.googleRatingText}</span>
                <span className="text-brand-ink/60 font-medium">
                  {t.hero.googleReviewsCount}
                </span>
              </a>
            </div>

            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  status.isOpen
                    ? 'bg-emerald-50/95 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50/95 text-rose-800 border-rose-200'
                }`}
              >
                {status.isOpen ? (
                  <DoorOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <DoorClosed className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                )}
                <span>{status.badge}</span>
                {status.detail && (
                  <span className="font-medium opacity-85">• {status.detail}</span>
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-brand-ink leading-[1.16] tracking-tight whitespace-pre-line">
              {t.hero.title}
            </h1>

            <div className="border-s-4 border-brand-plum ps-3.5 space-y-0.5">
              <p className="text-sm sm:text-base font-bold text-brand-plum">
                {lang === 'ar' ? CLINIC_INFO.specialtyAr : CLINIC_INFO.specialtyFr}
              </p>
              <p className="text-xs sm:text-sm font-medium text-brand-ink/70">
                {t.hero.floatingDoctorRole}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-brand-ink/75 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-plum hover:bg-brand-deep text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-plum/20 transition-all"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{t.hero.ctaPrimary}</span>
              </button>

              <a
                href={CLINIC_INFO.landlineHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-brand-plum border border-brand-plum/20 font-bold text-xs sm:text-sm transition-all"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{t.hero.ctaPhone} :</span>
                <span dir="ltr" className="font-extrabold">
                  {CLINIC_INFO.landlineDisplay}
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              <div className="glass-card p-2.5 shadow-glass">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4] bg-brand-soft/40">
                  <img
                    src={doctorImg}
                    alt="Dr. Ghita Filali Baba - Dermatologue à Rabat"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 inset-x-3 rounded-xl bg-white/92 backdrop-blur-md border border-white/80 px-3.5 py-2.5 flex items-center gap-3 shadow-md">
                    <div className="w-9 h-9 rounded-full bg-white border border-brand-plum/15 p-0.5 flex items-center justify-center shrink-0">
                      <img
                        src={logoImg}
                        alt="Emblème Dr. Ghita Filali Baba"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-extrabold text-brand-ink truncate">
                        {lang === 'ar' ? CLINIC_INFO.doctorNameAr : CLINIC_INFO.doctorNameFr}
                      </p>
                      <p className="text-[11px] text-brand-ink/70 truncate">
                        {t.hero.quickCards.addressValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-8 sm:mt-10">
          <div className="glass-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand-plum flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold text-brand-ink">
                {t.hero.quickCards.addressTitle}
              </h2>
              <p className="text-xs text-brand-ink/75 mt-0.5 leading-snug">
                {t.hero.quickCards.addressValue}
              </p>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand-plum flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold text-brand-ink">
                {t.hero.quickCards.hoursTitle}
              </h2>
              <p className="text-xs text-brand-ink/75 mt-0.5 leading-snug">
                {t.hero.quickCards.hoursValue}
              </p>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand-plum flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold text-brand-ink">
                {t.hero.quickCards.phoneTitle}
              </h2>
              <p dir="ltr" className="text-xs text-brand-ink/75 mt-0.5 leading-snug">
                {t.hero.quickCards.phoneValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
