import { Suspense } from "react";
import EditareRetetaClient from "./EditareRetetaClient";

type PageProps = {
  searchParams: { id?: string };
};

export default async function Page({ searchParams }: PageProps) {
  const { id } = await searchParams;
  const safeId = id || "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditareRetetaClient id={safeId} />
    </Suspense>
  );
}
