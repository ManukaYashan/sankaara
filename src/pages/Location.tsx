import Icon from '../components/Icon';

const accessOptions = [
  {
    num: '01', icon: 'flight', title: 'Commercial & Private Aviation',
    body: 'Bandaranaike International Airport (CMB) is 3.5 hours by scenic road. Direct charter helicopter service lands directly at S A N K Ā R A Private Ridge Helipad (35 min flight from Colombo).',
    note: 'Helicopter transfers arranged through Sanctuary Concierge 72 hrs prior.',
  },
  {
    num: '02', icon: 'train', title: 'Scenic Highland Rail & Drive',
    body: 'Take the historic colonial Viceroy Luxury Train to Kandy Station. From Kandy, our private estate 4×4 collects guests for an immersive 1.5-hour climb through lush organic tea estates and pine forests.',
    note: 'Secure heated private parking and complimentary EV charging on estate grounds.',
  },
  {
    num: '03', icon: 'directions_car', title: 'Door-to-Door Sanctuary Chauffeur',
    body: 'Relax in our climate-controlled Land Rover or Mercedes luxury fleet with Starlink Wi-Fi, organic chilled botanical refreshments, and estate-curated ambient audio.',
    note: 'Reserve private chauffeur during room reservation or via concierge.',
  },
];

const surroundings = [
  {
    dist: '05 MIN WALK', title: 'Cloud Forest Ridge Trails',
    body: 'Ancient endemic fern pathways leading to misty viewpoints, natural granite waterfalls, and panoramic meditation lookouts over Knuckles Massif.',
    cta: 'Guided Forest Walks',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCdO5IVKt_S4iWGqPWoNlsyy7aURoPUYB0_NIxRUS4eS91oKPc0K-b7e2m1h6HHQnJcnpJG2P6QVzvVo5UBNqeOv0rDnlOe9OUlFNjmTbuGOX3uWdMeyPeIJx2UjCujRBgUz5EJpNsQHooy5JA2_IOKM3N74ldcxXW1rrgV2DEE7s5mjjvEfRamoNdQjGJCOe9JTVLa6MxkT_igGCGQVxgObdGLg3jdqC8vh--10ETka5w-GoaW4rqCg',
    alt: 'Misty mountain hiking path through tropical cloud forest',
  },
  {
    dist: '15 MIN DRIVE', title: 'Artisanal High-Altitude Tea Estates',
    body: 'Historic biodynamic tea terraces. Private tea-tasting sessions with master tea crafters, sampling rare silver tip and hand-rolled golden leaf teas.',
    cta: 'Tea Ceremony Tastings',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnurcy3Y1sHKpo0gCu6helqYZxfAC8VQgofKyBCwkb1o8ns4niz484BWNluBWWto17Fuf9GzUG2nnkRQo-u0F71U5zg4SN0Vmok2brCmDteKQ0hkbLZ8OzmiHy1GgpX1_1tbP1M5YJ-YUVyyVX2-oFlJ_xPJQvrOEim_Da9pVBTasNEdsBIyUxBLJXaJae866A6id1KY7FNUolEtugY5oWNDTbs2RcX6Lyt2rOCXs8NZE4B6B7xYbYbA',
    alt: 'Organic highland tea plantation with geometric terraces',
  },
  {
    dist: '30 MIN DRIVE', title: 'Temple of the Sacred Tooth & Cultural Kandy',
    body: 'UNESCO World Heritage cultural sanctuary, royal botanical gardens, and hand-chiseled Buddhist shrines steeped in seven centuries of heritage.',
    cta: 'Heritage Excursions',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0eG3AXv8_7a4i1CFwXZkrDYWsQSDftC4mysdrHEg0W0p3aVD3578t27qeL_zfBK9QQ77r9YN8VA76eeBeLgER12de1IfH0nPRtoB_Hy1lHEqEFw0Pt1dtzycCManVpXpKnqodjUtluk5DzAg7qMFh14LKCqd2yqHxA0OjQS4zQmiZGGWQ-nSdvccQyq8aVGgk3nXHmviNYYWUei6DqJrO4bQYKzZmE7s0vkMcHdi1DO-ndsc7OWxgLA',
    alt: 'Ancient stone temple amidst serene mountain greenery',
  },
];

