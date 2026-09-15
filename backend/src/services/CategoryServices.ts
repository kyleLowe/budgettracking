import { Types } from "mongoose";
import * as CategoryDAO from "../daos/CategoryDAO";
import { ISubcategory } from "../models/Category";
import { NotAcceptableError } from "../errors/NotAcceptable";

export const getCategory = async (_categoryId: Types.ObjectId | undefined) => {
  const category = await CategoryDAO.getCategory(_categoryId);
  return category;
};

export const getAllCategories = async () => {
  const categories = await CategoryDAO.getAllCategories();
  return categories;
};

export const getCategoryByName = async (name: string) => {
  const existingCategory = await CategoryDAO.getCategoryByName(name);
  return existingCategory;
};

export const createCategory = async (
  name: string,
  subcategory: ISubcategory[],
  note: string,
) => {
  const checkSubcategory = subcategoryCheck(subcategory);
  if (!checkSubcategory) {
    throw new NotAcceptableError("Invalid subcategory structure");
  }
  const category = await CategoryDAO.createCategory(name, subcategory, note);
  return category;
};

export const updateCategory = async (
  categoryId: Types.ObjectId,
  name: string,
  subcategory: ISubcategory[],
  note: string,
) => {
  const checkSubcategory = subcategoryCheck(subcategory);
  if (!checkSubcategory) {
    throw new NotAcceptableError("Invalid subcategory structure");
  }
  const category = await CategoryDAO.updateCategory(
    categoryId,
    name,
    subcategory,
    note,
  );
  return category;
};

export const deleteCategory = async (categoryId: Types.ObjectId) => {
  const category = await CategoryDAO.deleteCategory(categoryId);
  return category;
};

const subcategoryCheck = (subcategory: ISubcategory[]) => {
  return subcategory.every((subcat) =>
    Boolean(subcat.name && subcat.name.trim()),
  );
};
