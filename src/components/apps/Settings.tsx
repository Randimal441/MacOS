import React, { useState } from "react";
import { user, wallpapers } from "~/configs";

// iOS Toggle Switch Component
interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const IOSToggle = ({ checked, onChange, disabled }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
      checked ? "bg-[#34C759]" : "bg-gray-300 dark:bg-gray-600"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// iOS Icon Container
const IOSIcon = ({
  icon,
  bgColor = "bg-gray-500",
  textColor = "text-white"
}: {
  icon: string;
  bgColor?: string;
  textColor?: string;
}) => (
  <div
    className={`w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0 shadow-sm ${bgColor} ${textColor}`}
  >
    <span className={`${icon} text-base`} />
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [cellularData, setCellularData] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [trueTone, setTrueTone] = useState(true);
  const [autoLock, setAutoLock] = useState("5 Minutes");
  const [qaAutoRetry, setQaAutoRetry] = useState(true);
  const [qaHeadless, setQaHeadless] = useState(false);

  const {
    dark,
    toggleDark,
    wifi,
    toggleWIFI,
    bluetooth,
    toggleBluetooth,
    airdrop,
    toggleAirdrop,
    volume,
    setVolume,
    brightness,
    setBrightness,
    dockSize,
    setDockSize,
    dockMag,
    setDockMag
  } = useStore((state) => ({
    dark: state.dark,
    toggleDark: state.toggleDark,
    wifi: state.wifi,
    toggleWIFI: state.toggleWIFI,
    bluetooth: state.bluetooth,
    toggleBluetooth: state.toggleBluetooth,
    airdrop: state.airdrop,
    toggleAirdrop: state.toggleAirdrop,
    volume: state.volume,
    setVolume: state.setVolume,
    brightness: state.brightness,
    setBrightness: state.setBrightness,
    dockSize: state.dockSize,
    setDockSize: state.setDockSize,
    dockMag: state.dockMag,
    setDockMag: state.setDockMag
  }));

  const menuSections = [
    {
      id: "connectivity",
      items: [
        {
          id: "airplane",
          title: "Airplane Mode",
          icon: "i-ion:airplane",
          bgColor: "bg-orange-500",
          type: "toggle",
          value: airplaneMode,
          onChange: () => setAirplaneMode(!airplaneMode)
        },
        {
          id: "wifi",
          title: "Wi-Fi",
          subtitle: wifi ? "Randimal-5G" : "Off",
          icon: "i-ion:wifi",
          bgColor: "bg-blue-500",
          type: "nav"
        },
        {
          id: "bluetooth",
          title: "Bluetooth",
          subtitle: bluetooth ? "On" : "Off",
          icon: "i-ion:bluetooth",
          bgColor: "bg-blue-600",
          type: "nav"
        },
        {
          id: "cellular",
          title: "Mobile Service",
          subtitle: "SLT-Mobitel 5G",
          icon: "i-ion:cellular",
          bgColor: "bg-green-500",
          type: "nav"
        }
      ]
    },
    {
      id: "device",
      items: [
        {
          id: "general",
          title: "General",
          icon: "i-ion:settings-sharp",
          bgColor: "bg-gray-500",
          type: "nav"
        },
        {
          id: "display",
          title: "Display & Brightness",
          icon: "i-ion:sunny",
          bgColor: "bg-blue-400",
          type: "nav"
        },
        {
          id: "wallpaper",
          title: "Wallpaper",
          icon: "i-ion:color-palette",
          bgColor: "bg-teal-500",
          type: "nav"
        },
        {
          id: "sound",
          title: "Sounds & Haptics",
          icon: "i-fluent:speaker-2-24-filled",
          bgColor: "bg-pink-500",
          type: "nav"
        },
        {
          id: "dock",
          title: "Desktop & Dock",
          icon: "i-fluent:dock-24-filled",
          bgColor: "bg-indigo-500",
          type: "nav"
        },
        {
          id: "battery",
          title: "Battery",
          subtitle: "100%",
          icon: "i-ion:battery-charging",
          bgColor: "bg-green-500",
          type: "nav"
        }
      ]
    },
    {
      id: "developer",
      items: [
        {
          id: "qa-tools",
          title: "QA & Automation Suite",
          subtitle: "Selenium / Playwright",
          icon: "i-fluent:shield-task-28-filled",
          bgColor: "bg-purple-600",
          type: "nav"
        },
        {
          id: "about-user",
          title: "Apple Account Profile",
          subtitle: "SLIIT IT & QA",
          icon: "i-ion:person",
          bgColor: "bg-sky-500",
          type: "nav"
        }
      ]
    }
  ];

  return (
    <div className="flex h-full w-full bg-[#f2f2f7] dark:bg-[#000000] text-gray-900 dark:text-gray-100 font-sans select-none overflow-hidden text-sm">
      {/* Sidebar / Left Column (iOS Master List) */}
      <div className="w-72 sm:w-80 flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-[#f2f2f7] dark:bg-[#121214] overflow-y-auto">
        {/* Title */}
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        {/* iOS Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative flex items-center">
            <span className="i-ion:search absolute left-2.5 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-7 bg-gray-200/80 dark:bg-gray-800/80 rounded-lg text-xs placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <span className="i-ion:close-circle text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Apple ID Profile Card Banner */}
        <div className="px-3 pb-3">
          <button
            onClick={() => setActiveTab("about-user")}
            className={`w-full flex items-center space-x-3 p-2.5 rounded-xl transition-all ${
              activeTab === "about-user"
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-white dark:bg-[#1c1c1e] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#252528] shadow-xs"
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/20"
            />
            <div className="flex-1 text-left min-w-0">
              <div className="font-semibold text-sm truncate">{user.name}</div>
              <div
                className={`text-[11px] truncate ${
                  activeTab === "about-user"
                    ? "text-blue-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                Apple Account, iCloud & QA
              </div>
            </div>
            <span
              className={`i-ion:chevron-forward text-sm ${
                activeTab === "about-user"
                  ? "text-blue-100"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* Grouped Settings Sections */}
        <div className="px-3 pb-6 space-y-4">
          {menuSections.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden shadow-xs divide-y divide-gray-100 dark:divide-gray-800"
            >
              {section.items.map((item) => {
                if (
                  searchQuery &&
                  !item.title.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return null;
                }

                if (item.type === "toggle") {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-3 py-2.5"
                    >
                      <div className="flex items-center space-x-3">
                        <IOSIcon icon={item.icon} bgColor={item.bgColor} />
                        <span className="font-medium text-xs sm:text-sm">
                          {item.title}
                        </span>
                      </div>
                      <IOSToggle
                        checked={item.value as boolean}
                        onChange={item.onChange as () => void}
                      />
                    </div>
                  );
                }

                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors text-left ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-50 dark:hover:bg-[#252528] text-gray-900 dark:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <IOSIcon icon={item.icon} bgColor={item.bgColor} />
                      <span className="font-medium text-xs sm:text-sm truncate">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {item.subtitle && (
                        <span
                          className={`text-xs ${
                            isSelected
                              ? "text-blue-100"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {item.subtitle}
                        </span>
                      )}
                      <span
                        className={`i-ion:chevron-forward text-xs ${
                          isSelected
                            ? "text-blue-100"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Pane / Right Column */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50 dark:bg-[#000000]">
        {/* Top Header of Detail View */}
        <div className="sticky top-0 z-10 px-6 py-3.5 backdrop-blur-md bg-white/70 dark:bg-[#121214]/70 border-b border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between">
          <span className="text-base font-semibold capitalize">
            {activeTab.replace("-", " ")}
          </span>
          <span className="text-xs text-gray-400">iOS 18.1 • macOS Style</span>
        </div>

        {/* Content Body */}
        <div className="p-6 max-w-2xl w-full mx-auto space-y-6">
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
                    💻
                  </div>
                  <div>
                    <h2 className="font-bold text-sm">MacBook Pro (16-inch, M3)</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Owner: {user.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-gray-400">Model Name:</span>{" "}
                    <span className="font-medium">MacBook Pro</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Processor:</span>{" "}
                    <span className="font-medium">Apple M3 Max</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Memory:</span>{" "}
                    <span className="font-medium">36 GB Unified</span>
                  </div>
                  <div>
                    <span className="text-gray-400">macOS / iOS:</span>{" "}
                    <span className="font-medium">18.1 (Sequoia)</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Serial Number:</span>{" "}
                    <span className="font-medium">C02G40ALMD6T</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Coverage:</span>{" "}
                    <span className="font-medium text-green-500">AppleCare+</span>
                  </div>
                </div>
              </div>

              {/* General Options */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl shadow-xs divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Software Update</span>
                  <span className="text-xs text-green-500 font-medium">
                    Up to date (iOS 18.1)
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <div>
                    <div className="font-medium">AirDrop</div>
                    <div className="text-xs text-gray-400">
                      Share files wirelessly with nearby Apple devices
                    </div>
                  </div>
                  <IOSToggle checked={airdrop} onChange={toggleAirdrop} />
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Storage</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">
                      142 GB available of 512 GB
                    </span>
                    <span className="i-ion:chevron-forward text-gray-400 text-xs" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DISPLAY & BRIGHTNESS TAB */}
          {activeTab === "display" && (
            <div className="space-y-5">
              {/* Appearance Switcher */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Appearance
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Light Option */}
                  <div
                    onClick={() => dark && toggleDark()}
                    className={`cursor-pointer flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      !dark
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-50 border border-gray-300 shadow-sm mb-2 flex items-center justify-center">
                      <span className="i-ion:sunny text-amber-500 text-2xl" />
                    </div>
                    <span className="font-semibold text-xs">Light</span>
                    <input
                      type="radio"
                      checked={!dark}
                      onChange={() => dark && toggleDark()}
                      className="mt-1.5 text-blue-500"
                    />
                  </div>

                  {/* Dark Option */}
                  <div
                    onClick={() => !dark && toggleDark()}
                    className={`cursor-pointer flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      dark
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-gray-900 to-slate-800 border border-gray-700 shadow-sm mb-2 flex items-center justify-center">
                      <span className="i-ion:moon text-indigo-400 text-2xl" />
                    </div>
                    <span className="font-semibold text-xs">Dark</span>
                    <input
                      type="radio"
                      checked={dark}
                      onChange={() => !dark && toggleDark()}
                      className="mt-1.5 text-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Brightness Slider */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <span>Brightness</span>
                  <span className="text-blue-500 font-bold">{brightness}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="i-ion:sunny-outline text-gray-400 text-base" />
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"
                  />
                  <span className="i-ion:sunny text-gray-400 text-xl" />
                </div>
              </div>

              {/* Display Options */}
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl shadow-xs divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-3.5">
                  <div>
                    <div className="font-medium">True Tone</div>
                    <div className="text-xs text-gray-400">
                      Automatically adapt display colors to ambient lighting
                    </div>
                  </div>
                  <IOSToggle checked={trueTone} onChange={() => setTrueTone(!trueTone)} />
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Auto-Lock</span>
                  <span className="text-xs text-gray-400">{autoLock}</span>
                </div>
              </div>
            </div>
          )}

          {/* WI-FI TAB */}
          {activeTab === "wifi" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">Wi-Fi</div>
                  <div className="text-xs text-gray-400">
                    {wifi ? "Connected to Randimal-5G" : "Turned Off"}
                  </div>
                </div>
                <IOSToggle checked={wifi} onChange={toggleWIFI} />
              </div>

              {wifi && (
                <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    My Networks
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-2">
                      <span className="i-ion:checkmark text-blue-500 font-bold" />
                      <span className="font-medium text-sm">Randimal-5G</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <span className="i-ion:lock-closed text-xs" />
                      <span className="i-ion:wifi text-blue-500 text-sm" />
                      <span className="i-ion:information-circle-outline text-blue-500" />
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">
                    Other Networks
                  </div>
                  {["SLIIT-Campus-WiFi", "Lab_Automation_Net", "Cricket_IoT_Gateway"].map(
                    (net) => (
                      <div
                        key={net}
                        className="flex items-center justify-between py-1.5 cursor-pointer hover:opacity-80"
                      >
                        <span className="text-sm">{net}</span>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <span className="i-ion:lock-closed text-xs" />
                          <span className="i-ion:wifi text-sm" />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* BLUETOOTH TAB */}
          {activeTab === "bluetooth" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">Bluetooth</div>
                  <div className="text-xs text-gray-400">
                    {bluetooth ? "Discoverable as Randimal's Mac" : "Turned Off"}
                  </div>
                </div>
                <IOSToggle checked={bluetooth} onChange={toggleBluetooth} />
              </div>

              {bluetooth && (
                <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    My Devices
                  </div>
                  {[
                    { name: "AirPods Pro (2nd Gen)", status: "Connected" },
                    { name: "Magic Keyboard with Touch ID", status: "Connected" },
                    { name: "Magic Trackpad", status: "Not Connected" },
                    { name: "Cricket Biometric Smart Sensor", status: "Connected" }
                  ].map((dev) => (
                    <div
                      key={dev.name}
                      className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100 dark:border-gray-800"
                    >
                      <span className="text-sm font-medium">{dev.name}</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs ${
                            dev.status === "Connected"
                              ? "text-blue-500 font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {dev.status}
                        </span>
                        <span className="i-ion:information-circle-outline text-blue-500 text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SOUNDS & HAPTICS TAB */}
          {activeTab === "sound" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <span>Master Volume</span>
                  <span className="text-pink-500 font-bold">{volume}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="i-fluent:speaker-0-24-filled text-gray-400 text-base" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"
                  />
                  <span className="i-fluent:speaker-2-24-filled text-gray-400 text-xl" />
                </div>
              </div>

              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl shadow-xs divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Alert Tone</span>
                  <span className="text-xs text-gray-400">Default (Basso)</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Play user interface sound effects</span>
                  <IOSToggle checked={true} onChange={() => {}} />
                </div>
              </div>
            </div>
          )}

          {/* WALLPAPER TAB */}
          {activeTab === "wallpaper" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Current macOS Wallpaper
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={wallpapers.day}
                      alt="macOS Day Wallpaper"
                      className="w-full h-28 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                    />
                    <span className="text-xs mt-2 font-medium">Day (Light Theme)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={wallpapers.night}
                      alt="macOS Night Wallpaper"
                      className="w-full h-28 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                    />
                    <span className="text-xs mt-2 font-medium">Night (Dark Theme)</span>
                  </div>
                </div>
                <div className="pt-2 text-center text-xs text-gray-400">
                  Wallpaper automatically adapts when toggling between Light and Dark mode.
                </div>
              </div>
            </div>
          )}

          {/* DOCK & DESKTOP TAB */}
          {activeTab === "dock" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Dock Configuration
                </div>

                {/* Dock Size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">Dock Icon Size</span>
                    <span className="text-indigo-500 font-bold">{dockSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="75"
                    value={dockSize}
                    onChange={(e) => setDockSize(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"
                  />
                </div>

                {/* Dock Magnification */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">Magnification Scale</span>
                    <span className="text-indigo-500 font-bold">{dockMag}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={dockMag}
                    onChange={(e) => setDockMag(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* BATTERY TAB */}
          {activeTab === "battery" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="i-ion:battery-charging text-green-500 text-3xl" />
                    <div>
                      <div className="font-bold text-lg">100%</div>
                      <div className="text-xs text-gray-400">Power Adapter Connected</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs font-semibold">
                    Fully Charged
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl shadow-xs divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-3.5">
                  <div>
                    <div className="font-medium">Low Power Mode</div>
                    <div className="text-xs text-gray-400">
                      Optimizes battery runtime by reducing energy consumption
                    </div>
                  </div>
                  <IOSToggle
                    checked={lowPowerMode}
                    onChange={() => setLowPowerMode(!lowPowerMode)}
                  />
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Battery Health & Charging</span>
                  <span className="text-xs text-green-500 font-semibold">
                    100% (Normal)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* QA & AUTOMATION TOOLS TAB (Randimal's Special Section) */}
          {activeTab === "qa-tools" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 shadow-xs space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl">
                    <span className="i-fluent:shield-task-28-filled" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm">QA Test Automation Suite</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Engineered by Randimal Lamahewa
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl shadow-xs divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex items-center justify-between p-3.5">
                  <div>
                    <div className="font-medium">Primary Automation Engine</div>
                    <div className="text-xs text-gray-400">
                      Selenium WebDriver 4.x + TestNG
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-purple-500">Active</span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <div>
                    <div className="font-medium">AI & Playwright Test Runner</div>
                    <div className="text-xs text-gray-400">
                      Autonomous regression & self-healing locators
                    </div>
                  </div>
                  <IOSToggle checked={qaAutoRetry} onChange={() => setQaAutoRetry(!qaAutoRetry)} />
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <div>
                    <div className="font-medium">Headless Execution Mode</div>
                    <div className="text-xs text-gray-400">
                      Run automated tests in background headless browser
                    </div>
                  </div>
                  <IOSToggle checked={qaHeadless} onChange={() => setQaHeadless(!qaHeadless)} />
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <span className="font-medium">Target Environments</span>
                  <span className="text-xs text-gray-400">
                    SLIIT Web Apps, MERN Portals, Smart Parking
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT USER / APPLE ACCOUNT TAB */}
          {activeTab === "about-user" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-5 shadow-xs text-center flex flex-col items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-blue-500 mb-3"
                />
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-xs text-blue-500 font-medium">
                  randimalchamika@gmail.com
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                  Dedicated Quality Assurance Engineer & BSc (Hons) Information
                  Technology undergraduate at SLIIT.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1c1c1e] rounded-xl shadow-xs divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                <div className="flex justify-between p-3.5">
                  <span className="text-gray-400">Institution:</span>
                  <span className="font-semibold">SLIIT</span>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-gray-400">Degree:</span>
                  <span className="font-semibold">BSc (Hons) in Information Technology</span>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-gray-400">GitHub:</span>
                  <a
                    href="https://github.com/Randimal441"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    @Randimal441
                  </a>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-gray-400">LinkedIn:</span>
                  <a
                    href="https://www.linkedin.com/in/randimal-lamahewa-153483271/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    randimal-lamahewa
                  </a>
                </div>
                <div className="flex justify-between p-3.5">
                  <span className="text-gray-400">Athletics & Research:</span>
                  <span className="font-semibold text-right">
                    Cricket AI & IoT Biomechanical Motion Analysis
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
