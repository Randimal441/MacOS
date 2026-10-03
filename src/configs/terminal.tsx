import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, this is Randimal Lamahewa. Dedicated Quality Assurance Engineer and
              BSc (Hons) Information Technology undergraduate at SLIIT.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content:
          "QA & Automated Testing (Selenium, Playwright, TestNG) / IoT & Machine Learning / Cricket Biomechanical Analysis"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I am a competitive athlete bringing discipline, analytical precision, and a problem-solving mindset to software reliability."
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:randimalchamika@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                randimalchamika@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/Randimal441"
                target="_blank"
                rel="noreferrer"
              >
                @Randimal441
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/randimal-lamahewa-153483271/"
                target="_blank"
                rel="noreferrer"
              >
                randimal-lamahewa
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">testing</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">bugs</span>
          <span className="text-yellow-400">--</span>;
        </div>
        <div>
          <span className="text-blue-400 ml-9">quality</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
