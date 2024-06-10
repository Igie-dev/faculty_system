import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "@/app/_components/ui/use-toast";
import BtnLoader from "@/app/_components/BtnLoader";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
type Props = {
  id: number;
  year: string;
};
export default function DeleteSchoolYear({ id, year }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = api.schoolyear.delete.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Delete school year success!",
        description: context.message ?? "Delete school year cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Delete school year failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Delete school year failed",
      });
    },
  });
  const handleDelete = async () => {
    mutate(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this school
            year and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Details </span>
          <div className="flex flex-col items-start mt-2 gap-2 text-sm">
            <span className="font-semibold text-lg">Year {" " + year}</span>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            {isPending ? (
              <BtnLoader classNames="px-8" />
            ) : (
              <Button
                size="default"
                disabled={isPending}
                onClick={handleDelete}
              >
                Continue
              </Button>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
