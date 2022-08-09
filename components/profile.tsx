import React from "react";

interface ProfileProps {
  big: boolean;
  name: string;
  subtitle: string;
  px?: string;
  py?: string;
  mt?: string;
  mb?: string;
}

export default function ProfileInfo({
  big,
  name,
  subtitle,
  px,
  py,
  mt,
  mb,
}: ProfileProps) {
  return big ? (
    <div
      className={`flex space-x-3 items-start py-${py} px-${px} mb-${mb} mt-${mt}`}
    >
      <div className="w-14 aspect-square bg-slate-400 rounded-full" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  ) : (
    <div
      className={`flex space-x-2 items-start py-${py} px-${px} mb-${mb} mt-${mt}`}
    >
      <div className="w-10 aspect-square bg-slate-400 rounded-full" />
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}