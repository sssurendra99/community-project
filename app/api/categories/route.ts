import { prisma } from "@/lib/prisma";

export default async function POST(request: Request) {

  const data = await request.json();
  console.log(data)
  const category = prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description}});
  console.log(category);
}