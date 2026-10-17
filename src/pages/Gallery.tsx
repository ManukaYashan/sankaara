import { useState } from 'react';
import Icon from '../components/Icon';

interface GalleryPlate {
  id: string;
  plate: string;
  tag: string;
  title: string;
  description: string;
  category: 'suites' | 'rooftop' | 'architecture';
  colSpan: string;
  aspectRatio: string;
  image: { src: string; alt: string };
  cameraMeta?: string;
}

const plates: GalleryPlate[] = [
  { id: 'plate-01', plate: 'PLATE 01', tag: "GROUNDS · 07°18'N", title: 'Pabellón Principal & Monolithic Granite', description: 'Hand-quarried gneiss stone, tactile timber horizons, cantilevered colonnades.', category: 'architecture', colSpan: 'md:col-span-7', aspectRatio: 'aspect-[4/5]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4HsHVNnHR2a1XlPycONW0MJoIujCEb8wSquiOWJQQNDUAa4Yhdhypk6rXVQxZFcPybbCtarX37TjGXBOl7-_pB7y18a9QQN2uoyE8zJUr96VxYuVRQl_DPdAtVcp4KSwBvVrkLqGRA6Gt95OX1w1fPXtTuZwhrvrRWQmK9GeBSd7MiPiPW3G9UyZUyzeAjj0IxEakGt7RkqMO_hxMbsUmalfMShVGc9h8_dGBEWnFRnYlefC34Msa5A', alt: 'Monolithic modern architecture at Sankāra sanctuary pavilion' } },
  { id: 'plate-02', plate: 'PLATE 02', tag: 'SUITES · RIDGE VILLA', title: 'Forest Suite Sanctuary', description: 'Belgian raw weave linens, quiet acoustics, unobstructed cloud canopy.', category: 'suites', colSpan: 'md:col-span-5', aspectRatio: 'aspect-[4/5]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA29DTJSFl7n7IPkTUDHLHG8wQ-czP18GVUD1YmTq3WZIauD5ajO_UhQIwbQcSbiDl9LAX7qrVMEhXFoQclQn084f0H6lHgOfYDDPyG3A7d_JClNOFDq1am0xXudpZjVDsEgBiYSphoEg7eNWo9_cUiqOhkXRUajfeASDhQ21L614x_x7ob32M4NoGnHWiiQPltiGVr4NOPmGyQX7fJWwOg8trMxIVTwK_UXxXAs2PU6LM0tX9do0o-jA', alt: 'Sunlight-drenched luxury sanctuary bedroom with Belgian linen bedding' } },
  { id: 'plate-03', plate: 'PLATE 03', tag: 'ROOFTOP · BOTANICA', title: 'Botanical Aperitif & Ceylon Sunset', description: 'Wild endemic cordials, aged wood smoke, horizon aperitivo hour.', category: 'rooftop', colSpan: 'md:col-span-5', aspectRatio: 'aspect-[4/3]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg5mSyZE2DZV_9iOV_V5guo0XmulGrKXR8JIt_ptrQzkS4jDArh5qqZA9Bgt84kznxDxPI4EmkHUjHJDwHGDy2KKirRV4OPPjPFhClRDwmybmopnAjuNliUg7VgkzQWtECphxC00m8kgwUuPW19TWpOQ5sEIPHM753fwCQk0x9VXX9iWjyBmSQSVfva7NJsXCYVYb8XWSmH_S8PXHb-946JTeD1uJVFuzK6BYHs_9OeD_bxByXopBi3w', alt: 'Artisanal botanical craft cocktail in hand-blown crystal tumbler' } },
  { id: 'plate-04', plate: 'PLATE 04', tag: 'WELLNESS · CISTERN', title: 'Thermal Hydrotherapy Cistern', description: 'Spring-fed mountain minerals, thermal stone beds, therapeutic stillness.', category: 'architecture', colSpan: 'md:col-span-7', aspectRatio: 'aspect-[16/10]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvk9yVcX_br46YarLVqEAjpfNvIBpt24gsZV9BR429-nyFkLo67iVPDV0yRC_cpqRgP_59T1s0YP2JRWm-iyRzXU6O9ZGVefKMRhH6ZxEPPXAsb-mUcfzLBwXn92M2QHns7xjGfcqn8uAMDcppDtgKRLGbcoR2tJVCvhqjy7YnC8SiLil3HIe46mhKAI_102ShwX44XpMUfiqj43SZWNe06pBGaui2Budun1-YPopv7ZBF9-5-WbtzUg', alt: 'Architectural infinity plunge pool carved into native dark granite bedrock' } },
  { id: 'plate-05', plate: 'PLATE 05', tag: 'DINING · TERROIR', title: 'Heirloom Terroir Gastronomy', description: 'Estate-foraged botanicals, biodynamic root vegetables, stoneware ceramic.', category: 'rooftop', colSpan: 'md:col-span-4', aspectRatio: 'aspect-[4/5]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeXXkxIVrrjeugTa2yEClboSF82sr25luWq5wjs5x5QyNVytZ1gERAguVGvIz7T9Q62hDKXk25M5IeUe-ZEPoINOYz5au8QuMUuCPZZlVXgYj0gYVrrQ_DROl24I1jDvaQFQHqdNi7Aqu5vuwimQEUn_EoUaJatCyFJ1v6oGR346LhMvOSsnHrJFTlklfNGbLF_T0G_EdB48olRQOn_KmJ8s0NOtEjOO8Vem5udNsi3pzX25U6tVIDNQ', alt: 'Minimalist gastronomic dish on hand-thrown charcoal ceramic stoneware' } },
  { id: 'plate-06', plate: 'PLATE 06', tag: 'WELLNESS · RITUAL', title: 'Enclosed Courtyard Bathing', description: 'Hand-chiseled monolith bath, gardenia petal infusions, silence.', category: 'suites', colSpan: 'md:col-span-4', aspectRatio: 'aspect-[4/5]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmVXCExA-ob32ts1_fTf8gb7RgAWjnyndwLBxiDTUUx6JEejxHcIPVnkzareVBtE5R0HWtiOXaVirUB_FXk4Jcl4n75VwhMq2lDAgE72N7qwf1sKMevSITp0KtCe_7Z5VRUkJqeqFco1NMJi9AJcMafLZf0gINf11b-3QmjYJVAo_dPvSkL-ebOfSvV1nqcVNDCkmn7zqqB9OG9a3un50qkJXnt94Z4JZsLNHWtnfVCDnTvKKyOyhTwA', alt: 'Tranquil open-air stone bathing pavilion inside courtyard garden' } },
  { id: 'plate-07', plate: 'PLATE 07', tag: 'CRAFT · ARTIFACTS', title: 'Tactile Hospitality Details', description: 'Saddle leather key sleeves, heavy turned brass, bespoke cedar incense.', category: 'architecture', colSpan: 'md:col-span-4', aspectRatio: 'aspect-[4/5]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB04GFMDU6ew87nC5G3HOMDwXOb5lbxkQU9jNNJO8H91Q8FshdI-bm9s1uo8z9Tv1GieuQ2DTLFloY0-y04x06GLKrqgwPzrc5pVHAxEkr8dTf0vWuLOLRd5cyU_I46AznS2P6FMzdE6tZunCz6b7eCeLIXpOAHbm2UZrGwR48s0MyxJIX0Ixt-JXcoscx_V4jpYorBa55LXHnzna0yWB_DgNLeQo4bEvr0LNw_v2GEU3GnaGbA4SKMfA', alt: 'Artisanal hotel room artifacts on warm lime plaster' } },
  { id: 'plate-08', plate: 'PLATE 08 · ARCHITECTURAL HORIZON', tag: 'PANORAMA · 1,420M ELEVATION', title: 'Equatorial Dusk over Knuckles Massif', description: 'As night falls across the highlands, thermal air inversions draw cool mist over the timber eaves, welcoming restorative slumber and contemplative quiet.', category: 'architecture', colSpan: 'md:col-span-12', aspectRatio: 'aspect-[16/7]', image: { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE1SsVx2lM2Ksj5Pt1ahM5CMPlRYlLJZ0dTmT7ZexOvk4yqMWk02i_EcBrV64PsHJypUXynYpM_KDCR0AmnU31h0YtuaPJ8-xl4GF0fxhSw7SYe-mZAaE1oLaMNlZdoifb-hcyrPBBT-Doo5X5jwX-nqCfGKjWxROvHZL4rgFTdNzFLDXdjUegSMwRuyXE_GMaW7S9BlkCz5Glby5R4NVU4kinkfdm34-09UK8arbPbRJd78DKIb_ypQ', alt: 'Architectural twilight panorama of Sankāra pavilion over Knuckles range' }, cameraMeta: 'Leica SL2 · 35mm Summicron' },
];

const instagramPosts = [
  { time: '06:14 AM', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcRXOwkSZ9rVJtPvjbOdX8IKN1FCusrzzZttpM8wVvJgssCDZGFDYhk9Z5WMwL8IxpgV3cyanKpw_V9clf834fnP09mh5J0fW7S8Yqf9AcUmgFwBrh9t6u3ulZnhaMEhr8wqPj-ukEkONrHjn9jA78OPuHoZ1-RPe5Fn3qbvtwYPGvLjiibM9ILHLAEajPYK6HU9-M47SFoNvKVuBxbTlDR_z7ZfZtFLdvTmCZpEdSj07cGMUKMjWgPw', alt: 'Misty morning dawn through tropical bamboo forests' },
  { time: 'TEA HARVEST', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeTi-ddxbJMLimr06AnL97dCIP4-usKAWdnTxzR4AD-7-QoPcjQLyykq6RXLiikf4MC15XO-SDde2YqOPqHnpC6HNc4j2Nix0tYyI0iHU8jQ2Q0vw1LWfTYx8m34tiwFtViHY3lIrsPdchMEYgzTC0tttftQmNSswozAZfYT1Nh-ma6Pul7hs-Rduyeyoh9pyq1nlpSKNmXpJuUcw_sTFRF3RJu8xaOh7bK0KSRMATWtpaAtBmJwmMKA', alt: 'Ceylon green tea leaves in handcrafted woven basket' },
  { time: 'INFUSION', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg9qz_WCNTJhkKU8APbE9EUmQFsCDvdz6BA5zh92xDk8-au40ZSYFGiAWq3jQgaX8u2GEbiKqS4G5bnZLVovg3k_Pm4D5pW7f2GbN4mJ0AUxWz0_I0Spe0r0xyBRGSmLpCNa5hRi8SXhMFt3BF6yNnQ0l0lH7bRNSHfCjT0G7Hk71QNFU_n2a1Kw1mgJEPvCHqFLpuI2mOxdRq7BFG5OFOPqVdkHCTuuQNcSNiQkVEBH5F7PBnAw', alt: 'Rustic ceramic cups of herbal infusion on stone bench' },
  { time: 'FIRESIDE DUSK', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyf0HCsGHr-PK5eR8muZpa3DfXu5C_L9UmOs8LH0D3qpRtc-h_P64U9OhkoAOQf941KQm0ho6R194_tXDD0S97z-q_FHlBqBRPeSF2ilKZIuhNt_24X8r_bUXG-CirojW6CLlvt9xcfQ4r9DoXJDlJ9jgjOUy2dTrUYiGzbOgXDZDOZCyQ-dmAd7fWF5wD1B4mpZDBV4I777lh35uBQDTznxqHuIOdCK4V4IRO1jLcslXX8924a8PYew', alt: 'Outdoor sunken fire pit glowing with sandalwood logs' },
  { time: 'SHALA', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnN2VHGAO440fGnkuze-59IBU99z0TI9TrX2-r4CyzFhPFDvS8B-Vjx6KP6ssTcq5PPkmnEtjaLU5U5jOw5UZRDdXI0w7OJysTcitu9ENx38qTrYlx5GsSDYo_V4HbYGAzM8ofJEF9ttSt0EXY1B_DrBVSctEh0ZbXBTL_iVvnLQJXKy6qbWfjzpG279CURq_jWlx8pOYsBFihEjOeYU_-glAc92LdgAIep9SovwTZGL3JXsAytMq9sw', alt: 'Open-sided yoga pavilion with polished clay floors over valley' },
];

const filterItems = [
  { id: 'all', label: 'All' },
  { id: 'suites', label: 'Suites' },
  { id: 'rooftop', label: 'Rooftop & Dining' },
  { id: 'architecture', label: 'Architecture & Grounds' },
] as const;

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'suites' | 'rooftop' | 'architecture'>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryPlate | null>(null);

  const filteredPlates = filter === 'all' ? plates : plates.filter(p => p.category === filter);

  return (
    <main className="w-full">

      {/* ── PAGE HEADER ── */}
      <section className="sk-section bg-[#f6f4ed] border-b border-[rgba(19,47,39,0.08)]">
        <div className="sk-container flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="sk-eyebrow mb-4">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline">Visual Archive & Sanctuary Perspectives</span>
            </div>
            <h1 className="sk-page-title mb-3">Gallery</h1>
            <p className="sk-page-subtitle">A Visual Tour of Sankāra — Creating Well Being</p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="sk-label text-[#727975] border-l border-[rgba(19,47,39,0.15)] pl-4">
              32 Curated Plates
            </span>
            <div className="flex flex-wrap gap-2">
              {filterItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  className={`px-4 py-1.5 rounded-full sk-label transition-all duration-200
                    ${filter === id
                      ? 'bg-[#c86651] text-white'
                      : 'border border-[rgba(19,47,39,0.15)] text-[#727975] hover:border-[#132f27] hover:text-[#132f27]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MASONRY GRID ── */}
      <section className="sk-section bg-[#fbf9f2]">
        <div className="sk-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredPlates.map((plate) => (
              <div
                key={plate.id}
                onClick={() => setLightboxImage(plate)}
                className={`${plate.colSpan} group sk-card cursor-pointer flex flex-col`}
              >
                <div className={`sk-img-zoom relative ${plate.aspectRatio} w-full`}>
                  <img className="w-full h-full object-cover" alt={plate.image.alt} src={plate.image.src} />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#fbf9f2]/90 backdrop-blur-sm px-3 py-1 sk-label text-[#132f27] border border-[#ca9f88]/50">
                      {plate.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-9 h-9 flex items-center justify-center bg-[#132f27] rounded-full">
                      <Icon name="zoom_in" className="text-white" size={16} />
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t border-[rgba(19,47,39,0.08)] flex justify-between items-end">
                  <div>
                    <p className="sk-label text-[#ca9f88] mb-1">{plate.plate}</p>
                    <h3 className="sk-card-title text-[#132f27] mb-1">{plate.title}</h3>
                    <p className="sk-body text-sm">{plate.description}</p>
                  </div>
                  <Icon name="arrow_outward" className="text-[#727975] group-hover:text-[#c86651] transition-colors shrink-0 ml-4" size={18} />
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-14 text-center">
            <button
              onClick={() => alert('The complete 32-plate architectural monograph is available to in-residence guests.')}
              className="sk-btn-outline gap-2"
            >
              Explore Complete Archive (24 Remaining Plates)
              <Icon name="expand_more" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── MOMENTS FROM THE RIDGE ── */}
      <section className="sk-section bg-[#f6f4ed] border-t border-[rgba(19,47,39,0.08)]">
        <div className="sk-container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="sk-eyebrow justify-center mb-3">
              <span className="sk-eyebrow-line" />
              <span className="sk-overline text-[#c86651]">@sankarahotel</span>
              <span className="sk-eyebrow-line" />
            </div>
            <h2 className="sk-section-header mb-3">Moments from the Ridge</h2>
            <p className="sk-body">Unfiltered fragments of morning dew, tea leaf harvesting, open fires, and silent contemplation.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {instagramPosts.map((post, i) => (
              <div key={i} className={`group relative aspect-square sk-img-zoom ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <img className="w-full h-full object-cover" alt={post.alt} src={post.src} />
                <div className="absolute inset-0 bg-[#132f27]/45 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300 flex items-center justify-center">
                  <span className="sk-label text-white flex items-center gap-1.5">
                    <Icon name="photo_camera" size={14} />
                    {post.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="sk-label text-[#132f27] hover:text-[#ca9f88] transition-colors duration-200 inline-flex items-center gap-2">
              Follow our daily journal @sankarahotel
              <Icon name="arrow_right_alt" size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#132f27]/85 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="bg-[#fbf9f2] max-w-4xl w-full p-4 md:p-6 border border-[#ca9f88] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-[#727975] hover:text-[#132f27] transition-colors text-xl z-10">
              ✕
            </button>
            <div className="relative aspect-[16/10] sk-img-zoom mb-5">
              <img className="w-full h-full object-cover" alt={lightboxImage.image.alt} src={lightboxImage.image.src} />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
              <div>
                <span className="sk-label text-[#ca9f88] block mb-1">{lightboxImage.plate} · {lightboxImage.tag}</span>
                <h3 className="sk-card-title text-[1.125rem] text-[#132f27] mb-1">{lightboxImage.title}</h3>
                <p className="sk-body text-sm max-w-2xl">{lightboxImage.description}</p>
              </div>
              {lightboxImage.cameraMeta && (
                <span className="sk-label text-[#727975] whitespace-nowrap shrink-0">{lightboxImage.cameraMeta}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
