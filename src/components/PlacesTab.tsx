'use client'
import { useState } from 'react'
import { useCollection, addItem, setItem, removeItem } from '@/hooks/useFirestore'
import { PlaceItem, PLACE_CATEGORIES } from '@/lib/types'

export default function PlacesTab() {
  const places = useCollection<PlaceItem>('places')
  const [form, setForm] = useState<{ name: string; category: string }>({
    name: '',
    category: '観光',
  })

  const add = async () => {
    if (!form.name) return
    await addItem('places', { ...form, done: false })
    setForm({ name: '', category: '観光' })
  }

  const toggle = (item: PlaceItem) =>
    setItem('places', item.id, { name: item.name, category: item.category, done: !item.done })

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
        <h2 className="font-bold text-ocean-700 mb-3">場所を追加</h2>
        <div className="flex gap-2">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-ocean-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300"
          >
            {PLACE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="場所・お店の名前"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="flex-1 border border-ocean-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300"
          />
          <button
            onClick={add}
            className="bg-ocean-500 text-white rounded-xl px-4 py-2 text-sm font-bold hover:bg-ocean-600"
          >
            追加
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100 space-y-2">
        {places.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">まだリストがありません</p>
        ) : (
          places.map((item) => (
            <div key={item.id} className="flex items-center gap-3 group">
              <button
                onClick={() => toggle(item)}
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  item.done ? 'bg-ocean-500 border-ocean-500 text-white' : 'border-gray-300'
                }`}
              >
                {item.done && '✓'}
              </button>
              <span
                className={`flex-1 text-sm ${item.done ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {item.name}
              </span>
              <span className="text-xs bg-ocean-100 text-ocean-600 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <button
                onClick={() => removeItem('places', item.id)}
                className="text-gray-300 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
