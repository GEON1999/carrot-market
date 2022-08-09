import React from "react";

interface FixedBtnProps {
  children: React.ReactNode;
}

export default function FixedBtn({ children }: FixedBtnProps) {
  return (
    <button className="border-none text-white fixed bottom-24 right-8 bg-orange-400 hover:bg-orange-500 p-4 rounded-full shadow-lg transition-colors">
      {children}
    </button>
  );
}
