import { prisma } from "../db/prisma.js";

// Clear existing users
await prisma.user.deleteMany();

// Create seed users
await prisma.user.createMany({
  data: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "OWNER",
      position: "Chief Executive Officer",
      team: "Executive",
      details: "Company founder with 15 years of experience in tech leadership"
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: "EDITOR",
      position: "Product Manager",
      team: "Product",
      details: "Leading product strategy and roadmap development"
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@example.com",
      role: "ADMIN",
      position: "Chief Technology Officer",
      team: "Engineering",
      details: "Overseeing all technical operations and engineering teams"
    },
    {
      firstName: "Emily",
      lastName: "Brown",
      email: "emily.brown@example.com",
      role: "VIEWER",
      position: "UX Designer",
      team: "Design",
      details: "Creating user-centered design solutions"
    },
    {
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@example.com",
      role: "GUEST",
      position: "Research Consultant",
      team: "Research",
      details: "Providing external research and analysis"
    },
    {
      firstName: "Sarah",
      lastName: "Martinez",
      email: "sarah.martinez@example.com",
      role: "EDITOR",
      position: "Senior Frontend Developer",
      team: "Engineering",
      details: "Building modern web applications with React and TypeScript"
    },
    {
      firstName: "James",
      lastName: "Anderson",
      email: "james.anderson@example.com",
      role: "ADMIN",
      position: "DevOps Engineer",
      team: "Operations",
      details: "Managing cloud infrastructure and deployment pipelines"
    },
    {
      firstName: "Lisa",
      lastName: "Thompson",
      email: "lisa.thompson@example.com",
      role: "VIEWER",
      position: "Marketing Manager",
      team: "Marketing",
      details: "Developing and executing marketing campaigns"
    },
    {
      firstName: "Robert",
      lastName: "Garcia",
      email: "robert.garcia@example.com",
      role: "ADMIN",
      position: "Security Engineer",
      team: "Security",
      details: "Ensuring application and infrastructure security"
    },
    {
      firstName: "Amanda",
      lastName: "Lee",
      email: "amanda.lee@example.com",
      role: "GUEST",
      position: "Freelance Designer",
      team: "Design",
      details: "Contract work on special design projects"
    },
    {
      firstName: "Christopher",
      lastName: "White",
      email: "christopher.white@example.com",
      role: "EDITOR",
      position: "Backend Developer",
      team: "Engineering",
      details: "Building scalable APIs and microservices"
    },
    {
      firstName: "Jessica",
      lastName: "Harris",
      email: "jessica.harris@example.com",
      role: "VIEWER",
      position: "HR Manager",
      team: "Human Resources",
      details: "Managing recruitment and employee relations"
    },
    {
      firstName: "Daniel",
      lastName: "Clark",
      email: "daniel.clark@example.com",
      role: "GUEST",
      position: "Consultant",
      team: "Engineering",
      details: "Providing technical consulting on architecture decisions"
    },
    {
      firstName: "Michelle",
      lastName: "Rodriguez",
      email: "michelle.rodriguez@example.com",
      role: "ADMIN",
      position: "Financial Controller",
      team: "Finance",
      details: "Overseeing financial operations and reporting"
    },
    {
      firstName: "Matthew",
      lastName: "Lewis",
      email: "matthew.lewis@example.com",
      role: "EDITOR",
      position: "Business Analyst",
      team: "Consulting",
      details: "Analyzing business processes and requirements"
    },
    {
      firstName: "Ashley",
      lastName: "Walker",
      email: "ashley.walker@example.com",
      role: "VIEWER",
      position: "Content Creator",
      team: "Marketing",
      details: "Creating engaging content for social media"
    },
    {
      firstName: "Kevin",
      lastName: "Hall",
      email: "kevin.hall@example.com",
      role: "ADMIN",
      position: "Legal Counsel",
      team: "Legal",
      details: "Providing legal guidance and contract review"
    },
    {
      firstName: "Stephanie",
      lastName: "Allen",
      email: "stephanie.allen@example.com",
      role: "GUEST",
      position: "UX Consultant",
      team: "Design",
      details: "Short-term UX research and testing"
    },
    {
      firstName: "Brian",
      lastName: "Young",
      email: "brian.young@example.com",
      role: "EDITOR",
      position: "iOS Developer",
      team: "Engineering",
      details: "Developing native mobile applications"
    },
    {
      firstName: "Nicole",
      lastName: "King",
      email: "nicole.king@example.com",
      role: "VIEWER",
      position: "Sales Manager",
      team: "Sales",
      details: "Managing sales team and client relationships"
    },
    {
      firstName: "Justin",
      lastName: "Wright",
      email: "justin.wright@example.com",
      role: "ADMIN",
      position: "Investment Manager",
      team: "Finance",
      details: "Managing company investments and financial strategy"
    },
    {
      firstName: "Megan",
      lastName: "Lopez",
      email: "megan.lopez@example.com",
      role: "GUEST",
      position: "Training Specialist",
      team: "Education",
      details: "Conducting employee training programs"
    },
    {
      firstName: "Ryan",
      lastName: "Hill",
      email: "ryan.hill@example.com",
      role: "EDITOR",
      position: "Game Developer",
      team: "Engineering",
      details: "Creating interactive gaming experiences"
    },
    {
      firstName: "Lauren",
      lastName: "Scott",
      email: "lauren.scott@example.com",
      role: "VIEWER",
      position: "Content Writer",
      team: "Media",
      details: "Writing articles and blog posts"
    },
    {
      firstName: "Eric",
      lastName: "Green",
      email: "eric.green@example.com",
      role: "ADMIN",
      position: "Operations Manager",
      team: "Operations",
      details: "Managing day-to-day operational activities"
    },
    {
      firstName: "Rachel",
      lastName: "Adams",
      email: "rachel.adams@example.com",
      role: "GUEST",
      position: "Travel Coordinator",
      team: "Operations",
      details: "Organizing company travel and events"
    },
    {
      firstName: "Tyler",
      lastName: "Baker",
      email: "tyler.baker@example.com",
      role: "EDITOR",
      position: "Solutions Architect",
      team: "Design",
      details: "Designing technical solutions and system architecture"
    },
    {
      firstName: "Samantha",
      lastName: "Nelson",
      email: "samantha.nelson@example.com",
      role: "VIEWER",
      position: "Brand Designer",
      team: "Design",
      details: "Developing brand identity and visual standards"
    },
    {
      firstName: "Brandon",
      lastName: "Carter",
      email: "brandon.carter@example.com",
      role: "GUEST",
      position: "Sales Consultant",
      team: "Sales",
      details: "Providing sales strategy consulting"
    },
    {
      firstName: "Kimberly",
      lastName: "Mitchell",
      email: "kimberly.mitchell@example.com",
      role: "EDITOR",
      position: "Financial Analyst",
      team: "Finance",
      details: "Analyzing financial data and preparing reports"
    },
    {
      firstName: "Gregory",
      lastName: "Perez",
      email: "gregory.perez@example.com",
      role: "ADMIN",
      position: "Chief Engineer",
      team: "Engineering",
      details: "Leading engineering team and technical direction"
    },
    {
      firstName: "Melissa",
      lastName: "Roberts",
      email: "melissa.roberts@example.com",
      role: "VIEWER",
      position: "Research Scientist",
      team: "Research",
      details: "Conducting research and development initiatives"
    }
  ]
});

console.log("Seeding completed! Added 32 users.");
