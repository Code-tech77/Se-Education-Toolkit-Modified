export const generateLocalResponse = (message: string): string => {
  const text = message.toLowerCase();

  // Resource requests
  if (text.includes("resource") || text.includes("book") || text.includes("link") || text.includes("study") || text.includes("learn more")) {
    return `Here are some excellent resources for Software Engineering:
- Books: "Software Engineering" by Ian Sommerville, "Clean Code" by Robert C. Martin.
- UML Resources: [Lucidchart UML Guide](https://www.lucidchart.com/pages/what-is-uml), [OMG UML Specification](https://www.uml.org/).
- Requirements Engineering: [IREB Certified Professional for Requirements Engineering](https://www.ireb.org/).
- Labs: Please refer to the /labs section of this toolkit for interactive practice!`;
  }

  // UML Modeling
  if (
    text.includes("uml") ||
    text.includes("diagram") ||
    text.includes("use case") ||
    text.includes("class") ||
    text.includes("activity") ||
    text.includes("sequence") ||
    text.includes("state machine") ||
    text.includes("object")
  ) {
    return `UML (Unified Modeling Language) is a standard way to visualize the design of a system.
- **Use Case Diagrams**: Show actors and their interactions with the system.
- **Class Diagrams**: Show the static structure, including classes, attributes, operations, and relationships.
- **Activity Diagrams**: Model the workflow or business processes.
- **Sequence Diagrams**: Detail how objects interact in a particular scenario over time.
If you need help drawing or understanding a specific diagram, just ask!`;
  }

  // Requirements Engineering
  if (
    text.includes("requirement") ||
    text.includes("user story") ||
    text.includes("acceptance criteria") ||
    text.includes("agile") ||
    text.includes("scrum") ||
    text.includes("epic") ||
    text.includes("stakeholder")
  ) {
    return `Requirements Engineering is crucial for understanding what to build!
- **User Stories**: Follow the format 'As a [role], I want [feature] so that [benefit]'.
- **Acceptance Criteria**: Conditions a software product must satisfy to be accepted by a user.
- **Elicitation**: Gathering requirements from stakeholders through interviews, surveys, or observation.
I can help you review your user stories or write acceptance criteria. Try sharing one with me!`;
  }

  // Labs
  if (
    text.includes("lab") ||
    text.includes("step") ||
    text.includes("practice") ||
    text.includes("exercise") ||
    text.includes("module") ||
    text.includes("assignment")
  ) {
    return `Our interactive labs are designed to give you hands-on experience!
We have modules covering:
1. Writing User Stories
2. Creating Acceptance Criteria
3. Drawing UML Use Case Diagrams
4. Drawing UML Class Diagrams
To get started, head over to the Labs section. Let me know if you are stuck on a specific lab step!`;
  }

  // Greetings
  if (
    text.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/)
  ) {
    return "Hello! I am your built-in SE Toolkit Assistant. How can I help you with UML modeling, requirements engineering, or your lab exercises today?";
  }

  // Unrelated
  return "I'm a dedicated Software Engineering Toolkit Assistant. My purpose is to help you learn and practice UML modeling, requirements engineering, and guide you through your lab exercises. Please ask me a question related to these topics!";
};
