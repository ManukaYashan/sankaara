import { supabase, type BookingRecord, type BlockedDateRecord, type RoomMediaRecord } from '../lib/supabase';

/**
 * Format a Date object to YYYY-MM-DD
 */
export function toISODateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate an array of YYYY-MM-DD date strings between check-in and check-out (inclusive)
 */
export function getDatesBetween(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(toISODateString(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

// ── 1. ROOM MEDIA ─────────────────────────────────────────────────────────────

export async function getRoomMedia(): Promise<Record<string, RoomMediaRecord>> {
  try {
    const { data, error } = await supabase.from('room_media').select('*');
    if (error) {
      console.error('Error fetching room media:', error);
      return {};
    }
    const map: Record<string, RoomMediaRecord> = {};
    (data || []).forEach((row) => {
      map[row.suite_id] = row;
    });
    return map;
  } catch (err) {
    console.error('Exception fetching room media:', err);
    return {};
  }
}

export async function updateRoomMedia(
  suiteId: string,
  media: { main_image: string; thumbnail_1?: string; thumbnail_2?: string }
) {
  const { data, error } = await supabase
    .from('room_media')
    .upsert({
      suite_id: suiteId,
      main_image: media.main_image,
      thumbnail_1: media.thumbnail_1,
      thumbnail_2: media.thumbnail_2,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) throw error;
  return data;
}

/**
 * Upload an image file directly to Supabase Storage bucket 'room-photos'
 * Returns the public URL of the uploaded image
 */
export async function uploadRoomImage(file: File, suiteId: string, slot: string = 'main'): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const cleanExt = ext.toLowerCase();
  const fileName = `${suiteId}_${slot}_${Date.now()}.${cleanExt}`;
  const filePath = `${suiteId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('room-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/jpeg',
    });

  if (uploadError) {
    console.error('Supabase storage upload error:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('room-photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ── 2. BLOCKED DATES ──────────────────────────────────────────────────────────

export async function getBlockedDates(suiteId?: string): Promise<string[]> {
  try {
    let query = supabase.from('blocked_dates').select('date, suite_id');
    if (suiteId) {
      // Return dates blocked specifically for this suite or retreat-wide ('all')
      query = query.or(`suite_id.eq.${suiteId},suite_id.eq.all`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching blocked dates:', error);
      return [];
    }

    // Extract unique YYYY-MM-DD strings
    const uniqueDates = Array.from(new Set((data || []).map((row) => row.date)));
    return uniqueDates;
  } catch (err) {
    console.error('Exception fetching blocked dates:', err);
    return [];
  }
}

export async function getAllBlockedRecords(): Promise<BlockedDateRecord[]> {
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function blockDates(
  suiteId: string,
  dates: string[],
  reason: string = 'Manager Blocked'
) {
  const records = dates.map((date) => ({
    suite_id: suiteId,
    date,
    reason,
  }));

  const { data, error } = await supabase.from('blocked_dates').insert(records).select();
  if (error) throw error;
  return data;
}

export async function unblockDate(id: string) {
  const { error } = await supabase.from('blocked_dates').delete().eq('id', id);
  if (error) throw error;
}

// ── 3. BOOKINGS ───────────────────────────────────────────────────────────────

export async function getAllBookings(): Promise<BookingRecord[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createBooking(
  booking: Omit<BookingRecord, 'id' | 'created_at' | 'status'>
): Promise<BookingRecord> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        ...booking,
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Trigger email notification
  try {
    await sendManagerBookingEmail(data);
  } catch (emailErr) {
    console.warn('Email dispatch warning (booking still logged in DB):', emailErr);
  }

  return data;
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'confirmed' | 'declined',
  options?: { autoBlockDates?: boolean; suiteId?: string; checkIn?: string; checkOut?: string }
) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) throw error;

  // If approved and autoBlockDates is requested, block the dates in calendar
  if (status === 'confirmed' && options?.autoBlockDates && options.checkIn && options.checkOut && options.suiteId) {
    const dates = getDatesBetween(options.checkIn, options.checkOut);
    await blockDates(options.suiteId, dates, `Confirmed Booking #${bookingId.slice(0, 8)}`);
  }

  return data;
}

export async function deleteBooking(bookingId: string) {
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
  if (error) throw error;
}

// ── 4. RESEND EMAIL DISPATCH ──────────────────────────────────────────────────

export async function sendManagerBookingEmail(booking: BookingRecord) {
  const managerEmail = import.meta.env.VITE_MANAGER_EMAIL || 'rashanyashan@gmail.com';

  // We call our API endpoint (or serverless function / dev proxy)
  const response = await fetch('/api/send-booking-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      booking,
      to: managerEmail,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to send email alert:', errorText);
  } else {
    console.log('Manager booking alert email sent successfully.');
  }
}
