// Components
import Color from "./Color";

// Config
import { colorScheme } from "@/app/src/config/config";

export default function ColorSelector() {
  const colors = colorScheme;

  return (
    <div className="flex flex-row gap-4">
      <div className="w-full items-center flex flex-row gap-2 justify-between">
        <div>Primary Color Selector</div>
        <div className="flex flex-row gap-2">
          {colors.map((color) => (
            <Color
              key={color.name}
              name={color.name}
              hex={color.hex}
              selected={color.selected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
