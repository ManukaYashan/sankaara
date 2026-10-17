import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import LuxuryDatePicker from '../components/LuxuryDatePicker';

const suiteCards = [
  {
    id: 'suite-01',
    number: '01',
    title: 'Forest View Suite',
    meta: 'King Bed · 2 Guests · 75 sqm',
    description: 'Cantilevered over the virgin valley canopy with deep soaking tub and a sheltered forest meditation daybed.',
    rate: 650,
    img: './images/suite_01_forest.jpg',
    alt: 'Luxury suite overlooking misty forest valley',
  },
  {
    id: 'suite-02',
    number: '02',
    title: 'Courtyard Garden Room',
    meta: 'King Bed · 2 Guests · 68 sqm',
    description: 'Enclosed private courtyard featuring aromatic native flora, outdoor rain shower, and heated stone floor.',
    rate: 620,
    img: './images/suite_02_courtyard.jpg',
    alt: 'Intimate boutique courtyard suite',
  },
  {
    id: 'suite-03',
    number: '03',
    title: 'Veranda Deluxe',
    meta: 'King Bed · 2 Guests · 80 sqm',
    description: 'Wraparound teak timber deck, custom artisanal tea bar, and curated open-air library of rare monographs.',
    rate: 740,
    img: './images/suite_03_veranda.jpg',
    alt: 'Luxury veranda suite with wraparound teak deck',
  },
  {
    id: 'suite-04',
    number: '04',
    title: 'Rooftop Terrace Suite',
    meta: 'King Bed · 2 Guests · 95 sqm',
    description: 'Private rooftop stargazing deck with heated sunken stone pool and telescope for astronomical viewings.',
    rate: 880,
    img: './images/suite_04_rooftop.jpg',
    alt: 'Open-concept rooftop suite with stone plunge pool',
  },
];

const experiences = [
  {
    tag: 'Culinary & Mixology',
    title: 'Sankāra Rooftop Lounge',
    body: 'All-day artisanal dining & zero-proof botanical elixirs harvested from our private estate gardens, overlooking the drifting highland mist.',
    meta: 'Daily 06:00 — 23:00',
    icon: 'restaurant',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQekPBRhVhmRE_2CrAOD21eiRW-AreIGyENMxvJfpsV3tUT3ZIMTXov1gFTZMgejIt6StStGWpIApXYZiB2Zv16z7b8MEluEinLv_eatAtYiwOq_rHjbVYbIvo54ociEvXanumhjcRgtaYbAwg-MsKW3o9EzHHm8oICBSYF9AU895r6OHhojE7xYKLIlmJTombsinNf86ZSxlvHhcA3Xa1RfbuVe9ru1d2vFqdMPOutIU7qVSehG8GBQ',
    alt: 'Rooftop lounge overlooking highland mist',
  },
  {
    tag: 'Hydrotherapy & Flora',
    title: 'Private Plunge Pool & Gardens',
    body: 'Secluded natural stone temperature-controlled pools immersed in wild aromatic botanicals, designed for unguided silent soaking rituals.',
    meta: 'Exclusive to Guests',
    icon: 'pool',
    img: './images/exp_hydrotherapy_pool.jpg',
    alt: 'Natural stone plunge pool and garden sauna in tropical garden',
  },
  {
    tag: 'Heritage & Terroir',
    title: 'Curated Local Excursions',
    body: 'Private biodynamic tea terroir walks, botanical foraging with resident herbalists, and private architectural monographs of regional modernism.',
    meta: 'Chauffeured Excursions',
    icon: 'hiking',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCg8NmtfXpBnsglbE6S1G54mWN0VT4bc59TJohQRR8TCCKtUDYdAL04VXp-7_wSe-8gXn6kXRJgZBkVfMcOhiFFsHRNlETrAcOwiG9zdifjiYpG0OO_mgUhQfNTcfUiS2KOl3YaEZ0YevmvFkKdZX8fQb2OgZaAQaOaZovG7dyddUDzc8z2_iUMQw3S6UmjECDFwWKDnShvLAs5rw24qi7kzWUOxjm7K4xxy219UBtuM9ZZ5Vm2eD1dw',
    alt: 'Tea terroir walking trails in morning mist',
  },
];

