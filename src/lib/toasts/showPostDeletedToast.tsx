import { useToast } from "@/components/ui/Toast/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function PostDeletedToast() {
  const { toast } = useToast();

  toast({
    title: "Scheduled: Catch up ",
    description: "Friday, February 10, 2023 at 5:57 PM",
    action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
  });
}
