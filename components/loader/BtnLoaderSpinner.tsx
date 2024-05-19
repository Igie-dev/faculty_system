import "./loader_style.css";
export enum BtnLoaderClassEnum {
  WHITE_RING = "btn_loading_ring_wrapper_wr",
  BLACK_RING = "btn_loading_ring_wrapper_dr",
}
type Props = {
  classNames: BtnLoaderClassEnum;
};
const BtnsLoaderSpinner = ({ classNames }: Props) => {
  return (
    <div className={`${classNames}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BtnsLoaderSpinner;
