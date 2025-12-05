function StatusButtons({ appId, updateStatus, currentStatus }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateStatus(appId, "accepted")}
        className={`px-3 py-1 text-sm font-medium rounded-md border ${
          currentStatus === "accepted" 
            ? "bg-green-600 text-white" 
            : "bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
        }`}
      >
        Accept
      </button>
      
      <button
        onClick={() => updateStatus(appId, "pending")}
        className={`px-3 py-1 text-sm font-medium rounded-md border ${
          currentStatus === "pending" 
            ? "bg-yellow-600 text-white" 
            : "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200"
        }`}
      >
        Pending
      </button>
      
      <button
        onClick={() => updateStatus(appId, "rejected")}
        className={`px-3 py-1 text-sm font-medium rounded-md border ${
          currentStatus === "rejected" 
            ? "bg-red-600 text-white" 
            : "bg-red-100 text-red-800 border-red-300 hover:bg-red-200"
        }`}
      >
        Reject
      </button>
    </div>
  )
}



export default StatusButtons;