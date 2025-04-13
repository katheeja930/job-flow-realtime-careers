
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="flex justify-center py-12">
      <div className="animate-pulse text-center">
        <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
