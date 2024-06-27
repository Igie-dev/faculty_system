"use client";
import React from "react";
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import { Archive } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";
export default function ArchiveAnnouncementBtn({
  announcementId,
  isSavedArchive,
}: {
  isSavedArchive: boolean;
  announcementId: string;
}) {
  const { toast } = useToast();
  const session = useSession();
  const userId = session?.data?.user?.faculty_id as string;
  const router = useRouter();
  const { mutate: mutateAdd, isPending } =
    api.archiveAnnouncement.addArchive.useMutation({
      onSuccess: (context) => {
        toast({
          variant: "default",
          title: "Save archive",
          description: context?.message ?? "Archive saved!",
        });
        router.refresh();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Save archive",
          description:
            error.data?.zodError?.formErrors[0] ??
            error?.message ??
            "Save archive failed",
        });
      },
    });

  const { mutate: mutateRemove, isPending: isPendingRemove } =
    api.archiveAnnouncement.removeArchive.useMutation({
      onSuccess: (context) => {
        toast({
          variant: "default",
          title: "Remove archive",
          description: context?.message ?? "Archive removed!",
        });
        router.refresh();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Remove Archive",
          description:
            error.data?.zodError?.formErrors[0] ??
            error?.message ??
            "Remove archive failed",
        });
      },
    });

  const handleAdd = async () => {
    mutateAdd({
      announcementId,
      facultyId: userId,
    });
  };

  const handleRemove = async () => {
    mutateRemove({
      announcementId,
      facultyId: userId,
    });
  };

  return isSavedArchive ? (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleRemove}
      className="w-full justify-start font-normal h-7 px-1 text-muted-foreground"
    >
      <Archive absoluteStrokeWidth size={20} className="mr-3 h-4 w-4" />
      <span>{isPendingRemove ? "Removing..." : "Remove Archive"}</span>
    </Button>
  ) : (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleAdd}
      className="w-full justify-start font-normal h-7 px-1 text-muted-foreground"
    >
      <Archive absoluteStrokeWidth size={20} className="mr-3 h-4 w-4" />
      <span>{isPending ? "Saving..." : "Add Archive"}</span>
    </Button>
  );
}
