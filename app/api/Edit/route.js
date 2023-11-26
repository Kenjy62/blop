import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { UpdateAvatar, UpdateCover, init } from "@/app/src/features/user";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  const type = data.get("type");
  const me = await init();

  if (!file) {
    return NextResponse.json("error", { status: 400 });
  }

  if (type === "avatar") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(`public/Avatars/${me.data.name}_${file.name}`, buffer);

    const response = await UpdateAvatar(
      `/Avatars/${me.data.name}_${file.name}`
    );

    if (response === true) {
      return NextResponse.json("Avatar update successfully!", { status: 200 });
    } else {
      return NextResponse.json("An error occurred, try again", { status: 500 });
    }
  } else if (type === "cover") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(`public/Covers/${me.data.name}_${file.name}`, buffer);

    const response = await UpdateCover(`/Covers/${me.data.name}_${file.name}`);

    if (response === true) {
      return NextResponse.json("Cover update successfully", { status: 200 });
    } else {
      return NextResponse.json("An error occurred, try again", { status: 500 });
    }
  }
}
