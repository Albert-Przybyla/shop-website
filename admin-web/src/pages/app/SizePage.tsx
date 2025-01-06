import { fetchSizes } from "@/api/size";
import { Button } from "@/components/ui/button";
import { Card, CardButtons, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDialog } from "@/contexts/DialogContext";
import SizeForm from "@/forms/SizeForm";
import { PaginationData } from "@/types/base.types";
import { SizeResponse } from "@/types/types.response";

import { Edit2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const SizePage = () => {
  const { showDialog } = useDialog();

  const [sizes, setSizes] = useState<SizeResponse[]>([]);
  const [page, setPage] = useState<PaginationData>(new PaginationData());

  useEffect(() => {
    getData();
  }, [page.current_page]);

  const getData = async () => {
    const ans = await fetchSizes(1, 10);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setSizes(ans.items);
    setPage(new PaginationData(ans.current_page, ans.total_items, ans.total_pages));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Rozmiary</CardTitle>
          <CardDescription>Lista dostępnych rozmiarów.</CardDescription>
          <CardButtons>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Dodaj rozmiar",
                  content: SizeForm,
                  data: {},
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <Plus /> Dodaj rozmiar
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {sizes.map((size) => (
              <AccordionItem key={size.id} value={`item-${size.id}`}>
                <AccordionTrigger>{size.label} </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Rozmiar {size.label}</CardTitle>
                      <CardButtons>
                        <Button
                          variant="outline"
                          onClick={async () => {
                            const ans = await showDialog({
                              title: "Edytuj rozmiar",
                              content: SizeForm,
                              elementId: size.id,
                              data: size,
                            });
                            if (ans) {
                              getData();
                            }
                          }}
                        >
                          <Edit2 /> Edytuj rozmiar
                        </Button>
                      </CardButtons>
                    </CardHeader>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default SizePage;
