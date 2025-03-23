import { getMenu } from "@/apis/admin";

import type { Metadata } from "next";
import Menu from "./_menu";

export const metadata: Metadata = {
  title: "Menu",
};

export interface MenuData {
  created_at: string;
  id: number;
  image: string;
  order: number;
  uploaded_by: string;
}

const page = async () => {
  const data = await getMenu();

  return <Menu data={data} />;
};

export default page;
