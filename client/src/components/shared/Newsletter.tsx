import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Layers, Loader } from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You have successfully subscribed to our newsletter.",
        variant: "default",
      });
      setEmail("");
    },
    onError: (error) => {
      if (error.message.includes("already subscribed")) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = emailSchema.parse({ email });
      mutation.mutate(validatedData.email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section className="py-12 bg-[#800080] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-rajdhani font-bold text-3xl mb-4">Stay Updated with Bharat Mahotsav</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Subscribe to our newsletter for the latest updates on cultural events, workshops, and performances.
        </p>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
            required
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-3 bg-[#FF9933] text-white rounded-md hover:bg-white hover:text-[#FF9933] transition-colors duration-300 font-medium"
          >
            {mutation.isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe <Layers className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
