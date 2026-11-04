'use client'

import React, { useState } from 'react'
import {
  Bell,
  ChevronDown,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { Role } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { authService, DEMO_PROFILES } from '@/lib/services/authService'
import { SyncState } from '@/lib/services/syncService'
import { LanguageSelector } from '@/components/language-selector'
import { localStore } from '@/lib/storage'

interface AppHeaderProps {
  onOpenSidebar: () => void
  onOpenSearch: () => void
  onOpenNotifications: () => void
  onOpenOfflineDrawer: () => void
  syncState: SyncState
  currentRole: Role
  onRoleChanged: (newRole: Role) => void
  hasUnreadNotifications?: boolean
}

const ROLES_LIST: Array<{ id: Role; labelEn: string; labelGu: string; labelHi: string }> = [
  { id: 'teacher', labelEn: 'Teacher (Asha Shah)', labelGu: 'શિક્ષક (આશાબેન)', labelHi: 'शिक्षिका (आशा शाह)' },
  { id: 'head_teacher', labelEn: 'Head Teacher (Govindbhai)', labelGu: 'મુખ્ય શિક્ષક (ગોવિંદભાઈ)', labelHi: 'પ્રધાનાધ્યાપક (ગોવિંદભાઈ)' },
  { id: 'crc_coordinator', labelEn: 'CRC Coordinator (Khambhalia)', labelGu: 'સી.આર.સી. સંયોજક', labelHi: 'સી.આર.સી. સમન્વયક' },
  { id: 'deo', labelEn: 'DEO (Devbhumi Dwarka)', labelGu: 'જિલ્લા શિક્ષણાધિકારી (DEO)', labelHi: 'જિલ્લા શિક્ષા અધિકારી' },
  { id: 'admin', labelEn: 'Collectorate Cell (Admin)', labelGu: 'કલેક્ટર કચેરી (વહીવટી સેલ)', labelHi: 'कलेक्ट्रेट शिक्षा प्रकोष्ठ (एडमिन)' },
  { id: 'parent', labelEn: 'Parent (Rameshbhai)', labelGu: 'વાલી પોર્ટલ (રમેશભાઈ)', labelHi: 'અભિભાવક (રમેશભાઈ)' },
]

export function AppHeader({
  onOpenSidebar,
  onOpenSearch,
  onOpenNotifications,
  onOpenOfflineDrawer,
  syncState,
  currentRole,
  onRoleChanged,
  hasUnreadNotifications,
}: AppHeaderProps) {
  const { locale, t } = useI18n()
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false)
  const [resetToast, setResetToast] = useState(false)

  const activeUser = DEMO_PROFILES[currentRole]

  function handleResetPresentationState() {
    localStore.resetWorkspace()
    setResetConfirmOpen(false)
    setResetToast(true)
    setTimeout(() => {
      window.location.reload()
    }, 700)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between glass-header px-4 sm:px-6">
      {/* Toast alert on presentation reset */}
      {resetToast && (
        <div className="fixed right-6 top-16 z-50 rounded-xl border border-[#14A89B]/40 glass-panel-teal px-4 py-2.5 text-xs font-bold text-[#0D9488] shadow-lg animate-in fade-in">
          ✓ Presentation dataset restored to initial state. Reloading...
        </div>
      )}

      {/* Left: Mobile burger & School Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="flex size-9 items-center justify-center rounded-xl glass-panel-subtle glass-interactive border border-white/80 text-[#142B45] hover:border-[#0D9488]/40 lg:hidden"
          aria-label={t.nav.expandSidebar}
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="font-bold text-[#142B45] tracking-tight">{t.schoolName}</span>
            <span>·</span>
            <span className="text-[11px] font-medium text-[#94A3B8]">{t.districtName}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Reset Demo / Presentation State button */}
        <button
          type="button"
          onClick={() => setResetConfirmOpen(true)}
          className="hidden md:flex items-center gap-1.5 rounded-xl glass-panel-subtle glass-interactive border border-white/80 px-2.5 py-1 text-[11px] font-semibold text-[#64748B] hover:text-[#142B45] hover:border-[#14A89B]/40 transition"
          title="Reset presentation data to initial clean state for video walkthrough"
        >
          <RotateCcw size={12} className="opacity-70" />
          <span>Reset Demo</span>
        </button>

        {/* Role Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 rounded-xl glass-panel-subtle glass-interactive border border-white/80 px-2.5 py-1 text-xs font-semibold text-[#142B45] hover:border-[#0D9488]"
            title="Switch User Role View"
          >
            <ShieldCheck size={14} className="text-[#0D9488]" />
            <span className="max-w-[110px] truncate sm:max-w-[150px]">
              {ROLES_LIST.find((r) => r.id === currentRole)?.[
                locale === 'gu' ? 'labelGu' : locale === 'hi' ? 'labelHi' : 'labelEn'
              ]}
            </span>
            <ChevronDown size={12} className="opacity-60" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-10 z-50 w-60 rounded-2xl glass-panel-elevated py-2 shadow-2xl border border-white/80 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                {t.reports.roleView}
              </div>
              <div className="space-y-0.5 px-1 pt-1">
                {ROLES_LIST.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      onRoleChanged(r.id)
                      setRoleMenuOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      currentRole === r.id
                        ? 'bg-[#DFF5EF]/90 font-bold text-[#0D9488]'
                        : 'text-[#172B3A] hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>
                      {locale === 'gu' ? r.labelGu : locale === 'hi' ? r.labelHi : r.labelEn}
                    </span>
                    {currentRole === r.id && <span className="text-xs font-bold text-[#0D9488]">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Unified Multilingual Language Selector Component */}
        <LanguageSelector variant="pill" />

        {/* Offline Sync Status Badge / Trigger */}
        <button
          type="button"
          onClick={onOpenOfflineDrawer}
          className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-semibold glass-interactive transition ${
            syncState.isSimulatedOffline
              ? 'border border-[#C58A32]/40 bg-[#FFF5D9]/80 backdrop-blur-md text-[#C58A32]'
              : syncState.pendingCount > 0
              ? 'border border-white/80 bg-white/70 backdrop-blur-md text-[#142B45]'
              : 'border border-[#14A89B]/30 bg-[#DFF5EF]/80 backdrop-blur-md text-[#16865D]'
          }`}
          title="Click to manage sync queue & offline state"
        >
          {syncState.isSimulatedOffline ? (
            <>
              <WifiOff size={13} />
              <span className="hidden md:inline">{t.common.offline}</span>
            </>
          ) : (
            <>
              <Wifi size={13} />
              <span className="hidden md:inline">{t.common.online}</span>
            </>
          )}

          {syncState.pendingCount > 0 && (
            <span className="rounded-full bg-[#142B45] px-1.5 py-0.2 text-[10px] font-bold text-white">
              {syncState.pendingCount}
            </span>
          )}
        </button>

        {/* Global Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex size-8 items-center justify-center rounded-xl glass-panel-subtle glass-interactive border border-white/80 text-[#64748B] hover:border-[#0D9488] hover:text-[#142B45]"
          aria-label={t.common.search}
          title={t.common.search}
        >
          <Search size={16} />
        </button>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative flex size-8 items-center justify-center rounded-xl glass-panel-subtle glass-interactive border border-white/80 text-[#64748B] hover:border-[#0D9488] hover:text-[#142B45]"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={16} />
          {hasUnreadNotifications && (
            <span className="absolute right-1 top-1 size-2 rounded-full bg-[#C58A32] ring-2 ring-white" />
          )}
        </button>

        {/* User Pill */}
        <div className="hidden items-center gap-2 border-l border-[#DCE7E5] pl-2.5 sm:flex">
          <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#142B45] to-[#0D1E33] text-[11px] font-bold text-white shadow-xs">
            {activeUser.name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-[#142B45] max-w-[90px] truncate">
            {activeUser.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E33]/45 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl glass-panel-solid border border-white/90 p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-[#142B45]">Reset Presentation Data?</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              This will restore all student records, classroom rosters, and assessment attempts back to the official deterministic starting state for jury demonstration.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="rounded-xl border border-[#DCE7E5] glass-panel-subtle px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-white hover:text-[#172B3A] transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetPresentationState}
                className="rounded-xl bg-[#0D9488] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#087F75] shadow-xs transition"
              >
                Reset to Baseline
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
