interface TimeWindowToggleProps {
  timeWindow: 'day' | 'week'
  onTimeWindowChange: (timeWindow: 'day' | 'week') => void
  disabled?: boolean
}

export function TimeWindowToggle({ 
  timeWindow, 
  onTimeWindowChange, 
  disabled = false 
}: TimeWindowToggleProps) {
  return (
    <div className="flex bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 border border-gray-700/50">
      <button
        onClick={() => onTimeWindowChange('day')}
        disabled={disabled}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          timeWindow === 'day'
            ? 'bg-pink-500 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700/80 active:bg-gray-600'
        }`}
      >
        Today
      </button>
      <button
        onClick={() => onTimeWindowChange('week')}
        disabled={disabled}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          timeWindow === 'week'
            ? 'bg-pink-500 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700/80 active:bg-gray-600'
        }`}
      >
        This Week
      </button>
    </div>
  )
}