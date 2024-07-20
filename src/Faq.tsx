import  { useState } from 'react';


interface FAQItem {
    question: string;
    answer: string;
  }

interface FAQData {
    [key: string]: FAQItem[];
  }

  
  const faqData: FAQData = {
    "Eligibility": [
      {
        question: "Do I need to have prior Product Management and Project Management experience to enroll in the program?",
        answer: "No, the program is designed to be inclusive of all levels of experience. All topics will be covered from the basics, making it suitable for individuals from any field of work."
      },
      {
        question: "What is the minimum system configuration required?",
        answer: "A basic computer with internet access will suffice for this program."
      }
    ],
    "How To Use?": [
      {
        question: "How do I start the course?",
        answer: "You can start the course by logging into your account and navigating to the 'My Courses' section."
      },
      {
        question: "How do I track my progress?",
        answer: "Your progress is automatically tracked and can be viewed in the 'Progress' section of your dashboard."
      }
    ],
    "Terms & Conditions": [
      {
        question: "What is the refund policy?",
        answer: "Please refer to our refund policy page for detailed information."
      },
      {
        question: "Are there any prerequisites?",
        answer: "There are no prerequisites to enroll in this program."
      }
    ]
  };

  
function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("Eligibility");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setExpandedIndex(null); // Reset the expanded question when category changes
  };

  const handleQuestionClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-4xl font-semibold text-center mb-8">Frequently Asked <span className="text-blue-500">Questions</span></h2>
      <div className="flex">
        <div className="w-1/4">
          <div className="flex flex-col space-y-2">
            {Object.keys(faqData).map((category) => (
              <button
                key={category}
                className={`py-2 px-4 rounded ${category === selectedCategory ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="w-3/4 pl-8">
          {faqData[selectedCategory].map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className="text-lg font-semibold text-left w-full flex justify-between items-center"
                onClick={() => handleQuestionClick(index)}
              >
                <span className={`${expandedIndex === index ? "text-blue-500" : "text-gray-900"}`}>{item.question}</span>
                <span>{expandedIndex === index ? "▲" : "▼"}</span>
              </button>
              {expandedIndex === index && (
                <div className="mt-2 text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
