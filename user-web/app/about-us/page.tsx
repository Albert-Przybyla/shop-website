import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto my-[100px] flex flex-col lg:flex-row gap-6">
      <div className="space-y-6 px-3">
        <h1 className="text-3xl font-bold px-3 ">Cześć,</h1>
        <p>
          nazywam się Martyna i jestem założycielką marki, która powstała z miłości do klasycznych czapek beanie oraz
          surferskich grafik i nadruków. W naszej estetyce łączymy ducha vintage z wyjątkowym stylem inspirowanym
          oceanem i wolnością. Moją misją jest tworzenie ubrań, które będą nie tylko przystępne cenowo, ale przede
          wszystkim sprawią radość i pozwolą wyrazić Waszą osobowość.
        </p>
        <p>
          Nasze projekty to połączenie pasji, autentyczności i dbałości o szczegóły – wszystko po to, byście mogli
          cieszyć się wyjątkowymi ubraniami, które mają duszę. To dopiero początek naszej przygody, a w przyszłości
          planujemy rozwijać kolekcję o jeszcze więcej unikatowych i ponadczasowych propozycji.
        </p>
        <p>
          Razem z Wami chcemy tworzyć modę, która jest bliska ludziom – stylową, ale bez zbędnego przepychu. Dziękujemy,
          że jesteście częścią tej podróży!
        </p>
      </div>
      <div className="p-2 rotate-3 border max-w-[90vw] mx-auto my-6 min-w-[20%]">
        <Image src="/images/me.jpg" alt="Blue Elephant" className="p-2 -rotate-6" width={400} height={400} />
      </div>
    </div>
  );
};

export default Page;
