const tasks = [
  {
    title: "Schedule an appointment",
    description: "Appointment",
    deadline: "2025-10-21",
    status: "Ongoing",
    priority: "High",
    subtasks: [
      { title: "Book a trip to their place", status: "Done" },
      { title: "Pay the downpayment", status: "Ongoing" }
    ]
  },
  {
    title: "Plan a birthday party",
    description: "Birthday for a friend",
    deadline: "2025-08-30",
    status: "Unfinished",
    priority: "Medium",
    subtasks: [
      { title: "Book a venue", status: "Ongoing" },
      { title: "Order cake and decorations", status: "Pending" },
      { title: "Send invitations", status: "Done" }
    ]
  },
  {
    title: "Work project",
    description: "Prepare presentation for client",
    deadline: "2025-09-15",
    status: "Ongoing",
    priority: "High",
    subtasks: [
      { title: "Create slides", status: "Ongoing" },
      { title: "Collect data from team", status: "Pending" },
      { title: "Finalize report", status: "Pending" }
    ]
  },
  {
    title: "Fitness goal",
    description: "Prepare for half marathon",
    deadline: "2025-12-01",
    status: "Done",
    priority: "Medium",
    subtasks: [
      { title: "Weekly long runs", status: "Ongoing" },
      { title: "Strength training", status: "Ongoing" },
      { title: "Buy proper running shoes", status: "Done" }
    ]
  },
  {
    title: "Home improvement",
    description: "Renovate the kitchen",
    deadline: "2026-01-10",
    status: "Pending",
    priority: "Low",
    subtasks: [
      { title: "Hire contractor", status: "Pending" },
      { title: "Choose design and materials", status: "Ongoing" },
      { title: "Buy appliances", status: "Pending" }
    ]
  }
];

export default tasks;
