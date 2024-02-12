import { Category } from "@/lib/types";

const AddSubCategoryForm = ({category, close}: {category: Category, close: () => void}) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Edit Sub Category</h1>
    </>
  );
};

export default AddSubCategoryForm;
