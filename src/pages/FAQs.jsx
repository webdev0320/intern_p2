import React, { useState } from "react";

const faqsData = [
  {
    question: "What is iYouWorks and how does it help self-employed workers?",
    answer:
      "iYouWorks is a digital platform designed to connect self-employed workers with job opportunities, manage work relationships, and simplify payments and compliance. It helps freelancers and contractors focus on work while the platform handles the rest.",
  },
  {
    question: "How can I follow or connect with workers on iYouWorks?",
    answer:
      "You can follow workers directly from their profile. Once followed, you’ll receive updates and can easily connect, chat, or collaborate on jobs through the platform.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Frequently Asked Questions</h2>

      <div style={styles.container}>
        {faqsData.map((faq, index) => (
          <div key={index} style={styles.card}>
            <button
              onClick={() => toggleFAQ(index)}
              style={styles.question}
            >
              <span>{faq.question}</span>
              <span style={styles.icon}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div style={styles.answer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "30px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "26px",
    fontWeight: "600",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  question: {
    width: "100%",
    padding: "18px",
    fontSize: "16px",
    fontWeight: "500",
    background: "transparent",
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    fontSize: "22px",
    fontWeight: "600",
  },
  answer: {
    padding: "18px",
    borderTop: "1px solid #f1f1f1",
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.6",
    background: "#fafafa",
  },
};

export default FAQs;
