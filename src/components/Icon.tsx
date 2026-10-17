import React from 'react';
import {
  Calendar,
  ChevronDown,
  ArrowRight,
  Star,
  Utensils,
  Waves,
  Footprints,
  Plane,
  Car,
  Lock,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  TreePine,
  Flower2,
  Sunset,
  Sparkles,
  Bed,
  Wifi,
  Bell,
  ZoomIn,
  Camera,
  Compass,
  ExternalLink,
  Clock,
  Download,
  Train,
  LogIn,
  LogOut,
  Moon,
  Home as HomeIcon,
  VolumeX,
  CreditCard,
  Users,
  Trees,
  Heart,
  Headphones,
  CheckCircle,
  HelpCircle,
  LucideProps
} from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  // Calendar & Time
  calendar_today: Calendar,
  calendar: Calendar,
  schedule: Clock,
  bedtime: Moon,

  // Navigation & Direction
  expand_more: ChevronDown,
  arrow_forward: ArrowRight,
  arrow_right_alt: ArrowRight,
  north_east: ArrowUpRight,
  arrow_outward: ArrowUpRight,
  explore: Compass,

  // Rating & Status
  star: Star,
  check_circle: CheckCircle,

  // Dining & Experiences
  restaurant: Utensils,
  pool: Waves,
  hiking: Footprints,
  flight: Plane,
  directions_car: Car,
  lock: Lock,
  train: Train,
  login: LogIn,
  logout: LogOut,

  // Communication & Location
  mail: Mail,
  call: Phone,
  pin_drop: MapPin,
  location_on: MapPin,
  open_in_new: ExternalLink,
  download: Download,

  // Nature & Botany
  nature: TreePine,
  yard: Flower2,
  wb_twilight: Sunset,
  routine: Sparkles,
  spa: Sparkles,
  nature_people: Trees,
  cruelty_free: Heart,

  // Room & Amenities
  bed: Bed,
  wifi: Wifi,
  concierge: Bell,
  home_pin: HomeIcon,
  volume_off: VolumeX,
  credit_card: CreditCard,
  groups: Users,
  support_agent: Headphones,

  // Media
  zoom_in: ZoomIn,
  photo_camera: Camera,
};

export default function Icon({ name, className = '', size = 18, ...props }: IconProps) {
  const Component = iconMap[name] || HelpCircle;
  return <Component size={size} className={`inline-block shrink-0 ${className}`} {...props} />;
}
