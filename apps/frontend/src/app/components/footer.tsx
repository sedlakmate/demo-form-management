export function Footer() {
  return (
    <footer className="footer p-4 bg-base-200 text-base-content flex flex-row justify-center items-center">
      <span className="whitespace-nowrap">&copy; 2025 Máté Sedlák</span>
      {" - "}
      <span>
        <a
          href="https://mate-sedlak.com"
          className="link link-hover text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          portfolio
        </a>
      </span>
      {" - "}
      <span>
        <a
          href="https://mate-sedlak.com/cv"
          className="link link-hover text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
      </span>
    </footer>
  );
}
