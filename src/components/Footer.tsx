import { GITHUB_URL } from "../data";

export function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 码表</span>
      <a href={GITHUB_URL} rel="noreferrer" target="_blank">
        GitHub
      </a>
      <span>本地优先</span>
    </footer>
  );
}
