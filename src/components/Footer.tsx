import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import SankaraLogo from './SankaraLogo';

const InstagramIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#132f27] text-[#fbf9f2] w-full border-t border-[#fbf9f2]/10" id="concierge">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3 text-[#fbf9f2] hover:opacity-90 transition-opacity mb-4 group"
              >
                <SankaraLogo
                  size={26}
                  className="shrink-0 transition-transform duration-300 group-hover:scale-105"
                  frameColor="#ca9f88"
                  darkSquareColor="#0e231d"
                  accentSquareColor="#ca9f88"
                />
                <span
                  className="tracking-[0.25em] text-lg font-light uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  S A N K Ā R A
                </span>
              </Link>
              <p
                className="text-[#fbf9f2]/70 text-[0.875rem] leading-relaxed max-w-sm mb-6 font-light"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                A boutique highland sanctuary of quiet distinction — where architectural minimalism, high-altitude flora, and calm coexist.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#fbf9f2]/20 flex items-center justify-center text-[#fbf9f2]/70 hover:text-[#fbf9f2] hover:border-[#fbf9f2]/60 hover:bg-[#fbf9f2]/5 transition-all duration-200"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full border border-[#fbf9f2]/20 flex items-center justify-center text-[#fbf9f2]/70 hover:text-[#fbf9f2] hover:border-[#fbf9f2]/60 hover:bg-[#fbf9f2]/5 transition-all duration-200"
              >
                <TwitterIcon size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Explore (2 cols) */}
          <div className="lg:col-span-2">
            <h4
              className="text-[0.75rem] tracking-[0.2em] uppercase text-[#fbf9f2] font-medium mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Explore
            </h4>
            <ul className="space-y-3 text-[0.875rem] font-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <li>
                <Link to="/rooms" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Highland Location
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Reserve a Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Information (3 cols) */}
          <div className="lg:col-span-3">
            <h4
              className="text-[0.75rem] tracking-[0.2em] uppercase text-[#fbf9f2] font-medium mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Information
            </h4>
            <ul className="space-y-3 text-[0.875rem] font-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <li>
                <Link to="/policies" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Sanctuary Policies
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Stillness & Acoustic Protocol
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Biosphere & Living Accord
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-[#fbf9f2]/70 hover:text-[#fbf9f2] transition-colors duration-200 block">
                  Terms of Sanctuary
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4
              className="text-[0.75rem] tracking-[0.2em] uppercase text-[#fbf9f2] font-medium mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Contact
            </h4>
            <div className="space-y-3.5 text-[0.875rem] font-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <p className="flex items-start gap-2.5 text-[#fbf9f2]/70">
                <MapPin size={16} className="text-[#ca9f88] shrink-0 mt-0.5" />
                <span>Knuckles Ridge Corridor, Range 4, Central Highlands, Sri Lanka</span>
              </p>
              <p className="flex items-center gap-2.5 text-[#fbf9f2]/70">
                <Phone size={16} className="text-[#ca9f88] shrink-0" />
                <a href="tel:+94817429000" className="hover:text-[#fbf9f2] transition-colors">
                  +94 81 742 9000
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-[#fbf9f2]/70">
                <Mail size={16} className="text-[#ca9f88] shrink-0" />
                <a href="mailto:concierge@sankarahotel.com" className="hover:text-[#fbf9f2] transition-colors">
                  concierge@sankarahotel.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="mt-14 pt-8 border-t border-[#fbf9f2]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#fbf9f2]/50 font-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <p>© 2024 S A N K Ā R A Sanctuary. All rights reserved.</p>
          <p className="italic text-[#fbf9f2]/40">
            Highland Architectural Sanctuary · Knuckles Mountain Range, Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
