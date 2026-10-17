import Icon from '../components/Icon';

const stats = [
  { label: 'Arrival', value: '14:00', note: 'Check-in Onward with Botanical Welcome Tea', icon: 'login' },
  { label: 'Departure', value: '11:00 AM', note: 'Post Morning Mountain Deck Meditation', icon: 'logout' },
  { label: 'Sanctuary Stillness', value: '22:00 – 07:00', note: 'Dedicated Acoustic Silence Hours', icon: 'bedtime' },
  { label: 'Capacity', value: 'Private Pavilions', note: 'Strict Limit of 2 Adults per Private Pavilion', icon: 'home_pin' },
];

const articles = [
  {
    num: 'Article I', icon: 'schedule', title: 'Check-in & Check-out Protocol',
    note: 'Standard Protocol',
    body: 'Check-in commences from 2:00 PM (14:00). Check-out is respectfully requested by 11:00 AM to allow our housekeeping staff sufficient unhurried time for continuous natural air circulation, deep allergen cleansing, and bespoke botanical linen preparation.',
    footer: 'Early decelerations or late departures are subject to room turnover cycles. Guests are warmly invited to rest in the Lotus Library Pavilion with complete baggage handling.',
  },
  {
    num: 'Article II', icon: 'volume_off', title: 'Intimate Property & Acoustic Harmony',
    note: 'Acoustic Preservation',
    body: 'As an intimate highland mountain retreat dedicated to restorative meditation and natural soundscapes, Silent Contemplation Hours take effect nightly at 10:00 PM (22:00) through 07:00 AM.',
    footer: 'Audio media, streaming calls, and personal sound systems within open breezeways require headphones. We cherish the ambient murmur of mountain stream water and evening forest cicadas.',
  },
  {
    num: 'Article III', icon: 'credit_card', title: 'Cancellation & Prepayment Accord',
    note: 'Flexible 48-Hour Threshold',
    body: 'Due to the intimate, limited scale of our sanctuary, cancellations require mindful notice. Reservations may be altered or released with a full refund up to 48 hours prior to the scheduled 14:00 check-in time.',
    footer: 'Releases within 48 hours or unnotified absences incur the first night tariff. Weather advisories impacting highlands transport are coordinated through concierge flexibility.',
  },
  {
    num: 'Article IV', icon: 'groups', title: 'Children & Suite Occupancy',
    note: 'Ages 14+ / 2 Guests per Suite',
    body: 'Each private sanctuary suite accommodates a maximum of two adults to maintain privacy, personal safety along stone cliffside paths, and contemplative balance throughout the estate.',
    footer: 'S A N K Ā R A welcomes individuals aged 14 and older. For multi-generational family journeys or younger guests, private whole-sanctuary reservations are offered on inquiry.',
  },
  {
    num: 'Article V', icon: 'nature_people', title: 'Smoking & Botanical Living',
    note: 'Pure Air Living',
    body: 'S A N K Ā R A is a 100% smoke-free sanctuary indoors. Smoking, vaping, and electronic vapor systems are prohibited within all suites, stone rain-showers, and dining terraces.',
    footer: 'Designated gravel garden alcoves are positioned away from ventilation lines. In respect of the adjacent rainforest bio-reserve, unattended outdoor flames and loose incense are barred.',
  },
  {
    num: 'Article VI', icon: 'cruelty_free', title: 'Fauna Preservation & Pet Accord',
    note: 'Wildlife Sanctuary',
    body: 'To safeguard the sensitive Knuckles biosphere reserve, endemic songbird nesting clusters, and highland wildlife wandering the forest fringe, domestic pets cannot be hosted.',
    footer: 'Certified service animals are welcomed with prior notice to coordinate wildlife boundary buffers and ensure specialized pavilion care.',
  },
];

