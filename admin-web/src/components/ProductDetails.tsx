import { Card, CardButtons, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ProductDetailsResponse } from "@/types/types.response";
import { addProductPhoto, fetchProduct } from "@/api/product";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDialog } from "@/contexts/DialogContext";
import ProductForm from "@/forms/ProductForm";
import { BadgePercent, Edit2 } from "lucide-react";
import ProductDiscountForm from "@/forms/ProductDiscountForm";

type Props = {
  id: string;
};

const ProductDetails = ({ id }: Props) => {
  const { showDialog } = useDialog();
  const [product, setProduct] = useState<ProductDetailsResponse | undefined>();

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const getData = async () => {
    const ans = await fetchProduct(id);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setProduct(ans);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const ans = await addProductPhoto(id, event.target.files[0], event.target.files[0].name, 1);
      console.log(ans);
    }
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Dane produktu</CardTitle>
          <CardButtons>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Edytuj produkt",
                  content: ProductForm,
                  elementId: id,
                  data: product,
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <Edit2 /> Dodaj produkt
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Ustaw zniżke",
                  content: ProductDiscountForm,
                  elementId: id,
                  data: { discount: product?.discount, price: product?.price },
                });
                if (ans) {
                  getData();
                }
              }}
            >
              <BadgePercent /> Ustaw zniżkę
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          <div className="space-y-0.5">
            <small>Nazwa produktu</small>
            {product ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{product.name}</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Opis produktu</small>
            {product ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{product.description}</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Cena produktu</small>
            {product ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{product.price} PLN</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Zniżka [%]</small>
            {product ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{product.discount}%</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Zniżka [PLN]</small>
            {product ? (
              <h2 className="text-xl ps-2 min-w-[130px]">
                {product.price - (product.price * product.discount) / 100} PLN
              </h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Zdjęcia produktu</CardTitle>
          <CardButtons>
            <Input type="file" accept="image/*" multiple={false} max={1} onChange={handleFileChange} />
          </CardButtons>
        </CardHeader>
        <CardContent>
          <div>
            {product?.photos.map((photo) => (
              <img src={photo.url} alt={photo.url} className="w-32 h-32" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
