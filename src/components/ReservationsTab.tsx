'use client'
import { useState } from 'react'
import { useCollection, addItem, removeItem } from '@/hooks/useFirestore'
import { ReservationItem } from '@/lib/types'

const inputClass =
  'w-full border border-ocean-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300'

const EMPTY = { title: '', date: '', confirmation: '', memo: '' }

export default function ReservationsTab() {
  const reservations = useCollection<ReservationItem>('reservations')
  const [form, setForm] = useState(EMPTY)

  const add = async () => {
    if (!form.title) return
    await addItem('reservations', { ...form })
    setForm(EMPTY)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
        <h2 className="font-bold text-ocean-700 mb-3">予約を追加</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="予約名（例：ANAフライト、宮古島東急）"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="日時（例：10月29日 09:00）"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="予約番号・確認番号"
            value={form.confirmation}
            onChange={(e) => setForm({ ...form, confirmation: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="メモ（任意）"
            value={form.memo}
            onChange={(e) => setForm({ ...form, memo: e.target.value })}
            className={inputClass}
          />
          <button
            onClick={add}
            className="w-full bg-ocean-500 text-white rounded-xl py-2 text-sm font-bold hover:bg-ocean-600 transition-colors"
          >
            追加する
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-ocean-100 text-center">
            <p className="text-gray-400 text-sm">まだ予約情報がありません</p>
          </div>
        ) : (
          reservations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-gray-800">✈️ {item.title}</div>
                  {item.date && <div className="text-sm text-ocean-600 mt-1">📅 {item.date}</div>}
                  {item.confirmation && (
                    <div className="text-xs text-gray-500 mt-1 bg-gray-50 rounded-lg px-2 py-1 font-mono">
                      確認番号: {item.confirmation}
                    </div>
                  )}
                  {item.memo && <div className="text-xs text-gray-400 mt-1">{item.memo}</div>}
                </div>
                <button
                  onClick={() => removeItem('reservations', item.id)}
                  className="text-gray-300 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  削除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
