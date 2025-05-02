"use client";

import Image from "next/image";

const qaSkills = [
  { name: "Postman", icon: "/icons/postman.png" },
  { name: "TestRail", icon: "/icons/testrail.png" },
  { name: "Newman", icon: "/icons/newman.png" },
  { name: "JMeter", icon: "/icons/jmeter.png" },
  { name: "Selenium", icon: "/icons/selenium.png" },
  { name: "Appium", icon: "/icons/appium.png" },
  { name: "Playwright", icon: "/icons/playwright.png" },
  { name: "BrowserStack", icon: "/icons/browserstack.png" },
  { name: "Sauce Labs", icon: "/icons/saucelabs.png" },
];

const experienceCards = [
  {
    title: "Manual Testing Experience",
    description: "Performed end-to-end manual testing for complex web applications using TestRail & Postman.",
  },
  {
    title: "Automated Testing Experience",
    description: "Built robust test automation suites using Selenium, Appium, and Playwright.",
  },
  {
    title: "API Testing Experience",
    description: "Tested REST APIs using Postman and Newman, validated response payloads and performance.",
  },
  {
    title: "Cross-Browser & Mobile Testing",
    description: "Executed tests on real devices and browsers using BrowserStack & Sauce Labs.",
  },
];

const QA = () => {
  return (
    <div className="px-8 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">QA Skills</h2>

      {/* Skill Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16">
        {qaSkills.map((skill, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-lg transition duration-300">
            <div className="w-16 h-16 relative mb-2">
              <Image src={skill.icon} alt={skill.name} layout="fill" objectFit="contain" />
            </div>
            <p className="font-medium">{skill.name}</p>
          </div>
        ))}
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experienceCards.map((exp, index) => (
          <div key={index} className="bg-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QA;
