import ComponentError from "@/app/src/components/UI/Error/ComponentError";
import { init } from "@/app/src/features/user";

export default async function Layout(props) {
  const { data, message, status } = await init();

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    if (data.name === props.params.name) {
      return (
        <div className="w-full h-fit flex flex-row gap-4">
          {props.children} {props.tabs}
        </div>
      );
    } else {
      return (
        <div className="flex w-full justify-center">
          You cannot edit a profile that is not yours
        </div>
      );
    }
  }
}
