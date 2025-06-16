import { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory as apiCreate,
  deleteCategory as apiDelete,
  Category,
} from "../api/CategoryApi";

export const useCategoryList = (filterType?: "task" | "habit" | "both") => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = () => {
    getAllCategories()
      .then((all) => {
        const filtered = filterType
          ? all.filter((c) => c.type === filterType || c.type === "both")
          : all;
        setCategories(filtered);
      })
      .catch((err) => {
        console.error("Couldnt get cats", err);
      });
  };

  const createCategory = (
    name: string,
    type: "task" | "habit" | "both" = "both"
  ) => {
    return apiCreate({ name, type })
      .then((newCat) => {
        setCategories((prev) => [...prev, newCat]);
        return newCat;
      })
      .catch((err) => {
        console.error("Couldnt add cat", err);
      });
  };

  const deleteCategory = (id: string) => {
    apiDelete(id)
      .then(() => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      })
      .catch((err) => {
        console.error("Couldnt delete cat", err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, createCategory, deleteCategory };
};
