import { Suspense } from "react";
import EditareRetetaClient from "./EditareRetetaClient";

type PageProps = {
  searchParams: { id?: string };
};

export default function Page({ searchParams }: PageProps) {
  const iD = searchParams.id ?? "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditareRetetaClient id={iD} />
    </Suspense>
  );
}
