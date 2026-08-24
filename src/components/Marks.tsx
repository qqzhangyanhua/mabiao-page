type MarkName = "timeline" | "events" | "scan" | "split" | "menubar" | "grid" | "cursor" | "alert";

const toneMap: Record<MarkName, string> = {
  timeline: "mark-purple",
  events: "mark-cyan",
  scan: "mark-purple",
  split: "mark-cyan",
  menubar: "mark-blue",
  grid: "mark-purple",
  cursor: "mark-green",
  alert: "mark-orange",
};

export function Mark({ name }: { name: MarkName }) {
  const toneClass = toneMap[name] || "mark-purple";
  return (
    <svg className={`mark ${toneClass}`} viewBox="0 0 24 24" aria-hidden="true">
      {name === "timeline" ? (
        <>
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 7.5v4.5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4 19.5h16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
          <circle cx="8" cy="19.5" r="1.2" fill="currentColor" />
          <circle cx="15" cy="19.5" r="1.2" fill="currentColor" />
        </>
      ) : null}
      {name === "events" ? (
        <>
          <path d="M4 6.5h16M4 12h10M4 17.5h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="18" cy="12" r="2" fill="currentColor" />
        </>
      ) : null}
      {name === "scan" ? (
        <>
          <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4" stroke="currentColor" strokeWidth="1.3" />
        </>
      ) : null}
      {name === "split" ? (
        <>
          <rect x="3.2" y="7" width="17.6" height="4" rx="1.2" fill="currentColor" opacity="0.9" />
          <rect x="3.2" y="13" width="11.2" height="4" rx="1.2" fill="currentColor" opacity="0.38" />
        </>
      ) : null}
      {name === "menubar" ? (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 9.2h18" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="6.2" cy="7.3" r="0.7" fill="currentColor" />
          <circle cx="8.4" cy="7.3" r="0.7" fill="currentColor" />
          <circle cx="10.6" cy="7.3" r="0.7" fill="currentColor" />
        </>
      ) : null}
      {name === "grid" ? (
        <>
          <path d="M4 8.5h16M4 12h16M4 15.5h16M8.5 5v14M12 5v14M15.5 5v14" stroke="currentColor" strokeWidth="1.25" />
          <rect x="3.2" y="4.2" width="17.6" height="15.6" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </>
      ) : null}
      {name === "cursor" ? (
        <>
          <path d="M6 17.5V6.5h4.4c2.6 0 4.3 1.5 4.3 3.8 0 2.4-1.8 3.9-4.5 3.9H8.6" fill="none" stroke="currentColor" strokeWidth="1.45" />
          <path d="M14.2 17.5 18 6.5" stroke="currentColor" strokeWidth="1.45" />
        </>
      ) : null}
      {name === "alert" ? (
        <>
          <path d="M4 16.2 12 5.4l8 10.8H4z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 10.2v3.1" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="15.2" r="0.7" fill="currentColor" />
        </>
      ) : null}
    </svg>
  );
}

export function GitHubMark() {
  return (
    <svg className="gh-mark" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.08-2.7-1.08-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.88.87 2.34.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0"
      />
    </svg>
  );
}
