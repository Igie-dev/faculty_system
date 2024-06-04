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
import { Trash } from "lucide-react";
import { deleteFileCategoryById } from "@/server/actions/filecategory";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  id: number;
  name: string;
  description: string;
};
export default function DeleteFleCategory({ id, name, description }: Props) {
  const { toast } = useToast();
  const handleDelete = async () => {
    const res = await deleteFileCategoryById(id);
    if (res?.message || res?.error) {
      toast({
        variant: res.error ? "destructive" : "default",
        title: res.message
          ? "Delete file category success!"
          : res.error
          ? "Delete file category failed!"
          : "",
        description: res.message ?? res.error ?? "",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="hover:text-destructive">
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
