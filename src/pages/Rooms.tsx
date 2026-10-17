import { useState, useEffect, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../components/Icon';
import LuxuryDatePicker from '../components/LuxuryDatePicker';

interface Suite {
  id: string;
  number: string;
  title: string;
  levelBadge: string;
  subtitle: string;
  description: string;
  rate: number;
  rateDetails: string;
  amenities: string[];
  icon: string;
  mainImage: { src: string; alt: string };
  thumbnails: { src: string; alt: string }[];
}

const suites: Suite[] = [
  {
    id: 'suite-01', number: '01', title: 'Forest View Suite', levelBadge: 'CANOPY LEVEL',
    subtitle: '75 SQM / 807 SQFT · King Bed · Max 2 Adults · Valley Facing',
    description: 'Cantilevered gracefully over virgin valley cloud-forest, featuring a deep Japanese-inspired cedar soaking tub, floor-to-ceiling glass pavilions, and a sheltered private teak balcony framed for uninterrupted contemplative silence.',
    rate: 650, rateDetails: 'Includes bespoke organic breakfast & dedicated butler service',
    amenities: ['King Bed', 'Forest Soaking Tub', 'Private Balcony', 'High-Speed Starlink Wi-Fi'],
    icon: 'nature',
    mainImage: { src: './images/suite_01_forest.jpg', alt: 'Japanese minimalist suite over mountain cloud forest' },
    thumbnails: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmVXCExA-ob32ts1_fTf8gb7RgAWjnyndwLBxiDTUUx6JEejxHcIPVnkzareVBtE5R0HWtiOXaVirUB_FXk4Jcl4n75VwhMq2lDAgE72N7qwf1sKMevSITp0KtCe_7Z5VRUkJqeqFco1NMJi9AJcMafLZf0gINf11b-3QmjYJVAo_dPvSkL-ebOfSvV1nqcVNDCkmn7zqqB9OG9a3un50qkJXnt94Z4JZsLNHWtnfVCDnTvKKyOyhTwA', alt: 'Deep stone soaking tub beside garden niche' },
      { src: './images/home_retreat_courtyard.jpg', alt: 'Sanctuary courtyard reflecting pool and bonsai' },
    ],
  },
  {
    id: 'suite-02', number: '02', title: 'Courtyard Garden Room', levelBadge: 'GROUND MEADOW',
    subtitle: '68 SQM / 732 SQFT · King Bed · Max 2 Adults · Zen Garden',
    description: 'Secluded walled courtyard sanctuary featuring an open-air handcrafted monolithic granite stone bath, endemic fragrant flora, heated terracotta floors, and an intimate indoor meditation niche calibrated for personal stillness.',
    rate: 620, rateDetails: 'Complimentary artisan morning service & courtyard access',
    amenities: ['Enclosed Zen Garden', 'Outdoor Stone Bath', 'Heated Floors', 'In-Suite Tea Bar'],
    icon: 'yard',
    mainImage: { src: './images/suite_02_courtyard.jpg', alt: 'Intimate walled courtyard bedroom with zen rock garden' },
    thumbnails: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnqKV8AkerRlLX-vfkQ8XJyYWyRjsNVql7oCDcgIQNg26c_2WLI8I1d9e8taJOkuLVv6bS-s-4ei0cUclS7JiUmQ6Oq7Y-URUige2VAPhQia4UyzOAzPnviPuFGTU68feLWWll19nfoKJeOA_u80UrgJQgr15F37n_whveCIlaOH--64IgOgR8mNessF2Vxma3Nu-lUdY1gUbPiDZKygl8Yofmc7ZL_b80iTnp6X7P9-dbn0co2cyhkg', alt: 'Outdoor bathing area in monolithic river granite' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFvg7aIZpji9zYR_ZkREf_xnUwKdw6nsi1j4dhnTueKSuc8JoMhzHCD8WoSfQBwBYh51LW3_bQ3pR51T4TnFXeu6Ho4zJ0oo6KQ75-_Rq4HbyMMyQ2Oev8_lklKfWps_kRAME7AH7LSFawAPBwd4Kq-KbaQVWAUZbaY84wYQVIPzzw-CwmBn8SQAXyF8RYuj9cDy4GB0hlmkX1wwtG6rvMCW45DQx00Xa-UnBPCfikXYY-m_sbER7yEQ', alt: 'Ceramic tea corner on low unpolished teak table' },
    ],
  },
  {
    id: 'suite-03', number: '03', title: 'Veranda Deluxe', levelBadge: 'RIDGE ELEVATION',
    subtitle: '80 SQM / 861 SQFT · King Bed · Max 2 Adults · Sunset Ridge',
    description: 'Expansive wraparound teakwood veranda engineered for unhurried sunset contemplation. Complete with an artisanal botanical infusion bar, curated open-air philosophy library, and daybed overlooking panoramic tea valleys.',
    rate: 740, rateDetails: 'Includes bespoke culinary morning & sunset aperitif',
    amenities: ['Wraparound Teak Deck', 'Curated Library', 'Sunset Panorama', 'Rain Shower'],
    icon: 'wb_twilight',
    mainImage: { src: './images/suite_03_veranda.jpg', alt: 'Colonial-modernist retreat with wraparound teak deck' },
    thumbnails: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC642FqrRSHg3z-NPc5cq5hjijl5AP_cIFHtqwCSKK7l9JBH_4JKelkbzVHzzjJQXWzuBsau5G6RBwFOFkOFUIVpPIH0A7VdOLKEv0bkw1kUDRfYFyMWpS5U7mNOVEmOLleLXf9savA1HgTBBmMTeKtITC7nYe8i4yMSgJ_GhXTyszIXSI0I_aPZrSMoKUyKJCgs3E8_ZEi2astl-6mUNZ9624-YFzMA6HrgoNva6tqFZ5jqIuIANOJIQ', alt: 'Curated architectural open-air library alcove' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNAuWpXRBpT1KfdHKisews63K2rsJNFumSRcFEVaODBdy7_5Jf9-qCit0sXXwEl1NQllmoP2yJ5IENcoCmnq5UawgaYR-9EuK6nf1KiSNs9c_e08CQfwcq7oaXUqllEKQ8KjBC0C_ObH15JXr1rWzLMxCdYA7EUxySL4MplIEJMgj9dj6ebqslucFaMpAmNo-roK6TuP6CPgLhmRDdYAKjdalbIRP-YV4l4yxH_bvfNG8rN-d4wn9Swg', alt: 'Outdoor daybed with earthen linen pillows on timber deck' },
    ],
  },
  {
    id: 'suite-04', number: '04', title: 'Rooftop Terrace Suite', levelBadge: 'SKY LEVEL',
    subtitle: '95 SQM / 1,022 SQFT · King Bed · Max 2 Adults · 360° Stargazing',
    description: 'High-elevation sanctuary with an open-sky rooftop terrace, sunken heated slate plunge pool, outdoor celestial daybed, cedar wood sauna, and an antique brass stargazing telescope tuned to the equator sky.',
    rate: 880, rateDetails: 'Includes rooftop nocturnal stargazing session & morning breakfast',
    amenities: ['Rooftop Heated Plunge', 'Cedar Sauna', 'Stargazing Telescope', 'Fireplace'],
    icon: 'star',
    mainImage: { src: './images/suite_04_rooftop.jpg', alt: 'Rooftop suite with stone plunge tub under pergola' },
    thumbnails: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvk9yVcX_br46YarLVqEAjpfNvIBpt24gsZV9BR429-nyFkLo67iVPDV0yRC_cpqRgP_59T1s0YP2JRWm-iyRzXU6O9ZGVefKMRhH6ZxEPPXAsb-mUcfzLBwXn92M2QHns7xjGfcqn8uAMDcppDtgKRLGbcoR2tJVCvhqjy7YnC8SiLil3HIe46mhKAI_102ShwX44XpMUfiqj43SZWNe06pBGaui2Budun1-YPopv7ZBF9-5-WbtzUg', alt: 'Stargazing deck at night over Knuckles range' },
      { src: './images/exp_hydrotherapy_pool.jpg', alt: 'Cedar sauna and hydrotherapy pool with mountain view' },
    ],
  },
  {
    id: 'suite-05', number: '05', title: 'The Master Sanctuary', levelBadge: 'FLAGSHIP RESERVE',
    subtitle: '120 SQM / 1,292 SQFT · Super King Bed · Max 2 Adults · Western Ridge',
    description: 'Our crowning pavilion occupies the secluded western tip of the ridge. Features an expansive private heated slate pool, dedicated in-suite spa chamber, custom fireplace, and 24-hour dedicated master butler.',
    rate: 1150, rateDetails: 'Includes all exclusive sanctuary privileges & private chef access',
    amenities: ['Private Heated Plunge', 'In-Suite Spa', 'Private Chef Access', 'Master Butler 24/7', 'Custom Fireplace'],
    icon: 'spa',
    mainImage: { src: './images/suite_05_flagship.jpg', alt: 'Master sanctuary flagship pavilion on western ridge' },
    thumbnails: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4HsHVNnHR2a1XlPycONW0MJoIujCEb8wSquiOWJQQNDUAa4Yhdhypk6rXVQxZFcPybbCtarX37TjGXBOl7-_pB7y18a9QQN2uoyE8zJUr96VxYuVRQl_DPdAtVcp4KSwBvVrkLqGRA6Gt95OX1w1fPXtTuZwhrvrRWQmK9GeBSd7MiPiPW3G9UyZUyzeAjj0IxEakGt7RkqMO_hxMbsUmalfMShVGc9h8_dGBEWnFRnYlefC34Msa5A', alt: 'Monolithic granite architecture at Sankāra sanctuary pavilion' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE1SsVx2lM2Ksj5Pt1ahM5CMPlRYlLJZ0dTmT7ZexOvk4yqMWk02i_EcBrV64PsHJypUXynYpM_KDCR0AmnU31h0YtuaPJ8-xl4GF0fxhSw7SYe-mZAaE1oLaMNlZdoifb-hcyrPBBT-Doo5X5jwX-nqCfGKjWxROvHZL4rgFTdNzFLDXdjUegSMwRuyXE_GMaW7S9BlkCz5Glby5R4NVU4kinkfdm34-09UK8arbPbRJd78DKIb_ypQ', alt: 'Private heated slate infinity pool at dusk over Knuckles massif' },
    ],
  },
];

