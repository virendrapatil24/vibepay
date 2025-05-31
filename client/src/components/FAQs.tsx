import FAQCard from "./FAQCard";

const faqs = [
  {
    question: "Is VibePay safe to use?",
    answer:
      "Yes, VibePay uses bank-grade encryption and secure authentication protocols to keep your money and data safe. We never store your sensitive information on our servers.",
  },
  {
    question: "How quickly can I send money?",
    answer:
      "Money transfers through VibePay are instant. Once you hit send, the recipient gets the funds in seconds — no waiting or delays.",
  },
  {
    question: "Are there any fees for sending money?",
    answer:
      "Sending money is completely free for personal transfers. Business transfers may incur a small processing fee, which is always shown upfront.",
  },
  {
    question: "Can I send money internationally?",
    answer:
      "Currently, VibePay only supports domestic transfers. We're actively working on expanding to international payments in the near future.",
  },
  {
    question: "Is there a limit on how much I can send?",
    answer:
      "You can send up to ₹1,00,000 per transaction. For higher limits, you can verify your account and request an increase through our support team.",
  },
];

const FAQs = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h3 className="text-center text-4xl sm:text-5xl max-w-2xl mx-auto font-bold">
          Questions you might ask
        </h3>
        <div className="flex flex-col gap-4 mt-10 sm:mt-16 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQCard question={faq.question} answer={faq.answer} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
