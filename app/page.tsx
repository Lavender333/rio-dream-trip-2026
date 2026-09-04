export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Rio Dream Trip · September 24–29, 2026</p>
          <h1>Rio, all in one place</h1>
        </div>
        <nav aria-label="Guide actions">
          <a href="/guide.html" target="_blank" rel="noreferrer">Open full screen</a>
          <a href="/lock">Lock guide</a>
        </nav>
      </header>
      <section className="guide-frame" aria-label="Interactive Rio trip guide">
        <iframe title="Interactive Rio trip guide" src="/guide.html" />
      </section>
    </main>
  );
}
