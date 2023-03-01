import * as Yup from "yup";
import {
  validateNRIC,
  validateOnlyNumbers,
  validateOnlyLetters,
  validateInputEmail,
} from "../utils";

declare module "yup" {
  interface StringSchema {
    nricInvalid(msg: string): this;
    addressInvalid(msg: string): this;
  }
}

Yup.addMethod<Yup.StringSchema>(
  Yup.string,
  "nricInvalid",
  function (msg: string = "Invalid ID Number") {
    return this.test(`test-nric-invalid`, msg, function (value) {
      const { path, createError } = this;

      return validateNRIC(value || "") || createError({ path, message: msg });
    });
  }
);

Yup.addMethod<Yup.StringSchema>(
  Yup.string,
  "addressInvalid",
  function (msg: string = "Invalid Address") {
    return this.test(`test-address-invalid`, msg, function (value) {
      const { path, createError } = this;

      return (
        !validateOnlyNumbers(value || "") || createError({ path, message: msg })
      );
    });
  }
);

const donationFormSchema = Yup.object().shape(
  {
    idNumber: Yup.string()
      .nricInvalid("Invalid ID Number")
      .required("ID Number is required"),

    donationAmount: Yup.string()
      .required("Donation Amount is required")
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Donation Amount is invalid"
      ),

    name: Yup.string()
      .required("Name is required")
      .test("Only letters", "Only letters are allowed", (value) =>
        validateOnlyLetters(value)
      ),

    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid")
      .test("Email", "accents not allowed", (value) =>
        validateInputEmail(value)
      ),

    postalCode: Yup.string()
      .required("Postal Code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),

    unitNumber: Yup.string()
      .required("Unit Number is required")
      .test(
        "Unit Number",
        "Unit Number must not exceed 6 digit number",
        (value: any) => {
          const res = value.replaceAll("-", "").replaceAll("_", "");
          return res.length <= 6;
        }
      ),

    address: Yup.string()
      .nullable()
      .notRequired()
      .when("address", {
        is: (value?: String) => value?.length,
        then: (rule) => rule.addressInvalid("Invalid Address"),
      }),

    remarks: Yup.string(),
  },
  [["address", "address"]]
);

export { donationFormSchema };
