import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  DoorOpen,
  DoorClosed,
  Instagram,
  Navigation,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import { getClinicStatus } from '../utils/clinicStatus';

import receptionImg from '../assets/images/reception.webp';
import waitingImg from '../assets/images/waiting-room.webp';
import consultationImg from '../assets/images/consultation-room.webp';
import aestheticRoomImg from '../assets/images/aesthetic-room.webp';
import laserImg from '../assets/images/equip-laser.webp';
import hydrafacialImg from '../assets/images/equip-hydrafacial-led.webp';

const CABINET_IMAGES = {
  reception: receptionImg,
  waiting: waitingImg,
  consultation: consultationImg,
  aestheticRoom: aestheticRoomImg,
  laser: laserImg,
  hydrafacial: hydrafacialImg,
};

export default function Cabinet() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [status, setStatus] = useState(() => getClinicStatus(lang));

  useEffect(() => {
    setStatus(getClinicStatus(lang));
    const timer = setInterval(() => setStatus(getClinicStatus(lang)), 60000);
    return () => clearInterval(timer);
  }, [lang]);

  const filterKeys = [
    { key: 'all', label: t.cabinet.filters.all },
    { key: 'spaces', label: t.cabinet.filters.spaces },
    { key: 'equipment', label: t.cabinet.filters.equipment },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? t.cabinet.galleryItems
      : t.cabinet.galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="cabinet" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-6 sm:mb-8">
          <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase text-brand-plum">
            {t.cabinet.eyebrow}
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-brand-ink">
            {t.cabinet.title}
          </h2>
          <p className="text-xs sm:text-sm text-brand-ink/75">
            {t.cabinet.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
          {filterKeys.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === f.key
                  ? 'bg-brand-plum text-white shadow-sm'
                  : 'bg-white/85 text-brand-ink/80 hover:text-brand-plum border border-brand-plum/15'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden bg-white aspect-[4/3]">
                <img
                  src={CABINET_IMAGES[item.imageKey]}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-1 flex-1">
                <h3 className="text-sm sm:text-base font-extrabold text-brand-ink">{item.title}</h3>
                <p className="text-xs text-brand-ink/75 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-card p-5 space-y-3.5 flex-1">
              <h3 className="text-base sm:text-lg font-extrabold text-brand-ink">
                {t.cabinet.contactCardTitle}
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-plum shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-plum">{t.cabinet.addressLabel}</p>
                    <p className="font-semibold text-brand-ink mt-0.5">
                      {lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressFr}
                    </p>
                    <p className="text-brand-ink/70 mt-0.5">
                      {lang === 'ar' ? CLINIC_INFO.landmarkAr : CLINIC_INFO.landmarkFr}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-plum shrink-0" />
                  <div>
                    <span className="font-bold text-brand-plum me-1.5">{t.cabinet.landlineLabel} :</span>
                    <a href={CLINIC_INFO.landlineHref} dir="ltr" className="font-extrabold text-brand-ink">
                      {CLINIC_INFO.landlineDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-brand-plum shrink-0" />
                  <div>
                    <span className="font-bold text-brand-plum me-1.5">{t.cabinet.whatsappLabel} :</span>
                    <a
                      href={CLINIC_INFO.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="font-extrabold text-brand-ink"
                    >
                      {CLINIC_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-plum shrink-0" />
                  <a href={`mailto:${CLINIC_INFO.email}`} dir="ltr" className="font-bold text-brand-ink">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-2.5 border-t border-brand-plum/10 flex flex-wrap items-center gap-2">
                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-soft/80 hover:bg-brand-plum text-brand-plum hover:text-white text-xs font-bold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>

                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-plum hover:bg-brand-deep text-white text-xs font-bold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.cabinet.openMapsBtn}</span>
                </a>
              </div>
            </div>

            <div className="glass-card p-5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-plum" />
                  <h3 className="text-sm sm:text-base font-extrabold text-brand-ink">
                    {t.cabinet.hoursCardTitle}
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
                    status.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {status.isOpen ? (
                    <DoorOpen className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <DoorClosed className="w-3 h-3 text-rose-600" />
                  )}
                  <span>{status.badge}</span>
                </span>
              </div>

              <div className="divide-y divide-brand-plum/10 text-xs">
                {t.cabinet.scheduleRows.map((row, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-3">
                    <span className="font-bold text-brand-ink">{row.days}</span>
                    <span dir="ltr" className="font-semibold text-brand-plum">
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 glass-card p-2.5 flex flex-col">
            <div className="rounded-xl overflow-hidden flex-1 min-h-[320px] sm:min-h-[380px] border border-brand-plum/10">
              <iframe
                title="Localisation Cabinet Dr. Ghita Filali Baba Rabat"
                src={CLINIC_INFO.googleMapsEmbedUrl}
                className="w-full h-full min-h-[320px] sm:min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
