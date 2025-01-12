import { fetchCodes, toggleActiveCode } from "@/api/code";
import { useDialog } from "@/contexts/DialogContext";
import { PaginationData } from "@/types/base.types";
import { CodeResponse } from "@/types/types.response";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardButtons, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CodeForm from "@/forms/CodeForm";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Switch } from "@/components/ui/switch";
import ConfirmationModal from "@/components/ConfirmationModal";

const CodesPage = () => {
  const { showDialog } = useDialog();

  const [codes, setCodes] = useState<CodeResponse[]>([]);
  const [page, setPage] = useState<PaginationData>(new PaginationData());

  useEffect(() => {
    getData();
  }, [page.current_page]);

  const getData = async () => {
    const ans = await fetchCodes(1, 10);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setCodes(ans.items);
    setPage(new PaginationData(ans.current_page, ans.total_items, ans.total_pages));
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Kody promocyjne</CardTitle>
          <CardDescription>Lista dostępnych kodów promocyjnych.</CardDescription>
          <CardButtons>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Dodaj kod promocyjny",
                  content: CodeForm,
                  data: {},
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <Plus /> Dodaj kod promocyjny
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {codes.map((code) => (
              <AccordionItem key={code.code} value={`item-${code.code}`}>
                <AccordionTrigger>{code.code} </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Kod promocyjny</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-4 flex-wrap">
                      <div className="space-y-0.5">
                        <small>Kod</small>
                        {code ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{code.code}</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Wartość</small>
                        {code ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{code.value}</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Maksymalna ilość użyc</small>
                        {code ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{code.max_uses ? code.max_uses : "---"}</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Ilośc użyc</small>
                        {code ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{code.uses}</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Data wygasniecia</small>
                        {code ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">
                            {code.expiration ? format(code.expiration, "dd MMM yyyy", { locale: pl }) : "---"}
                          </h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Aktywny</small>
                        <div className="pt-1">
                          <Switch
                            checked={code?.is_active}
                            onCheckedChange={async () => {
                              const ans = await showDialog({
                                title: "Potwierdź Operację",
                                content: ConfirmationModal,
                                data: {
                                  text: `Czy na pewno chcesz ${
                                    code?.is_active ? "deaktywowac" : "aktywowac"
                                  } kod promocyjny?`,
                                },
                              });
                              if (ans) {
                                await toggleActiveCode(code.code);
                                getData();
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <small>Opis</small>
                        {code ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{code.description ? code.description : "---"}</h2>
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

export default CodesPage;
