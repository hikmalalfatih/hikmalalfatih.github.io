import { toast } from "react-hot-toast";

const mailValidate = async (values) => {
  const errors = nameVerify({}, values);
  emailVerify(errors, values);
  messageVerify(errors, values);
  subjectVerify(errors, values);
  companyVerify(errors, values);
  return errors;
};

const nameVerify = (err = {}, values) => {
  if (!values.name) {
    err.name = toast.error("Name is Required!");
  } else if (values.name.includes(" ")) {
    err.name = toast.error("Invalid name!");
  }
  return err;
};
const companyVerify = (err = {}, values) => {
  if (!values.company) {
    err.company = toast.error("company is Required!");
  } else if (values.company.includes(" ")) {
    err.company = toast.error("Invalid company!");
  }
  return err;
};
const messageVerify = (err = {}, values) => {
  if (!values.message) {
    err.message = toast.error("Please write some message!");
  }
  return err;
};
const subjectVerify = (err = {}, values) => {
  if (!values.message) {
    err.message = toast.error("Please write some subject!");
  }
  return err;
};
const emailVerify = (err = {}, values) => {
  const specialCharacter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.email) {
    err.email = toast.error("Email is required");
  } else if (values.email === " ") {
    err.email = toast.error("Wrong email");
  } else if (!specialCharacter.test(values.email)) {
    err.email = toast.error("Invalid email address");
  }
  return err;
};

export default mailValidate;
