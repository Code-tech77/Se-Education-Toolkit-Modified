export interface LocalQuestion {
  id: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const LOCAL_QUESTIONS: LocalQuestion[] = [
  // REQUIREMENTS ENGINEERING
  {
    id: "req-easy-1",
    topic: "Requirements Engineering",
    difficulty: "easy",
    question: "What is the primary goal of Requirements Engineering?",
    options: [
      "To write the source code of the project",
      "To identify, document, and maintain the needs of stakeholders for a system",
      "To design the user interface components",
      "To run performance benchmark tests"
    ],
    correctIndex: 1,
    explanation: "Requirements Engineering is focused on understanding, documenting, and managing stakeholder expectations and needs so that the system built satisfies them."
  },
  {
    id: "req-easy-2",
    topic: "Requirements Engineering",
    difficulty: "easy",
    question: "Which of the following is a non-functional requirement?",
    options: [
      "The system must allow users to log in with an email address",
      "The system must calculate sales tax automatically at checkout",
      "The system database must encrypt all user passwords at rest",
      "The system must load pages in under 2 seconds under peak load"
    ],
    correctIndex: 3,
    explanation: "Functional requirements describe WHAT a system does (features). Non-functional requirements describe HOW it does it (performance, reliability, page load speeds)."
  },
  {
    id: "req-med-1",
    topic: "Requirements Engineering",
    difficulty: "medium",
    question: "During requirements elicitation, what is the main risk of relying solely on questionnaires?",
    options: [
      "They are too expensive to distribute",
      "They cannot capture qualitative responses",
      "They prevent follow-up questions to clarify ambiguous stakeholder responses",
      "They require writing code scripts to analyze"
    ],
    correctIndex: 2,
    explanation: "Questionnaires are useful for gathering quantitative data from many users, but they lack interactivity, meaning you cannot ask follow-up questions to probe deeper or resolve ambiguities."
  },
  {
    id: "req-med-2",
    topic: "Requirements Engineering",
    difficulty: "medium",
    question: "What does 'requirements validation' ensure?",
    options: [
      "That the requirements specify the system correctly according to the user needs",
      "That the software compile process succeeds without syntax warnings",
      "That the developers wrote the unit tests before implementation",
      "That the project conforms to budget restrictions"
    ],
    correctIndex: 0,
    explanation: "Validation ensures that the requirements define the right system that the customer actually wants. Verification, on the other hand, checks if the software conforms to those requirements."
  },
  {
    id: "req-hard-1",
    topic: "Requirements Engineering",
    difficulty: "hard",
    question: "In complex systems, why is requirements traceability critical?",
    options: [
      "It allows developers to count lines of code written",
      "It links requirements forward to design/tests and backward to business cases, ensuring impact analysis is accurate when changes occur",
      "It prevents stakeholders from modifying requirements after approval",
      "It automatically runs CI/CD regression tests"
    ],
    correctIndex: 1,
    explanation: "Traceability ensures every requirement is linked from its origin (business case) to its implementation (design/code) and validation (test cases). This is essential for analyzing the impact of changes."
  },

  // USER STORIES
  {
    id: "us-easy-1",
    topic: "User Stories",
    difficulty: "easy",
    question: "What is the standard template format for an agile User Story?",
    options: [
      "If [trigger], then [action] because [expected result]",
      "As a [role], I want [feature] so that [benefit]",
      "We must build [feature] for [users] to achieve [benefit]",
      "Select [data] from [table] where [condition]"
    ],
    correctIndex: 1,
    explanation: "The classic user story template is: 'As a [role], I want [feature] so that [benefit]'. It keeps the focus on the user, their goal, and the value."
  },
  {
    id: "us-easy-2",
    topic: "User Stories",
    difficulty: "easy",
    question: "What does the 'C' in the 'Three Cs' of User Stories stand for?",
    options: [
      "Coding, Compiling, Checking",
      "Card, Conversation, Confirmation",
      "Complexity, Constraint, Condition",
      "Customer, Collaboration, Communication"
    ],
    correctIndex: 1,
    explanation: "The 'Three Cs' formulated by Ron Jeffries are: Card (physical/digital ticket), Conversation (collaborative dialogue to unpack it), and Confirmation (acceptance criteria)."
  },
  {
    id: "us-med-1",
    topic: "User Stories",
    difficulty: "medium",
    question: "In the INVEST criteria for user stories, what does the 'E' stand for?",
    options: [
      "Efficient",
      "Extendable",
      "Estimable",
      "Executable"
    ],
    correctIndex: 2,
    explanation: "INVEST stands for: Independent, Negotiable, Valuable, Estimable (developers can gauge size), Small, and Testable."
  },
  {
    id: "us-med-2",
    topic: "User Stories",
    difficulty: "medium",
    question: "Which of the following is the most common reason to split a user story?",
    options: [
      "The story is too small to fit in a sprint task board",
      "The story is too large (an Epic) and cannot be completed within a single sprint iteration",
      "The story has no database table associated with it",
      "The story was written by a developer instead of the Product Owner"
    ],
    correctIndex: 1,
    explanation: "If a user story is too large (an Epic), it represents too much risk and uncertainty for a sprint. It must be split into smaller, independent slices."
  },
  {
    id: "us-hard-1",
    topic: "User Stories",
    difficulty: "hard",
    question: "How does a team resolve a User Story that is too vague and lacks technical clarity during planning?",
    options: [
      "Estimate it anyway with the highest story point value to cover risks",
      "Skip writing acceptance criteria and implement basic defaults",
      "Create a 'Spike' task—a time-boxed research activity to gain technical context before estimation",
      "Reject the story and delete it from the product backlog"
    ],
    correctIndex: 2,
    explanation: "A Spike is a technical investigation or research task in Agile that allows the team to resolve dependencies, explore options, and gather enough information to estimate and write the story."
  },

  // ACCEPTANCE CRITERIA
  {
    id: "ac-easy-1",
    topic: "Acceptance Criteria",
    difficulty: "easy",
    question: "Which keyword structure is used for writing scenario-based Acceptance Criteria in Gherkin?",
    options: [
      "SELECT, FROM, WHERE, GROUP BY",
      "IF, THEN, ELSE, ELIF",
      "GIVEN, WHEN, THEN, AND",
      "START, PROCESS, CHECK, STOP"
    ],
    correctIndex: 2,
    explanation: "Gherkin syntax uses 'Given' (setup context), 'When' (trigger event), 'Then' (expected outcome), and 'And' (conjunction) for behavior-driven development (BDD)."
  },
  {
    id: "ac-easy-2",
    topic: "Acceptance Criteria",
    difficulty: "easy",
    question: "What is the primary purpose of Acceptance Criteria?",
    options: [
      "To detail the database schema fields",
      "To define the boundaries of a user story and confirm when it is complete and working correctly",
      "To estimate the financial budget of the software",
      "To track developer task hours"
    ],
    correctIndex: 1,
    explanation: "Acceptance criteria define the boundaries, constraints, and success conditions of a story, allowing stakeholders and developers to agree when the feature works as intended."
  },
  {
    id: "ac-med-1",
    topic: "Acceptance Criteria",
    difficulty: "medium",
    question: "Consider this scenario: 'Given a user is on the login page, When they enter wrong details, Then they see an error.' What is a potential issue with this Acceptance Criterion?",
    options: [
      "It uses the Gherkin keywords incorrectly",
      "It is too technically detailed about UI layout",
      "It is too vague, failing to specify what 'wrong details' are or what specific error message is shown",
      "It describes multiple user stories at once"
    ],
    correctIndex: 2,
    explanation: "This criterion is vague because it doesn't specify what 'wrong details' (e.g. invalid email format vs. incorrect password) are, or what error response (e.g., 'Incorrect credentials') is displayed, making it hard to test accurately."
  },
  {
    id: "ac-med-2",
    topic: "Acceptance Criteria",
    difficulty: "medium",
    question: "Which of the following describes 'Given' in a Gherkin scenario?",
    options: [
      "The initial state or pre-conditions of the system before an action is taken",
      "The action or event triggered by the user",
      "The expected outcome or reaction of the system",
      "The list of inputs for a database table query"
    ],
    correctIndex: 0,
    explanation: "'Given' defines the pre-conditions, baseline state, or initial context (e.g., 'Given the user is logged in' or 'Given their cart is empty')."
  },
  {
    id: "ac-hard-1",
    topic: "Acceptance Criteria",
    difficulty: "hard",
    question: "In Behavior-Driven Development (BDD), what is a 'Scenario Outline' used for?",
    options: [
      "To define high-level system components in a diagram",
      "To run the same test scenario multiple times with different sets of inputs/outputs defined in an 'Examples' table",
      "To outline the hierarchy of user stories in a project plan",
      "To write non-functional requirements"
    ],
    correctIndex: 1,
    explanation: "A Scenario Outline acts as a template. It is combined with an 'Examples' table containing variables that run through the scenario steps, preventing duplicate code for multiple data variations."
  },

  // UML CLASS DIAGRAMS
  {
    id: "uml-easy-1",
    topic: "UML Class Diagrams",
    difficulty: "easy",
    question: "In a UML Class box, what are the three compartments (from top to bottom)?",
    options: [
      "Class Name, Attributes, Methods",
      "Methods, Attributes, Class Name",
      "ID, Variables, Constants",
      "Package, Constructors, Deconstructors"
    ],
    correctIndex: 0,
    explanation: "A standard UML class diagram box displays the Class Name in the top compartment, Attributes (variables) in the middle, and Methods (functions) in the bottom."
  },
  {
    id: "uml-easy-2",
    topic: "UML Class Diagrams",
    difficulty: "easy",
    question: "Which symbol denotes a 'private' attribute visibility in a UML Class diagram?",
    options: [
      "Plus symbol (+)",
      "Minus symbol (-)",
      "Hashtag symbol (#)",
      "Tilde symbol (~)"
    ],
    correctIndex: 1,
    explanation: "In UML notation, '-' stands for private, '+' for public, '#' for protected, and '~' for package visibility."
  },
  {
    id: "uml-med-1",
    topic: "UML Class Diagrams",
    difficulty: "medium",
    question: "What is the difference between Aggregation and Composition relationships in UML?",
    options: [
      "Aggregation is drawn with a solid line; Composition is drawn with a dashed line",
      "Aggregation represents a 'part-of' relationship where the child can exist independently of the parent; Composition represents a strict ownership where the child cannot exist without the parent",
      "Aggregation is for interface classes; Composition is for concrete classes only",
      "Aggregation has arrows on both ends; Composition has no arrows"
    ],
    correctIndex: 1,
    explanation: "Aggregation (empty diamond) is a weak relationship (e.g. Car and Driver). Composition (filled diamond) is a strong relationship where the child is lifecycle-bound to the parent (e.g. Building and Room)."
  },
  {
    id: "uml-med-2",
    topic: "UML Class Diagrams",
    difficulty: "medium",
    question: "Which arrow denotes a 'Generalization' (Inheritance) relationship in UML?",
    options: [
      "A solid line with a hollow triangle pointing to the parent class",
      "A dashed line with a hollow triangle pointing to the interface class",
      "A solid line with an open arrow pointing to the child class",
      "A solid line with a filled diamond pointing to the container class"
    ],
    correctIndex: 0,
    explanation: "Generalization (inheritance) is drawn as a solid line with a hollow triangle pointing from the child class towards the parent class."
  },
  {
    id: "uml-hard-1",
    topic: "UML Class Diagrams",
    difficulty: "hard",
    question: "If Class A uses Class B as a parameter in one of its methods but does not store a reference to B as an attribute, what is the correct UML relationship?",
    options: [
      "Association (solid line with open arrow)",
      "Dependency (dashed line with open arrow pointing to Class B)",
      "Generalization (solid line with hollow triangle)",
      "Aggregation (solid line with empty diamond)"
    ],
    correctIndex: 1,
    explanation: "A dependency relationship (dashed line, open arrow) indicates that a class uses another class temporarily (e.g. as a method parameter or local variable) but does not hold a long-term reference to it."
  },

  // SOFTWARE TESTING
  {
    id: "test-easy-1",
    topic: "Software Testing",
    difficulty: "easy",
    question: "What does 'Unit Testing' focus on?",
    options: [
      "Testing the entire system from the end-user's perspective",
      "Testing individual components or functions in isolation to verify they work correctly",
      "Testing the database queries speed and load capacities",
      "Testing the visual pixel layout of buttons"
    ],
    correctIndex: 1,
    explanation: "Unit testing focuses on checking isolated small code pieces (units, like single functions or methods) to verify their basic inputs and outputs."
  },
  {
    id: "test-easy-2",
    topic: "Software Testing",
    difficulty: "easy",
    question: "What is 'Black-box' testing?",
    options: [
      "Testing the hardware circuitry of server racks",
      "Testing the functional behavior of software without looking at its internal code implementation",
      "Testing code with dark-themed terminals only",
      "Testing software by intentionally corrupting compile files"
    ],
    correctIndex: 1,
    explanation: "Black-box testing ignores the internal structure, algorithms, and code. Tests are based purely on inputs and expected outputs according to specifications."
  },
  {
    id: "test-med-1",
    topic: "Software Testing",
    difficulty: "medium",
    question: "What is the primary difference between Integration Testing and System Testing?",
    options: [
      "Integration testing tests interaction between combined components; System testing tests the complete, integrated system as a whole",
      "Integration testing is done by clients; System testing is done by developers",
      "Integration testing is black-box; System testing is white-box only",
      "Integration testing measures lines of code; System testing measures CPU cycles"
    ],
    correctIndex: 0,
    explanation: "Integration testing looks at how components interface with each other. System testing takes the final integrated software and validates it end-to-end."
  },
  {
    id: "test-med-2",
    topic: "Software Testing",
    difficulty: "medium",
    question: "What does 'Test Coverage' measure?",
    options: [
      "The percentage of code lines or branches executed during test suites",
      "The geographic locations where the test team operates",
      "The duration of time it takes to run test scripts",
      "The size of the test files in bytes"
    ],
    correctIndex: 0,
    explanation: "Test coverage is a metric showing the extent to which the source code has been tested by your test cases, often measuring line, branch, or statement coverage."
  },
  {
    id: "test-hard-1",
    topic: "Software Testing",
    difficulty: "hard",
    question: "What is 'Regression Testing' and why is it performed?",
    options: [
      "Testing a system under heavy virtual user load to trigger resource leaks",
      "Running previous tests after codebase changes to ensure existing features were not accidentally broken",
      "Testing code components before they are written by the developer",
      "Testing database connections recovery after a power failure"
    ],
    correctIndex: 1,
    explanation: "Regression testing ensures that new patches or additions did not break existing features that were working before. It typically involves re-running automated test suites."
  }
];
