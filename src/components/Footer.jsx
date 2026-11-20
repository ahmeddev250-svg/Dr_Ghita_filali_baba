import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import logoImg from '../assets/images/logo.png';

export default function Footer() {
  const { lang, t } = useLanguage();

  const quickLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#medecin', label: t.nav.about },
    { href: '#soins', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.reviews },
  ];

  return (
    <>
      <footer className="bg-brand-plum text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                  <img
                    src={logoImg}
                    alt="Logo Dr. Ghita Filali Baba"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white">
                    {t.nav.brandName}
                  </h2>
                  <p className="text-xs text-brand-soft font-semibold">
                    {t.nav.brandSubtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/90 leading-relaxed">
                {t.footer.description}
              </p>

              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white hover:text-brand-plum text-white text-xs font-bold transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@dermato.dr.ghitafilalibaba</span>
              </a>
            </div>

            <div className="lg:col-span-2 space-y-2.5">
              <h3 className="text-sm font-extrabold text-white">
                {t.footer.quickLinksTitle}
              </h3>
              <ul className="space-y-1.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-white/90 hover:text-white hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-2.5">
              <h3 className="text-sm font-extrabold text-white">
                {t.footer.contactTitle}
              </h3>
              <ul className="space-y-2 text-xs text-white/95">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-soft shrink-0 mt-0.5" />
                  <span>{lang === 'ar' ? CLINIC_INFO.addressAr : CLINIC_INFO.addressFr}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-soft shrink-0" />
                  <a href={CLINIC_INFO.landlineHref} dir="ltr" className="font-bold hover:underline">
                    {CLINIC_INFO.landlineDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-brand-soft shrink-0" />
                  <a
                    href={CLINIC_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="font-bold hover:underline"
                  >
                    {CLINIC_INFO.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-soft shrink-0" />
                  <a href={`mailto:${CLINIC_INFO.email}`} dir="ltr" className="hover:underline">
                    {CLINIC_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-2.5">
              <h3 className="text-sm font-extrabold text-white">
                {t.footer.hoursTitle}
              </h3>
              <div className="space-y-2 text-xs text-white/90">
                {t.cabinet.scheduleRows.map((row, i) => (
                  <div key={i}>
                    <p className="font-bold text-white">{row.days}</p>
                    <p dir="ltr" className="text-brand-soft font-semibold">
                      {row.hours}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-soft hover:text-white underline"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 text-center text-xs text-white/85">
            {t.footer.copyright}
          </div>
        </div>
      </footer>

      <a
        href={CLINIC_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter le cabinet sur WhatsApp"
        className="fixed bottom-4 end-4 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
        <span>{t.footer.whatsappFloat}</span>
      </a>
    </>
  );
}
