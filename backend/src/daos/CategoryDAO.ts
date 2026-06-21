import {Types} from 'mongoose';
import Category, { ISubcategory } from '../models/Category';

export const getCategory = async (_categoryId: Types.ObjectId | undefined) => {
    const category = await Category.findById(_categoryId);
    return category;
};

export const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
};

export const getCategoryByName = async (name: string) => {
    const existingCategory = await Category.findOne({ name: name });
    return existingCategory;
};

export const createCategory = async (name: string, subcategory: ISubcategory[], note: string) => {
    const category = await Category.create({
        name,
        subcategory,
        note,
    });
    return category;
};

export const updateCategory = async (categoryId: Types.ObjectId, name: string, subcategory: ISubcategory[], note: string) => {
    const category = await Category.findByIdAndUpdate(categoryId, {
        name,
        subcategory,
        note,
    });
    return category;
};

export const deleteCategory = async (categoryId: Types.ObjectId) => {
    const category = await Category.findByIdAndDelete(categoryId);
    return category;
};
