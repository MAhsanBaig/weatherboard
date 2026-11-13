
import { useEffect, useState } from 'react'
import { Bell, BellOff, Send } from 'lucide-react'

const STORAGE_KEY = 'weatherboard-reminder'

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      enabled: false,
      time: '08:00',
    }
  } catch {
    return { enabled: false, time: '08:00' }
  }
}

export default function ReminderSettings() {
  const [settings, setSettings] = useState(loadSettings)
  const [message, setMessage] = useState('Choose a time to configure your reminder.')
  const [permission, setPermission] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  )
  const [reminderVisible, setReminderVisible] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      setMessage('Could not save reminder settings.')
    }
  }, [settings])

  // Check the selected reminder time while the app is open.
  useEffect(() => {
    if (!settings.enabled) return

    function checkReminder() {
      const now = new Date()
      const [hours, minutes] = settings.time.split(':').map(Number)
      const reminderTime = new Date()

      reminderTime.setHours(hours, minutes, 0, 0)

      const today = now.toDateString()
      const lastSent = localStorage.getItem('weatherboard-last-reminder')

      if (
        now >= reminderTime &&
        lastSent !== today
      ) {
        setReminderVisible(true)
        setMessage('Your daily WeatherBoard reminder is ready!')

        localStorage.setItem('weatherboard-last-reminder', today)
      }
    }

    checkReminder()

    const interval = window.setInterval(checkReminder, 15000)

    return () => window.clearInterval(interval)
  }, [settings.enabled, settings.time])

  async function enableReminder() {
    if (!settings.time) {
      setMessage('Please select a reminder time.')
      return
    }

    if (!('Notification' in window)) {
      setSettings(previous => ({ ...previous, enabled: true }))
      setMessage('In-app reminder enabled. Browser notifications are unsupported.')
      return
    }

    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission()
      setPermission(result)

      if (result !== 'granted') {
        setSettings(previous => ({ ...previous, enabled: true }))
        setMessage('In-app reminder enabled. Browser notifications were not allowed.')
        return
      }
    } else {
      setPermission(Notification.permission)
    }

    setSettings(previous => ({ ...previous, enabled: true }))
    setReminderVisible(false)
    setMessage(`Daily in-app reminder enabled for ${settings.time}.`)
  }

  function sendTestNotification() {
    if (!('Notification' in window)) {
      setMessage('Your browser does not support notifications.')
      return
    }

    if (Notification.permission !== 'granted') {
      setMessage('Please allow notifications by enabling the reminder first.')
      return
    }

    try {
      new Notification('WeatherBoard Test', {
        body: 'Your WeatherBoard notification is working!',
        icon: '/favicon.svg',
      })

      setMessage('Test system notification sent successfully.')
    } catch (error) {
      setMessage(`Notification failed: ${error.message}`)
    }
  }

  function disableReminder() {
    setSettings(previous => ({ ...previous, enabled: false }))
    setReminderVisible(false)
    setMessage('Daily reminder disabled.')
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Bell className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-lg font-bold">Daily Weather Reminder</h2>
          <p className="text-sm text-slate-500">
            Set a daily reminder to check your weather.
          </p>
        </div>
      </div>

      <p className="mb-3 text-sm">
        Notification permission: <strong>{permission}</strong>
      </p>

      <label htmlFor="reminder-time" className="mb-2 block text-sm font-medium">
        Choose reminder time
      </label>

      <input
        id="reminder-time"
        type="time"
        value={settings.time}
        onChange={event =>
          setSettings(previous => ({
            ...previous,
            time: event.target.value,
          }))
        }
        className="mb-4 min-h-11 w-full rounded-lg border border-slate-300 px-3"
      />

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={enableReminder}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-white"
        >
          <Bell size={18} />
          Enable daily reminder
        </button>

        <button
          type="button"
          onClick={sendTestNotification}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-blue-300 px-4 text-blue-700"
        >
          <Send size={18} />
          Send test notification
        </button>

        <button
          type="button"
          onClick={disableReminder}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border px-4"
        >
          <BellOff size={18} />
          Disable reminder
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-700"
      >
        {message}
      </div>

      {reminderVisible && (
        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-900">
          <h3 className="font-bold">Good morning! ☀️</h3>
          <p className="mt-1 text-sm">
            Time to check today's weather forecast on WeatherBoard.
          </p>
          <button
            type="button"
            onClick={() => setReminderVisible(false)}
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Got it
          </button>
        </div>
      )}

      <p className="mt-3 text-xs text-slate-500">
        In-app reminders work while WeatherBoard is open. System test
        notifications require browser permission. Background notifications
        require a push server.
      </p>
    </section>
  )
}
