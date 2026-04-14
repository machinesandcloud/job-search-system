"use client";

import Script from "next/script";
import { useRef } from "react";

type CareerIndexWindow = Window &
  typeof globalThis & {
    zf_SetDateAndMonthRegexBasedOnDateFormate?: (format: string) => [string, string];
    zf_DateRegex?: RegExp;
    zf_MonthYearRegex?: RegExp;
    zf_MandArray?: string[];
    zf_FieldArray?: string[];
    isSalesIQIntegrationEnabled?: boolean;
    salesIQFieldsArray?: string[];
    zf_ValidateAndSubmit?: () => boolean;
  };

export default function CareerIndexPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleValidationLoad = () => {
    if (emailRef.current) {
      emailRef.current.setAttribute("checktype", "c5");
      emailRef.current.setAttribute("fieldType", "9");
    }

    if (typeof window === "undefined") return;
    const careerWindow = window as CareerIndexWindow;
    const setDateRegex = careerWindow.zf_SetDateAndMonthRegexBasedOnDateFormate;
    if (typeof setDateRegex !== "function") return;
    const dateAndMonthRegexFormateArray = setDateRegex("dd-MMM-yyyy");
    careerWindow.zf_DateRegex = new RegExp(dateAndMonthRegexFormateArray[0]);
    careerWindow.zf_MonthYearRegex = new RegExp(dateAndMonthRegexFormateArray[1]);
    careerWindow.zf_MandArray = ["Email"];
    careerWindow.zf_FieldArray = ["Name_First", "Name_Last", "Email"];
    careerWindow.isSalesIQIntegrationEnabled = false;
    careerWindow.salesIQFieldsArray = [];
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const validator = (window as CareerIndexWindow).zf_ValidateAndSubmit;
    if (typeof validator === "function") {
      const isValid = validator();
      if (!isValid) {
        event.preventDefault();
      }
    }
  };

  return (
    <section className="career-index">
      <Script src="/career-index/js/validation.js" strategy="afterInteractive" onLoad={handleValidationLoad} />
      <div className="zf-templateWidth">
        <form
          action="https://forms.zohopublic.com/askiacareercoaching/form/EmailSubscription/formperma/cBXsJmQv2DE_EhdC_-0DPNAUZjTVp02YMSloAcFS5ko/htmlRecords/submit"
          name="form"
          method="POST"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          id="form"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="zf_referrer_name" value="" />
          <input type="hidden" name="zf_redirect_url" value="" />
          <input type="hidden" name="zc_gad" value="" />
          <div className="zf-templateWrapper">
            <ul className="zf-tempHeadBdr">
              <li className="zf-tempHeadContBdr">
                <h2 className="zf-frmTitle">
                  <em>Career Index</em>
                </h2>
                <p className="zf-frmDesc"></p>
                <div className="zf-clearBoth"></div>
              </li>
            </ul>
            <div className="zf-subContWrap zf-topAlign">
              <ul>
                <div className="zf-tempFrmWrapper zf-section">
                  <h2>Get instant updates, every time we share something.</h2>
                  <p></p>
                </div>
                <div className="zf-tempFrmWrapper zf-name zf-namelarge">
                  <label className="zf-labelName">Name</label>
                  <div className="zf-tempContDiv zf-twoType">
                    <div className="zf-nameWrapper">
                      <span>
                        <input type="text" maxLength={255} name="Name_First" placeholder="" />
                        <label>First Name</label>
                      </span>
                      <span>
                        <input type="text" maxLength={255} name="Name_Last" placeholder="" />
                        <label>Last Name</label>
                      </span>
                      <div className="zf-clearBoth"></div>
                    </div>
                    <p id="Name_error" className="zf-errorMessage" style={{ display: "none" }}>
                      Invalid value
                    </p>
                  </div>
                  <div className="zf-clearBoth"></div>
                </div>
                <div className="zf-tempFrmWrapper zf-large">
                  <label className="zf-labelName">
                    Email
                    <em className="zf-important">*</em>
                  </label>
                  <div className="zf-tempContDiv">
                    <span>
                      <input
                        ref={emailRef}
                        type="text"
                        name="Email"
                        defaultValue=""
                        maxLength={255}
                        placeholder=""
                      />
                    </span>
                    <p id="Email_error" className="zf-errorMessage" style={{ display: "none" }}>
                      Invalid value
                    </p>
                    <p className="zf-instruction">No spam. It&apos;s a promise.</p>
                  </div>
                  <div className="zf-clearBoth"></div>
                </div>
              </ul>
            </div>
            <ul>
              <li className="zf-fmFooter">
                <button className="zf-submitColor" type="submit">
                  Submit
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
}