export default function Rooms() {
  const [bookingSuite, setBookingSuite] = useState<Suite | null>(null);
  const [activeFilter, setActiveFilter] = useState('suite-all');
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '14 OCT 2024',
    checkOut: '18 OCT 2024',
    notes: '',
  });

  useEffect(() => {
    if (bookingSuite) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [bookingSuite]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    const currentSuite = bookingSuite;
    setBookingSuite(null);
    setToast({
      title: 'Reservation Request Received',
      message: `Thank you, ${formData.name || 'Valued Guest'}. Your request for ${currentSuite?.title} has been logged. Our Master Butler desk will review your dates (${formData.checkIn} — ${formData.checkOut}) and contact you via ${formData.email || 'email'} / ${formData.phone || 'phone'} within 12 hours.`,
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      checkIn: '2024-10-14',
      checkOut: '2024-10-18',
      notes: '',
    });
  };

  const scrollToSuite = (id: string) => {
    setActiveFilter(id);
    if (id === 'suite-all') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="w-full">

      {/* ── PAGE HEADER ── */}
      <section className="sk-section bg-[#f6f4ed] border-b border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="sk-eyebrow mb-4">
                <span className="sk-eyebrow-line" />
                <span className="sk-overline">Accommodations & Sanctuaries</span>
              </div>
              <h1 className="sk-page-title mb-3">The Rooms</h1>
              <p className="sk-page-subtitle">
                Private Sanctuaries Crafted for Rest
              </p>
              <p className="sk-body max-w-2xl">
                Constructed along the natural contours of the ridge, each suite embodies pure tactile stillness. Honest natural materials—salvaged Ceylon teak, monolithic local granite, and textured rammed earth—frame unhindered vistas across the misty cloud forest.
              </p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mt-12 pt-8 border-t border-[rgba(19,47,39,0.08)] flex items-center justify-between overflow-x-auto custom-scroll-hide">
            <div className="flex items-center gap-8 text-nowrap py-1">
              {[{ id: 'suite-all', label: 'All Suites' }, ...suites.map(s => ({ id: s.id, label: s.title.replace(' Suite', '').replace(' Room', '') }))].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSuite(id)}
                  className={`sk-label pb-1.5 transition-all duration-200 border-b-2
                    ${activeFilter === id
                      ? 'text-[#132f27] border-[#c86651]'
                      : 'text-[#727975] border-transparent hover:text-[#132f27] hover:border-[rgba(19,47,39,0.2)]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="sk-label text-[#727975] hidden lg:block shrink-0 ml-8">Intimate Highland Reserve</span>
          </div>
        </div>
      </section>

      {/* ── ROOM LISTINGS ── */}
      <div className="sk-container px-5 md:px-12 lg:px-20 py-16 md:py-24 space-y-24 md:space-y-36" id="suite-all">
        {suites.map((suite, index) => {
          const isEven = index % 2 === 1;
          const isFlagship = suite.id === 'suite-05';

          return (
            <article
              key={suite.id}
              id={suite.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center scroll-mt-28
                ${isFlagship ? 'p-6 md:p-10 border-2 border-[#ca9f88]/60 bg-[rgba(202,159,136,0.03)]' : ''}`}
            >
              {/* Gallery cluster */}
              <div className={`lg:col-span-7 flex flex-col gap-3 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="sk-img-zoom relative aspect-[16/10] border border-[rgba(19,47,39,0.1)]">
                  <img className="w-full h-full object-cover" alt={suite.mainImage.alt} src={suite.mainImage.src} />
                  <div className="absolute top-3.5 left-3.5 z-10 bg-[#fbf9f2] px-3.5 py-1.5 border border-[#ca9f88] shadow-sm">
                    <span className="sk-label !text-[#132f27] font-semibold tracking-[0.2em] block">
                      {suite.levelBadge}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {suite.thumbnails.map((t, i) => (
                    <div key={i} className="sk-img-zoom aspect-[16/9] border border-[rgba(19,47,39,0.08)]">
                      <img className="w-full h-full object-cover" alt={t.alt} src={t.src} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text + booking */}
              <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={suite.icon} className="text-[#ca9f88]" size={14} />
                    <span className="sk-label text-[#ca9f88]">{suite.levelBadge}</span>
                  </div>
                  <h2 className="sk-section-header mb-2">{suite.title}</h2>
                  <p className="sk-label text-[#ca9f88] mb-5">{suite.subtitle}</p>
                  <p className="sk-body mb-7">{suite.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {suite.amenities.map((a) => <span key={a} className="sk-tag">{a}</span>)}
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(19,47,39,0.1)]">
                  <span className="sk-label text-[#727975] block mb-1">Nightly Rate</span>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-semibold text-[#132f27]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      ${suite.rate.toLocaleString()}
                    </span>
                    <span className="sk-body text-sm">/ Night</span>
                  </div>
                  <p className="sk-body text-sm text-[#ca9f88] mb-6">{suite.rateDetails}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingSuite(suite)}
                      className="sk-btn-primary px-8 justify-center"
                    >
                      Book Suite
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── INCLUSIONS STRIP ── */}
      <section className="sk-section bg-[#f6f4ed] border-t border-[rgba(202,159,136,0.3)]">
        <div className="sk-container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="sk-eyebrow justify-center">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Sanctuary Inclusions</span>
              <span className="sk-eyebrow-line" />
            </div>
            <h2 className="sk-section-header mt-3">Effortless Hospitality Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8
                          divide-y lg:divide-y-0 lg:divide-x divide-[rgba(202,159,136,0.3)]">
            {[
              { icon: 'restaurant', title: 'Artisan Breakfast', body: 'Chef-curated organic garden-to-table mornings prepared to your dietary rhythm and served in-suite or in the pavilion.' },
              { icon: 'bed', title: 'Turn-down Ritual', body: 'Organic linen press, herbal pillow mist, and rare estate wild tea infusions served unhurriedly at nightfall.' },
              { icon: 'wifi', title: 'High-Speed Starlink', body: 'Seamless low-latency high-altitude connectivity engineered throughout all private pavilions and open grounds.' },
              { icon: 'concierge', title: 'Personal Butler', body: '24/7 dedicated intuitive hospitality, trail guidance, and discreet retreat coordination without intrusion.' },
            ].map((item) => (
              <div key={item.title} className="pt-8 lg:pt-0 lg:px-8 first:pl-0 last:pr-0 flex flex-col gap-4">
                <Icon name={item.icon} className="text-[#ca9f88]" size={26} />
                <h3 className="sk-card-title text-[#132f27]">{item.title}</h3>
                <p className="sk-body text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING MODAL (PORTALED DIRECTLY TO BODY) ── */}
      {bookingSuite && createPortal(
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fade-in"
          onClick={() => setBookingSuite(null)}
        >
          <div
            className="bg-[#fbf9f2] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-[#ca9f88] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBookingSuite(null)}
              className="absolute top-4 right-4 text-[#727975] hover:text-[#132f27] transition-colors text-lg leading-none p-2"
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="sk-eyebrow mb-2">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline text-[#ca9f88]">
                Reservation Request · {bookingSuite.levelBadge}
              </span>
            </div>
            <h3 className="sk-card-title text-[1.25rem] text-[#132f27] mb-1">
              {bookingSuite.title}
            </h3>
            <p className="sk-body text-[#c86651] font-medium mb-3">
              ${bookingSuite.rate.toLocaleString()} / Night
            </p>
            <p className="sk-body text-xs text-[#727975] mb-6">
              Please provide your contact details and desired dates. Our Master Butler will verify sanctuary availability and confirm your reservation.
            </p>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="sk-label text-[#132f27] block mb-1">Full Guest Name *</label>
                <input
                  required
                  placeholder="e.g. Alistair Sterling"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[rgba(19,47,39,0.15)] bg-[#f6f4ed] p-3 sk-body text-sm
                             focus:border-[#c86651] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="sk-label text-[#132f27] block mb-1">Email Address *</label>
                  <input
                    required
                    placeholder="guest@residence.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-[rgba(19,47,39,0.15)] bg-[#f6f4ed] p-3 sk-body text-sm
                               focus:border-[#c86651] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="sk-label text-[#132f27] block mb-1">Phone / WhatsApp *</label>
                  <input
                    required
                    placeholder="+1 (555) 019-2834"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-[rgba(19,47,39,0.15)] bg-[#f6f4ed] p-3 sk-body text-sm
                               focus:border-[#c86651] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LuxuryDatePicker
                  label="Check-In Date *"
                  value={formData.checkIn}
                  onChange={(dateStr) => setFormData({ ...formData, checkIn: dateStr })}
                  variant="form"
                />
                <LuxuryDatePicker
                  label="Check-Out Date *"
                  value={formData.checkOut}
                  onChange={(dateStr) => setFormData({ ...formData, checkOut: dateStr })}
                  variant="form"
                />
              </div>

              <div>
                <label className="sk-label text-[#132f27] block mb-1">Special Inquiries or Dietary Notes</label>
                <textarea
                  rows={2}
                  placeholder="Special requests, dietary requirements, transit assistance..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-[rgba(19,47,39,0.15)] bg-[#f6f4ed] p-3 sk-body text-sm
                             focus:border-[#c86651] outline-none transition-colors resize-none"
                />
              </div>

              <button type="submit" className="sk-btn-primary w-full justify-center mt-3">
                Confirm Sanctuary Request
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ── TOAST NOTIFICATION (PORTALED DIRECTLY TO BODY) ── */}
      {toast && createPortal(
        <div className="fixed top-6 right-6 z-[9999] max-w-md w-[calc(100vw-3rem)] bg-[#132f27] text-[#fbf9f2] p-5 shadow-2xl border-l-4 border-[#ca9f88] animate-fade-in flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#ca9f88]/20 flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="check_circle" className="text-[#ca9f88]" size={20} />
          </div>
          <div className="flex-1 pr-2">
            <h4 className="sk-card-title text-[0.875rem] text-[#fbf9f2] mb-1">
              {toast.title}
            </h4>
            <p className="sk-body text-xs text-[#fbf9f2]/80 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-[#fbf9f2]/60 hover:text-[#fbf9f2] transition-colors text-base shrink-0 p-1"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>,
        document.body
      )}
    </main>
  );
}
