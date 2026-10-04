import {
  BitsText,
  BitsControl,
  AnimatedSection,
} from "../components/reactbits/experience";
export default function NotFound() {
  return (
    <main className="not-found">
      <BitsText as="p" className="eyebrow">
        AYUSH404 / PAGE NOT FOUND
      </BitsText>
      <BitsText as="h1">
        Looks like this page doesn’t exist<span className="accent">.</span>
      </BitsText>
      <BitsText as="p">Even the best systems return a 404 sometimes.</BitsText>
      <BitsControl as="a" className="button primary" href="/">
        Back to home →
      </BitsControl>
    </main>
  );
}
