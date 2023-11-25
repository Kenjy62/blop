// Required
import { PrismaClient } from "@prisma/client";

// Config
import { config } from "../../config/config";
import { fetch } from "../../config/text";

export async function GetLastUsers() {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.user.findMany({
      orderBy: { id: "asc" },
      skip: 0,
      take: parseInt(config.lastusers.limit),
    });

    return {
      data: result,
      message: fetch.sidebar.lastusers.success.message,
      status: fetch.sidebar.lastusers.success.status,
    };
  } catch (error) {
    console.error(error);
    return {
      message: fetch.sidebar.lastusers.error.message,
      status: fetch.sidebar.lastusers.error.status,
    };
  } finally {
    await prisma.$disconnect();
  }
}
