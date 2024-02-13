import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const CategoryItems = ({
  deleteCategory,
  addToRemove,
  addToRemoveSub,
  items,
  pressed,
}: {
  deleteCategory: (id: number) => void;
  addToRemove: (items: Category[0]) => void;
  addToRemoveSub: (items: Category[0]["sub_categories"][0]) => void;
  items: Category[0];
  pressed: boolean;
}) => {
  const [subOpen, setSubOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<
    Category[0]["sub_categories"]
  >(items.sub_categories);

  useEffect(() => {
    setSubCategories(items.sub_categories);
  }, [items]);

  return (
    <>
      <div className="flex items-center justify-between gap-2 pr-2">
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            deleteCategory(items.id);
            addToRemove(items);
          }}
          className={cn("hidden h-5 w-5 shrink-0 place-content-center rounded-full bg-red-500 p-2 font-bold text-white hover:bg-red-400", {
            "grid": pressed
          })}
        >
          -
        </button>

        <button
          className={cn("flex w-full items-center justify-between", {
            "pointer-events-none": items.sub_categories.length === 0,
          })}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setSubOpen((curr) => !curr);
          }}
        >
          <h1 className="">- {items.name}</h1>
          {items.sub_categories.length > 0 && (
            <ChevronDown
              size={20}
              className={cn(
                "rotate-0 transition-all duration-300 ease-in-out",
                {
                  "-rotate-180": subOpen,
                },
              )}
            />
          )}
        </button>
      </div>

      <div
        className={cn(
          "ml-2 max-h-0 space-y-2 overflow-hidden border-l-2 transition-all duration-500",
          {
            "max-h-96": subOpen,
          },
        )}
      >
        {subCategories.map((sub) => (
          <div key={sub.id} className="mt-2 flex items-center gap-2">
            <div className="h-[2px] w-4 bg-black/10"></div>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                addToRemoveSub(sub);

                setSubCategories((curr) =>
                  curr.filter((item) => item.id !== sub.id),
                );
              }}
              className={cn("hidden h-5 w-5 shrink-0 place-content-center rounded-full bg-red-500 p-2 font-bold text-white hover:bg-red-400", {
                "grid": pressed
              })}
            >
              -
            </button>
            <h1 className="text-sm">{sub.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryItems;
