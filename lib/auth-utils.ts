import { redirect } from "next/navigation";

export const checkUserAuth = (userId: string | null) => {
  if (!userId) {
    redirect("/sign-in");
  }
};
