"use server";

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function Login(formData) {
  const prisma = new PrismaClient();

  const response = await prisma.user.findFirst({
    where: {
      email: formData.get("email"),
      password: formData.get("password"),
    },
    select: {
      id: true,
      name: true,
      picture: true,
    },
  });

  if (response) {
    const token = jwt.sign({ token: response.id }, "randomKey");
    await prisma.user.update({
      where: {
        id: response.id,
      },
      data: {
        token: token,
      },
    });
    cookies().set("token", token);
    return token;
  } else {
    return null;
  }
}
