'use client'
import { useEffect, useState } from 'react'
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const ALLOWED_EMAILS = (process.env.NEXT_PUBLIC_ALLOWED_EMAILS || '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean)

const isMobile = () =>
  typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export interface AuthState {
  user: User | null
  loading: boolean
  unauthorized: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    // リダイレクトログインから戻ってきた時の結果を処理
    getRedirectResult(auth).catch((e) => {
      console.error('redirect login error', e)
      alert('ログインに失敗しました: ' + (e?.message || e))
    })

    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(u.email || '')) {
          setUnauthorized(true)
          setUser(null)
          signOut(auth)
        } else {
          setUser(u)
          setUnauthorized(false)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = async () => {
    try {
      if (isMobile()) {
        await signInWithRedirect(auth, googleProvider)
      } else {
        await signInWithPopup(auth, googleProvider)
      }
    } catch (e: any) {
      console.error('login error', e)
      alert('ログインに失敗しました: ' + (e?.message || e))
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, loading, unauthorized, login, logout }
}
