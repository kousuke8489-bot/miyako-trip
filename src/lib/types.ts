// Firestore のコレクション構造（旧アプリと互換）

export interface ScheduleItem {
  id: string
  day: number // DAYS のインデックス
  time: string // "HH:MM"
  title: string
  memo: string
}

export interface PlaceItem {
  id: string
  name: string
  category: string
  done: boolean
}

export interface PackingItem {
  id: string
  name: string
  person: string
  packed: boolean
}

export interface ReservationItem {
  id: string
  title: string
  date: string
  confirmation: string
  memo: string
}

export interface BudgetData {
  total: number
  spent: number
}

export type TabKey = 'schedule' | 'budget' | 'places' | 'packing' | 'reservations'

export const DAYS = [
  { label: 'Day 1', date: '10月29日(木)' },
  { label: 'Day 2', date: '10月30日(金)' },
  { label: 'Day 3', date: '10月31日(土)' },
] as const

export const PLACE_CATEGORIES = ['観光', 'ビーチ', 'グルメ', 'アクティビティ', 'ショッピング'] as const
export const PACKING_PEOPLE = ['全員', 'パパ', 'ママ', '長男', '長女'] as const
