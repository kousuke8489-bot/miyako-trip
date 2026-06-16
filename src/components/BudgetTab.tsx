'use client'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { setItem } from '@/hooks/useFirestore'
import { BudgetData } from '@/lib/types'

const inputClass =
  'w-full border border-ocean-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300'

export default function BudgetTab() {
  const [budget, setBudget] = useState<BudgetData>({ total: 0, spent: 0 })

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'budget', 'main'), (snap) => {
      if (snap.exists()) setBudget(snap.data() as BudgetData)
    })
    return () => unsub()
  }, [])

  const update = async (field: keyof BudgetData, value: number) => {
    const next = { ...budget, [field]: value }
    setBudget(next)
    await setItem('budget', 'main', next)
  }

  const remaining = budget.total - budget.spent
  const ratio = budget.total > 0 ? (budget.spent / budget.total) * 100 : 0

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-ocean-500 to-ocean-400 text-white rounded-2xl p-6 shadow-md">
        <h2 className="font-bold text-lg mb-4">旅行予算</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-ocean-100 text-xs mb-1">予算合計</div>
            <div className="text-2xl font-bold">¥{budget.total.toLocaleString()}</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-ocean-100 text-xs mb-1">使った金額</div>
            <div className="text-2xl font-bold">¥{budget.spent.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-ocean-100 text-xs mb-1">残り</div>
          <div className={`text-3xl font-bold ${remaining < 0 ? 'text-red-300' : 'text-white'}`}>
            ¥{remaining.toLocaleString()}
          </div>
        </div>
        {budget.total > 0 && (
          <div className="mt-3">
            <div className="bg-white/20 rounded-full h-2 mt-1">
              <div
                className="bg-sand-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(ratio, 100)}%` }}
              />
            </div>
            <div className="text-right text-ocean-100 text-xs mt-1">{Math.round(ratio)}% 使用</div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-ocean-100">
        <h3 className="font-bold text-ocean-700 mb-3">金額を更新</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500 block mb-1">予算合計（円）</label>
            <input
              type="number"
              value={budget.total || ''}
              onChange={(e) => update('total', Number(e.target.value))}
              placeholder="例：300000"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">使った金額（円）</label>
            <input
              type="number"
              value={budget.spent || ''}
              onChange={(e) => update('spent', Number(e.target.value))}
              placeholder="例：150000"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
