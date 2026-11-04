'use client'

import React, { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Cloud,
  CloudOff,
  Loader2,
  RefreshCw,
  Server,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react'
import { SyncState, syncService } from '@/lib/services/syncService'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

interface OfflineSyncDrawerProps {
  isOpen: boolean
  onClose: () => void
  syncState: SyncState
  onSyncUpdated: (newState: SyncState) => void
}

export function OfflineSyncDrawer({
  isOpen,
  onClose,
  syncState,
  onSyncUpdated,
}: OfflineSyncDrawerProps) {
  const { t } = useI18n()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!isOpen) return null

  async function handleTriggerSync() {
    setIsSyncing(true)
    setErrorMessage(null)
    setSyncFeedback(null)

    try {
      const updated = await syncService.triggerSync()
      onSyncUpdated(updated)
      setSyncFeedback('All offline student assessments and milestone records synced successfully!')
      setTimeout(() => setSyncFeedback(null), 4000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sync failed'
      setErrorMessage(msg)
    } finally {
      setIsSyncing(false)
    }
  }

  function handleToggleOffline() {
    const updated = syncService.toggleSimulatedOffline()
    onSyncUpdated(updated)
    setErrorMessage(null)
    setSyncFeedback(
      updated.isSimulatedOffline
        ? 'Offline simulation enabled. Records will now be queued locally on this device.'
        : 'Offline simulation disabled. Device is back online.'
    )
    setTimeout(() => setSyncFeedback(null), 4000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1E33]/45 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/90 glass-panel-elevated p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DCE7E5]/70 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-2xl ${
                syncState.isSimulatedOffline || !syncState.isOnline
                  ? 'bg-[#FFF5D9]/90 border border-[#C58A32]/30 text-[#C58A32]'
                  : 'bg-[#DFF5EF]/90 border border-[#14A89B]/30 text-[#0D9488]'
              }`}
            >
              {syncState.isSimulatedOffline || !syncState.isOnline ? <WifiOff size={20} /> : <Wifi size={20} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#142B45] tracking-tight">Device Synchronization & Offline State</h3>
              <p className="text-xs text-[#64748B]">Asha Primary School · Terminal ID: DWK-SCH-01</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-[#64748B] hover:bg-black/[0.05] hover:text-[#142B45] transition"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Callout */}
        <div className="mt-5 rounded-2xl border border-white/80 glass-panel-subtle p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#142B45]">Network Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold ${
                syncState.isSimulatedOffline
                  ? 'bg-[#FFF5D9] text-[#C58A32] border border-[#C58A32]/30'
                  : syncState.isOnline
                  ? 'bg-[#DFF5EF] text-[#16865D] border border-[#14A89B]/30'
                  : 'bg-[#FDEDEB] text-[#C85A52] border border-[#C85A52]/30'
              }`}
            >
              <span className="size-2 rounded-full bg-current" />
              {syncState.isSimulatedOffline
                ? 'Simulated Offline Mode'
                : syncState.isOnline
                ? 'Online · Connected'
                : 'Disconnected'}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#DCE7E5]/70 pt-2 text-[#64748B]">
            <span>Last Successful Sync:</span>
            <span className="font-medium text-[#142B45]">{syncState.lastSyncedAt}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[#64748B]">
            <span>Pending Local Queue:</span>
            <span className="font-bold text-[#0D9488]">{syncState.pendingCount} record(s)</span>
          </div>
        </div>

        {/* Feedback Alerts */}
        {syncFeedback && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#14A89B]/30 glass-panel-teal p-3.5 text-xs font-semibold text-[#16865D]">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#C85A52]/30 bg-[#FDEDEB]/90 p-3.5 text-xs font-semibold text-[#C85A52]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Queue Items */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#142B45]">
            <span>Pending Offline Queue</span>
            <span className="text-[#64748B]">{syncState.queue.length} operation(s)</span>
          </div>

          <div className="mt-2.5 max-h-48 overflow-y-auto divide-y divide-[#DCE7E5]/50 rounded-2xl border border-white/80 glass-panel-solid">
            {syncState.queue.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#64748B]">
                <CheckCircle2 size={24} className="mx-auto text-[#16865D]" />
                <p className="mt-2 font-semibold text-[#142B45]">Queue is Clear</p>
                <p className="mt-0.5 text-[#94A3B8]">All local records are in sync with the central server.</p>
              </div>
            ) : (
              syncState.queue.map((item) => (
                <div key={item.id} className="p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#142B45] capitalize">
                      {(item.operation || 'update').replace('_', ' ')}: {item.entity || item.entityType || 'record'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
                      <Clock size={11} /> {item.queuedAt}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    Entity ID: <code className="bg-black/[0.04] px-1 rounded">{item.entityId}</code>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Testing Control: Simulate Offline */}
        <div className="mt-5 rounded-2xl border border-white/80 glass-panel-subtle p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#142B45]">Offline Testing Simulation Control</p>
              <p className="text-[11px] text-[#64748B]">
                Simulate remote rural connectivity conditions with zero internet.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleOffline}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition shrink-0 ${
                syncState.isSimulatedOffline
                  ? 'bg-[#C58A32] text-white hover:bg-[#A87226]'
                  : 'border border-[#DCE7E5] glass-panel-solid text-[#142B45] hover:bg-white'
              }`}
            >
              {syncState.isSimulatedOffline ? 'Disable Offline Mode' : 'Enable Offline Mode'}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE7E5]/70 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-xl border-[#DCE7E5] px-4 text-xs font-medium text-[#142B45] glass-panel-subtle hover:bg-white"
          >
            Close
          </Button>

          <Button
            type="button"
            disabled={isSyncing || syncState.isSimulatedOffline}
            onClick={handleTriggerSync}
            className="h-9 rounded-xl bg-[#0D9488] px-5 text-xs font-bold text-white shadow-xs hover:bg-[#087F75] transition"
          >
            {isSyncing ? (
              <>
                <Loader2 size={14} className="mr-1.5 animate-spin" /> Synchronizing...
              </>
            ) : (
              <>
                <RefreshCw size={14} className="mr-1.5" /> Synchronize Now ({syncState.pendingCount})
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
