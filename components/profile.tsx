import Link from "next/link";
import React from "react";

interface ProfileProps {
  big?: boolean;
  name?: string;
  subtitle?: string;
  avatar?: string | null;
  id?: number;
  [key: string]: any;
  profile?: boolean;
}

export default function ProfileInfo({
  big,
  name,
  subtitle,
  id,
  position,
  avatar,
  profile = false,
}: ProfileProps) {
  return big ? (
    <div className={`flex space-x-3 items-start ${position}`}>
      <Link href={id ? `/profile/${id}` : "#"}>
        <a>
          {avatar ? (
            <img
              alt="profile"
              src={avatar}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-slate-500 rounded-full" />
          )}
        </a>
      </Link>
      <div className="mt-2">
        <p className="font-semibold">{name}</p>

        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  ) : profile ? (
    <div
      className={`flex space-x-3 items-start ${position} md:px-20 md:w-full md:space-x-10 `}
    >
      <Link href={id ? `/profile/${id}` : "#"}>
        <a>
          {avatar ? (
            <img
              alt="profile"
              src={avatar}
              className="w-16 h-16 md:w-32 md:h-32 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-slate-500 rounded-full" />
          )}
        </a>
      </Link>
      <div className="mt-2 md:space-y-3">
        <p className="font-semibold md:text-lg cursor-pointer">{name}</p>
        {subtitle ? (
          <p className="text-gray-400 text-sm md:text-black md:text-base md:px-3 md:py-2 md:border md:rounded-md dark:text-white cursor-pointer">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  ) : (
    <div className={`flex space-x-2 items-start ${position}`}>
      {avatar ? (
        <img
          alt="profile"
          src={avatar}
          className="w-16 h-16 rounded-full"
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
