import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModalProps } from "@/types/base.types";

interface DialogOptions<T> {
  title: string;
  data?: unknown;
  elementId?: string;
  description?: string;
  content: ({ onClose, data, elementId }: ModalProps<T>) => React.ReactNode;
}

interface DialogContextType {
  showDialog: (options: DialogOptions<any>) => Promise<unknown>;
  closeDialog: (result?: unknown) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions<any> | null>(null);
  const [resolvePromise, setResolvePromise] = useState<((value?: unknown) => void) | null>(null);

  const showDialog = (options: DialogOptions<any>) => {
    setDialogOptions(options);
    setIsOpen(true);

    return new Promise<unknown>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const closeDialog = (result?: unknown) => {
    setIsOpen(false);
    setDialogOptions(null);
    if (resolvePromise) {
      resolvePromise(result);
      setResolvePromise(null);
    }
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="h-screen md:h-auto">
          <DialogHeader>
            <DialogTitle>{dialogOptions?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{dialogOptions?.description}</DialogDescription>
          <div>
            {dialogOptions && (
              <dialogOptions.content
                onClose={closeDialog}
                data={dialogOptions.data}
                elementId={dialogOptions.elementId}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
