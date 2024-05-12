import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin",
  description: "Deliverables monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col lg:flex-row lg:max-w-[70rem]">
      {children}
    </main>
  );
}
