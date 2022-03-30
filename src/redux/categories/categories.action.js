import { CategoriesActionTypes } from "./categories.types";

export const setCategories = (category) => ({
  type: CategoriesActionTypes.SET_CATEGORIES,
  payload: category,
});
