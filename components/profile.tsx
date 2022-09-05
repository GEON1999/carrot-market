import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

interface ProfileProps {
  big: boolean;
  name?: string;
  subtitle: string;
  avatar?: string | null;
  id?: number;
  [key: string]: any;
}

export default function ProfileInfo({
  big,
  name,
  subtitle,
  id,
  position,
  avatar,
}: ProfileProps) {
  return big ? (
    <div className={`flex space-x-3 items-start ${position}`}>
      {avatar ? (
        <img
          src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${avatar}/profile`}
          className="w-16 h-16 rounded-full"
        />
      ) : (
        <div className="w-16 h-16 bg-slate-500 rounded-full" />
      )}
      <div>
        <p className="font-semibold">{name}</p>

        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  ) : (
    <div className={`flex space-x-2 items-start ${position}`}>
      {avatar ? (
        <img
          src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${avatar}/public`}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-slate-500 rounded-full" />
      )}
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}
