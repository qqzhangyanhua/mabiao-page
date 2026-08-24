import { Atmosphere } from "./components/Atmosphere";
import { Download } from "./components/Download";
import { EventsSection } from "./components/EventsSection";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Privacy } from "./components/Privacy";
import { ProductMock } from "./components/ProductMock";
import { Sources } from "./components/Sources";
import { TimelineSection } from "./components/TimelineSection";
import { TraySection } from "./components/TraySection";
import { useDocumentPointerSpot, usePrefersReducedMotion } from "./hooks";

export default function App() {
  const reduced = usePrefersReducedMotion();
  useDocumentPointerSpot(!reduced);

  return (
    <>
      <Atmosphere reduced={reduced} />
      <Nav />
      <main id="main">
        <Hero />
        <ProductMock />
        <Features />
        <TimelineSection />
        <EventsSection />
        <TraySection />
        <Sources />
        <Privacy />
        <Download />
      </main>
      <Footer />
    </>
  );
}
