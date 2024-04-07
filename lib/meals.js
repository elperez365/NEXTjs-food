import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const meals = db.prepare("SELECT * FROM meals").all();
  //   throw new Error("This is an error");
  return meals;
}

export function getMeal(slug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  return meal;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals 
    (title, summary, instructions, creator, creator_email,   image, slug) 
    VALUES 
    (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal);
}
