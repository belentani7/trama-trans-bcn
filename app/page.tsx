import type { Metadata } from "next";
import { TramaSite } from "./TramaSite";

export const metadata: Metadata = {
  title: { absolute: "TRAMA TRANS BCN · Apoyo, memoria y cuidados" },
  description:
    "Directorio público y verificable de apoyo, salud, derechos y cuidados para personas trans y no binarias en Barcelona.",
};

export default function Home() {
  return <TramaSite />;
}
