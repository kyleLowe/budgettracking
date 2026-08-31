import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import * as CategoryServices from "../services/CategoryServices";
import { NotAcceptableError } from "../errors/NotAcceptable";
import { Types } from "mongoose";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await CategoryServices.getAllCategories();
    if (!categories) {
      throw new NotFoundError("No categories were found in our system");
    }
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _categoryId = req.params.categoryId as string;
    if (!_categoryId) {
      throw new NotFoundError("Category ID is required");
    }
    const categoryId = new Types.ObjectId(_categoryId);
    const category = await CategoryServices.getCategory(categoryId);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _categoryName = req.params.categoryName as string;
    if (!_categoryName) {
      throw new NotFoundError("Category name is required");
    }
    const category = await CategoryServices.getCategoryByName(_categoryName);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, note, subcategory } = req.body;

    const existingCategory = await CategoryServices.getCategoryByName(name);
    if (existingCategory) {
      throw new ConflictError("A category with the same name already exists");
    }
    const newCategory = await CategoryServices.createCategory(
      name,
      subcategory,
      note,
    );
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryIdString = req.params.categoryId as string;
    const { name, note, subcategory } = req.body;
    if (!categoryIdString) {
      throw new NotAcceptableError("Category ID is required");
    }
    const categoryId = new Types.ObjectId(categoryIdString);
    const checkExistingCategory =
      await CategoryServices.getCategory(categoryId);
    if (!checkExistingCategory) {
      throw new NotFoundError("Category not found");
    }
    await CategoryServices.updateCategory(categoryId, name, subcategory, note);
    const checkUpdatedCategory = await CategoryServices.getCategory(categoryId);
    if (!checkUpdatedCategory) {
      throw new NotFoundError("Failed to update category");
    }
    res.status(200).json(checkUpdatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryIdString = req.params.categoryId as string;
    if (!categoryIdString) {
      throw new NotAcceptableError("Category ID is required");
    }
    const categoryId = new Types.ObjectId(categoryIdString);
    const checkExistingCategory =
      await CategoryServices.getCategory(categoryId);
    if (!checkExistingCategory) {
      throw new NotFoundError("Category not found");
    }
    await CategoryServices.deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
