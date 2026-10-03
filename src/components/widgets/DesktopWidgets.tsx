import React, { useState, useEffect } from "react";

interface DesktopWidgetsProps {
  openApp?: (id: string) => void;
}

export default function DesktopWidgets({ openApp }: DesktopWidgetsProps) {
  const [slTime, setSlTime] = useState("");
  const [slDate, setSlDate] = useState("");
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [startDayOffset, setStartDayOffset] = useState<number>(0);
  const [monthName, setMonthName] = useState("");
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const yr = now.getFullYear();
      const currentMonthIndex = now.getMonth();
      const dayNum = now.getDate();
      const firstDay = new Date(yr, currentMonthIndex, 1).getDay();
      const totalDays = new Date(yr, currentMonthIndex + 1, 0).getDate();
      const daysArr = Array.from({ length: totalDays }, (_, i) => i + 1);

      let timeStr = "";
      try {
        timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        }).format(now);
      } catch {
        timeStr = now.toLocaleTimeString();
      }

      let dateStr = "";
      try {
        dateStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          weekday: "short",
          month: "short",
          day: "numeric"
        }).format(now);
      } catch {
        dateStr = now.toLocaleDateString();
      }

      let monthStr = "";
      try {
        monthStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          month: "long"
        }).format(now);
      } catch {
        monthStr = now.toLocaleString("default", { month: "long" });
      }

      setSlTime(timeStr);
      setSlDate(dateStr);
      setMonthName(monthStr);
      setYear(yr);
      setCurrentDay(dayNum);
      setStartDayOffset(firstDay);
      setDaysInMonth(daysArr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex flex-col space-y-4 fixed top-12 right-6 z-0 pointer-events-auto select-none w-80 text-white font-sans transition-all duration-300">
      {/* 1. CLOCK & CALENDAR WIDGET */}
        <div className="backdrop-blur-2xl bg-white/30 dark:bg-black/40 border border-white/30 dark:border-white/10 rounded-2xl p-4 shadow-xl text-gray-900 dark:text-white transition-all hover:scale-[1.01] hover:shadow-2xl">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <span className="i-ion:time-outline text-red-500 text-lg" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Sri Lanka Time
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 font-semibold">
              UTC+5:30
            </span>
          </div>

          {/* Live Clock */}
          <div className="flex flex-col items-center justify-center py-1">
            <div className="text-3xl font-extrabold tracking-tight font-mono text-gray-900 dark:text-white">
              {slTime || "Loading..."}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              {slDate} • Colombo, LK
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-red-500 font-bold uppercase">{monthName}</span>
              <span className="text-gray-500">{year}</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <span key={`empty-${i}`} className="h-5 w-5" />
              ))}
              {daysInMonth.slice(0, 28).map((day) => {
                const isToday = day === currentDay;
                return (
                  <div
                    key={`day-${day}`}
                    className="flex items-center justify-center h-5 w-5 mx-auto"
                  >
                    <span
                      className={`flex items-center justify-center h-5 w-5 rounded-full text-[11px] ${
                        isToday
                          ? "bg-red-500 text-white font-bold shadow-sm"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* QA HEALTH STATUS WIDGET */}
        <div
          onClick={() => openApp?.("terminal")}
          className="cursor-pointer backdrop-blur-2xl bg-white/30 dark:bg-black/40 border border-white/30 dark:border-white/10 rounded-2xl p-4 shadow-xl text-gray-900 dark:text-white transition-all hover:scale-[1.01] hover:shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                QA Pipeline Status
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
              <span>Operational</span>
            </span>
          </div>

          {/* Hero Pass Rate */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-3xl font-extrabold text-emerald-500 tracking-tight">
              99.8%
            </div>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Pass Rate (All Suites)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[99.8%]" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-black/10 dark:border-white/10">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Tests Run:</span>
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                1,428 / 1,431 Passed
              </div>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Avg Duration:</span>
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                184 ms / test
              </div>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Core Engines:</span>
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                Selenium • Playwright
              </div>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">System Uptime:</span>
              <div className="font-semibold text-gray-800 dark:text-gray-200">
                99.98%
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-black/10 dark:border-white/10">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-300 font-medium">
              TestNG
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-300 font-medium">
              Page Object Model
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-300 font-medium">
              SLIIT QA
            </span>
          </div>
      </div>
    </div>
  );
}
