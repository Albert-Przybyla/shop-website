import { orderStatus } from "@/api/order";
import VeryficationForm from "@/forms/VeryficationForm";

interface Props {
  params: {
    order_id: string;
  };
}

const Page = async ({ params }: Props) => {
  const status = await orderStatus(params.order_id!);
  return (
    <div className="container mx-auto flex justify-center items-center py-[100px]">
      {status.status === "unverified" ? (
        <VeryficationForm order_id={params.order_id} />
      ) : (
        <div className="border px-6 py-4 text-center">
          <h1 className="text-3xl">Zamówienie zweryfikowane!</h1>
          <div className="mt-4 text-center">
            <p>Aby dokończyć transakcję, prosimy o dokonanie płatności.</p>
            <p>o tytule: {params.order_id}</p>
            <p>na numer konta: 1234 1234 1234 1234</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
