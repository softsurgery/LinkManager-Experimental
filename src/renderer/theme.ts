const themeKey = "favlist--dark-theme";

/**
 * @return True for dark mode, false for light mode, 'auto' to pick automatically
 */
export function load(): boolean | "auto" {
  const value = window?.localStorage?.getItem(themeKey);
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return "auto";
  }
}

export function save(darkMode: boolean): void {
  window?.localStorage?.setItem(themeKey, darkMode.toString());
}
