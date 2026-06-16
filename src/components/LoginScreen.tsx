'use client'

export default function LoginScreen({
  unauthorized,
  onLogin,
}: {
  unauthorized: boolean
  onLogin: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-400 to-ocean-600 flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">🌊</div>
        <h1 className="text-3xl font-bold mb-2">宮古島旅行 2026</h1>
        <p className="text-ocean-100">10月29日〜31日 家族4人の旅</p>
      </div>

      {unauthorized && (
        <div className="bg-red-100 text-red-700 px-6 py-3 rounded-xl text-sm">
          このアカウントはアクセス権限がありません
        </div>
      )}

      <button
        onClick={onLogin}
        className="bg-white text-ocean-600 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3"
      >
        <span className="text-xl font-extrabold">G</span>
        Googleでログイン
      </button>
    </div>
  )
}
