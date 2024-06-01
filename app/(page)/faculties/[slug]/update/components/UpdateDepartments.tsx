import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getDepartments } from "@/actions/departments";
import { Checkbox } from "@/components/ui/checkbox";
import { updateFacultyDepartments } from "@/actions/faculties";
import { useToast } from "@/components/ui/use-toast";
import { InferSelectModel } from "drizzle-orm";
import { department } from "@/db/schema";
type Props = {
  faculty_id: string;
  facultyDepartments: TFacultyDepartment[];
};
export default function UpdateDepartments({
  faculty_id,
  facultyDepartments,
}: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [departments, setDepartments] = useState<TDepartmentData[]>([]);
  const [toSaveFacultyDepartments, setToSaveFacultyDepartments] = useState<
    TCreateFacultyDep[]
  >(
    facultyDepartments.map((dep: TFacultyDepartment) => {
      const department = dep.department;
      return {
        dep_id: dep.dep_id,
        faculty_id: faculty_id,
      };
    })
  );

  useEffect(() => {
    if (open && departments?.length <= 0) {
      (async () => {
        const res = await getDepartments();
        if (res?.data) {
          setDepartments(res.data);
        }
      })();
    }
  }, [open, departments]);

  const handleSave = async () => {
    if (toSaveFacultyDepartments.length === facultyDepartments.length) return;
    const res = await updateFacultyDepartments(
      faculty_id,
      toSaveFacultyDepartments
    );

    if (res.message || res.error) {
      toast({
        variant: res.error ? "destructive" : "default",
        title: res.message
          ? "Create account success!"
          : res.error
          ? "Create account failed!"
          : "",
        description: res.message ?? res.error ?? "",
      });
    }
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
      if (departments.length >= 1) {
        setToSaveFacultyDepartments(
          departments.map((dep) => {
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
      <DialogContent className="min-w-full md:!min-w-[90%] lg:!min-w-[50rem]">
        <DialogHeader>
          <DialogTitle>Update departments</DialogTitle>
          <DialogDescription>
            Update faculty departments. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center h-fit px-3 mt-5 w-fit rounded  text-sm border py-2 bg-secondary gap-4">
          <Checkbox
            checked={toSaveFacultyDepartments.length === departments.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="font-semibold">Select all</span>
        </div>
        <div className="flex w-full max-h-[30rem] overflow-y-auto ">
          <ul className="w-full flex flex-col h-fit">
            {departments.length >= 1 ? (
              departments.map((dep) => {
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
                      {dep.department}
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
            disabled={
              toSaveFacultyDepartments.length === facultyDepartments.length
            }
            onClick={handleSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
