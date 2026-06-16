'use client'
import { useState } from 'react'
import { useCollection, addItem, removeItem } from '@/hooks/useFirestore'
import { ScheduleItem, DAYS } from '@/lib/types'

const inputClass =
  'w-full border border-ocean-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300'

export default function ScheduleTab() {
  const items = useCollection<ScheduleItem>('schedule', (a, b) =>
    a.day !== b.day ? a.day - b.day : a.time.localeCompare(b.time)
  )
  const [form, setForm] = useState({ day: 0, time: '', title: '', memo: '' })

  const add = async () => {
    if (!form.title || !form.time) return
    await addItem('schedule', { ...form, day: Number(form.day) })
    setForm({ day: 0, time: '', title: '', memo: '' })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
        <h2 className="font-bold text-ocean-700 mb-3">予定を追加</h2>
        <div className="space-y-2">
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
            className={inputClass}
          >
            {DAYS.map((d, i) => (
              <option key={i} value={i}>
                {d.label} {d.date}
              </option>
            ))}
          </select>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="予定のタイトル（例：与那覇前浜ビーチ）"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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

      {DAYS.map((day, dayIndex) => {
        const dayItems = items.filter((s) => s.day === dayIndex)
        return (
          <div key={dayIndex} className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
            <h2 className="font-bold text-ocean-700 mb-3">
              {day.label} <span className="font-normal text-gray-500 text-sm">{day.date}</span>
            </h2>
            {dayItems.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">まだ予定がありません</p>
            ) : (
              <div className="space-y-2">
                {dayItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 group">
                    <div className="text-ocean-500 font-mono text-sm w-12 pt-0.5 flex-shrink-0">
                      {item.time}
                    </div>
                    <div className="flex-1 border-l-2 border-ocean-200 pl-3">
                      <div className="font-medium text-gray-800 text-sm">{item.title}</div>
                      {item.memo && <div className="text-gray-400 text-xs mt-0.5">{item.memo}</div>}
                    </div>
                    <button
                      onClick={() => removeItem('schedule', item.id)}
                      className="text-gray-300 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
