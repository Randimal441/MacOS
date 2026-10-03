import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:user",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-ri:user-smile-line",
        excerpt: "QA Engineer & IT Undergraduate at SLIIT, specializing in test automation..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some live stats about my GitHub account (@Randimal441)..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this personal macOS-style portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "ai-web-testing",
        title: "AutoQA AI Testing",
        file: "markdown/ai-web-testing.md",
        icon: "i-ant-design:robot-filled",
        excerpt: "AI-driven web testing platform powered by Playwright and React...",
        link: "https://github.com/Randimal441/AI-Web_testing_Project"
      },
      {
        id: "campus-connect",
        title: "Campus Connect",
        file: "https://raw.githubusercontent.com/Randimal441/Campus_connect/main/campus-connect-system/README.md",
        icon: "i-fluent:people-community-24-filled",
        excerpt: "MERN stack portal for campus communities, clubs, events, and resources...",
        link: "https://github.com/Randimal441/Campus_connect"
      },
      {
        id: "pet-care-system",
        title: "Pet Care & Treatment",
        file: "https://raw.githubusercontent.com/AseshNemal/Online-system-for-pet-care-and-treatment-services/main/README.md",
        icon: "i-fa-solid:paw",
        excerpt: "IoT smart collar tracking, Gemini AI trainer, and clinic management system...",
        link: "https://github.com/AseshNemal/Online-system-for-pet-care-and-treatment-services"
      },
      {
        id: "daily-routine-automation",
        title: "Daily Routine QA",
        file: "markdown/daily-routine-automation.md",
        icon: "i-tabler:calendar-time",
        excerpt: "Automated regression testing framework in Java with Selenium & TestNG...",
        link: "https://github.com/Randimal441/Daily_Routine_Automation"
      },
      {
        id: "parking-reservation-test",
        title: "Parking Reservation QA",
        file: "https://raw.githubusercontent.com/Randimal441/Parking_Reservation_automation_test/main/README.md",
        icon: "i-fluent:shield-task-28-filled",
        excerpt: "Selenium WebDriver test suite utilizing Page Object Model (POM)...",
        link: "https://github.com/Randimal441/Parking_Reservation_automation_test"
      },
      {
        id: "parking-management-system",
        title: "Smart Parking System",
        file: "https://raw.githubusercontent.com/Randimal441/Parking-reservation-management-system/main/README.md",
        icon: "i-mdi:car-parking-lot",
        excerpt: "MERN stack parking system featuring real-time slot tracking and analytics...",
        link: "https://github.com/Randimal441/Parking-reservation-management-system"
      },
      {
        id: "spendysense",
        title: "SpendySense",
        file: "https://raw.githubusercontent.com/Randimal441/SpendySense/main/README.md",
        icon: "i-solar:wallet-money-bold",
        excerpt: "Android personal finance tracker in Kotlin with budget alerts and analysis...",
        link: "https://github.com/Randimal441/SpendySense"
      }
    ]
  }
];

export default bear;
