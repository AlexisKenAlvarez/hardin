"use server";
import type { MenuItem } from "@/app/admin/(authenticated)/menu/_menu";
import { createAdminClient } from "@/supabase/server";
import { decode } from "base64-arraybuffer";

const supabase = await createAdminClient();

interface MenuUploadItem {
  image: string;
  name: string;
  uploaded_by: string;
}

interface DeleteMenuItem {
  id: number;
  image: string;
}

export const getHours = async () => {
  const { data } = await supabase.from("open_hours").select("*").single();
  return data;
};

export const uploadHours = async (menu: MenuUploadItem) => {
  const { error: uploadError } = await supabase.from("open_hours").insert({
    image: menu.name ?? "",
    uploaded_by: menu.uploaded_by ?? "",
  });

  if (uploadError) {
    throw new Error("Failed to upload menu");
  }

  await uploadImage(menu.image, menu.name);

  return true;
};

export const deleteHours = async (data: DeleteMenuItem) => {
  const { error } = await supabase
    .from("open_hours")
    .delete()
    .eq("id", data.id);

  if (error) {
    throw new Error("Failed to delete hours");
  }

  const { error: deleteError } = await supabase.storage
    .from("admin")
    .remove([`admin/${data.image}`]);

  if (deleteError) {
    throw new Error("Failed to delete image");
  }

  return { message: "Hours deleted successfully" };
};

export const getMenu = async () => {
  const { data } = await supabase
    .from("menu")
    .select("*")
    .order("order", { ascending: true });
  return data;
};

export const updateMenuOrder = async (orderArray: MenuItem[]) => {
  const promises = orderArray.map((item, index) => {
    return supabase
      .from("menu")
      .update({ order: index + 1 })
      .eq("image", item.image);
  });

  await Promise.all(promises);

  return true;
};

export const uploadImage = async (image: string, name: string) => {
  const base64 = image.split("base64,")[1];
  if (!base64) {
    throw new Error("Invalid file");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newBase64 = decode(base64);
  const { data, error } = await supabase.storage
    .from("admin")
    .upload(`admin/${name}`, newBase64, {
      contentType: "image/jpeg",
    });
  if (error) {
    throw new Error("Failed to upload image");
  }

  return data;
};

export const uploadMenu = async (menu: MenuUploadItem) => {
  const { count } = await supabase
    .from("menu")
    .select("*", { count: "exact", head: true });

  const { error: uploadError } = await supabase.from("menu").insert({
    image: menu.name ?? "",
    uploaded_by: menu.uploaded_by ?? "",
    order: count ? count + 1 : 1,
  });

  if (uploadError) {
    throw new Error("Failed to upload menu");
  }

  await uploadImage(menu.image, menu.name);

  return true;
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

export const getHoursImage = async () => {
  const { data, error } = await supabase.from("open_hours").select("*").single();
  console.log("DATA", data)
  if (error) {
    console.log(error);
    throw new Error("Failed to get hours image");
  }
  const formattedUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}${data?.image}`;
  return formattedUrl;
};
