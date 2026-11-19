import { describe, expect, it } from "vitest";
import {
  CONTACT_EMAIL_PLACEHOLDER,
  MESSAGE_MIN_LENGTH,
  TOPIC_OPTIONS,
  isTopicValue,
  topicLabel,
  validateEnquiry,
  type EnquiryInput,
} from "@/lib/enquiries";

const valid: EnquiryInput = {
  name: "Alex Morgan",
  email: "alex@company.com",
  company: "Morgan Plumbing Ltd",
  topic: "power-apps",
  message: "We track jobs in spreadsheets and want a simple app for our team.",
};

describe("validateEnquiry", () => {
  it("accepts a complete, valid enquiry", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("accepts an enquiry with no company (optional)", () => {
    const { company: _company, ...noCompany } = valid;
    expect(validateEnquiry(noCompany)).toEqual({});
  });

  it("requires a name, including whitespace-only", () => {
    expect(validateEnquiry({ ...valid, name: "" }).name).toBe("Enter your name.");
    expect(validateEnquiry({ ...valid, name: "   " }).name).toBe("Enter your name.");
  });

  it("requires an email and rejects malformed ones", () => {
    expect(validateEnquiry({ ...valid, email: "" }).email).toBe(
      "Enter your work email address.",
    );
    for (const bad of ["not-an-email", "alex@", "alex@company", "alex@company.c"]) {
      expect(validateEnquiry({ ...valid, email: bad }).email).toBe(
        "Enter an email address in the format name@company.com.",
      );
    }
  });

  it("accepts an email with surrounding whitespace (trimmed)", () => {
    expect(validateEnquiry({ ...valid, email: "  alex@company.com  " })).toEqual({});
  });

  it("requires a known topic value", () => {
    expect(validateEnquiry({ ...valid, topic: "" }).topic).toMatch(/Choose what you need help with/);
    expect(validateEnquiry({ ...valid, topic: "bogus" }).topic).toMatch(
      /Choose what you need help with/,
    );
    expect(validateEnquiry({ ...valid, topic: undefined }).topic).toBeDefined();
  });

  it("accepts every topic option", () => {
    for (const option of TOPIC_OPTIONS) {
      expect(validateEnquiry({ ...valid, topic: option.value })).toEqual({});
    }
  });

  it("requires a message of at least MESSAGE_MIN_LENGTH characters", () => {
    expect(MESSAGE_MIN_LENGTH).toBe(20);
    expect(validateEnquiry({ ...valid, message: "" }).message).toMatch(/Tell us a little/);
    expect(validateEnquiry({ ...valid, message: "Too short" }).message).toMatch(
      /Tell us a little more/,
    );
    expect(validateEnquiry({ ...valid, message: "x".repeat(19) }).message).toBeDefined();
    expect(validateEnquiry({ ...valid, message: "x".repeat(20) })).toEqual({});
  });

  it("reports all invalid fields at once", () => {
    const errors = validateEnquiry({ name: "", email: "bad", topic: "bogus", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "topic"]);
  });
});

describe("topic helpers", () => {
  it("isTopicValue accepts only the four known values", () => {
    expect(isTopicValue("power-apps")).toBe(true);
    expect(isTopicValue("dataverse")).toBe(true);
    expect(isTopicValue("automation")).toBe(true);
    expect(isTopicValue("not-sure")).toBe(true);
    expect(isTopicValue("bogus")).toBe(false);
    expect(isTopicValue(undefined)).toBe(false);
  });

  it("topicLabel returns the label, or undefined for unknown values", () => {
    expect(topicLabel("power-apps")).toContain("Power Apps");
    expect(topicLabel("bogus")).toBeUndefined();
    expect(topicLabel(undefined)).toBeUndefined();
  });

  it("the contact email is still the placeholder Huy has to confirm", () => {
    expect(CONTACT_EMAIL_PLACEHOLDER).toBe("hello@hhxservices.example");
  });
});
