import ThemeSelector from "./theme-selector";

export function Header() {
  return (
    <header className="navbar bg-base-100 shadow">
      <div className="flex-1 px-4 text-xl font-bold">🎵 Song Library Demo</div>
      <ThemeSelector justifyEnd={false} />
    </header>
  );
}
