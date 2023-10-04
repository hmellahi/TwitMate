import { useRouter } from "next/navigation";

const useRedirect = () => {
  const router = useRouter();

  const redirectToThread = (threadId: string) => {
    router.push(`/thread/${threadId}`);
  };

  const redirectToProfile = (event, userId: string) => {
    event.preventDefault()
    event.stopPropagation();

    router.push(`/profile/${userId}`);
  };

  return { redirectToThread, redirectToProfile };
};

export default useRedirect;
