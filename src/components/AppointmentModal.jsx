import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CLINIC_INFO } from './translations';
import { getCasablancaNow, generateThirtyMinuteSlots } from '../utils/clinicStatus';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const { lang, t } = useLanguage();
  const todayStr = useMemo(() => getCasablancaNow().dateStr, [isOpen]);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const serviceItems = t?.services?.items || [];

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      const defaultSvc =
        initialService || (serviceItems[0] ? serviceItems[0].title : '');
      setSelectedService(defaultSvc);
      setSelectedDate((prev) => prev || getCasablancaNow().dateStr);
    }
  }, [isOpen, initialService, serviceItems]);

  const slots = useMemo(
    () => generateThirtyMinuteSlots(selectedDate),
    [selectedDate]
  );

  const isSunday = useMemo(() => {
    if (!selectedDate) return false;
    const [y, m, d] = selectedDate.split('-').map(Number);
    if (!y || !m || !d) return false;
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return dt.getUTCDay() === 0;
  }, [selectedDate]);

  useEffect(() => {
    const valid = slots.find((s) => s.value === selectedSlot && !s.disabled);
    if (!valid && selectedSlot !== '') {
      setSelectedSlot('');
    }
  }, [slots, selectedSlot]);

  if (!isOpen) return null;

  const allTodayDisabled =
    !isSunday && slots.length > 0 && slots.every((s) => s.disabled);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};

    if (!clientName.trim()) {
      nextErrors.name = t.booking.errors.nameRequired;
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 8) {
      nextErrors.phone = t.booking.errors.phoneRequired;
    }
    if (!selectedDate) {
      nextErrors.date = t.booking.errors.dateRequired;
    }
    if (!selectedSlot) {
      nextErrors.slot = t.booking.errors.slotRequired;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const cleanNotes = notes.trim() || (lang === 'ar' ? 'لا توجد ملاحظات' : 'Aucune');

    const message =
      lang === 'ar'
        ? `مرحباً،\n\nأرغب في حجز موعد.\n\nالاسم : ${clientName.trim()}\nرقم الهاتف : ${clientPhone.trim()}\nالخدمة المطلوبة : ${selectedService}\nالتاريخ : ${selectedDate}\nالوقت : ${selectedSlot}\nمدة الموعد : 30 دقيقة\nملاحظات : ${cleanNotes}\n\nشكراً، يرجى تأكيد الموعد.`
        : `Bonjour,\n\nJe souhaite prendre un rendez-vous.\n\nNom : ${clientName.trim()}\nTéléphone : ${clientPhone.trim()}\nPrestation : ${selectedService}\nDate : ${selectedDate}\nHeure : ${selectedSlot}\nDurée : 30 minutes\nNotes : ${cleanNotes}\n\nMerci de me confirmer la disponibilité.`;

    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-brand-plum/20 rounded-3xl shadow-2xl overflow-hidden my-auto">
        <div className="bg-brand-plum text-white px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-extrabold">
              {t.booking.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {t.booking.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.booking.cancelBtn}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[82vh] overflow-y-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-soft text-brand-plum text-xs sm:text-sm font-extrabold">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{t.booking.durationBadge}</span>
          </div>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t.booking.successBanner}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.nameLabel}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-plum/70 absolute top-3.5 start-3.5" />
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={t.booking.namePlaceholder}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-plum text-sm sm:text-base"
                />
              </div>
              {errors.name && (
                <p className="text-xs font-bold text-rose-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.phoneLabel}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-plum/70 absolute top-3.5 start-3.5" />
                <input
                  type="tel"
                  dir="ltr"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder={t.booking.phonePlaceholder}
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-plum text-sm sm:text-base"
                />
              </div>
              {errors.phone && (
                <p className="text-xs font-bold text-rose-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.serviceLabel}
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-plum text-sm sm:text-base font-medium"
              >
                {serviceItems.map((srv) => (
                  <option key={srv.id} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-ink mb-1.5">
                {t.booking.dateLabel}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-brand-plum/70 absolute top-3.5 start-3.5 pointer-events-none" />
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full ps-10 pe-3.5 py-2.5 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-plum text-sm sm:text-base"
                />
              </div>
              {errors.date && (
                <p className="text-xs font-bold text-rose-600 mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-ink mb-2">
              {t.booking.slotsLabel}
            </label>

            {isSunday || slots.length === 0 ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold">
                {t.booking.noSlotsClosed}
              </div>
            ) : allTodayDisabled ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold">
                {t.booking.noSlotsToday}
              </div>
            ) : (
              <div
                dir="ltr"
                className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1"
              >
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.value;
                  return (
                    <button
                      key={slot.value}
                      type="button"
                      disabled={slot.disabled}
                      onClick={() => setSelectedSlot(slot.value)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        slot.disabled
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-brand-plum text-white border-brand-plum shadow-md'
                          : 'bg-white text-brand-ink border-brand-plum/20 hover:border-brand-plum hover:bg-brand-soft/50'
                      }`}
                    >
                      {slot.value}
                    </button>
                  );
                })}
              </div>
            )}

            {errors.slot && (
              <p className="text-xs font-bold text-rose-600 mt-1.5">{errors.slot}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-ink mb-1.5">
              {t.booking.notesLabel}
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-brand-plum/70 absolute top-3 start-3.5" />
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.booking.notesPlaceholder}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-brand-plum/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-plum text-sm"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-brand-soft/75 border border-brand-plum/15 flex items-start gap-2.5 text-xs sm:text-sm text-brand-ink/85">
            <AlertCircle className="w-4 h-4 text-brand-plum shrink-0 mt-0.5" />
            <span>{t.booking.pendingNotice}</span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full border border-brand-plum/20 text-brand-ink/80 hover:bg-gray-100 font-bold text-sm transition-colors"
            >
              {t.booking.cancelBtn}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-plum hover:bg-brand-deep text-white font-bold text-sm shadow-lg shadow-brand-plum/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.booking.submitBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
