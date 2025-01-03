import { Card, CardButtons, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { ProductResponse } from "@/types/types.response";
import { fetchProducts } from "@/api/product";
import { PaginationData } from "@/types/base.types";
import ProductDetails from "@/components/ProductDetails";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDialog } from "@/contexts/DialogContext";
import ProductForm from "@/forms/ProductForm";

const ProductsPage = () => {
  const { showDialog } = useDialog();

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState<PaginationData>(new PaginationData());

  useEffect(() => {
    getData();
  }, [page.current_page]);

  const getData = async () => {
    const ans = await fetchProducts(1, 10);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setProducts(ans.items);
    setPage(new PaginationData(ans.current_page, ans.total_items, ans.total_pages));
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Produkty</CardTitle>
          <CardDescription>Lista dostępnych produków na stronie.</CardDescription>
          <CardButtons>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Dodaj produkt",
                  content: ProductForm,
                  data: {},
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <Plus /> Dodaj produkt
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {products.map((product) => (
              <AccordionItem key={product.id} value={`item-${product.id}`}>
                <AccordionTrigger>{product.name} </AccordionTrigger>
                <AccordionContent>
                  <ProductDetails id={product.id} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
