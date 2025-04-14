
import { useState, useRef, useEffect } from "react";
import { SendIcon, BotIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export const ChatbotDrawer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your JobVerse AI assistant. How can I help you today? You can ask about job recommendations, profile optimization, or employer information.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // For now, we'll simulate a response from the AI
      // In a real implementation, this would call your DeepSeek API
      setTimeout(() => {
        const botResponses: Record<string, string> = {
          "job recommendations": "Based on your profile, I recommend exploring positions in software development, particularly roles that involve React and TypeScript, which match your skills.",
          "profile": "Your profile looks good! To improve it further, consider adding more specific achievements in your work experience and highlighting any certifications you have.",
          "interview": "For interview preparation, I suggest researching the company culture, practicing common questions, and preparing examples of your past work that demonstrate your skills.",
          "salary": "The average salary for your target position in this region ranges from $80,000 to $120,000, depending on experience level and company size.",
        };

        // Determine which response to send based on keywords in the user message
        let botResponseText = "I'm not sure how to help with that specific query. You can ask me about job recommendations, profile optimization, interview tips, or salary information.";
        
        for (const [keyword, response] of Object.entries(botResponses)) {
          if (inputValue.toLowerCase().includes(keyword)) {
            botResponseText = response;
            break;
          }
        }

        const botMessage: Message = {
          id: Date.now().toString(),
          content: botResponseText,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Effect to expose the trigger button to be accessible programmatically
  useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.setAttribute('data-open-chatbot', 'true');
    }
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg border-primary/20 bg-background hover:bg-background hover:text-primary"
        >
          <BotIcon className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center gap-2">
            <BotIcon className="h-5 w-5 text-primary" />
            JobVerse AI Assistant
          </DrawerTitle>
          <DrawerDescription>
            Ask me about job recommendations, profile optimization, or employer information
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  {message.sender === "user" ? (
                    <AvatarImage src="/placeholder.svg" alt="User" />
                  ) : (
                    <AvatarImage src="" alt="AI" />
                  )}
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "AI"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                </div>
                <span className="text-xs text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        <DrawerFooter className="border-t pt-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask something..."
              className="resize-none min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              size="icon"
              className="h-10 w-10"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
