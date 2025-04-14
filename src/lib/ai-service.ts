
import { useToast } from "@/components/ui/use-toast";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

/**
 * Mock implementation of the DeepSeek API service.
 * In a real implementation, this would call the actual DeepSeek API.
 */
export const generateAIResponse = async (
  messages: ChatMessage[]
): Promise<string> => {
  // This is where you would implement the DeepSeek API call
  // For now, we'll simulate a response based on keywords

  // Get the latest user message
  const latestUserMessage = messages
    .filter((msg) => msg.role === "user")
    .pop()?.content.toLowerCase() || "";

  // Simulate different responses based on content
  if (latestUserMessage.includes("job recommendation")) {
    return "Based on your profile and skills, I recommend exploring Software Developer roles at tech startups. Your experience with React and TypeScript is highly valued in those environments.";
  } else if (latestUserMessage.includes("profile")) {
    return "Your profile looks good! To make it even better, consider adding more quantifiable achievements to your work experience and highlighting any certifications you've earned.";
  } else if (latestUserMessage.includes("interview")) {
    return "For your upcoming interview, research the company thoroughly, practice answering common questions in your field, and prepare examples that showcase your problem-solving abilities.";
  } else if (latestUserMessage.includes("salary")) {
    return "For your experience level and location, the typical salary range for this position is $85,000-$110,000. Remember that this can vary based on company size and additional benefits.";
  } else if (latestUserMessage.includes("skill")) {
    return "Based on current job market trends, adding cloud computing skills (AWS/Azure), knowledge of AI/ML concepts, and experience with containerization would significantly enhance your marketability.";
  } else {
    return "I'm here to help with your job search! You can ask me about job recommendations, profile optimization, interview preparation, salary expectations, or skills to develop.";
  }
};

/**
 * Get AI-powered insights for a given topic related to job seeking
 */
export const getJobSeekerInsights = async (topic: string): Promise<string> => {
  // Simulate insights based on topic
  switch (topic) {
    case "job-match":
      return "Your profile shows strong alignment with front-end development roles. Your React skills are particularly marketable right now.";
    case "skill-gaps":
      return "Consider developing knowledge in cloud services (AWS/Azure) and CI/CD pipelines to increase your competitiveness for senior roles.";
    case "market-trends":
      return "Remote work opportunities in your field have increased by 35% in the last year. Companies are increasingly valuing candidates with full-stack capabilities.";
    case "interview-prep":
      return "For technical interviews in your field, be prepared to demonstrate problem-solving skills with algorithms and data structures questions.";
    default:
      return "I can provide insights on job matches, skill gaps, market trends, and interview preparation. Let me know what you'd like to learn more about!";
  }
};
