import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  // Active review index (0 to 4)
  const activeIndex = ((trackIndex % count) + count) % count;

  // Responsive screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard steady auto-advance every 5 seconds (no hover cooldown)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [trackIndex]);

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
    <div className="relative max-w-6xl mx-auto px-4 select-none">
      {/* Carousel Viewport */}
      <div className="overflow-hidden py-4">
        <div
          className="flex"
          style={{
            transform: `translateX(-${translatePercent}%)`,
            transition: isTransitioning ? 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedReviews.map((r, idx) => (
            <div
              key={`${r.name}-${idx}`}
              className={`shrink-0 px-3.5 ${isMobile ? 'w-full' : 'w-1/3'}`}
            >
              {/* Clean White Card Style - identical across all review cards */}
              <div className="sk-card h-full p-8 flex flex-col justify-between rounded-none shadow-sm">
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, starI) => (
                      <Icon key={starI} name="star" className="text-[#ca9f88]" size={14} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className="italic text-[#132f27] mb-6 leading-relaxed text-sm sm:text-base font-normal"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.0625rem' }}
                  >
                    {r.quote}
                  </p>
                </div>

                {/* Guest Identity */}
                <div className="pt-4 border-t border-[rgba(19,47,39,0.08)]">
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
          ))}
        </div>
      </div>

      {/* Navigation Controls: <  Dots  > */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous review"
          className="w-9 h-9 flex items-center justify-center border border-[#ca9f88] text-[#132f27]
                     hover:bg-[#132f27] hover:text-white transition-colors duration-200 text-sm font-semibold rounded-none"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          &lt;
        </button>

        {/* 5 Dots Indicator */}
        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? 'w-6 bg-[#ca9f88]'
                  : 'w-2 bg-[rgba(19,47,39,0.2)] hover:bg-[rgba(19,47,39,0.4)]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next review"
          className="w-9 h-9 flex items-center justify-center border border-[#ca9f88] text-[#132f27]
                     hover:bg-[#132f27] hover:text-white transition-colors duration-200 text-sm font-semibold rounded-none"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
