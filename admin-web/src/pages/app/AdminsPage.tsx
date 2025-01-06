import { fetchADmins } from "@/api/admin";
import { useDialog } from "@/contexts/DialogContext";
import { AdminResponse } from "@/types/types.response";
import { Card, CardButtons, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminForm from "@/forms/AdminForm";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminsPage = () => {
  const { showDialog } = useDialog();

  const [admins, setAdmins] = useState<AdminResponse[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await fetchADmins();
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setAdmins(ans);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Administratorzy</CardTitle>
          <CardDescription>Lista dostępnych administratorów.</CardDescription>
          <CardButtons>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Dodaj administratora",
                  content: AdminForm,
                  data: {},
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <Plus /> Dodaj administratora
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {admins.map((admin) => (
              <AccordionItem key={admin.id} value={`item-${admin.id}`}>
                <AccordionTrigger>
                  {admin.first_name} {admin.last_name}{" "}
                </AccordionTrigger>
                <AccordionContent>
                  <Card>
                    <CardHeader>
                      <CardTitle>Administrator</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-4 flex-wrap">
                      <div className="space-y-0.5">
                        <small>Imie i nazwisko</small>
                        {admin ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{admin.first_name + " " + admin.last_name}</h2>
                        ) : (
                          <Skeleton className="h-8 w-[130px]" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <small>Adres email</small>
                        {admin ? (
                          <h2 className="text-xl ps-2 min-w-[130px]">{admin.email}</h2>
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

export default AdminsPage;
