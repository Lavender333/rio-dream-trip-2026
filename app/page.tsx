import TripExplorer from './TripExplorer';
import TripBuilder from './TripBuilder';

const quickLinks = [
  { number: '1', title: 'Choose your home', detail: 'Start with the ranked stays. Pick one, then stop comparing.', href: '#stays' },
  { number: '2', title: 'Follow the easy plan', detail: 'One main experience each day, with breathing room built in.', href: '#easy-plan' },
  { number: '3', title: 'Book only the anchors', detail: 'Airport ride, Christ, Sugarloaf and the football game first.', href: '#book-first' },
];

export default function Home() {
  return (
    <main className="trip-shell">
      <a className="skip-link" href="#start">Skip to today&apos;s plan</a>
      <header className="topbar">
        <a className="brand" href="#start" aria-label="Rio Dream Trip home"><span className="brand-sun">Rio</span><span>Dream Trip</span></a>
        <nav aria-label="Main navigation">
          <a href="#easy-plan">Plan</a><a href="#stays">Stays</a><a href="#details">Map & details</a><a className="lock-link" href="/lock">Lock</a>
        </nav>
      </header>

      <section className="hero" id="start">
        <p className="eyebrow">September 24–29, 2026 · Rio de Janeiro</p>
        <h1>A calm, exciting Rio plan—<br /><em>without the overwhelm.</em></h1>
        <p className="hero-copy">This is your one place for the stay, the fun, the transport and the costs. Begin with the next small decision; every extra detail is there when you want it.</p>
        <div className="hero-actions"><a className="button button-primary" href="#planner">Start with flights <span>↓</span></a><a className="button button-secondary" href="/guide.html" target="_blank" rel="noreferrer">Open the interactive map ↗</a></div>
        <div className="trip-facts" aria-label="Trip overview"><div><strong>5</strong><span>nights</span></div><div><strong>10</strong><span>Airbnb options</span></div><div><strong>1</strong><span>big game day</span></div></div>
      </section>

      <section className="focus-section" aria-labelledby="focus-heading">
        <div className="section-heading"><p className="eyebrow">Start here</p><h2 id="focus-heading">Three decisions. That&apos;s it.</h2></div>
        <div className="focus-grid">{quickLinks.map((item) => <a className="focus-card" href={item.href} key={item.number}><span className="step">{item.number}</span><h3>{item.title}</h3><p>{item.detail}</p><span className="arrow">Open →</span></a>)}</div>
      </section>

      <section className="easy-plan" id="easy-plan" aria-labelledby="plan-heading">
        <div className="section-heading"><p className="eyebrow">The at-ease version</p><h2 id="plan-heading">One highlight a day. Room to wander.</h2><p>Use this as the default. It keeps momentum high without packing every hour.</p></div>
        <div className="day-scroll">
          <article className="day-card arrival"><span>Thu · Arrival</span><h3>Land softly</h3><p>Private airport pickup → check in → easy dinner close to home.</p><small>Only goal: get settled.</small></article>
          <article className="day-card"><span>Fri</span><h3>Christ + Sugarloaf</h3><p>Take the Corcovado train, Brazilian BBQ lunch, then cable car at golden hour.</p><small>Best booked guided day.</small></article>
          <article className="day-card"><span>Sat</span><h3>Beach + Santa Teresa</h3><p>Slow beachfront morning, Selarón Steps, then samba or a relaxed dinner.</p><small>Choose your energy level.</small></article>
          <article className="day-card game"><span>Sun · Main event</span><h3>Maracanã game day</h3><p>Late breakfast, private car early, then enjoy the stadium experience.</p><small>Wear comfortable shoes. Leave valuables home.</small></article>
          <article className="day-card"><span>Mon</span><h3>Your Rio day</h3><p>Pick one: Tijuca Forest, Little Africa, or an unplanned Ipanema afternoon.</p><small>You do not need to do all three.</small></article>
          <article className="day-card departure"><span>Tue · Departure</span><h3>Easy exit</h3><p>Pack, one last coffee, and private airport transfer with plenty of time.</p><small>Keep this day light.</small></article>
        </div>
        <a className="text-link" href="/rio-easy-fun-itinerary.html" target="_blank" rel="noreferrer">Open the full easy-and-fun itinerary →</a>
      </section>

      <TripBuilder />

      <section className="booking-section" id="book-first" aria-labelledby="book-heading">
        <div className="section-heading"><p className="eyebrow">When you are ready</p><h2 id="book-heading">Book these first</h2></div>
        <ol className="booking-list"><li><strong>Stay</strong><span>Choose a ranked Airbnb below. Hold it before building the rest of the trip.</span></li><li><strong>Game tickets</strong><span>Maracanã is the fixed event. Plan the private car around it.</span></li><li><strong>Christ + Sugarloaf</strong><span>Book the guided experience with train and transport.</span></li><li><strong>Driver</strong><span>Arrange airport meet-and-greet and a security-aware driver for the key days.</span></li></ol>
      </section>

      <section className="stays-section" id="stays" aria-labelledby="stays-heading">
        <div className="section-heading"><p className="eyebrow">Stay decision</p><h2 id="stays-heading">Start with these three</h2><p>They make the biggest difference to how easy the trip feels.</p></div>
        <div className="stay-cards">
          <article><span className="stay-rank">#1 · Best overall</span><h3>Rio019 mansion</h3><p>Santa Teresa · history, privacy and the easiest access to Centro, Lapa and Maracanã.</p><a href="/guide.html#stays">See price, capacity & distances →</a></article>
          <article><span className="stay-rank">#2 · Best beach + mall</span><h3>Leb009 villa</h3><p>Leblon · upscale beach base with luxury shopping and easy coastal days.</p><a href="/guide.html#stays">See price, capacity & distances →</a></article>
          <article><span className="stay-rank">#3 · Best iconic location</span><h3>Rio114 penthouse</h3><p>Copacabana · beach energy and walkability, with less villa-style privacy.</p><a href="/guide.html#stays">See price, capacity & distances →</a></article>
        </div>
        <a className="button button-secondary" href="#details">Compare all 10 stays on the map</a>
      </section>

      <section className="details-section" id="details" aria-labelledby="details-heading">
        <div className="section-heading"><p className="eyebrow">Go deeper only when needed</p><h2 id="details-heading">Interactive map, all stays & every detail</h2><p>Tap a stay to see its distance to every activity. Use the tabs for culture, safety, booking links, costs and transport.</p></div>
        <TripExplorer />
        <a className="text-link" href="/guide.html" target="_blank" rel="noreferrer">Open full-screen details →</a>
      </section>

      <footer><strong>Quick safety reminder:</strong> Carry only what you need; keep your phone out of sight while walking; use pre-arranged transport at night.</footer>
    </main>
  );
}
