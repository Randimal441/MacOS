import React, { useState, useEffect } from "react";
import user from "~/configs/user";
import { useStore } from "~/stores";
import type { AppsData } from "~/types";

interface IOSHomeScreenProps {
  apps: AppsData[];
  openApp: (id: string) => void;
  activeAppId: string | null;
  closeActiveApp: () => void;
  activeAppContent: React.ReactNode | null;
  toggleLaunchpad: (target: boolean) => void;
}

export default function IOSHomeScreen({
  apps,
  openApp,
  activeAppId,
  closeActiveApp,
  activeAppContent,
  toggleLaunchpad
}: IOSHomeScreenProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const { wifi } = useStore((state) => ({
    wifi: state.wifi
  }));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }).format(now)
      );

      setDate(
        new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        }).format(now)
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (app: AppsData) => {
    if (app.id === "launchpad") {
      toggleLaunchpad(true);
      return;
    }
    if (app.link) {
      window.open(app.link, "_blank");
      return;
    }
    openApp(app.id);
  };

  const activeApp = apps.find((a) => a.id === activeAppId);

  // 4 Core Apps for iOS Dock
  const dockAppIds = ["bear", "safari", "terminal", "settings"];
  const dockApps = dockAppIds
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean) as AppsData[];

  return (
    <div className="md:hidden flex flex-col h-full w-full relative select-none font-sans text-white overflow-hidden">
      {/* iOS Top Status Bar */}
      <div className="h-11 px-5 pt-1.5 flex items-center justify-between text-xs font-semibold z-30 drop-shadow">
        {/* Left: Time & Location */}
        <div className="flex items-center space-x-1.5 font-medium">
          <span>{time}</span>
          <span className="text-[10px] text-white/70">• SLT 5G</span>
        </div>

        {/* Dynamic Island Capsule */}
        <div className="h-5 w-24 bg-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center space-x-1 shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-white/80 font-mono">QA 99.8%</span>
        </div>

        {/* Right: Icons (WiFi, Battery) */}
        <div className="flex items-center space-x-2 text-sm">
          {wifi && <span className="i-ion:wifi text-xs" />}
          <div className="flex items-center space-x-0.5">
            <span className="text-[11px] font-mono">100%</span>
            <span className="i-ion:battery-charging text-emerald-400 text-base" />
          </div>
        </div>
      </div>

      {/* Main Home Screen Grid (Only shown when no app is open full-screen) */}
      <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 overflow-y-auto">
        <div>
          {/* iOS Widgets Row */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Widget 1: Clock & Date */}
            <div className="h-36 rounded-[22px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/25 p-3.5 flex flex-col justify-between shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-red-400 text-xs font-bold uppercase">
                  {date}
                </span>
                <span className="size-2 rounded-full bg-red-400" />
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-tight font-mono text-white">
                  {time}
                </div>
                <div className="text-[10px] text-white/75 mt-0.5">
                  Colombo (UTC+5:30)
                </div>
              </div>
              <div className="text-[10px] text-white/60 truncate">
                Owner: {user?.name || "Randimal Lamahewa"}
              </div>
            </div>

            {/* Widget 2: QA Pipeline */}
            <div
              onClick={() => openApp("terminal")}
              className="h-36 rounded-[22px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/25 p-3.5 flex flex-col justify-between shadow-lg cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 text-xs font-bold uppercase">
                  QA Pipeline
                </span>
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                  99.8%
                </div>
                <div className="text-[10px] text-white/75 mt-0.5">
                  1,428 / 1,431 Passed
                </div>
              </div>
              <div className="text-[10px] text-emerald-300 font-medium truncate">
                Selenium • Playwright
              </div>
            </div>
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-y-5 gap-x-3 text-center">
            {apps.map((app) => (
              <div
                key={`mobile-app-${app.id}`}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform"
              >
                <div className="size-15 rounded-[16px] overflow-hidden shadow-md border border-white/20 bg-black/10 flex items-center justify-center">
                  <img
                    src={app.img}
                    alt={app.title}
                    className="size-full object-cover"
                    draggable={false}
                  />
                </div>
                <span className="text-[11px] font-medium mt-1.5 text-white drop-shadow truncate w-16 text-center">
                  {app.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Floating iOS Dock */}
        <div className="pt-4">
          <div className="h-20 px-4 rounded-[32px] bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/25 flex items-center justify-around shadow-2xl">
            {dockApps.map((app) => (
              <div
                key={`mobile-dock-${app.id}`}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center cursor-pointer active:scale-90 transition-transform"
              >
                <div className="size-14 rounded-[15px] overflow-hidden shadow-md border border-white/20 bg-black/10 flex items-center justify-center">
                  <img
                    src={app.img}
                    alt={app.title}
                    className="size-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile App Modal / Sheet */}
      {activeAppId && activeApp && (
        <div className="absolute inset-0 z-40 bg-[#f2f2f7] dark:bg-black text-gray-900 dark:text-white flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Mobile App Navigation Header */}
          <div className="h-12 px-4 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
            <button
              onClick={closeActiveApp}
              className="flex items-center space-x-1 text-blue-500 font-medium text-sm active:opacity-70"
            >
              <span className="i-ion:chevron-back text-base" />
              <span>Home</span>
            </button>

            <span className="font-semibold text-sm truncate max-w-[180px]">
              {activeApp.title}
            </span>

            <button
              onClick={closeActiveApp}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 active:opacity-70"
            >
              Done
            </button>
          </div>

          {/* App Body */}
          <div className="flex-1 overflow-y-auto">
            {activeAppContent || activeApp.content}
          </div>
        </div>
      )}
    </div>
  );
}
