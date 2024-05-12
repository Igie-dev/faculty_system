import SigninForm from "./components/SigninForm";

export default function page() {
  return (
    <div className="w-full h-fit lg:max-w-[70rem] rounded-md border flex lg:h-[80%] flex-col lg:flex-row">
      <div className="w-full h-fit lg:w-1/2 lg:h-full lg:border-r">design</div>
      <SigninForm />
    </div>
  );
}
