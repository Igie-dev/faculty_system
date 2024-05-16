import "./loader_style.css";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const BtnsLoaderSpinner = ({ className }: Props) => {
  return (
    <div className={cn(`${className} btn_loading_ring_wrapper`)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BtnsLoaderSpinner;
