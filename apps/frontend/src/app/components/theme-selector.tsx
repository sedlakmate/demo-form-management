"use client";
import React, { useEffect, useState } from "react";
import { DEFAULT_THEME as defaultTheme, themes } from "./theme-data";

interface ThemeSelectorProps {
  justifyEnd?: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ justifyEnd }) => {
  const [activeTheme, setActiveTheme] = useState(defaultTheme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme") || defaultTheme;
    setActiveTheme(theme);
    document.body.dataset.theme = theme;
  }, []);

  const changeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const theme = event.target.value;
    window.location.href = `?theme=${theme}`;
  };

  return (
    <div
      className={`dropdown ${justifyEnd ? "dropdown-end" : "dropdown-start"}`}
    >
      <div tabIndex={0} role="button" className="btn m-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12px"
          height="12px"
          viewBox="0 0 24 24"
          className="inline-block fill-current opacity-75"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m14.622 17.897-10.68-2.913"></path>
          <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"></path>
          <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"></path>
        </svg>
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul className="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl">
        {themes.map((theme) => (
          <li key={theme} className={theme === activeTheme ? "active" : ""}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
              onChange={changeTheme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
