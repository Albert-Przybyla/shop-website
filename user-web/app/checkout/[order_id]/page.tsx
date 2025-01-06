import { orderStatus } from "@/api/order";
import VeryficationForm from "@/forms/VeryficationForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    order_id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { order_id } = await params;
  let status: {
    status: string;
  };
  try {
    status = await orderStatus(order_id);
  } catch {
    return notFound();
  }
  return (
    <div className="container mx-auto flex justify-center items-center py-[100px]">
      {status.status === "unverified" ? (
        <VeryficationForm order_id={order_id} />
      ) : (
        <div className="border px-6 py-4 text-center">
          <h1 className="text-3xl">Zamówienie zweryfikowane!</h1>
          <div className="mt-4 text-center">
            <p>Aby dokończyć transakcję, prosimy o dokonanie płatności.</p>
            <p>o tytule: {order_id}</p>
            <p>na numer konta: 1234 1234 1234 1234</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