export default function Location() {
  return (
    <main className="w-full">

      {/* ── PAGE HEADER ── */}
      <section className="sk-section bg-[#f6f4ed] border-b border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="max-w-3xl">
            <div className="sk-eyebrow mb-4">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Architectural Sanctuary & Access</span>
            </div>
            <h1 className="sk-page-title mb-3">Location & Arrival</h1>
            <p className="sk-page-subtitle">Finding Your Way to Sankāra — Creating Well Being</p>
            <p className="sk-body max-w-2xl">
              Secluded 1,420 meters above sea level within the pristine bio-reserve of the Knuckles Mountain Range in Central Sri Lanka. Designed around high-altitude mountain mists, crystalline freshwater springs, and untouched biodiversity corridors, our sanctuary exists beyond the threshold of ordinary travel.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAP & CONTACT SPLIT ── */}
      <section className="sk-section bg-[#fbf9f2]">
        <div className="sk-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Topographic map */}
            <div className="lg:col-span-7 relative bg-[#ebe8dc] border border-[rgba(19,47,39,0.12)]
                            min-h-[560px] flex flex-col justify-between p-8 custom-topo-grid overflow-hidden">
              {/* Coordinate badge */}
              <div className="flex justify-between items-start z-10">
                <div className="inline-flex items-center gap-2 bg-[#fbf9f2]/90 backdrop-blur-sm
                                border border-[rgba(19,47,39,0.15)] px-3 py-1.5">
                  <span className="sk-dot animate-pulse" />
                  <span className="sk-label text-[#132f27]">07°18'22"N 80°45'11"E — 1,420M</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[rgba(19,47,39,0.2)] bg-[#fbf9f2]/80
                                flex items-center justify-center relative">
                  <span className="absolute top-0.5 sk-label text-[0.5rem] text-[#ca9f88]">N</span>
                  <Icon name="explore" className="text-[#132f27] opacity-70" size={18} />
                </div>
              </div>

              {/* SVG contours */}
              <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
                <svg className="w-full h-full fill-none stroke-[#132f27]/30" strokeWidth="1.2" viewBox="0 0 800 600">
                  <path d="M-50,300 C150,220 280,380 450,260 C620,140 700,280 850,220" />
                  <path d="M-50,380 C180,300 320,440 500,320 C680,200 750,340 850,280" />
                  <path d="M-50,450 C200,380 360,500 540,390 C720,280 780,410 850,360" />
                  <circle className="stroke-[#ca9f88]" cx="430" cy="270" r="45" strokeDasharray="2,2" />
                  <circle className="stroke-[#132f27]/20" cx="430" cy="270" r="95" />
                  <circle className="stroke-[#132f27]/15" cx="430" cy="270" r="150" />
                  <path className="stroke-[#ca9f88]/70" d="M220,100 L430,270 L650,480" strokeDasharray="4,4" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Pin marker */}
              <div className="absolute left-[54%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-[#ca9f88]/20 animate-ping" />
                  <div className="w-10 h-10 rounded-full bg-[#132f27] border-2 border-[#ca9f88]
                                  flex items-center justify-center shadow-lg">
                    <Icon name="spa" className="text-white" size={16} />
                  </div>
                </div>
                <div className="mt-2 bg-[#132f27] text-white px-3 py-1 sk-label border border-[#ca9f88]/60 shadow-md whitespace-nowrap">
                  S A N K Ā R A Ridge Summit
                </div>
              </div>

              {/* Bottom meta */}
              <div className="z-10 flex flex-wrap items-center justify-between gap-4 mt-auto pt-6
                              border-t border-[rgba(19,47,39,0.1)] bg-[#fbf9f2]/70 backdrop-blur-sm p-4">
                <div>
                  <span className="sk-label text-[#727975] block">Terrain Sector</span>
                  <span className="sk-card-title text-[#132f27] text-sm">Range 4 Cloud Corridor</span>
                </div>
                <div>
                  <span className="sk-label text-[#727975] block">Primary Access</span>
                  <span className="sk-card-title text-[#132f27] text-sm">Private Helipad / 4×4 Track</span>
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                   className="sk-label text-[#c86651] hover:text-[#132f27] transition-colors flex items-center gap-1">
                  Satellite Layer <Icon name="open_in_new" size={12} />
                </a>
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-5 bg-[#fbf9f2] border border-[rgba(19,47,39,0.1)] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-block border border-[#ca9f88] px-3 py-1 mb-5">
                  <span className="sk-label text-[#132f27]">Sanctuary Desk & Arrival Protocol</span>
                </div>
                <h2 className="sk-section-header mb-6">Reservation & Concierge Direct</h2>
                <div className="space-y-6 border-t border-[rgba(19,47,39,0.08)] pt-6">
                  {[
                    { icon: 'pin_drop', label: 'Physical Sanctuary Location',
                      content: <><p className="sk-body text-[#132f27] font-medium">Knuckles Sanctuary Ridge Corridor, Range 4,<br />Central Highlands, Sri Lanka</p><p className="sk-label text-[#727975] mt-1">07°18'22"N 80°45'11"E (Helipad & Summit Access)</p></> },
                    { icon: 'call', label: 'Direct Satellite Reception',
                      content: <><a href="tel:+94817429000" className="sk-body text-[#132f27] hover:text-[#c86651] font-medium transition-colors">+94 81 742 9000</a><span className="sk-label text-[#727975] block mt-0.5">24/7 dedicated satellite link</span></> },
                    { icon: 'mail', label: 'Written Inquiries',
                      content: <><a href="mailto:concierge@sankarahotel.com" className="sk-body text-[#132f27] hover:text-[#c86651] transition-colors block">concierge@sankarahotel.com</a><a href="mailto:arrival@sankarahotel.com" className="sk-label text-[#727975] hover:text-[#132f27] transition-colors block mt-0.5">arrival@sankarahotel.com</a></> },
                    { icon: 'schedule', label: 'Check-in & Deceleration Flow',
                      content: <div className="grid grid-cols-2 gap-3 bg-[#ebe8dc]/60 p-3 border border-[rgba(19,47,39,0.1)] mt-2">
                        <div><span className="sk-label text-[#727975] block">Check-In</span><span className="sk-card-title text-[#132f27] text-sm block">15:00 Onward</span><span className="sk-label text-[0.6rem] text-[#727975]">Sunset Welcome Tea</span></div>
                        <div><span className="sk-label text-[#727975] block">Check-Out</span><span className="sk-card-title text-[#132f27] text-sm block">11:00 AM</span><span className="sk-label text-[0.6rem] text-[#727975]">Post Morning Yoga</span></div>
                      </div> },
                  ].map(({ icon, label, content }) => (
                    <div key={label} className="flex items-start gap-4">
                      <Icon name={icon} className="text-[#ca9f88] mt-0.5 shrink-0" size={18} />
                      <div className="flex-1">
                        <h3 className="sk-label text-[#727975] mb-1">{label}</h3>
                        {content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-[rgba(19,47,39,0.08)] mt-8 space-y-4">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                   className="sk-btn-primary w-full justify-center">
                  Get Directions via Google Maps
                  <Icon name="arrow_outward" size={14} />
                </a>
                <button type="button"
                  onClick={() => alert('Please coordinate with satellite concierge for private helipad beacon codes.')}
                  className="sk-label text-[#132f27] hover:text-[#ca9f88] transition-colors w-full text-center
                             underline underline-offset-8 decoration-[#ca9f88] flex items-center justify-center gap-2">
                  Download PDF Arrival Guide & Offline Map
                  <Icon name="download" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO GET HERE ── */}
      <section className="sk-section bg-[#f6f4ed] border-t border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="sk-eyebrow justify-center">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Journeys to Tranquility</span>
              <span className="sk-eyebrow-line" />
            </div>
            <h2 className="sk-section-header mt-3 mb-4">How to Get Here</h2>
            <p className="sk-body">
              Whether arriving via helicopter charter or taking the historic colonial rail through cloud-veiled tea country, the transition is intentional and unhurried.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {accessOptions.map((opt) => (
              <div key={opt.num} className="sk-card p-8 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 flex items-center justify-center border border-[#ca9f88] text-[#ca9f88] mb-6 transition-colors duration-300 group-hover:bg-[#ca9f88] group-hover:text-white">
                    <Icon name={opt.icon} size={22} />
                  </div>
                  <span className="sk-label text-[#ca9f88] block mb-2">{opt.num} / Access Option</span>
                  <h3 className="sk-card-title text-[#132f27] mb-4">{opt.title}</h3>
                  <p className="sk-body text-sm mb-6">{opt.body}</p>
                </div>
                <div className="pt-4 border-t border-[rgba(19,47,39,0.08)]">
                  <span className="sk-label text-[#132f27]">{opt.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SURROUNDINGS ── */}
      <section className="sk-section bg-[#fbf9f2] border-t border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="sk-eyebrow mb-4">
                <span className="sk-eyebrow-line" />
                <span className="sk-overline">Terroir & Surroundings</span>
              </div>
              <h2 className="sk-section-header">Surroundings & Sacred Terroir</h2>
            </div>
            <p className="sk-body max-w-sm md:text-right">
              Pristine nature trails, cultural landmarks, and high-country botanical dining within 15 to 30 minutes of our ridge sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {surroundings.map((s) => (
              <div key={s.title} className="sk-card group flex flex-col">
                <div className="sk-img-zoom relative aspect-[4/3]">
                  <img className="w-full h-full object-cover" alt={s.alt} src={s.img} />
                  <div className="absolute top-3 left-3 bg-[#fbf9f2]/90 backdrop-blur-sm border border-[#ca9f88] px-3 py-1">
                    <span className="sk-label text-[#132f27]">{s.dist}</span>
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="sk-card-title text-[#132f27] mb-3">{s.title}</h3>
                  <p className="sk-body text-sm flex-1 mb-5">{s.body}</p>
                  <span className="inline-flex items-center gap-2 sk-label text-[#ca9f88] group-hover:text-[#132f27] transition-colors">
                    {s.cta} <Icon name="arrow_forward" size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
