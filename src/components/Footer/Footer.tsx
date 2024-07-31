import FooterLink from "./FooterLink";
import About from "./About";
import ContributeForm from "./ContributeForm";
import { useState } from "react";

const Footer = () => {
  const [form, setForm] = useState(false);
  const [about, setAbout] = useState(false);
  return (
    <>
      {form && <ContributeForm onFormClicked={() => setForm(false)} />}
      {about && <About onAboutClicked={() => setAbout(false)} />}
      <FooterLink
        onFormClicked={() => {
          setForm(true);
        }}
        onAboutClicked={() => {
          setAbout(true);
        }}
      />
    </>
  );
};

export default Footer;
