import { ModalProps } from "@/types/base.types";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";

const ConfirmationModal = ({
  onClose,
  data,
}: ModalProps<{
  text?: string;
}>) => {
  return (
    <div className="space-y-5">
      <p>{data?.text}</p>
      <div className="flex flex-row gap-2">
        <Button
          type="reset"
          variant="secondary"
          className="flex-grow justify-center gap-2"
          onClick={() => {
            onClose?.(false);
          }}
        >
          <X width={18} height={18} />
          Anuluj
        </Button>
        <Button type="submit" className="flex-grow justify-center gap-2" onClick={() => onClose?.(true)}>
          <Check width={18} height={18} />
          Potwierdź
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
