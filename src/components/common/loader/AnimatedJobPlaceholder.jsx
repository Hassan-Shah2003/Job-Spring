import React from 'react'
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const AnimatedJobPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="w-20 h-20 flex items-center justify-center bg-[#244034]/10 rounded-full mb-4"
  >
    <Search className="w-10 h-10 text-[#244034]" />
  </motion.div>

  <h2 className="text-2xl font-semibold text-[#244034]">
    Ready to Explore Opportunities?
  </h2>
  <p className="text-gray-500 mt-2">
    Click on a job to see details and start your journey.
  </p>
</div>
  )
}

export default AnimatedJobPlaceholder