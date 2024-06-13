import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { useToast } from "@/app/_components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Props = {
  faculty_id: string;
  facultyCurrentDepartments: TFacultyDepartment[];
};
export default function UpdateDepartments({
  faculty_id,
  facultyCurrentDepartments,
}: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [toSaveFacultyDepartments, setToSaveFacultyDepartments] = useState<
    TCreateFacultyDep[]
  >([]);
  const { data } = api.department.getAll.useQuery();
  const departments = data?.data as TDepartmentData[];
  const utl = api.useUtils();
  const { mutate, isPending } =
    api.faculty.updateFacultyDepartments.useMutation({
      onSuccess: (context) => {
        toast({
          variant: "default",
          title: "Update department success!",
          description: context.message ?? "Update department cuccess",
        });
        utl.department.getFacultyDepartments.refetch(faculty_id);
        setOpen(false);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Update department failed!",
          description:
            error.data?.zodError?.formErrors[0] ??
            error?.message ??
            "Update department failed",
        });
      },
    });

  useEffect(() => {
    if (facultyCurrentDepartments?.length >= 1) {
      setToSaveFacultyDepartments(
        facultyCurrentDepartments.map((dep) => {
          return {
            dep_id: dep.dep_id,
            faculty_id: faculty_id,
          };
        })
      );
    }
  }, [facultyCurrentDepartments, faculty_id]);

  const handleSave = async () => {
    if (toSaveFacultyDepartments.length <= 0) return;
    mutate({ faculty_id, departments: toSaveFacultyDepartments });
  };

  const handleCleck = (id: string, checked: boolean) => {
    if (checked) {
      setToSaveFacultyDepartments((prev) => [
        ...prev,
        { dep_id: id, faculty_id: faculty_id },
      ]);
    } else {
      setToSaveFacultyDepartments((prev) => {
        return prev.filter((dep) => dep.dep_id !== id);
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      if (departments?.length >= 1) {
        setToSaveFacultyDepartments(
          departments?.map((dep) => {
            return {
              dep_id: dep.dep_id,
              faculty_id: faculty_id,
            };
          })
        );
      }
    } else {
      setToSaveFacultyDepartments([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Update departments
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-full min-h-[10rem] md:!min-w-[90%] lg:!min-w-[50rem]">
        <DialogHeader>
          <DialogTitle>Update departments</DialogTitle>
          <DialogDescription>
            Update faculty departments. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center h-fit px-3 mt-5 w-fit rounded  text-sm border py-2 bg-secondary gap-4">
          <Checkbox
            checked={toSaveFacultyDepartments.length === departments?.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="font-semibold">Select all</span>
        </div>
        <div className="flex w-full max-h-[30rem] overflow-y-auto ">
          <ul className="w-full flex flex-col h-fit">
            {departments?.length >= 1 ? (
              departments?.map((dep) => {
                return (
                  <li
                    key={dep.id}
                    className="flex  items-center space-x-4 w-full h-fit min-h-11   px-3 text-sm"
                  >
                    <Checkbox
                      checked={
                        toSaveFacultyDepartments.filter(
                          (fdep) => fdep.dep_id === dep.dep_id
                        )[0]?.dep_id === dep.dep_id
                      }
                      onCheckedChange={(e) =>
                        handleCleck(dep.dep_id, e as boolean)
                      }
                    />
                    <span className="font-semibold">{dep.acronym}</span>
                    <span className="text-muted-foreground !ml-5">
                      {dep.name}
                    </span>
                  </li>
                );
              })
            ) : (
              <span className="text-sm text-muted-foreground">
                No departments found!
              </span>
            )}
          </ul>
        </div>
        <DialogFooter>
          <Button
            type="button"
            disabled={toSaveFacultyDepartments.length <= 0 || isPending}
            onClick={handleSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
