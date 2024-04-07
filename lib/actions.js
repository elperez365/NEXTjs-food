"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text.trim() || text.length > 100 || !text;
}

const isInvalidTextArray = (array) => {
  return array.some(isInvalidText);
};

export async function shareMeal(prevState, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (
    isInvalidTextArray([
      meal.creator,
      meal.creator_email,
      meal.title,
      meal.summary,
      meal.instructions,
    ]) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input. Please try again.",
    };
  }
  await saveMeal(meal);
  redirect("/meals");
}
