import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

export interface Review {
  quote: string;
  name: string;
  location: string;
  suite: string;
}

export const sanctuaryReviews: Review[] = [
  {
    quote: '"An architectural miracle floating above the clouds. The silence here is not emptiness, but a profound fullness that restored my spirit."',
    name: 'Elena Rostova',
    location: 'Geneva, Switzerland',
    suite: 'The Master Sanctuary',
  },
  {
    quote: '"From the sunset botanical teas on the veranda to the morning mist rolling past our floor-to-ceiling glass, Sankāra redefined hospitality for us."',
    name: 'Marcus & Priya Vance',
    location: 'London, United Kingdom',
    suite: 'Forest View Suite',
  },
  {
    quote: '"Waking up to the calls of endemic mountain birds, breathing in wild cinnamon and wet stone. Truly the most transcendent retreat in Asia."',
    name: 'Kenji Takahashi',
    location: 'Kyoto, Japan',
    suite: 'Courtyard Garden Room',
  },
  {
    quote: '"Soaking in the cedar outdoor tub under equatorial starlight while Ceylon highland mist rolled through the valley canopy. Unrivaled serenity and privacy."',
    name: 'Dr. Julian Aris',
    location: 'Melbourne, Australia',
    suite: 'Rooftop Terrace Suite',
  },
  {
    quote: '"The unhurried Ayurveda dining, the scent of crushed wild cardamom, and our master butler\'s intuitive grace. An indelible, deeply grounding experience."',
    name: 'Claire de Montferrand',
    location: 'Paris, France',
    suite: 'Veranda Deluxe',
  },
];

export default function ReviewSlider() {
  const reviews = sanctuaryReviews;
  const count = reviews.length;

  // Tripled array for infinite seamless looping
  const extendedReviews = [...reviews, ...reviews, ...reviews];
  const [trackIndex, setTrackIndex] = useState(count); // starts at index 5 (first item of 2nd set)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Active review index (0 to 4)
  const activeIndex = ((trackIndex % count) + count) % count;

  // Track responsive screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance with generous 7.5s reading time, paused on hover
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = window.setInterval(() => {
      handleNext();
    }, 7500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, trackIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev - 1);
  };

  const handleDotClick = (targetIndex: number) => {
    setIsTransitioning(true);
    const diff = targetIndex - activeIndex;
    setTrackIndex((prev) => prev + diff);
  };

  // Reset silently without animation when crossing boundary sets
  const handleTransitionEnd = () => {
    if (trackIndex >= count * 2) {
      setIsTransitioning(false);
      setTrackIndex(trackIndex - count);
    } else if (trackIndex < count) {
      setIsTransitioning(false);
      setTrackIndex(trackIndex + count);
    }
  };

  // Calculate percentage offset:
  // On desktop: 3 items visible, each 33.333%, centered item is at offset (trackIndex - 1) * 33.333%
  // On mobile: 1 item visible, each 100%, item is at offset trackIndex * 100%
  const translatePercent = isMobile
    ? trackIndex * 100
    : (trackIndex - 1) * (100 / 3);

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Viewport */}
      <div className="overflow-hidden py-6">
        <div
          className="flex"
          style={{
            transform: `translateX(-${translatePercent}%)`,
            transition: isTransitioning ? 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedReviews.map((r, idx) => {
            const isMiddle = idx === trackIndex;
            return (
              <div
                key={`${r.name}-${idx}`}
                className={`shrink-0 px-3 transition-all duration-500 ${
                  isMobile ? 'w-full' : 'w-1/3'
                }`}
                onClick={() => {
                  if (!isMiddle && !isMobile) {
                    if (idx < trackIndex) handlePrev();
                    else handleNext();
                  }
                }}
              >
                <div
                  className={`h-full p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 rounded-[2px] ${
                    isMiddle
                      ? 'bg-[#fbf9f2] border-2 border-[#ca9f88] shadow-[0_20px_45px_rgba(19,47,39,0.14)] scale-100 opacity-100 cursor-default'
                      : 'bg-[#f6f4ed]/80 border border-[rgba(19,47,39,0.08)] opacity-60 scale-[0.95] cursor-pointer hover:opacity-85'
                  }`}
                >
                  <div>
                    {/* Stars and Middle Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starI) => (
                          <Icon key={starI} name="star" className="text-[#ca9f88]" size={15} />
                        ))}
                      </div>
                      {isMiddle && (
                        <span
                          className="text-[0.625rem] tracking-[0.2em] uppercase text-[#c86651] font-semibold"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Reflection
                        </span>
                      )}
                    </div>

                    {/* Quote */}
                    <p
                      className={`italic text-[#132f27] mb-6 leading-relaxed transition-colors ${
                        isMiddle ? 'text-base font-normal' : 'text-sm font-light'
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMiddle ? '1.1875rem' : '1.05rem' }}
                    >
                      {r.quote}
                    </p>
                  </div>

                  {/* Guest Identity */}
                  <div className="pt-5 border-t border-[rgba(19,47,39,0.1)]">
                    <p
                      className="text-[#132f27] font-medium text-sm tracking-wide mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {r.name}
                    </p>
                    <p className="sk-label text-[#727975] text-[0.6875rem]">
                      {r.location} · <span className="text-[#ca9f88] font-medium">{r.suite}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls & Indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
        {/* Reading progress countdown indicator */}
        <div className="flex items-center gap-2 text-[#727975] text-xs">
          <span className="sk-label !text-[0.6875rem] text-[#ca9f88]">
            0{activeIndex + 1} / 0{count}
          </span>
          <div className="w-24 sm:w-32 h-[2px] bg-[rgba(19,47,39,0.1)] overflow-hidden rounded-full">
            <div
              key={activeIndex}
              className={`h-full bg-[#ca9f88] ${!isHovered ? 'animate-progress' : ''}`}
              style={{
                animationDuration: '7500ms',
                animationTimingFunction: 'linear',
              }}
            />
          </div>
          {isHovered && (
            <span className="text-[0.625rem] text-[#ca9f88] uppercase tracking-wider animate-pulse">
              Reading
            </span>
          )}
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? 'w-7 bg-[#ca9f88]'
                  : 'w-2 bg-[rgba(19,47,39,0.2)] hover:bg-[rgba(19,47,39,0.4)]'
              }`}
            />
          ))}
        </div>

        {/* Previous / Next Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-9 h-9 flex items-center justify-center border border-[#ca9f88] text-[#132f27]
                       hover:bg-[#132f27] hover:text-[#fbf9f2] transition-colors duration-200"
          >
            <Icon name="arrow_back" size={17} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="w-9 h-9 flex items-center justify-center border border-[#ca9f88] text-[#132f27]
                       hover:bg-[#132f27] hover:text-[#fbf9f2] transition-colors duration-200"
          >
            <Icon name="arrow_forward" size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
