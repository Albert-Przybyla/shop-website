import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { UserProvider } from "./contexts/UserContext";
import { Toaster } from "./components/ui/toaster";
import { DialogProvider } from "./contexts/DialogContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <DialogProvider>
        <RouterProvider router={router} />
      </DialogProvider>
    </UserProvider>
    <Toaster />
  </StrictMode>
);
