export function Footer() {
  return (
    <footer className="footer p-4 bg-base-200 flex flex-row justify-start items-center text-primary">
      <span className="whitespace-nowrap justify-start flex-grow"></span>
      <span className="whitespace-nowrap text-base-content">
        &copy; 2025 Máté Sedlák
      </span>
      <span>
        <a
          href="https://mate-sedlak.com"
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          portfolio
        </a>
      </span>
      <span>
        <a
          href="https://mate-sedlak.com/cv"
          className="link link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
      </span>
    </footer>
  );
}
