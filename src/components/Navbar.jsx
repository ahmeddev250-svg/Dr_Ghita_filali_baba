import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import logoImg from '../assets/images/logo.png';

export default function Navbar({ onOpenBooking }) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#medecin', label: t.nav.about },
    { href: '#soins', label: t.nav.services },
    { href: '#cabinet', label: t.nav.cabinet },
    { href: '#avis', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          <a
            href="#accueil"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
          >
            <div className="h-10 w-10 rounded-full bg-white border border-brand-plum/20 shadow-sm p-0.5 flex items-center justify-center shrink-0">
              <img
                src={logoImg}
                alt="Logo Dr. Ghita Filali Baba"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-[15px] font-extrabold text-brand-ink whitespace-nowrap">
                {t.nav.brandName}
              </span>
              <span className="text-[11px] font-medium text-brand-plum whitespace-nowrap">
                {t.nav.brandSubtitle}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-semibold text-brand-ink/80 hover:text-brand-plum transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <div
              className="inline-flex items-center rounded-full bg-brand-soft/80 border border-brand-plum/15 p-0.5 shrink-0"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  lang === 'fr'
                    ? 'bg-brand-plum text-white shadow-sm'
                    : 'text-brand-ink/75 hover:text-brand-plum'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  lang === 'ar'
                    ? 'bg-brand-plum text-white shadow-sm'
                    : 'text-brand-ink/75 hover:text-brand-plum'
                }`}
              >
                AR
              </button>
            </div>

            <a
              href={CLINIC_INFO.landlineHref}
              dir="ltr"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-brand-plum/20 text-brand-plum hover:bg-brand-soft/60 text-xs font-bold transition-all whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{CLINIC_INFO.landlineDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-plum hover:bg-brand-deep text-white text-xs font-bold shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>

          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-brand-soft border border-brand-plum/20 text-brand-plum text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Menu"
              className="p-2 rounded-lg bg-white/90 border border-brand-plum/15 text-brand-ink hover:text-brand-plum"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-plum/10 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-1.5 px-3 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-soft/60 hover:text-brand-plum transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-2.5 border-t border-brand-plum/10 flex flex-col gap-2">
            <a
              href={CLINIC_INFO.landlineHref}
              dir="ltr"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-soft/80 text-brand-plum font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CLINIC_INFO.landlineDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-brand-plum text-white font-bold text-xs shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
