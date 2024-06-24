"use client";

import { useState, useEffect } from "react";
import { CoverImageModal } from "@/components/modal/cover-image-modal";


export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <CoverImageModal />
    </>
  );
}
