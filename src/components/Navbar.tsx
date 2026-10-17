import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home',     path: '/' },
  { name: 'Rooms',    path: '/rooms' },
  { name: 'Gallery',  path: '/gallery' },
  { name: 'Location', path: '/location' },
  { name: 'Policies', path: '/policies' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? 'bg-[#fbf9f2]/98 backdrop-blur-md shadow-[0_1px_0_rgba(19,47,39,0.08)]'
          : 'bg-[#fbf9f2] border-b border-[rgba(19,47,39,0.08)]'
        }`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-5 md:px-12 lg:px-20
                      h-[68px] md:h-[76px]">

        {/* Brand */}
        <Link
          to="/"
          className="text-[#132f27] hover:text-[#c86651] transition-colors duration-300
                     tracking-[0.28em] shrink-0"
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.9375rem', fontWeight: 400 }}
        >
          S A N K Ā R A
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-anim sk-label transition-colors duration-200
                ${isActive(item.path)
                  ? 'text-[#c86651] active'
                  : 'text-[#727975] hover:text-[#132f27]'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/rooms"
            className="hidden sm:inline-flex sk-btn-primary text-[0.625rem] px-5 py-2.5 rounded-none"
          >
            Book Now
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 text-[#132f27] hover:text-[#c86651] transition-colors duration-200"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fbf9f2] border-t border-[rgba(19,47,39,0.08)] px-5 py-6
                        animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sk-label py-3 px-3 border-l-2 transition-all duration-200
                  ${isActive(item.path)
                    ? 'text-[#c86651] border-[#c86651] bg-[rgba(200,102,81,0.04)]'
                    : 'text-[#727975] border-transparent hover:text-[#132f27] hover:border-[rgba(19,47,39,0.2)]'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-5 pt-5 border-t border-[rgba(19,47,39,0.08)]">
            <Link to="/rooms" className="sk-btn-primary w-full rounded-none justify-center">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
