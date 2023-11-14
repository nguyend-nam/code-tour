// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logo: (
    <div className="h-10 w-10 relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        layout="fill"
        src="/logo.png"
        alt="/logo.png"
        className="object-cover absolute"
      />
    </div>
  ),
  logoLink: "/",
  project: {
    link: "https://github.com/nguyend-nam/code-tour",
  },
  footer: {
    text: (
      <span style={{ color: "#6B7280" }}>
        <a href="https://choosealicense.com/licenses/isc/" target="_blank">
          ISC
        </a>{" "}
        ©{" "}
        <a
          href="https://github.com/nguyend-nam"
          target="_blank"
          style={{ fontWeight: 600, color: "#15172E" }}
        >
          Nam Nguyen Dinh
        </a>
        .
      </span>
    ),
  },
  editLink: {
    component: () => null,
  },
  feedback: {
    content: null,
  },
  gitTimestamp: null,
  sidebar: {
    titleComponent: ({ title }) => (
      <span className="truncate doc-sidebar-item">{String(title)}</span>
    ),
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "light",
    forcedTheme: "light",
  },
};
