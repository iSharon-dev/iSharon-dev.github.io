import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { ArchiveLink } from "@/components/PageTransition";

export default function ContactPage() {
  return (
    <main className="paper-page contact-page">
      <Header />
      <section className="contact-shell section-shell">
        <header><span>CONTACT SHEET / 001</span><h1>LET’S MAKE<br />SOMETHING<br />MEANINGFUL.</h1><p>如果你有品牌、视觉或数字体验方面的机会，欢迎联系我。</p></header>
        <div className="contact-board">
          <div className="contact-details">
            <article><span>EMAIL</span><a href="mailto:2998236578@qq.com">2998236578@qq.com ↗</a></article>
            <article><span>WECHAT</span><strong>Saladdays_o-0</strong></article>
            <article><span>PHONE</span><a href="tel:18267438251">18267438251 ↗</a></article>
            <article><span>LOCATION</span><strong>Ningbo, China</strong></article>
          </div>
          <ContactForm />
        </div>
      </section>
      <footer className="contact-footer section-shell"><span>THANKS FOR VISITING.</span><ArchiveLink href="/thanks" transitionLabel="THANKS / CONTACT">OPEN FINAL FILE ↗</ArchiveLink></footer>
    </main>
  );
}
