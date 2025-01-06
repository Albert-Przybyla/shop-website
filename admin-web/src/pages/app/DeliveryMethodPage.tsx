import { Button } from "@/components/ui/button";
import { Card, CardButtons, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useDialog } from "@/contexts/DialogContext";
import { PaginationData } from "@/types/base.types";
import { DeliveryMethodResponse } from "@/types/types.response";

import { Edit2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DeliveryMethodForm from "@/forms/DeliveryMethodForm";
import { fetchDeliveryMethods } from "@/api/deliveryMethod";
import { Skeleton } from "@/components/ui/skeleton";

const DeliveryMethodPage = () => {
  const { showDialog } = useDialog();

  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethodResponse[]>([]);
  const [page, setPage] = useState<PaginationData>(new PaginationData());

  useEffect(() => {
    getData();
  }, [page.current_page]);

  const getData = async () => {
    const ans = await fetchDeliveryMethods(1, 10);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setDeliveryMethods(ans.items);
    setPage(new PaginationData(ans.current_page, ans.total_items, ans.total_pages));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Metody dostawy</CardTitle>
          <CardDescription>Lista dostępnych metod dostawy.</CardDescription>
          <CardButtons>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Dodaj metode dostawy",
                  content: DeliveryMethodForm,
                  data: {},
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <Plus /> Dodaj metode dostawy
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {deliveryMethods.map((deliveryMethod) => (
              <AccordionItem key={deliveryMethod.id} value={`item-${deliveryMethod.id}`}>
                <AccordionTrigger>{deliveryMethod.name} </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Metoda dostawy</CardTitle>
                      <CardButtons>
                        <Button
                          variant="outline"
                          onClick={async () => {
                            const ans = await showDialog({
                              title: "Edytuj metode dostawy",
                              content: DeliveryMethodForm,
                              elementId: deliveryMethod.id,
                              data: deliveryMethod,
                            });
                            if (ans) {
                              getData();
                            }
                          }}
                        >
                          <Edit2 /> Edytuj metode dostawy
                        </Button>
                      </CardButtons>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-4 flex-wrap">
                      <div className="space-y-0.5">
                        <small>Nazwa metody dostawy</small>
                        {deliveryMethod ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{deliveryMethod.name}</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Cena metody dostawy</small>
                        {deliveryMethod ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{deliveryMethod.price} PLN</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Nazwa dodatkowego pola wymaganego</small>
                        {deliveryMethod ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">
                            {deliveryMethod.additional_info_label || "---"}
                          </h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                    </CardContent>
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

export default DeliveryMethodPage;
