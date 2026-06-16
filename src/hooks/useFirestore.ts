'use client'
import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

/** コレクションを購読して { id, ...data } の配列を返す。任意で sort 可能。 */
export function useCollection<T extends { id: string }>(
  name: string,
  sort?: (a: T, b: T) => number
): T[] {
  const [items, setItems] = useState<T[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, name), (snap) => {
      const next = snap.docs.map((d) => ({ id: d.id, ...d.data() } as T))
      if (sort) next.sort(sort)
      setItems(next)
    })
    return () => unsub()
    // sort は毎レンダリングで新しい参照になりうるので依存に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  return items
}

/** ドキュメント追加・更新・削除のヘルパー */
export const addItem = (name: string, data: Record<string, unknown>) => {
  const id = Date.now().toString()
  return setDoc(doc(db, name, id), data)
}

export const setItem = (name: string, id: string, data: Record<string, unknown>) =>
  setDoc(doc(db, name, id), data)

export const removeItem = (name: string, id: string) => deleteDoc(doc(db, name, id))