export default function Policies() {
  return (
    <main className="w-full">

      {/* ── PAGE HEADER ── */}
      <section className="sk-section bg-[#f6f4ed] border-b border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <div className="sk-eyebrow mb-4">
                <span className="sk-eyebrow-line" />
                <span className="sk-overline">Sanctuary Guidelines & Harmony</span>
              </div>
              <h1 className="sk-page-title mb-3">Hotel Policies</h1>
              <p className="sk-page-subtitle">Essential Guest Information for Your Stay</p>
            </div>
            <div className="md:col-span-5 border-l border-[rgba(19,47,39,0.12)] pl-8">
              <p className="sk-body">
                S A N K Ā R A is a secluded highland sanctuary designed for absolute silence, mindful restoration, and ecological reverence. We kindly ask our patrons to embrace these mutual accords to preserve shared stillness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="sk-section--sm bg-[#f6f4ed]">
        <div className="sk-container">
          <div className="border border-[rgba(19,47,39,0.1)] relative overflow-hidden sk-img-zoom">
            <div className="relative w-full h-[360px] md:h-[460px]">
              <img
                className="w-full h-full object-cover"
                alt="Sankara sanctuary with infinity pool reflecting the Knuckles mountain range at sunrise"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrz44AVDyfifIuLkQba8Fb3QUPpoXzEoV7OxSOWs0fR25kFnMhxLxmUeS-TjH12DLSAU6u3Qyseqnf5BeKmLgE5D4ilW-x-tASwCGOkrDU0cxTq5ThtWeoQZcPba1KZxDdvOHOt9RaI54Gb8K8HRoKH1vwdGTb5RGeqKX32fkSad66ENnaXkQtscXTD05j7k3kYpitJUjnY6F7u2Al0Dmef6Jopvd22MXzoP2xZy2mxrSo1XV0Eendig"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132f27]/60 via-transparent to-transparent flex items-end p-8">
                <div>
                  <span className="sk-label text-[#ca9f88] block mb-1">Sanctuary Threshold</span>
                  <p className="sk-card-title text-white tracking-[0.12em]">
                    Quietude Above The Cloud Line · Elevation 1,180m
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="sk-section--sm bg-[#fbf9f2] border-t border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="sk-card p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#ca9f88] mb-4">
                  <span className="sk-label">{s.label}</span>
                  <Icon name={s.icon} className="text-[#ca9f88]" size={20} />
                </div>
                <div>
                  <div className="text-xl font-semibold text-[#132f27] tracking-wider mb-1"
                       style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {s.value}
                  </div>
                  <p className="sk-body text-sm">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SANCTUARY ARTICLES ── */}
      <section className="sk-section bg-[#f6f4ed]">
        <div className="sk-container">
          <div className="flex items-center justify-between border-b border-[rgba(19,47,39,0.08)] pb-5 mb-10">
            <span className="sk-label text-[#ca9f88]">Section 01 — Sanctuary Articles</span>
            <span className="sk-label text-[#727975]">7 Policies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {articles.map((a) => (
              <article key={a.num} className="sk-card p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="sk-label text-[#ca9f88]">{a.num}</span>
                    <Icon name={a.icon} className="text-[rgba(19,47,39,0.4)]" size={20} />
                  </div>
                  <h2 className="sk-card-title text-[#132f27] mb-5">{a.title}</h2>
                  <div className="space-y-4">
                    <p className="sk-body">{a.body}</p>
                    <p className="sk-body text-sm border-t border-[rgba(19,47,39,0.08)] pt-3 text-[#727975]">{a.footer}</p>
                  </div>
                </div>
                <div className="mt-7 pt-4 border-t border-[rgba(19,47,39,0.08)] flex items-center justify-between">
                  <span className="sk-label text-[#132f27]">{a.note}</span>
                  <span className="sk-dot" />
                </div>
              </article>
            ))}

            {/* Article VII — full span */}
            <article className="md:col-span-2 sk-card p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="sk-label text-[#ca9f88]">Article VII</span>
                    <Icon name="restaurant" className="text-[#ca9f88]" size={14} />
                  </div>
                  <h2 className="sk-card-title text-[#132f27] mb-4">Botanical Dining Rhythm & Hours</h2>
                  <p className="sk-body">
                    Our organic culinary experience celebrates micro-harvests from our organic forest gardens. Meal times are paced deliberately to ensure intimacy and panoramic tranquility.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 border-t md:border-t-0 md:border-l
                                border-[rgba(19,47,39,0.08)] pt-6 md:pt-0 md:pl-8">
                  {[
                    { slot: 'Morning Table', time: '07:30 – 10:30', desc: 'Artisan seasonal fruit, herbal infusions & highland rice bowls' },
                    { slot: 'Ceylon Tea Hour', time: '15:30 – 17:00', desc: 'Single-estate handpicked silver tips & fresh botanical infusions' },
                    { slot: 'Stargazing Dinner', time: '18:30 – 21:30', desc: '4-course organic terrace tasting (Last seating 21:00)' },
                  ].map((d) => (
                    <div key={d.slot} className="space-y-1">
                      <span className="sk-label text-[#ca9f88] block">{d.slot}</span>
                      <div className="text-lg font-semibold text-[#132f27] tracking-wider"
                           style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {d.time}
                      </div>
                      <p className="sk-body text-sm">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-7 pt-4 border-t border-[rgba(19,47,39,0.08)] flex items-center justify-between">
                <span className="sk-body text-sm text-[#727975]">* In-suite herbal infusions, mountain spring water & dried fruit pantry available 24 hours.</span>
                <span className="sk-label text-[#132f27]">Estate Organic</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── CONCIERGE CALLOUT ── */}
      <section className="sk-section--sm bg-[#f6f4ed] border-t border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="bg-[#fbf9f2] border border-[#ca9f88]/60 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <Icon name="support_agent" className="text-[#ca9f88]" size={18} />
                  <span className="sk-label text-[#ca9f88]">Personal Retreat Preparation</span>
                </div>
                <h2 className="sk-section-header">Bespoke Requests & Dietary Accords</h2>
                <p className="sk-body">
                  Have a special arrival request, bespoke dietary consideration, or questions about helicopter transit? Our satellite concierge desk is dedicated to your effortless arrival.
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <a href="tel:+94817429000" className="sk-label text-[#132f27] hover:text-[#c86651] transition-colors flex items-center gap-2">
                    <Icon name="call" size={14} /> +94 81 742 9000
                  </a>
                  <span className="text-[rgba(19,47,39,0.2)]">|</span>
                  <a href="mailto:concierge@sankarahotel.com" className="sk-label text-[#132f27] hover:text-[#c86651] transition-colors flex items-center gap-2">
                    <Icon name="mail" size={14} /> concierge@sankarahotel.com
                  </a>
                </div>
              </div>
              <a href="mailto:concierge@sankarahotel.com" className="sk-btn-primary shrink-0 whitespace-nowrap">
                Contact Concierge
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
