import React from "react";
import {
  AlertDialog,
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
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
type Props = {
  id: number;
  name: string;
  description: string;
};
export default function DeleteFleCategory({ id, name, description }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = api.fileCategory.delete.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Delete file category success!",
        description: context?.message ?? "Delete file category cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Delete file category failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Delete file category failed",
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
            category and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Details </span>
          <div className="flex flex-col items-start mt-2 gap-2 text-sm">
            <span className="font-semibold text-lg">{name}</span>
            <span>{description}</span>
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
