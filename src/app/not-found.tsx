import { CiWarning } from "react-icons/ci";
import BaseButton from "@/components/Button";
import Link from "next/link";
import { Routes } from "@/utils/routes";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <CiWarning className="w-20 h-20" />
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600">
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </p>
      <Link href={Routes.Home}>
        <BaseButton fullWidth={false} mode="secondary" extraClasses="px-4 mt-2">
          Home
        </BaseButton>
      </Link>
    </div>
  );
}
