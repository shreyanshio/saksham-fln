'use client'

import { Bell, CheckCheck, Clock, Info, X } from 'lucide-react'

interface NotificationItem {
  id: string
  title: string
  detail: string
  time: string
  read: boolean
}

interface NotificationsPopoverProps {
  notifications: NotificationItem[]
  onClose: () => void
  onMarkAllAsRead: () => void
  onSelectAction?: (notif: NotificationItem) => void
}

export function NotificationsPopover({
  notifications,
  onClose,
  onMarkAllAsRead,
  onSelectAction,
}: NotificationsPopoverProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="absolute right-4 sm:right-6 top-14 z-50 w-80 sm:w-96 rounded-2xl border border-white/85 glass-panel-elevated p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between border-b border-[#DCE7E5]/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#0D9488]/15 text-[#0D9488]">
            <Bell size={14} />
          </div>
          <h4 className="text-sm font-bold text-[#142B45] tracking-tight">Notifications</h4>
          {unreadCount > 0 && (
            <span className="rounded-full bg-[#C58A32] px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[11px] font-semibold text-[#0D9488] hover:underline"
            >
              Mark all read
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-black/[0.05] hover:text-[#172B3A] transition"
            aria-label="Close notifications"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="mt-2 max-h-72 overflow-y-auto divide-y divide-[#DCE7E5]/50">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#94A3B8]">No notifications at this time</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelectAction && onSelectAction(n)}
              className={`p-3 transition-all rounded-xl my-1 cursor-pointer hover:bg-white/80 ${n.read ? 'opacity-70 bg-transparent' : 'bg-white/60 border border-white/80 shadow-2xs'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#142B45]">{n.title}</span>
                <span className="text-[10px] font-medium text-[#94A3B8]">{n.time}</span>
              </div>
              <p className="mt-1 text-xs text-[#64748B] leading-relaxed">{n.detail}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 border-t border-[#DCE7E5]/70 pt-2 text-center text-[10px] font-medium text-[#94A3B8]">
        Simulated demo notifications · Asha Primary School
      </div>
    </div>
  )
}
