import React from 'react'

export const Loading = () => {
  return (
        <div className="absolute inset-0 bg-zinc-200/50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full border-t-4 border-black w-16 h-16 border-solid"></div> {/* Spinner */}
                <div className="text-black text-xl font-semibold">Loading...</div>
            </div>
        </div>
    );
}


