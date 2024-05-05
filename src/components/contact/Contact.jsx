import { React, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";

import mailValidate from "../../helpers/validate";

import "./contact.css";

const Contact = () => {
  const form = useRef();

  const formEmail = (e) => {
    e.preventDefault();
    sendEmail();
    formik.handleSubmit();
  };

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_8djdo49",
        "template_r08tqjr",
        form.current,
        "rvm20rt_U6sQ5wPMD"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      company: "",
      message: "",
    },
    validate: mailValidate,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <section className="contact">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="info__contact" id="info__contact">
        <div className="contact__text">
          <h1> Let's work together and create something amazing</h1>
        </div>
        <div className="contact__link">
          <form ref={form} onSubmit={formEmail}>
            <div className="form__initial">
              <input
                {...formik.getFieldProps("name")}
                type="text"
                className="input-user"
                placeholder="Name"
                name="name"
                id="name"
              />
              <input
                {...formik.getFieldProps("email")}
                type="email"
                className="input-user"
                placeholder="Email"
                name="email"
                id="email"
              />{" "}
              <input
                {...formik.getFieldProps("subject")}
                type="text"
                className="input-user"
                placeholder="Subject"
                name="subject"
                id="subject"
              />
              <input
                {...formik.getFieldProps("company")}
                type="text"
                className="input-user"
                placeholder="Company"
                name="company"
                id="company"
              />
            </div>
            <textarea
              {...formik.getFieldProps("message")}
              placeholder="Message"
              className="input-user"
              rows="3"
              name="message"
              id="message"
            ></textarea>

            <button className="contact__email" value="Send" type="submit">
              Send it!
            </button>
          </form>
        </div>
      </div>
      <div className="contact__footer">
        <span>April, 2023</span>
        <span>@hikmal</span>
      </div>
    </section>
  );
};

export default Contact;
