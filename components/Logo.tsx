import Link from "next/link";
export default function Logo() {
  return (
    <Link
      href="/"
      className="px-4 py-1  font-semibold text-lg border rounded-md bg-primary-foreground"
    >
      Faculty
    </Link>
  );
}
