export function saveTheme(themeKey: string) {
  localStorage.setItem('selectedTheme', themeKey);
}

export function loadTheme(): string | null {
  return localStorage.getItem('selectedTheme');
}
