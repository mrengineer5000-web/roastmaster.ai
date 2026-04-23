import React from "react";
import LegalPage, { LegalSection } from "../components/LegalPage";

export default function Refund() {
  return (
    <LegalPage
      testId="refund-page"
      title="Cancellation & Refund"
      subtitle="Short, fair, and honest. Just like our roasts."
    >
      <LegalSection label="01" heading="The Product">
        <p>
          Roastmaster charges ₹49 per roast (plus any applicable taxes). Each payment unlocks exactly one AI-generated roast, which is delivered instantly to your account.
        </p>
      </LegalSection>

      <LegalSection label="02" heading="Cancellation">
        <p>
          Because roasts are delivered instantly upon successful payment, a purchase cannot be cancelled once the roast has been generated and shown to you. You can close your account at any time from the dashboard or by emailing us.
        </p>
      </LegalSection>

      <LegalSection label="03" heading="Refunds — When You Can Get One">
        <p>You are eligible for a full refund in any of these cases:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You were charged, but the roast was never delivered to your account due to a technical failure on our side.</li>
          <li>Razorpay reports a successful payment but your credit balance was not incremented within 24 hours.</li>
          <li>You were charged multiple times for the same order.</li>
        </ul>
      </LegalSection>

      <LegalSection label="04" heading="Refunds — When You Cannot Get One">
        <ul className="list-disc pl-6 space-y-2">
          <li>You disagree with the tone or outcome of the roast. It is supposed to be brutal. That is literally the product.</li>
          <li>You regret paying after seeing the score. The roast was delivered as promised.</li>
          <li>Request is made more than 14 days after the original purchase.</li>
        </ul>
      </LegalSection>

      <LegalSection label="05" heading="How To Request A Refund">
        <p>
          Email <a href="mailto:contact@pixelbond.in" className="text-[#FFD60A]">contact@pixelbond.in</a> with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your registered email address</li>
          <li>The Razorpay payment ID or order ID</li>
          <li>A short description of the issue</li>
        </ul>
        <p>
          We review every request within 3 working days. Approved refunds are credited to the original payment method within 5–10 working days, depending on your bank.
        </p>
      </LegalSection>

      <LegalSection label="06" heading="Chargebacks">
        <p>
          We ask you to email us before initiating a chargeback. Most issues can be resolved faster directly. Fraudulent chargebacks may result in permanent account suspension.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
