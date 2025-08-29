const tasks = [
  {
    title: "Prepare for job interview",
    description: "Technical interview for frontend developer role",
    deadline: "2025-09-05",
    status: "Ongoing",
    priority: "High",
    subtasks: [
      { title: "Review React concepts", status: "Ongoing" },
      { title: "Update portfolio", status: "Done" }
    ]
  },
  {
    title: "Travel itinerary",
    description: "Plan 3-day trip to Cebu",
    deadline: "2025-10-12",
    status: "Ongoing",
    priority: "Medium",
    subtasks: [
      { title: "Book flights", status: "Done" }
    ]
  },
  {
    title: "Grocery shopping",
    description: "Weekly household supplies",
    deadline: "2025-08-25",
    status: "Unfinished",
    priority: "Low",
    subtasks: [
      { title: "Buy vegetables", status: "Done" },
      { title: "Restock snacks", status: "Ongoing" }
    ]
  },
  {
    title: "Team presentation",
    description: "Quarterly sales report",
    deadline: "2025-09-18",
    status: "Ongoing",
    priority: "High",
    subtasks: [
      { title: "Compile sales data", status: "Done" },
      { title: "Design slide deck", status: "Ongoing" }
    ]
  },
  {
    title: "Learn a new skill",
    description: "Start online course on UI/UX design",
    deadline: "2025-11-20",
    status: "Ongoing",
    priority: "Medium",
    subtasks: [
      { title: "Sign up for course", status: "Done" }
    ]
  },

  // 🔥 New tasks
  {
    title: "Morning workout",
    description: "Daily fitness routine - cardio & weights",
    deadline: "2025-08-21",
    status: "Done",
    priority: "Low",
    subtasks: [
      { title: "Stretching", status: "Done" },
      { title: "Cardio (20 mins)", status: "Done" },
      { title: "Weights", status: "Done" }
    ]
  },
  {
    title: "Read a book",
    description: "Finish 'Clean Code' by Robert C. Martin",
    deadline: "2025-09-30",
    status: "Ongoing",
    priority: "Medium",
    subtasks: [
      { title: "Read Chapters 1–3", status: "Done" },
      { title: "Read Chapters 4–6", status: "Ongoing" }
    ]
  },
  {
    title: "Personal website",
    description: "Build and deploy personal portfolio",
    deadline: "2025-10-15",
    status: "Ongoing",
    priority: "High",
    subtasks: [
      { title: "Setup project with Vite + React", status: "Done" },
      { title: "Deploy to Netlify", status: "Ongoing" }
    ]
  }
];

export default tasks;
