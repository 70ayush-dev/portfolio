import { BitsText, BitsControl } from "../components/reactbits/experience";
import { Navigation, Footer, Arrow } from "../components/platform-layout";

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="not-found section">
        <BitsText as="h1">
          Looks like this page doesn’t exist<span className="accent">.</span>
        </BitsText>
        <BitsText as="p">
          Even well-architected platforms encounter missing endpoints. The
          system is operating normally.
        </BitsText>
        <BitsControl as="a" className="button primary" href="/">
          Back to overview <Arrow />
        </BitsControl>
      </main>
      <Footer />
    </>
  );
}
