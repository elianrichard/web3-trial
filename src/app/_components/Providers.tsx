"use client";

import useInitializeWeb3 from "@/hooks/useInitializeWeb3";
import type React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  useInitializeWeb3();
  return children;
}
export default Providers;
