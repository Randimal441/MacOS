import React, { useRef } from "react";
import { useClickOutside } from "~/hooks";
import { MenuItem, MenuItemGroup } from "./base";

interface AppleMenuProps {
  logout: () => void;
  shut: (e: React.MouseEvent<HTMLLIElement>) => void;
  restart: (e: React.MouseEvent<HTMLLIElement>) => void;
  sleep: (e: React.MouseEvent<HTMLLIElement>) => void;
  toggleAppleMenu: () => void;
  btnRef: React.RefObject<HTMLDivElement>;
  openApp?: (id: string) => void;
}

export default function AppleMenu({
  logout,
  shut,
  restart,
  sleep,
  toggleAppleMenu,
  btnRef,
  openApp
}: AppleMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, toggleAppleMenu, [btnRef]);

  return (
    <div className="menu-box left-2 w-56" ref={ref}>
      <MenuItemGroup>
        <MenuItem
          onClick={() => {
            openApp?.("settings");
            toggleAppleMenu();
          }}
        >
          About This Mac
        </MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem
          onClick={() => {
            openApp?.("settings");
            toggleAppleMenu();
          }}
        >
          System Preferences...
        </MenuItem>
        <MenuItem>App Store...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Recent Items</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem>Force Quit...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup>
        <MenuItem onClick={sleep}>Sleep</MenuItem>
        <MenuItem onClick={restart}>Restart...</MenuItem>
        <MenuItem onClick={shut}>Shut Down...</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup border={false}>
        <MenuItem onClick={logout}>Lock Screen</MenuItem>
        <MenuItem onClick={logout}>Log Out Randimal Lamahewa...</MenuItem>
      </MenuItemGroup>
    </div>
  );
}