const reviews = [
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
];

const guestOptions = [
  '02 Guests (1 Suite)',
  '01 Guest (Solo Retreat)',
  'Whole Sanctuary Buyout',
];

export default function Home() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('14 OCT 2024');
  const [checkOut, setCheckOut] = useState('18 OCT 2024');
  const [guests, setGuests] = useState('02 Guests (1 Suite)');
  const [openGuests, setOpenGuests] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setOpenGuests(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#132f27]" id="hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            className="w-full h-full object-cover object-center brightness-[0.78]"
            alt="SANKĀRA luxury sanctuary nestled in Ceylon highlands"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnKq1Dj4AnZ9EVZMblDZWzJOTKasTsOQoyDZCbYGiAxDt7bjMvQdln_sO0ngqXi8n9dFSEwzUAFIuUztDcmLtsnV0WSO6cif9UnHdkst8GwKYdqiYTbThAUHsacFydVI9H0M-pDERhUcW7ybm4o73AhV0zmk_rN8HnRVRkWf_wXQtvGDzT4aVfIpCRnjN2BQiJv2Zk2bs-uMO5Wnii-2XtqZq1rnGlK-x-yv9yUMryBACUgaXhcUGGYg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#132f27]/45 via-[#132f27]/25 to-[#132f27]/85" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-28 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2 mb-6
                          border border-[#ca9f88]/60 bg-[#132f27]/35 backdrop-blur-md
                          shadow-[0_8px_30px_rgba(0,0,0,0.25)] rounded-[2px] max-w-full">
            <span className="w-1.5 h-1.5 bg-[#ca9f88] rounded-full shrink-0 opacity-75 hidden xs:inline-block" />
            <span
              className="text-[#fbf9f2] text-[0.58rem] sm:text-[0.72rem]
                         tracking-[0.24em] sm:tracking-[0.32em] uppercase font-light
                         drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] truncate"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Valley Ridge Sanctuary · Ceylon Highlands
            </span>
            <span className="w-1.5 h-1.5 bg-[#ca9f88] rounded-full shrink-0 opacity-75 hidden xs:inline-block" />
          </div>
          <h1
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            className="text-[1.85rem] xs:text-[2.25rem] sm:text-[3.25rem] md:text-[4.5rem]
                       leading-none uppercase text-white mb-4 drop-shadow-md whitespace-nowrap
                       tracking-[0.2em] sm:tracking-[0.26em] max-w-full"
          >
            S&nbsp;A&nbsp;N&nbsp;K&nbsp;Ā&nbsp;R&nbsp;A
          </h1>
          <div className="w-14 h-px bg-[#ca9f88] my-4" />
          <p
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
            className="text-[0.6875rem] sm:text-xs md:text-sm uppercase text-[#fbf9f2]/90
                       drop-shadow-sm tracking-[0.26em] sm:tracking-[0.32em] whitespace-nowrap"
          >
            Creating Well Being
          </p>
        </div>

        {/* Booking strip */}
        <div className="relative z-20 w-full px-4 md:px-12 lg:px-20 pb-10 md:pb-14">
          <div
            className="max-w-5xl mx-auto bg-[#fbf9f2] border border-[#ca9f88]
                       shadow-[0_24px_60px_-12px_rgba(19,47,39,0.35)] relative"
          >
            <form
              onSubmit={(e) => { e.preventDefault(); navigate('/rooms'); }}
              className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[rgba(19,47,39,0.12)]"
            >
              {/* Check-In */}
              <LuxuryDatePicker
                label="Check-In Date"
                value={checkIn}
                onChange={setCheckIn}
                variant="bar"
              />

              {/* Check-Out */}
              <LuxuryDatePicker
                label="Check-Out Date"
                value={checkOut}
                onChange={setCheckOut}
                variant="bar"
              />

              {/* Guests Selector */}
              <div ref={guestsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenGuests(!openGuests)}
                  className="w-full text-left px-5 py-4 hover:bg-[#f6f4ed] transition-colors duration-200 focus:outline-none"
                >
                  <label className="sk-label text-[#727975] font-medium mb-1 block cursor-pointer">
                    Sanctuary Guests
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[#132f27] text-[0.9375rem] font-medium tracking-wide truncate"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {guests}
                    </span>
                    <Icon
                      name={openGuests ? 'expand_less' : 'expand_more'}
                      className="text-[#ca9f88] shrink-0 transition-transform"
                      size={18}
                    />
                  </div>
                </button>

                {openGuests && (
                  <div className="absolute top-full left-0 md:right-0 md:left-auto z-50 mt-1.5 w-64 bg-[#fbf9f2] border border-[#ca9f88] shadow-xl py-1 animate-fade-in text-left">
                    {guestOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setGuests(opt);
                          setOpenGuests(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between ${
                          guests === opt
                            ? 'bg-[#132f27] text-[#fbf9f2] font-semibold'
                            : 'text-[#132f27] hover:bg-[#132f27] hover:text-[#fbf9f2]'
                        }`}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="tracking-wide">{opt}</span>
                        {guests === opt && <span className="text-[#ca9f88] text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="flex items-stretch">
                <button
                  type="submit"
                  className="sk-btn-primary w-full h-full min-h-[64px] rounded-none
                             text-[0.65rem] tracking-[0.22em] gap-2"
                >
                  <span>Check Availability</span>
                  <Icon name="arrow_forward" size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── WELCOME OVERVIEW ── */}
      <section className="sk-section bg-[#f6f4ed] border-b border-[rgba(19,47,39,0.08)]" id="about">
        <div className="sk-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text */}
            <div className="lg:col-span-5">
              <div className="sk-eyebrow">
                <span className="sk-eyebrow-line" />
                <span className="sk-overline">Sanctuary Architecture</span>
              </div>
              <h2 className="sk-section-header mb-6">An Intimate Highland Sanctuary</h2>
              <div className="w-14 h-px bg-[#ca9f88] mb-7" />
              <p className="sk-body mb-5">
                Perched along a quiet high-altitude ridge, SANKĀRA was conceived as a silent counterweight to modern acceleration. Spanning four hectares of ancient Ceylon cloud-forest, the sanctuary is sculpted for deep seclusion, ensuring absolute auditory stillness, privacy, and personal rest.
              </p>
              <p className="sk-body mb-10">
                Every boundary is sculpted from raw monolithic granite, warm reclaimed teak, and hand-troweled lime plaster. Each guest is matched with a dedicated private butler who curates unhurried rhythms, bespoke Ayurvedic dining, and unobtrusive presence.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(19,47,39,0.1)]">
                {[['05', 'Private Pavilions'], ['04', 'Protected Hectares'], ['1:1', 'Butler Care']].map(([num, label]) => (
                  <div key={label}>
                    <div className="sk-section-header text-[#c86651] mb-1">{num}</div>
                    <div className="sk-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="lg:col-span-7">
              <div className="relative p-3 border border-[#ca9f88]/50 bg-[#fbf9f2]">
                <div className="overflow-hidden sk-img-zoom aspect-[4/3]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Intimate boutique hotel courtyard with reflecting pool"
                    src="./images/home_retreat_courtyard.jpg"
                  />
                </div>
                <div className="pt-3 px-1 flex justify-between items-center">
                  <span className="sk-label text-[#727975]">Plate 01 · Courtyard Threshold</span>
                  <span className="sk-label text-[#727975]">Natural Granite & Teak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUITES PREVIEW ── */}
      <section className="sk-section bg-[#fbf9f2]" id="suites">
        <div className="sk-container">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12
                          pb-8 border-b border-[rgba(19,47,39,0.08)]">
            <div>
              <div className="sk-eyebrow">
                <span className="sk-eyebrow-line" />
                <span className="sk-overline">Our Accommodations</span>
              </div>
              <h2 className="sk-section-header">Curated Living Spaces</h2>
            </div>
            <p className="sk-body max-w-sm md:text-right">
              Oriented toward personal contemplation and natural light, each private suite commands uninterrupted panoramic views of the misty valley below.
            </p>
          </div>

          {/* 4 suite cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7">
            {suiteCards.map((suite) => (
              <div key={suite.id} className="sk-card group flex flex-col">
                <div className="sk-img-zoom relative aspect-[16/10]">
                  <img src={suite.img} alt={suite.alt} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#fbf9f2]/90 px-2.5 py-1 border border-[#ca9f88]/40">
                    <span className="sk-label text-[#132f27]">Suite {suite.number}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="sk-label text-[#ca9f88] mb-2">{suite.meta}</span>
                  <h3 className="sk-card-title text-[#132f27] mb-3">{suite.title}</h3>
                  <p className="sk-body text-sm flex-1 mb-6 line-clamp-2">{suite.description}</p>
                  <div className="pt-4 border-t border-[rgba(19,47,39,0.08)] flex items-center justify-between">
                    <div>
                      <span className="text-xl font-semibold text-[#132f27]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        ${suite.rate}
                      </span>
                      <span className="sk-label text-[#727975] ml-1">/night</span>
                    </div>
                    <Link to={`/rooms#${suite.id}`} className="sk-btn-outline text-[0.625rem] px-4 py-2">
                      View Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Master Sanctuary flagship — spans 2 cols */}
            <div className="sk-card group flex flex-col md:flex-row lg:col-span-2 border-2 border-[#ca9f88]/60">
              <div className="sk-img-zoom relative md:w-1/2 aspect-[16/10] md:aspect-auto">
                <img
                  className="w-full h-full object-cover"
                  alt="Master Sanctuary flagship suite"
                  src="./images/suite_05_flagship.jpg"
                />
                <div className="absolute top-3 left-3 bg-[#fbf9f2]/90 px-2.5 py-1 border border-[#ca9f88]/40">
                  <span className="sk-label text-[#132f27]">Suite 05</span>
                </div>
              </div>
              <div className="md:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="star" className="text-[#ca9f88]" size={14} />
                    <span className="sk-label text-[#c86651]">Super King · 2 Guests · 120 sqm</span>
                  </div>
                  <h3 className="sk-card-title text-[1.125rem] leading-tight text-[#132f27] mb-3">
                    The Master Sanctuary
                  </h3>
                  <p className="sk-body mb-6">
                    Our crowning pavilion occupies the secluded western tip of the ridge. Features an expansive private heated slate pool, dedicated in-suite spa chamber, custom fireplace, and 24-hour dedicated master butler.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Private Plunge', 'In-Suite Spa', 'Private Chef Access'].map((t) => (
                      <span key={t} className="sk-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-[rgba(19,47,39,0.1)] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <div className="shrink-0">
                    <span className="text-2xl font-semibold text-[#132f27]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      $1,150
                    </span>
                    <span className="sk-label text-[#727975] ml-1">/night</span>
                  </div>
                  <Link to="/rooms#suite-05" className="sk-btn-primary rounded-none text-[0.625rem] px-5 py-2.5 shrink-0 whitespace-nowrap">
                    Reserve Master Suite
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section className="sk-section bg-[#f6f4ed] border-t border-[rgba(19,47,39,0.08)]" id="experiences">
        <div className="sk-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="sk-eyebrow justify-center">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Mindful Immersion</span>
              <span className="sk-eyebrow-line" />
            </div>
            <h2 className="sk-section-header mt-3 mb-4">Curated Experiences</h2>
            <div className="w-12 h-px bg-[#ca9f88] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="sk-card group flex flex-col p-4">
                <div className="sk-img-zoom relative aspect-[4/5] mb-6">
                  <img src={exp.img} alt={exp.alt} className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-[#132f27]/80 backdrop-blur-sm px-3 py-1 border border-[#ca9f88]/40">
                    <span className="sk-label text-white">{exp.tag}</span>
                  </div>
                </div>
                <h3 className="sk-card-title text-[#132f27] mb-3">{exp.title}</h3>
                <p className="sk-body flex-1 mb-6">{exp.body}</p>
                <div className="pt-4 border-t border-[rgba(19,47,39,0.08)] flex items-center justify-between">
                  <span className="sk-label text-[#ca9f88]">{exp.meta}</span>
                  <Icon name={exp.icon} className="text-[#132f27]" size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sk-section bg-[#fbf9f2] border-t border-[rgba(19,47,39,0.08)]" id="reflections">
        <div className="sk-container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="sk-eyebrow justify-center">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Guest Reflections & Reverence</span>
              <span className="sk-eyebrow-line" />
            </div>
            <h2 className="sk-section-header mt-3 mb-4">Words of Tranquility</h2>
            <div className="w-12 h-px bg-[#ca9f88] mx-auto mb-4" />
            <p className="sk-body">Whispers from those who traversed the cloud line to dwell in sacred stillness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div key={r.name} className="sk-card p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="star" className="text-[#ca9f88]" size={14} />
                    ))}
                  </div>
                  <p className="sk-body italic text-[#132f27] mb-6">{r.quote}</p>
                </div>
                <div className="pt-4 border-t border-[rgba(19,47,39,0.08)]">
                  <p className="sk-card-title text-[#132f27] mb-1">{r.name}</p>
                  <p className="sk-label">
                    {r.location} · <span className="text-[#ca9f88]">{r.suite}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION SNAPSHOT ── */}
      <section className="sk-section bg-[#f6f4ed] border-t border-[rgba(19,47,39,0.08)]" id="location">
        <div className="sk-container">
          <div className="mb-12">
            <div className="sk-eyebrow">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Sanctuary Access</span>
            </div>
            <h2 className="sk-section-header">Location & Arrival</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map visual */}
            <div className="lg:col-span-7 bg-[#ebe8dc] border border-[#ca9f88]/40 relative overflow-hidden
                            min-h-[360px] flex flex-col justify-between p-6 custom-topo-grid">
              <div className="absolute inset-0 opacity-40">
                <img
                  className="w-full h-full object-cover"
                  alt="Topographic map of Knuckles Mountain Range"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy-9L2N7gMQETpWT2zXKaxj2Z6wfqJy22_gMIvmf1jGzhXfIC6mrpxsnm4f2y-N0zAQaEaqhechbVyrJyL2nGrclIFaA2xwEsEXMVto1tVLUiTVGSma6ia16nFu9zlxzKJvtYhEhHOGpyFxzywmoRMHcNrvcNtKsUVq_NEVRmZfZnLOLCI8Kldyf6O2e2hCxYZoqBOIawz5zrzZGaPWGAMFMBx8Rz5cGBVqOqDdBSDY1UnPoWV_2dCTA"
                />
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-[#fbf9f2]/90 px-3 py-1.5 border border-[#ca9f88]">
                  <span className="sk-label text-[#132f27]">Elevation: 1,420m AMSL</span>
                </div>
                <div className="bg-[#132f27] text-white px-3 py-1.5">
                  <span className="sk-label text-white">6.9497° N, 80.7891° E</span>
                </div>
              </div>
              <div className="relative z-10 bg-[#fbf9f2]/95 p-4 max-w-xs border border-[rgba(19,47,39,0.15)]">
                <p className="sk-card-title text-[#132f27] mb-1">Valley Sanctuary Ridge</p>
                <p className="sk-body text-sm">Central Province, Sri Lanka. Private helipad on site (SANK-01).</p>
              </div>
            </div>

            {/* Arrival details */}
            <div className="lg:col-span-5 bg-[#fbf9f2] border border-[rgba(19,47,39,0.1)] p-8 flex flex-col justify-between">
              <div>
                <h3 className="sk-card-title text-[1rem] text-[#132f27] mb-6">Seamless Secluded Transfer</h3>
                <div className="space-y-6">
                  {[
                    { icon: 'flight', title: 'Helicopter Transit (25 Min)', body: 'Direct VIP transfer from Bandaranaike International Airport landing directly on our private ridge helipad.' },
                    { icon: 'directions_car', title: 'Private Chauffeur Included', body: 'Complimentary electric SUV transfers with Wi-Fi, refreshments, and bespoke acoustic soundscapes.' },
                    { icon: 'lock', title: 'Gated Seclusion', body: 'Entry is strictly restricted to current registered suite guests and private sanctuary personnel.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <Icon name={item.icon} className="text-[#ca9f88] mt-0.5 shrink-0" size={20} />
                      <div>
                        <h4 className="sk-label text-[#132f27] mb-1">{item.title}</h4>
                        <p className="sk-body text-sm">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-[rgba(19,47,39,0.08)]">
                <Link to="/location" className="sk-btn-outline w-full justify-center">
                  Explore Location & Transfers
                  <Icon name="north_east" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
