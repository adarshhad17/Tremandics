export default function ProgressBar({ status, className = "" }) {
  const getProgress = () => {
    switch (status) {
      case "Delivered":
        return { width: "w-full", color: "bg-green-500" }
      case "In Transit":
        return { width: "w-3/4", color: "bg-blue-500" }
      case "Delayed":
        return { width: "w-1/2", color: "bg-red-500" }
      case "Pending":
        return { width: "w-1/4", color: "bg-yellow-500" }
      default:
        return { width: "w-1/4", color: "bg-gray-500" }
    }
  }

  const { width, color } = getProgress()

  return (
    <div className={`w-full h-1 bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div className={`h-full rounded-full transition-all duration-500 ${width} ${color}`} />
    </div>
  )
}
