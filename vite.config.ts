import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Resend } from 'resend'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'local-email-api',
        configureServer(server) {
          server.middlewares.use('/api/send-booking-email', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}')
                const resendApiKey = env.RESEND_API_KEY || ''
                const resend = new Resend(resendApiKey)
                const booking = parsed.booking
                const recipient = parsed.to || env.VITE_MANAGER_EMAIL || 'rashanyashan@gmail.com'

                const { data, error } = await resend.emails.send({
                  from: 'SANKĀRA Reservations <onboarding@resend.dev>',
                  to: [recipient],
                  subject: `New Sanctuary Reservation Request · ${booking.suite_title} (${booking.guest_name})`,
                  html: `
                    <div style="font-family: 'Georgia', serif; background-color: #fbf9f2; padding: 32px; color: #132f27; max-width: 600px; margin: 0 auto; border: 1px solid #ca9f88;">
                      <div style="text-align: center; margin-bottom: 24px;">
                        <p style="text-transform: uppercase; letter-spacing: 0.3em; font-size: 11px; color: #ca9f88; margin: 0;">Ceylon Highlands Sanctuary</p>
                        <h1 style="font-family: 'Montserrat', sans-serif; letter-spacing: 0.25em; font-size: 24px; color: #132f27; margin: 8px 0 0 0;">S A N K Ā R A</h1>
                      </div>
                      
                      <div style="background-color: #ffffff; border: 1px solid rgba(19,47,39,0.08); padding: 24px; margin-bottom: 24px;">
                        <h2 style="font-size: 16px; color: #132f27; margin-top: 0; border-bottom: 1px solid #ca9f88; padding-bottom: 8px;">
                          New Reservation Request
                        </h2>
                        <table style="width: 100%; font-size: 14px; line-height: 1.8; color: #132f27;">
                          <tr><td style="color: #727975; width: 130px;">Suite:</td><td><strong>${booking.suite_title}</strong></td></tr>
                          <tr><td style="color: #727975;">Guest Name:</td><td><strong>${booking.guest_name}</strong></td></tr>
                          <tr><td style="color: #727975;">Guest Email:</td><td><a href="mailto:${booking.guest_email}" style="color: #c86651;">${booking.guest_email}</a></td></tr>
                          <tr><td style="color: #727975;">Phone:</td><td><a href="tel:${booking.guest_phone}" style="color: #132f27;">${booking.guest_phone || 'Not provided'}</a></td></tr>
                          <tr><td style="color: #727975;">Check-In:</td><td><strong>${booking.check_in}</strong></td></tr>
                          <tr><td style="color: #727975;">Check-Out:</td><td><strong>${booking.check_out}</strong></td></tr>
                          <tr><td style="color: #727975;">Total Estimate:</td><td><strong>$${Number(booking.total_price || 0).toLocaleString()}</strong></td></tr>
                          <tr><td style="color: #727975; vertical-align: top;">Special Requests:</td><td><em>${booking.notes || 'None'}</em></td></tr>
                        </table>
                      </div>

                      <div style="text-align: center; font-size: 12px; color: #727975;">
                        <p>Managed via SANKĀRA Retreat Admin Portal.</p>
                      </div>
                    </div>
                  `,
                })

                if (error) {
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: error.message }))
                  return
                }

                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, data }))
              } catch (err: any) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: err.message }))
              }
            })
          })
        },
      },
    ],
    base: './',
    server: {
      port: 3000,
      open: true,
    },
  }
})
