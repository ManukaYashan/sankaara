import { useState, useEffect, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import LuxuryDatePicker, { parseDateStr, formatDateStr } from '../components/LuxuryDatePicker';
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  getAllBlockedRecords,
  blockDates,
  unblockDate,
  getRoomMedia,
  updateRoomMedia,
  uploadRoomImage,
  getDatesBetween,
  toISODateString,
} from '../services/bookingService';
import type { BookingRecord, BlockedDateRecord, RoomMediaRecord } from '../lib/supabase';

const SUITES_LIST = [
  { id: 'suite-01', title: '01 · Forest View Suite' },
  { id: 'suite-02', title: '02 · Courtyard Garden Room' },
  { id: 'suite-03', title: '03 · Veranda Deluxe' },
  { id: 'suite-04', title: '04 · Rooftop Terrace Suite' },
  { id: 'suite-05', title: '05 · The Master Sanctuary' },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sankara_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'bookings' | 'dates' | 'photos'>('bookings');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [blockedList, setBlockedList] = useState<BlockedDateRecord[]>([]);
  const [roomMediaMap, setRoomMediaMap] = useState<Record<string, RoomMediaRecord>>({});
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // High-Usability Search & Filtering
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'declined'>('all');
  const [bookingSearch, setBookingSearch] = useState('');
  const [selectedBookingNotes, setSelectedBookingNotes] = useState<BookingRecord | null>(null);
  const [dateFilterSuite, setDateFilterSuite] = useState('all');

  // Manual Date Blocking Form
  const [blockSuiteId, setBlockSuiteId] = useState('all');
  const [blockStartDate, setBlockStartDate] = useState(formatDateStr(new Date()));
  const [blockEndDate, setBlockEndDate] = useState(formatDateStr(new Date()));
  const [blockReason, setBlockReason] = useState('Direct Booking');

  // Photo Editing Form
  const [selectedPhotoSuite, setSelectedPhotoSuite] = useState('suite-01');
  const [photoMain, setPhotoMain] = useState('');
  const [photoThumb1, setPhotoThumb1] = useState('');
  const [photoThumb2, setPhotoThumb2] = useState('');
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: 'main' | 'thumb1' | 'thumb2'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, AVIF).');
      return;
    }

    try {
      setUploadingSlot(slot);
      const publicUrl = await uploadRoomImage(file, selectedPhotoSuite, slot);
      if (slot === 'main') setPhotoMain(publicUrl);
      if (slot === 'thumb1') setPhotoThumb1(publicUrl);
      if (slot === 'thumb2') setPhotoThumb2(publicUrl);
      showToast(`Image uploaded successfully to Supabase Storage!`);
    } catch (err: any) {
      console.error('File upload failed:', err);
      alert('Upload failed: ' + (err.message || 'Please check Supabase storage permissions.'));
    } finally {
      setUploadingSlot(null);
      e.target.value = '';
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [bData, blData, rmData] = await Promise.all([
        getAllBookings(),
        getAllBlockedRecords(),
        getRoomMedia(),
      ]);
      setBookings(bData);
      setBlockedList(blData);
      setRoomMediaMap(rmData);
    } catch (err: any) {
      console.error('Error loading admin data:', err);
      showToast('Error syncing with database. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (roomMediaMap[selectedPhotoSuite]) {
      const current = roomMediaMap[selectedPhotoSuite];
      setPhotoMain(current.main_image || '');
      setPhotoThumb1(current.thumbnail_1 || '');
      setPhotoThumb2(current.thumbnail_2 || '');
    }
  }, [selectedPhotoSuite, roomMediaMap]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Default master PIN for the boutique manager
    if (pinInput.trim() === 'sankara2026' || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sankara_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sankara_admin_auth');
  };

  // Booking Actions
  const handleConfirmBooking = async (b: BookingRecord) => {
    if (!b.id) return;
    try {
      setLoading(true);
      await updateBookingStatus(b.id, 'confirmed', {
        autoBlockDates: true,
        suiteId: b.suite_id,
        checkIn: b.check_in,
        checkOut: b.check_out,
      });
      showToast(`Reservation for ${b.guest_name} confirmed & calendar dates blocked!`);
      await loadAllData();
    } catch (err: any) {
      alert('Error updating booking: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineBooking = async (b: BookingRecord) => {
    if (!b.id) return;
    if (!confirm(`Are you sure you want to decline booking for ${b.guest_name}?`)) return;
    try {
      setLoading(true);
      await updateBookingStatus(b.id, 'declined');
      showToast(`Reservation marked as declined.`);
      await loadAllData();
    } catch (err: any) {
      alert('Error declining booking: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id?: string) => {
    if (!id) return;
    if (!confirm('Permanently remove this reservation record?')) return;
    try {
      setLoading(true);
      await deleteBooking(id);
      showToast('Reservation record deleted.');
      await loadAllData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Block Dates Action
  const handleBlockDatesSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const startIso = toISODateString(parseDateStr(blockStartDate));
    const endIso = toISODateString(parseDateStr(blockEndDate));

    if (startIso > endIso) {
      alert('End date cannot be earlier than start date.');
      return;
    }

    try {
      setLoading(true);
      const datesToBlock = getDatesBetween(startIso, endIso);
      await blockDates(blockSuiteId, datesToBlock, blockReason);
      showToast(`Successfully blocked ${datesToBlock.length} date(s) on the calendar!`);
      await loadAllData();
    } catch (err: any) {
      alert('Error blocking dates: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblockDate = async (id?: string) => {
    if (!id) return;
    try {
      setLoading(true);
      await unblockDate(id);
      showToast('Date unblocked and released to calendar.');
      await loadAllData();
    } catch (err: any) {
      alert('Error unblocking date: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save Room Photos
  const handleSavePhotos = async (e: FormEvent) => {
    e.preventDefault();
    if (!photoMain.trim()) {
      alert('Main image URL cannot be empty.');
      return;
    }
    try {
      setLoading(true);
      await updateRoomMedia(selectedPhotoSuite, {
        main_image: photoMain.trim(),
        thumbnail_1: photoThumb1.trim() || undefined,
        thumbnail_2: photoThumb2.trim() || undefined,
      });
      showToast('Room photos updated and published to the live website!');
      await loadAllData();
    } catch (err: any) {
      alert('Error updating photos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // PIN PROTECTION SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-[#132f27] text-[#fbf9f2] p-4 sm:p-6 md:p-8">
        {/* Top bar with back to site */}
        <div className="max-w-md w-full mx-auto flex items-center justify-between pt-2">
          <Link
            to="/"
            className="text-xs text-[#ca9f88] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Icon name="arrow_back" size={14} />
            <span>Back to Sanctuary</span>
          </Link>
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[#ca9f88]/70">
            Internal Operations
          </span>
        </div>

        {/* Center Auth Card */}
        <div className="bg-[#fbf9f2] text-[#132f27] max-w-md w-full mx-auto p-6 sm:p-10 border border-[#ca9f88] shadow-2xl my-8">
          <div className="text-center mb-8">
            <span className="sk-overline text-[#ca9f88] block mb-2 tracking-[0.3em] text-[0.68rem]">
              SANCTUARY OPERATIONS
            </span>
            <h1
              className="text-2xl font-light text-[#132f27] tracking-[0.25em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              S A N K Ā R A
            </h1>
            <p className="sk-body text-xs text-[#727975] mt-2">
              Manager Access Portal · Reservations & Sanctuary Control
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="sk-label text-[#132f27] block mb-1">Manager Passcode</label>
              <input
                id="admin-passcode-input"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter passcode (sankara2026)"
                className="w-full px-4 py-3 bg-white border border-[rgba(19,47,39,0.2)] text-center text-lg tracking-widest text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-[#c86651] mt-1.5 text-center">
                  Incorrect passcode. (Default demo: sankara2026)
                </p>
              )}
            </div>

            <button id="admin-unlock-btn" type="submit" className="sk-btn-primary w-full justify-center py-3 cursor-pointer">
              Unlock Portal
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[rgba(19,47,39,0.08)] text-center">
            <span className="text-[0.75rem] text-[#727975]">
              Demo Passcode: <code className="bg-black/5 px-1.5 py-0.5 text-[#132f27]">sankara2026</code>
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="max-w-md w-full mx-auto text-center pb-2">
          <p className="text-[0.7rem] text-[#ca9f88]/60">
            SANKĀRA Highlands Retreat · Restricted Access
          </p>
        </div>
      </main>
    );
  }

  // AUTHENTICATED MANAGER DASHBOARD
  return (
    <main className="min-h-screen bg-[#f6f4ed] pb-24">
      {/* Toast Notification (Portaled directly to document.body so it floats on viewport) */}
      {toastMessage && createPortal(
        <div className="fixed bottom-6 right-6 z-[99999] bg-[#132f27] text-[#fbf9f2] px-6 py-4 border border-[#ca9f88] shadow-2xl animate-fade-in flex items-center gap-4 max-w-md">
          <div className="w-7 h-7 rounded-full bg-[#ca9f88]/20 flex items-center justify-center shrink-0">
            <Icon name="check_circle" className="text-[#ca9f88]" size={18} />
          </div>
          <div className="flex-1">
            <span className="text-xs tracking-wider block font-medium">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#ca9f88] hover:text-white transition-colors text-sm p-1 leading-none cursor-pointer"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>,
        document.body
      )}

      {/* Header Bar */}
      <section className="bg-[#fbf9f2] border-b border-[rgba(19,47,39,0.1)] pt-6 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Top navigation row: Brand & Return to public site */}
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(19,47,39,0.06)]">
            <Link
              to="/"
              className="text-xs text-[#ca9f88] hover:text-[#132f27] flex items-center gap-1.5 transition-colors font-medium group"
            >
              <Icon name="arrow_back" size={14} className="transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Sanctuary Website</span>
            </Link>
            <span className="text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-[#727975] font-light">
              Management Portal
            </span>
          </div>

          {/* Main header row: Title + Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="sk-overline text-[#ca9f88] text-[0.65rem] sm:text-[0.7rem] tracking-[0.22em]">
                  Live Sanctuary Database Connected
                </span>
              </div>
              <h1
                className="text-xl sm:text-2xl md:text-3xl font-light text-[#132f27] tracking-wider"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Manager Control Center
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={loadAllData}
                disabled={loading}
                className="flex-1 sm:flex-initial px-3.5 py-2 text-xs border border-[rgba(19,47,39,0.2)] bg-white text-[#132f27] hover:border-[#ca9f88] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Icon name="refresh" size={14} className={loading ? 'animate-spin' : ''} />
                <span>Refresh Data</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 text-xs border border-[#c86651]/40 text-[#c86651] hover:bg-[#c86651] hover:text-white transition-colors cursor-pointer"
              >
                Lock / Exit
              </button>
            </div>
          </div>

          {/* Tab Switcher - Smooth scrollable on mobile */}
          <div className="pt-2 flex items-center gap-4 sm:gap-8 border-b border-[rgba(19,47,39,0.08)] overflow-x-auto whitespace-nowrap scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium transition-colors border-b-2 shrink-0 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'border-[#c86651] text-[#132f27]'
                  : 'border-transparent text-[#727975] hover:text-[#132f27]'
              }`}
            >
              <span className="sm:hidden">Inquiries ({bookings.length})</span>
              <span className="hidden sm:inline">Reservation Inquiries ({bookings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`pb-3 text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium transition-colors border-b-2 shrink-0 cursor-pointer ${
                activeTab === 'dates'
                  ? 'border-[#c86651] text-[#132f27]'
                  : 'border-transparent text-[#727975] hover:text-[#132f27]'
              }`}
            >
              <span className="sm:hidden">Calendar ({blockedList.length})</span>
              <span className="hidden sm:inline">Calendar Date Blocker ({blockedList.length} blocked)</span>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-3 text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium transition-colors border-b-2 shrink-0 cursor-pointer ${
                activeTab === 'photos'
                  ? 'border-[#c86651] text-[#132f27]'
                  : 'border-transparent text-[#727975] hover:text-[#132f27]'
              }`}
            >
              <span className="sm:hidden">Suite Photos</span>
              <span className="hidden sm:inline">Room Photos Editor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content Area */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-10">
        {/* TAB 1: BOOKING INQUIRIES */}
        {activeTab === 'bookings' && (() => {
          const filteredBookings = bookings.filter((b) => {
            const matchesFilter =
              bookingFilter === 'all' ? true : b.status === bookingFilter;
            const q = bookingSearch.toLowerCase().trim();
            const matchesSearch =
              !q ||
              b.guest_name.toLowerCase().includes(q) ||
              b.guest_email.toLowerCase().includes(q) ||
              b.suite_title.toLowerCase().includes(q) ||
              (b.guest_phone && b.guest_phone.toLowerCase().includes(q));
            return matchesFilter && matchesSearch;
          });

          const pendingCount = bookings.filter((b) => b.status === 'pending').length;
          const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
          const declinedCount = bookings.filter((b) => b.status === 'declined').length;

          return (
            <div className="space-y-4">
              {/* Controls bar: Filters + Search */}
              <div className="bg-white p-4 border border-[rgba(19,47,39,0.08)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Status Filter Pills */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none text-xs -mx-2 px-2 sm:mx-0 sm:px-0">
                  <button
                    onClick={() => setBookingFilter('all')}
                    className={`px-3 py-1.5 border transition-all cursor-pointer shrink-0 ${
                      bookingFilter === 'all'
                        ? 'bg-[#132f27] text-white border-[#132f27]'
                        : 'bg-[#f6f4ed] text-[#727975] border-transparent hover:border-[#ca9f88]'
                    }`}
                  >
                    All ({bookings.length})
                  </button>
                  <button
                    onClick={() => setBookingFilter('pending')}
                    className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      bookingFilter === 'pending'
                        ? 'bg-[#ca9f88] text-white border-[#ca9f88]'
                        : 'bg-[#f6f4ed] text-[#132f27] border-transparent hover:border-[#ca9f88]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Pending ({pendingCount})
                  </button>
                  <button
                    onClick={() => setBookingFilter('confirmed')}
                    className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      bookingFilter === 'confirmed'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-[#f6f4ed] text-[#132f27] border-transparent hover:border-emerald-300'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Confirmed ({confirmedCount})
                  </button>
                  <button
                    onClick={() => setBookingFilter('declined')}
                    className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      bookingFilter === 'declined'
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'bg-[#f6f4ed] text-[#727975] border-transparent hover:border-rose-300'
                    }`}
                  >
                    Declined ({declinedCount})
                  </button>
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-72">
                  <Icon name="search" size={14} className="absolute left-3 top-3 text-[#727975]" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search guest, email, suite..."
                    className="w-full pl-9 pr-3 py-2 bg-[#f6f4ed] border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                  />
                  {bookingSearch && (
                    <button
                      onClick={() => setBookingSearch('')}
                      className="absolute right-2.5 top-2.5 text-[#727975] hover:text-[#132f27] text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Data View */}
              {filteredBookings.length === 0 ? (
                <div className="bg-white p-12 text-center border border-[rgba(19,47,39,0.08)]">
                  <Icon name="inbox" className="mx-auto text-[#ca9f88] mb-3" size={28} />
                  <p className="text-sm text-[#727975]">No matching reservation requests found.</p>
                </div>
              ) : (
                <>
                  {/* MOBILE VIEW: High-Usability Touch Cards */}
                  <div className="block md:hidden space-y-3">
                    {filteredBookings.map((b) => {
                      const isPending = b.status === 'pending';
                      const isConfirmed = b.status === 'confirmed';

                      return (
                        <div key={b.id} className="bg-white p-4 border border-[rgba(19,47,39,0.1)] shadow-sm space-y-3">
                          {/* Top: Guest Name + Status Pill */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-semibold text-sm text-[#132f27]">{b.guest_name}</div>
                              <div className="text-[0.7rem] text-[#ca9f88] font-medium uppercase tracking-wider mt-0.5">
                                {b.suite_title}
                              </div>
                            </div>
                            <span
                              className={`shrink-0 px-2.5 py-0.5 text-[0.62rem] uppercase tracking-wider font-semibold ${
                                isPending
                                  ? 'bg-amber-50 text-amber-900 border border-amber-300'
                                  : isConfirmed
                                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                                  : 'bg-rose-50 text-rose-900 border border-rose-300'
                              }`}
                            >
                              {b.status}
                            </span>
                          </div>

                          {/* Dates & Price Strip */}
                          <div className="bg-[#fbf9f2] p-2.5 border border-[rgba(19,47,39,0.06)] flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-[#132f27]">
                              <Icon name="calendar" size={13} className="text-[#ca9f88]" />
                              <span className="font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {b.check_in} → {b.check_out}
                              </span>
                            </div>
                            <span className="font-semibold text-[#132f27]">
                              ${Number(b.total_price || 0).toLocaleString()}
                            </span>
                          </div>

                          {/* Contacts */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                            <a href={`mailto:${b.guest_email}`} className="text-[#c86651] hover:underline flex items-center gap-1">
                              <Icon name="mail" size={12} />
                              <span className="truncate max-w-[200px]">{b.guest_email}</span>
                            </a>
                            {b.guest_phone && (
                              <a href={`tel:${b.guest_phone}`} className="text-[#727975] hover:text-[#132f27] flex items-center gap-1">
                                <Icon name="call" size={12} />
                                <span>{b.guest_phone}</span>
                              </a>
                            )}
                          </div>

                          {/* Notes preview if present */}
                          {b.notes && (
                            <div className="p-2 bg-[#f6f4ed] border-l-2 border-[#ca9f88] text-xs text-[#132f27] flex items-start justify-between gap-2">
                              <div className="truncate">
                                <span className="text-[#727975] mr-1">Note:</span>
                                <span>{b.notes}</span>
                              </div>
                              <button
                                onClick={() => setSelectedBookingNotes(b)}
                                className="text-[#ca9f88] hover:text-[#132f27] text-[0.7rem] font-semibold underline shrink-0 cursor-pointer"
                              >
                                View
                              </button>
                            </div>
                          )}

                          {/* Actions Row */}
                          <div className="pt-2 border-t border-[rgba(19,47,39,0.08)] flex items-center gap-2">
                            {isPending ? (
                              <>
                                <button
                                  onClick={() => handleConfirmBooking(b)}
                                  disabled={loading}
                                  className="flex-1 py-2 bg-[#132f27] text-white text-xs hover:bg-[#ca9f88] transition-colors font-medium text-center cursor-pointer"
                                >
                                  Approve & Block
                                </button>
                                <button
                                  onClick={() => handleDeclineBooking(b)}
                                  disabled={loading}
                                  className="py-2 px-3 border border-[#c86651]/40 text-[#c86651] text-xs hover:bg-[#c86651] hover:text-white transition-colors cursor-pointer"
                                >
                                  Decline
                                </button>
                              </>
                            ) : (
                              <span className="text-[0.7rem] text-[#727975] italic flex-1">
                                Status: {b.status}
                              </span>
                            )}
                            <button
                              onClick={() => handleDeleteBooking(b.id)}
                              disabled={loading}
                              className="p-2 text-[#9ca3af] hover:text-[#c86651] transition-colors border border-transparent hover:border-[#c86651]/20 cursor-pointer"
                              title="Delete Record"
                            >
                              <Icon name="delete" size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP VIEW: High-Density Table */}
                  <div className="hidden md:block bg-white border border-[rgba(19,47,39,0.08)] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-[#fbf9f2] border-b border-[rgba(19,47,39,0.1)] sticky top-0 z-10 text-[0.68rem] uppercase tracking-wider text-[#727975]">
                          <tr>
                            <th className="py-3 px-4 font-semibold">Guest & Contact</th>
                            <th className="py-3 px-4 font-semibold">Suite</th>
                            <th className="py-3 px-4 font-semibold">Stay Dates</th>
                            <th className="py-3 px-4 font-semibold">Total</th>
                            <th className="py-3 px-4 font-semibold text-center">Status</th>
                            <th className="py-3 px-4 font-semibold text-center">Notes</th>
                            <th className="py-3 px-4 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(19,47,39,0.06)]">
                          {filteredBookings.map((b) => {
                            const isPending = b.status === 'pending';
                            const isConfirmed = b.status === 'confirmed';

                            return (
                              <tr key={b.id} className="hover:bg-[#f6f4ed]/60 transition-colors">
                                {/* Guest */}
                                <td className="py-3 px-4">
                                  <div className="font-semibold text-[#132f27] text-sm">{b.guest_name}</div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <a href={`mailto:${b.guest_email}`} className="text-[#c86651] hover:underline">
                                      {b.guest_email}
                                    </a>
                                    {b.guest_phone && (
                                      <>
                                        <span className="text-[#d1d5db]">·</span>
                                        <span className="text-[#727975]">{b.guest_phone}</span>
                                      </>
                                    )}
                                  </div>
                                </td>

                                {/* Suite */}
                                <td className="py-3 px-4">
                                  <span className="font-medium text-[#132f27] block">{b.suite_title}</span>
                                  <span className="text-[0.65rem] text-[#727975] uppercase tracking-wider">{b.suite_id}</span>
                                </td>

                                {/* Dates */}
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <span className="font-medium text-[#132f27]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                    {b.check_in} → {b.check_out}
                                  </span>
                                </td>

                                {/* Total */}
                                <td className="py-3 px-4 whitespace-nowrap font-medium text-[#132f27]">
                                  ${Number(b.total_price || 0).toLocaleString()}
                                </td>

                                {/* Status */}
                                <td className="py-3 px-4 text-center whitespace-nowrap">
                                  <span
                                    className={`inline-block px-2.5 py-0.5 text-[0.62rem] uppercase tracking-wider font-semibold ${
                                      isPending
                                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                                        : isConfirmed
                                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                                        : 'bg-rose-50 text-rose-900 border border-rose-300'
                                    }`}
                                  >
                                    {b.status}
                                  </span>
                                </td>

                                {/* Notes */}
                                <td className="py-3 px-4 text-center">
                                  {b.notes ? (
                                    <button
                                      onClick={() => setSelectedBookingNotes(b)}
                                      className="p-1 text-[#ca9f88] hover:text-[#132f27] transition-colors cursor-pointer"
                                      title="View Guest Notes"
                                    >
                                      <Icon name="chat" size={16} />
                                    </button>
                                  ) : (
                                    <span className="text-[#d1d5db]">—</span>
                                  )}
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {isPending && (
                                      <>
                                        <button
                                          onClick={() => handleConfirmBooking(b)}
                                          disabled={loading}
                                          className="px-2.5 py-1 bg-[#132f27] text-white text-[0.7rem] hover:bg-[#ca9f88] transition-colors cursor-pointer"
                                          title="Approve & automatically block dates"
                                        >
                                          Approve
                                        </button>
                                        <button
                                          onClick={() => handleDeclineBooking(b)}
                                          disabled={loading}
                                          className="px-2 py-1 border border-[#c86651]/40 text-[#c86651] text-[0.7rem] hover:bg-[#c86651] hover:text-white transition-colors cursor-pointer"
                                          title="Decline request"
                                        >
                                          Decline
                                        </button>
                                      </>
                                    )}
                                    <button
                                      onClick={() => handleDeleteBooking(b.id)}
                                      disabled={loading}
                                      className="p-1 text-[#9ca3af] hover:text-[#c86651] transition-colors ml-1 cursor-pointer"
                                      title="Delete Record"
                                    >
                                      <Icon name="delete" size={15} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Guest Notes Modal */}
              {selectedBookingNotes && createPortal(
                <div
                  className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
                  onClick={() => setSelectedBookingNotes(null)}
                >
                  <div
                    className="bg-[#fbf9f2] max-w-lg w-full p-6 border border-[#ca9f88] shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[rgba(19,47,39,0.1)] mb-4">
                      <div>
                        <span className="sk-overline text-[#ca9f88] text-[0.65rem] tracking-[0.2em] block">
                          RESERVATION INQUIRY
                        </span>
                        <h3 className="text-base font-semibold text-[#132f27] mt-0.5">
                          {selectedBookingNotes.guest_name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedBookingNotes(null)}
                        className="text-[#727975] hover:text-[#132f27] text-lg p-1"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 text-xs text-[#132f27]">
                      <div>
                        <span className="text-[#727975] block font-medium mb-1">Special Requests & Dietary Notes:</span>
                        <div className="p-3 bg-white border border-[rgba(19,47,39,0.08)] italic text-sm text-[#132f27] leading-relaxed">
                          "{selectedBookingNotes.notes}"
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 text-[0.75rem]">
                        <div>
                          <span className="text-[#727975] block">Suite:</span>
                          <strong>{selectedBookingNotes.suite_title}</strong>
                        </div>
                        <div>
                          <span className="text-[#727975] block">Stay:</span>
                          <strong>{selectedBookingNotes.check_in} → {selectedBookingNotes.check_out}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                document.body
              )}
            </div>
          );
        })()}

        {/* TAB 2: CALENDAR AVAILABILITY & DATE BLOCKER */}
        {activeTab === 'dates' && (() => {
          const filteredBlocked = blockedList.filter((entry) => {
            if (dateFilterSuite === 'all') return true;
            return entry.suite_id === dateFilterSuite;
          });

          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form to block dates (Sticky for great usability) */}
              <div className="lg:col-span-5 bg-white p-6 border border-[rgba(19,47,39,0.08)] shadow-sm lg:sticky lg:top-8">
                <h2 className="text-base font-semibold text-[#132f27] mb-1">Block Sanctuary Dates</h2>
                <p className="text-xs text-[#727975] mb-5">
                  Block dates for walk-ins, phone reservations, or maintenance.
                </p>

                <form onSubmit={handleBlockDatesSubmit} className="space-y-3.5">
                  <div>
                    <label className="sk-label text-[#132f27] block mb-1">Select Suite</label>
                    <select
                      value={blockSuiteId}
                      onChange={(e) => setBlockSuiteId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f6f4ed] border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                    >
                      <option value="all">ALL SUITES (Full Retreat Closure)</option>
                      {SUITES_LIST.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <LuxuryDatePicker
                      label="Start Date"
                      value={blockStartDate}
                      onChange={setBlockStartDate}
                    />
                    <LuxuryDatePicker
                      label="End Date"
                      value={blockEndDate}
                      onChange={setBlockEndDate}
                    />
                  </div>

                  <div>
                    <label className="sk-label text-[#132f27] block mb-1">Reason / Note</label>
                    <input
                      type="text"
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      placeholder="e.g. Phone Booking / VIP Walk-in"
                      className="w-full px-3 py-2 bg-[#f6f4ed] border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                    />
                  </div>

                  <button type="submit" disabled={loading} className="sk-btn-primary w-full justify-center py-2.5 text-xs">
                    Lock & Block Dates
                  </button>
                </form>
              </div>

              {/* Currently blocked list */}
              <div className="lg:col-span-7 bg-white p-6 border border-[rgba(19,47,39,0.08)] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[rgba(19,47,39,0.08)]">
                  <div>
                    <h2 className="text-base font-semibold text-[#132f27]">Currently Blocked Dates</h2>
                    <span className="text-xs text-[#727975]">{filteredBlocked.length} blocked day(s) listed</span>
                  </div>

                  {/* Suite Filter */}
                  <select
                    value={dateFilterSuite}
                    onChange={(e) => setDateFilterSuite(e.target.value)}
                    className="px-2.5 py-1.5 bg-[#f6f4ed] border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none"
                  >
                    <option value="all">Filter: All Suites</option>
                    {SUITES_LIST.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {filteredBlocked.length === 0 ? (
                  <p className="text-xs text-[#727975] py-12 text-center">
                    No blocked dates for this selection.
                  </p>
                ) : (
                  <div className="max-h-[480px] overflow-y-auto divide-y divide-[rgba(19,47,39,0.06)] pr-1">
                    {filteredBlocked.map((entry) => {
                      const suiteObj = SUITES_LIST.find((s) => s.id === entry.suite_id);
                      const suiteLabel =
                        entry.suite_id === 'all'
                          ? 'ALL SUITES'
                          : suiteObj?.title || entry.suite_id;

                      return (
                        <div key={entry.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 hover:bg-[#f6f4ed]/50 px-2.5 border-b border-[rgba(19,47,39,0.05)] sm:border-b-0 transition-colors">
                          <div className="flex items-center justify-between sm:justify-start gap-2.5">
                            <span
                              className="text-xs font-semibold text-[#132f27] shrink-0"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {entry.date}
                            </span>
                            <span className="text-[0.62rem] bg-[#132f27]/5 text-[#132f27] px-2 py-0.5 border border-[#132f27]/10 shrink-0 font-medium">
                              {suiteLabel}
                            </span>
                            <button
                              onClick={() => handleUnblockDate(entry.id)}
                              disabled={loading}
                              className="sm:hidden text-xs text-[#c86651] hover:underline px-2 py-0.5 cursor-pointer font-medium ml-auto"
                            >
                              Unblock
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-[#727975] truncate">
                              {entry.reason || 'Blocked'}
                            </span>
                            <button
                              onClick={() => handleUnblockDate(entry.id)}
                              disabled={loading}
                              className="hidden sm:inline-block text-xs text-[#c86651] hover:underline px-2 py-0.5 shrink-0 cursor-pointer font-medium"
                            >
                              Unblock
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* TAB 3: ROOM PHOTOS EDITOR */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white p-6 border border-[rgba(19,47,39,0.08)] shadow-sm">
              <h2 className="text-base font-semibold text-[#132f27] mb-1">Update Suite Photography</h2>
              <p className="text-xs text-[#727975] mb-6">
                Paste any high-resolution image URL or hosted asset to instantly update the public room gallery.
              </p>

              <form onSubmit={handleSavePhotos} className="space-y-4">
                <div>
                  <label className="sk-label text-[#132f27] block mb-1">Select Room to Edit</label>
                  <select
                    value={selectedPhotoSuite}
                    onChange={(e) => setSelectedPhotoSuite(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#f6f4ed] border border-[rgba(19,47,39,0.15)] text-sm text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                  >
                    {SUITES_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Main Cover Image */}
                <div className="p-3 bg-[#f6f4ed] border border-[rgba(19,47,39,0.1)] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="sk-label text-[#132f27] font-semibold text-xs">Main Cover Image *</label>
                    <label className="cursor-pointer text-[0.7rem] bg-[#132f27] text-white px-2.5 py-1 hover:bg-[#c86651] transition-colors flex items-center gap-1.5">
                      <Icon name="upload" size={12} />
                      <span>{uploadingSlot === 'main' ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingSlot === 'main'}
                        onChange={(e) => handleFileUpload(e, 'main')}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={photoMain}
                    onChange={(e) => setPhotoMain(e.target.value)}
                    placeholder="https://... or upload a file above"
                    className="w-full px-3 py-2 bg-white border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                    required
                  />
                </div>

                {/* Thumbnail 1 */}
                <div className="p-3 bg-[#f6f4ed] border border-[rgba(19,47,39,0.1)] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="sk-label text-[#132f27] font-semibold text-xs">Thumbnail 1 (Bathroom/Garden)</label>
                    <label className="cursor-pointer text-[0.7rem] bg-[#132f27] text-white px-2.5 py-1 hover:bg-[#c86651] transition-colors flex items-center gap-1.5">
                      <Icon name="upload" size={12} />
                      <span>{uploadingSlot === 'thumb1' ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingSlot === 'thumb1'}
                        onChange={(e) => handleFileUpload(e, 'thumb1')}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={photoThumb1}
                    onChange={(e) => setPhotoThumb1(e.target.value)}
                    placeholder="https://... or upload a file above"
                    className="w-full px-3 py-2 bg-white border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                  />
                </div>

                {/* Thumbnail 2 */}
                <div className="p-3 bg-[#f6f4ed] border border-[rgba(19,47,39,0.1)] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="sk-label text-[#132f27] font-semibold text-xs">Thumbnail 2 (Detail/View)</label>
                    <label className="cursor-pointer text-[0.7rem] bg-[#132f27] text-white px-2.5 py-1 hover:bg-[#c86651] transition-colors flex items-center gap-1.5">
                      <Icon name="upload" size={12} />
                      <span>{uploadingSlot === 'thumb2' ? 'Uploading...' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingSlot === 'thumb2'}
                        onChange={(e) => handleFileUpload(e, 'thumb2')}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={photoThumb2}
                    onChange={(e) => setPhotoThumb2(e.target.value)}
                    placeholder="https://... or upload a file above"
                    className="w-full px-3 py-2 bg-white border border-[rgba(19,47,39,0.15)] text-xs text-[#132f27] focus:outline-none focus:border-[#ca9f88]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || Boolean(uploadingSlot)}
                  className="sk-btn-primary w-full justify-center py-3"
                >
                  {loading ? 'Saving Changes...' : 'Save & Publish Photos'}
                </button>
              </form>
            </div>

            {/* Live Preview Panel */}
            <div className="lg:col-span-7 bg-white p-6 border border-[rgba(19,47,39,0.08)] shadow-sm">
              <h2 className="text-base font-semibold text-[#132f27] mb-1">Live Gallery Preview</h2>
              <p className="text-xs text-[#727975] mb-4">
                This is how the images will display on the guest-facing Rooms page.
              </p>

              <div className="space-y-3">
                <div className="relative aspect-[16/10] bg-[#f6f4ed] border border-[rgba(19,47,39,0.1)] overflow-hidden">
                  {photoMain ? (
                    <img
                      src={photoMain}
                      alt="Main cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './images/hero_ceylon_sanctuary.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#a2a9a5]">
                      No main image set
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-[#fbf9f2] px-3 py-1 border border-[#ca9f88] text-[0.65rem] font-bold text-[#132f27] tracking-wider uppercase">
                    Main Cover
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-[16/9] bg-[#f6f4ed] border border-[rgba(19,47,39,0.08)] overflow-hidden">
                    {photoThumb1 ? (
                      <img
                        src={photoThumb1}
                        alt="Thumbnail 1 preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = './images/hero_ceylon_sanctuary.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#a2a9a5]">
                        Thumbnail 1
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[0.6rem] px-1.5 py-0.5">
                      Thumb 1
                    </span>
                  </div>

                  <div className="relative aspect-[16/9] bg-[#f6f4ed] border border-[rgba(19,47,39,0.08)] overflow-hidden">
                    {photoThumb2 ? (
                      <img
                        src={photoThumb2}
                        alt="Thumbnail 2 preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = './images/hero_ceylon_sanctuary.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#a2a9a5]">
                        Thumbnail 2
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[0.6rem] px-1.5 py-0.5">
                      Thumb 2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
