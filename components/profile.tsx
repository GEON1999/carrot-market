import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileProps {
  big: boolean;
  name?: string;
  subtitle?: string;
  avatar?: string | null;
  avatarId?: number | null;
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
  avatarId,
}: ProfileProps) {
  return big ? (
    <div className={`flex space-x-3 items-start ${position}`}>
      {avatar ? (
        <Image
          alt="profile"
          width={64}
          height={64}
          src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${avatar}/profile`}
          className="w-16 h-16 rounded-full"
          quality={100}
        />
      ) : (
        <div className="w-16 h-16 bg-slate-500 rounded-full" />
      )}
      <div className="mt-2">
        <p className="font-semibold">{name}</p>

        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  ) : (
    <div className={`flex space-x-2 items-start ${position}`}>
      {avatar ? (
        <Image
          alt="profile"
          width={40}
          height={40}
          src={`https://imagedelivery.net/xE6X7mlbIExkQau-XHoj-A/${avatar}/profile`}
          className="w-16 h-16 rounded-full"
          quality={100}
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
