import { Button } from "@/app/_components/ui/button";
import { LoaderCircle } from "lucide-react";

type Props = {
  classNames?: string;
};
export default function ButtonLoading({ classNames }: Props) {
  return (
    <Button disabled variant="secondary" className={`${classNames}`}>
      <LoaderCircle size={20} className="animate-spin text-primary" />
    </Button>
  );
}
