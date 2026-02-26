import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(products);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const file = formData.get("image") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });

  const filePath = `/uploads/${Date.now()}-${file.name}`;
  await writeFile(path.join("public", filePath), buffer);

  const product = await prisma.product.create({
    data: { name, price, image: filePath },
  });

  return Response.json(product);
}