import React from "react";

const TermsConditionsPage = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Terms & Conditions</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          GENERAL CONSIDERATIONS AND SCOPE
        </h3>
        <p className="text-gray-700 text-md">
          Tranzlife Retail Private Limited as WearMe, maintains the internet
          portal www.wearme.com, an online fashion store. On WearMe.com
          customers will be offered goods. The offering on this site is only
          directed at end users of legal age. Goods will only be sold in normal
          household quantities. These terms and conditions find application in
          all contracts which members enter into via wearme.com as well as all
          general business relationships between WearMe and its customers. We do
          not accept any other terms and conditions unless explicitly stated
          otherwise. If periods are stated in working days, these include all
          weekdays except Saturday and Sunday and all statutory holidays.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">USE OF wearme.com</h3>
        <p className="text-gray-700 text-md">
          As part of the registration as a customer of WearMe.com you will be
          asked to submit personal data. You are responsible for ensuring that
          the data is complete and correct. After registration, you will receive
          confirmation via email. You are obliged to treat your password and
          access data confidentially and protect it from unauthorized
          third-party access. In the password-protected area, you can manage
          your recent orders and personal data.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">PRICES AND SHIPPING FEES</h3>
        <p className="text-gray-700 text-md">
          Product prices shown at checkout are final and include taxes. We
          accept major credit cards and charge your card immediately upon order
          dispatch.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">VOUCHERS</h3>
        <ul className="list-disc list-inside text-gray-700 text-md space-y-1">
          <li>Valid for 1 year from issue unless stated otherwise.</li>
          <li>Non-transferable.</li>
          <li>Cannot be deducted from shipping costs.</li>
          <li>Cannot be combined with discount codes or coupons.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">DELIVERY</h3>
        <p className="text-gray-700 text-md">
          Deliveries are made to the shipping address provided. Delivery
          timelines vary by product and availability. WearMe is not liable for
          sourcing risks. Refer to our Delivery and Returns policy for more.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">SERVICE AND COMPLAINTS</h3>
        <p className="text-gray-700 text-md">
          Your satisfaction matters to us. Please email any concerns to
          online@wearme.com and we will address them promptly.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">DATA SECURITY</h3>
        <p className="text-gray-700 text-md">
          Personal data is collected only as required for fulfilling orders and
          is handled confidentially in compliance with the law. Online payments
          use the latest encryption techniques.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">IMAGE RIGHTS</h3>
        <p className="text-gray-700 text-md">
          All imagery used on WearMe.com is property of WearMe. Use without
          explicit permission is prohibited.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">DELIVERY & RETURNS</h3>
        <p className="text-gray-700 text-md mb-4">
          Orders are typically delivered within 4–6 working days. You may return
          items within 14 days for store credits if in original condition.
          Manufacturing defects are refunded after inspection. Returns must be
          securely packed.
        </p>

        <h4 className="text-lg font-semibold mt-6">ONLINE RETURN OPTIONS</h4>

        <ul className="text-gray-700 text-md list-disc list-inside space-y-4 mt-4">
          <li>
            <strong>Via Courier:</strong> Ship to: WearMe, S. De S. Jayasinghe
            Mawatha, Nugegoda. Call: 0717255255. Include order details.
          </li>
          <li>
            <strong>Via Collection:</strong> Email online@wearme.com with your
            order details. We’ll arrange a pickup. One-time reverse shipment
            covered by us.
          </li>
          <li>
            <strong>Via Post Office:</strong> Send to: WearMe, P.O. Box 85,
            Nugegoda 10250, Sri Lanka. Include order details.
          </li>
          <li>
            <strong>Via Nearest Store:</strong> Drop off the item with return
            form. Store credit issued after inspection.
          </li>
        </ul>
        <p className="text-gray-700 text-sm mt-4 italic">
          * Products not returned in resalable condition will be rejected.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">INTERNATIONAL SHIPPING</h3>
        <p className="text-gray-700 text-md">
          WearMe is not responsible for any customs or import charges incurred
          during international deliveries.
        </p>
      </section>
    </div>
  );
};

export default TermsConditionsPage;
