import "./contact.css";

const Contact = () => {
  return (
    <section className="contact">
      <div className="info__contact" id="info__contact">
        <div className="contact__text">
          <h1> Let's work together and create something amazing</h1>
        </div>
        <div className="contact__link">
          <p>
            Ready to talk? Send me an email and I’ll get back to you.
          </p>
          <a
            className="contact__email"
            href="mailto:hikmalalfatih05@gmail.com?subject=Portfolio%20inquiry"
          >
            Email me
          </a>
        </div>
      </div>
      <div className="contact__footer">
        <span>Jakarta, Indonesia</span>
        <span>@hikmal</span>
      </div>
    </section>
  );
};

export default Contact;
