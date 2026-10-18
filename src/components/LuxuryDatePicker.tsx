import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];
const MONTH_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function formatDateStr(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTH_SHORT[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function parseDateStr(str: string): Date {
  if (!str) return new Date();
  const trimmed = str.trim();
  // Support YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  // Support DD MON YYYY
  const parts = trimmed.split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthIndex = MONTH_SHORT.indexOf(parts[1].toUpperCase());
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && monthIndex !== -1 && !isNaN(year)) {
      return new Date(year, monthIndex, day);
    }
  }
  return new Date();
}

function getCalendarDays(year: number, month: number) {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: { day: number; date: Date }[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, date: new Date(year, month, i) });
  }
  return { firstDayIndex, days };
}

interface LuxuryDatePickerProps {
  label: string;
  value: string;
  onChange: (formattedDate: string) => void;
  variant?: 'bar' | 'form';
  className?: string;
  required?: boolean;
  disabledDates?: string[];
  minDate?: Date;
}

export default function LuxuryDatePicker({
  label,
  value,
  onChange,
  variant = 'form',
  className = '',
  disabledDates = [],
  minDate,
}: LuxuryDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsedDate = parseDateStr(value);
  const [viewMonth, setViewMonth] = useState<Date>(
    new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1)
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    const d = parseDateStr(value);
    setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    setIsOpen(!isOpen);
  };

  const handleSelectDay = (date: Date) => {
    onChange(formatDateStr(date));
    setIsOpen(false);
  };

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const { firstDayIndex, days } = getCalendarDays(year, month);
  const currentDate = parseDateStr(value);

  const formattedDisplay = value || formatDateStr(new Date());

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {variant === 'form' ? (
        <div>
          <label className="sk-label text-[#132f27] block mb-1">{label}</label>
          <button
            type="button"
            onClick={handleOpen}
            className="w-full text-left border border-[rgba(19,47,39,0.15)] bg-[#f6f4ed] px-3.5 py-3 
                       flex items-center justify-between text-sm transition-colors hover:border-[#ca9f88]
                       focus:outline-none group"
          >
            <span
              className="text-[#132f27] font-medium tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {formattedDisplay}
            </span>
            <Icon name="calendar_today" className="text-[#ca9f88] group-hover:text-[#132f27] transition-colors shrink-0" size={17} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="w-full text-left px-5 py-4 hover:bg-[#f6f4ed] transition-colors duration-200 focus:outline-none"
        >
          <label className="sk-label text-[#727975] font-medium mb-1 block cursor-pointer">
            {label}
          </label>
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[#132f27] text-[0.9375rem] font-medium tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {formattedDisplay}
            </span>
            <Icon name="calendar_today" className="text-[#ca9f88] shrink-0" size={18} />
          </div>
        </button>
      )}

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1.5 w-72 bg-[#fbf9f2] border border-[#ca9f88] shadow-2xl p-3.5 animate-fade-in text-left">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[rgba(19,47,39,0.1)]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMonth(new Date(year, month - 1, 1));
              }}
              className="w-6 h-6 flex items-center justify-center text-[#132f27] hover:bg-[#132f27] hover:text-[#fbf9f2] transition-colors text-sm"
              aria-label="Previous month"
            >
              ‹
            </button>
            <span
              className="sk-label text-[#132f27] font-semibold text-xs tracking-widest"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMonth(new Date(year, month + 1, 1));
              }}
              className="w-6 h-6 flex items-center justify-center text-[#132f27] hover:bg-[#132f27] hover:text-[#fbf9f2] transition-colors text-sm"
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="sk-label text-[0.6rem] text-[#ca9f88] font-bold py-0.5">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="w-8 h-8" />
            ))}
            {days.map(({ day, date }) => {
              const isSelected =
                date.getFullYear() === currentDate.getFullYear() &&
                date.getMonth() === currentDate.getMonth() &&
                date.getDate() === currentDate.getDate();

              const yearStr = date.getFullYear();
              const monthStr = String(date.getMonth() + 1).padStart(2, '0');
              const dayStr = String(date.getDate()).padStart(2, '0');
              const isoKey = `${yearStr}-${monthStr}-${dayStr}`;

              // Check if date is before minDate (if provided)
              const isPast = minDate ? date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : false;
              const isBlocked = disabledDates.includes(isoKey);
              const isDisabled = isPast || isBlocked;

              if (isDisabled) {
                return (
                  <button
                    key={day}
                    type="button"
                    disabled
                    title={isBlocked ? 'Booked / Unavailable' : 'Past date'}
                    className="w-8 h-8 text-xs font-medium flex items-center justify-center line-through text-[#a2a9a5] bg-[#132f27]/5 cursor-not-allowed opacity-40 select-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {day}
                  </button>
                );
              }

              return (
                <button
                  key={day}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectDay(date);
                  }}
                  className={`w-8 h-8 text-xs font-medium flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#c86651] text-white font-semibold'
                      : 'text-[#132f27] hover:bg-[#132f27] hover:text-[#fbf9f2]'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {disabledDates.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-[rgba(19,47,39,0.08)] flex items-center justify-center gap-1.5 text-[0.65rem] text-[#727975]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#132f27]/20 line-through" />
              <span>Unavailable / Reserved</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
