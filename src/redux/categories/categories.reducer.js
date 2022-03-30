import { CategoriesActionTypes } from "./categories.types";

const INITIAL_STATE = {
  categories: [
    {
      id: "category-1",
      name: "haircut",
      catchPhrase: "lorem ipsum dolor",
    },
    {
      id: "category-2",
      name: "hair coloring",
      catchPhrase: "lorem ipsum dolor",
    },
    {
      id: "category-3",
      name: "massage",
      catchPhrase: "lorem ipsum dolor",
    },
    {
      id: "category-4",
      name: "others",
      catchPhrase: "lorem ipsum dolor",
    },
  ],
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
