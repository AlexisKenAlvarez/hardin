import { Category } from "@/lib/types";

const AddProductForm = ({category, close}: {category: Category, close: () => void}) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Add new product</h1>
    </>
  );
};

export default AddProductForm;
