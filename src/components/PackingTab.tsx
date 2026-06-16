'use client'
import { useState } from 'react'
import { useCollection, addItem, setItem, removeItem } from '@/hooks/useFirestore'
import { PackingItem, PACKING_PEOPLE } from '@/lib/types'

export default function PackingTab() {
  const packing = useCollection<PackingItem>('packing')
  const [form, setForm] = useState<{ name: string; person: string }>({
    name: '',
    person: '全員',
  })

  const add = async () => {
    if (!form.name) return
    await addItem('packing', { ...form, packed: false })
    setForm({ name: '', person: '全員' })
  }

  const toggle = (item: PackingItem) =>
    setItem('packing', item.id, { name: item.name, person: item.person, packed: !item.packed })

  const packedCount = packing.filter((p) => p.packed).length

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
        <h2 className="font-bold text-ocean-700 mb-3">持ち物を追加</h2>
        <div className="flex gap-2">
          <select
            value={form.person}
            onChange={(e) => setForm({ ...form, person: e.target.value })}
            className="border border-ocean-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300"
          >
            {PACKING_PEOPLE.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="持ち物の名前"
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

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
        {packing.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">まだリストがありません</p>
        ) : (
          <div className="space-y-2">
            <div className="text-xs text-gray-400 mb-2">
              {packedCount} / {packing.length} 準備完了
            </div>
            {packing.map((item) => (
              <div key={item.id} className="flex items-center gap-3 group">
                <button
                  onClick={() => toggle(item)}
                  className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs transition-colors ${
                    item.packed ? 'bg-ocean-500 border-ocean-500 text-white' : 'border-gray-300'
                  }`}
                >
                  {item.packed && '✓'}
                </button>
                <span
                  className={`flex-1 text-sm ${item.packed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                >
                  {item.name}
                </span>
                <span className="text-xs bg-sand-100 text-sand-500 px-2 py-0.5 rounded-full">
                  {item.person}
                </span>
                <button
                  onClick={() => removeItem('packing', item.id)}
                  className="text-gray-300 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
