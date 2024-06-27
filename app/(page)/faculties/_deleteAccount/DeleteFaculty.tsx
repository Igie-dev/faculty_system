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
import { Trash2 } from "lucide-react";
import { useToast } from "@/app/_components/ui/use-toast";
import { api } from "@/trpc/react";
import BtnLoader from "@/app/_components/BtnLoader";
import { useRouter } from "next/navigation";
type Props = {
  facultyId: string;
  name: string;
  contact: string;
  email: string;
  role: string;
};
export default function DeleteFaculty({
  facultyId,
  name,
  contact,
  email,
  role,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = api.faculty.delete.useMutation({
    onSuccess: (context) => {
      toast({
        variant: "default",
        title: "Delete account success!",
        description: context?.message ?? "Delete account cuccess",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Delete account failed!",
        description:
          error.data?.zodError?.formErrors[0] ??
          error?.message ??
          "Delete account failed",
      });
    },
  });
  const handleDelete = async () => {
    mutate(facultyId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="w-full flex items-center space-x-3 hover:text-destructive justify-start text-muted-foreground"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this
            account and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <span className="text-sm text-muted-foreground">Details</span>
          <div className="flex items-start gap-1 text-sm flex-col">
            <span className="font-semibold">Name</span>
            <span>{name}</span>
          </div>
          <div className="flex items-start gap-1 text-sm flex-col">
            <span className="font-semibold">Email</span>
            <span>{email}</span>
          </div>
          <div className="flex items-start gap-1 text-sm flex-col">
            <span className="font-semibold">Contact Number</span>
            <span>{contact}</span>
          </div>
          <div className="flex items-start gap-1 text-sm flex-col">
            <span className="font-semibold">Role</span>
            <span>{role}</span>
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
