"use server";
import { OrderArray } from "@/app/admin/(authenticated)/menu/_menu";
import { createAdminClient } from "@/supabase/server";
import { decode } from "base64-arraybuffer";

const supabase = await createAdminClient();

interface MenuItem {
  image: string;
  name: string;
  uploaded_by: string;
}

interface DeleteMenuItem {
  id: number;
  image: string;
}

export const getMenu = async () => {
  const { data } = await supabase
    .from("menu")
    .select("*")
    .order("order", { ascending: true });
  return data;
};

export const updateMenuOrder = async (orderArray: OrderArray[]) => {
  const promises = orderArray.map((item) => {
    return supabase
      .from("menu")
      .update({ order: item.slot })
      .eq("image", item.item);
  });

  await Promise.all(promises);

  return true;
};

export const uploadMenu = async (menu: MenuItem) => {
  const { count } = await supabase
    .from("menu")
    .select("*", { count: "exact", head: true });

  const { error: uploadError } = await supabase.from("menu").insert({
    image: menu.name ?? "",
    uploaded_by: menu.uploaded_by ?? "",
    order: count ? count + 1 : 0,
  });

  if (uploadError) {
    throw new Error("Failed to upload menu");
  }

  const base64 = menu.image.split("base64,")[1];
  if (!base64) {
    throw new Error("Invalid file");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newBase64 = decode(base64);
  const { data, error } = await supabase.storage
    .from("admin")
    .upload(`admin/${menu.name}`, newBase64, {
      contentType: "image/jpeg",
    });
  if (error) {
    throw new Error("Failed to upload image");
  }
  return data;
};

export const deleteMenu = async (data: DeleteMenuItem) => {
  const { error } = await supabase.from("menu").delete().eq("id", data.id);

  if (error) {
    throw new Error("Failed to delete menu");
  }

  const { error: deleteError } = await supabase.storage
    .from("admin")
    .remove([`admin/${data.image}`]);

  if (deleteError) {
    throw new Error("Failed to delete image");
  }

  return { message: "Menu deleted successfully" };
};
