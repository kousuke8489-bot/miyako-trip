'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { TabKey } from '@/lib/types'
import LoginScreen from '@/components/LoginScreen'
import ScheduleTab from '@/components/ScheduleTab'
import BudgetTab from '@/components/BudgetTab'
import PlacesTab from '@/components/PlacesTab'
import PackingTab from '@/components/PackingTab'
import ReservationsTab from '@/components/ReservationsTab'

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'schedule', label: 'スケジュール', icon: '📅' },
  { key: 'budget', label: '予算', icon: '💰' },
  { key: 'places', label: '行きたい場所', icon: '📍' },
  { key: 'packing', label: '持ち物', icon: '🎒' },
  { key: 'reservations', label: '予約情報', icon: '✈️' },
]

export default function Home() {
  const { user, loading, unauthorized, login, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('schedule')

  if (loading) {
    return (
      <div className="min-h-screen bg-ocean-50 flex items-center justify-center">
        <div className="text-ocean-500 text-xl animate-pulse">読み込み中...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginScreen unauthorized={unauthorized} onLogin={login} />
  }

  return (
    <div className="min-h-screen bg-ocean-50">
      <header className="bg-gradient-to-r from-ocean-500 to-ocean-400 text-white shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">🌊 宮古島旅行 2026</h1>
            <p className="text-ocean-100 text-sm">10/29〜31 家族4人</p>
          </div>
          <button onClick={logout} className="text-ocean-100 text-sm hover:text-white">
            ログアウト
          </button>
        </div>
      </header>

      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-2 flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-3 py-3 text-xs font-medium flex flex-col items-center gap-1 border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-ocean-500 text-ocean-600'
                  : 'border-transparent text-gray-500 hover:text-ocean-400'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'budget' && <BudgetTab />}
        {activeTab === 'places' && <PlacesTab />}
        {activeTab === 'packing' && <PackingTab />}
        {activeTab === 'reservations' && <ReservationsTab />}
      </main>
    </div>
  )
}
