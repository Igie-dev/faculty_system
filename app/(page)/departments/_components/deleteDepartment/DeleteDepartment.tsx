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
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";
type Props = {
  id: number;
  acronym: string;
  name: string;
};
export default function DeleteDepartment({ id, acronym, name }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = api.department.delete.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Delete department success!",
        description: context.message ?? "Delete department cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Delete department failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Delete department failed",
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
            This action cannot be undone. It will permanently delete this
            department and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Details </span>
          <div className="flex flex-col items-start mt-2 gap-2 text-sm">
            <span className="font-semibold text-lg">{acronym}</span>
            <span>{name}</span>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          {isPending ? (
            <BtnLoader classNames="px-7" />
          ) : (
            <Button
              size="default"
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
