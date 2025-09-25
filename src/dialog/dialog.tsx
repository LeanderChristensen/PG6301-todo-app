import React, { type ReactNode, useEffect, useRef } from "react";

export function Dialog({
  isDialogOpen,
  setIsDialogOpen,
  children,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);
  useEffect(() => {
    dialogRef.current?.addEventListener("close", handleDialogClose);
    return () =>
      dialogRef.current?.removeEventListener("close", handleDialogClose);
  }, []);

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return <dialog ref={dialogRef}>{children}</dialog>;
}
