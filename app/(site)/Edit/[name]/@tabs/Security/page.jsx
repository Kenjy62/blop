import Button from "@/app/src/components/UI/Button/Button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <span>Votre Email : </span>
      <span>Votre mot de passe : </span>
      <span>Votre clé de récupération : </span>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Link href="#" className="text-watermelon-400">
          Télécharger toutes mes données
        </Link>
        <Link href="#" className="text-red-400">
          Supprimer mon compte
        </Link>
      </div>
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </div>
  );
}
