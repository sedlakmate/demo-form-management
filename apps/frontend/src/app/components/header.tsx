import ThemeSelector from "./theme-selector";

export function Header() {
  return (
    <header className="navbar bg-base-200 shadow">
      <div className="flex-1 px-4 text-xl font-bold">
        Admin form management demo
      </div>
      <ThemeSelector justifyEnd={true} />
    </header>
  );
}
