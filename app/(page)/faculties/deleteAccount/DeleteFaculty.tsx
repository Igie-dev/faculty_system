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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteFacultyByFacultyId } from "@/server/actions";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const deleteAccount = async () => {
    const res = await deleteFacultyByFacultyId(facultyId);
    if (res?.message || res?.error) {
      toast({
        variant: res.error ? "destructive" : "default",
        title: res.message
          ? "Delete account success!"
          : res.error
          ? "Delete account failed!"
          : "",
        description: res.message ?? res.error ?? "",
      });
    }
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
            This action cannot be undone. It will permanently delete the account
            and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Details</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Name: </span>
            <span>{name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Email: </span>
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Contact Number: </span>
            <span>{contact}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Role: </span>
            <span>{role}</span>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteAccount}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
