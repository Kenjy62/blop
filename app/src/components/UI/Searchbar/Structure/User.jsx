import Image from "next/image";

export default function User({ user }) {
  return (
    <div className="w-48 h-44 bg-watermelon-400 rounded-lg">
      <div>
        <Image
          src={user.cover}
          width={192}
          height={176}
          alt={`${user.name} cover`}
          className="rounded-t-lg"
        />
      </div>
      <div className="mt-[-32px] flex justify-center">
        <Image
          src={user.picture}
          height={64}
          width={64}
          alt={`${user.name} avatar`}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
