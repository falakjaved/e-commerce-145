import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (product) {
    await unlink(path.join("public", product.image)).catch(() => {});
    await prisma.product.delete({ where: { id: params.id } });
  }

  return Response.json({ success: true });
}