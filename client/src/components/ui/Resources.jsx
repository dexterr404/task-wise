import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is TaskWise?",
    answer:
      "TaskWise is a smart task management app for individuals and teams. It uses AI-powered insights to suggest next steps, focus strategies, and time-saving shortcuts.",
  },
  {
    question: "Is TaskWise free?",
    answer:
      "Yes! TaskWise offers a Free plan with basic task management, limited projects, and AI insights. You can upgrade anytime for more features.",
  },
  {
    question: "How do I invite teammates?",
    answer:
      "Go to your team section, click on the share icon, and invite teammates via email or link. They can then collaborate in real-time.",
  },
  {
    question: "Does TaskWise work on mobile?",
    answer:
      "Yes. TaskWise is fully responsive on all devices, and we are developing native iOS and Android apps.",
  },
];

export function Resources() {
  return (
    <section className="relative snap-start py-20  min-h-screen bg-gray-50 text-black flex flex-col gap-12">
      <div className="absolute top-32 left-32 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 right-40 w-[28rem] h-[28rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-pulse"></div>
      <div className="absolute top-1 right-5 w-[17rem] h-[17rem] bg-indigo-200 rounded-full mix-blend-multiply filter blur-md opacity-30 animate-pulse"></div>
      <Typography variant="h4" className="font-bold text-center">
        Resources
      </Typography>

      {/* Video */}
      <div className="w-full max-w-sm aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/i8CfrJiq6P0?si=5ehtOOlQFD4hDMom"
          title="TaskWise Introduction Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex flex-col items-start">
        <h2>FAQ Questions</h2>
        {/* FAQ Accordion */}
      <Container maxWidth="sm">
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "black",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "purple" }} />}
            >
              <Typography className="font-semibold">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
      </div>
    </section>
  );
}

export default Resources;
