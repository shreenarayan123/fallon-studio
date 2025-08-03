import { TrendingUp } from "lucide-react"

interface ProgressBarProps {
  completed: number
  total: number
  percentage: number
}

export function ProgressBar({ completed, total, percentage }: ProgressBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200 p-6 shadow-lg md:w-[60%]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-sky-600" />
          <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">{Math.round(percentage)}%</div>
          <div className="text-sm text-gray-500">
            {completed} of {total} tasks
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-slate-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="absolute inset-0 h-3 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-slate-500/10 rounded-full animate-pulse" />
      </div>

      {percentage === 100 && total > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-2xl">
          <p className="text-green-700 text-sm font-medium text-center">🎉 Congratulations! All tasks completed!</p>
        </div>
      )}
    </div>
  )
}
