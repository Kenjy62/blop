// Components
import Title from "../../Title/Title";

export default function TopHashtags() {
  return (
    <div className="flex flex-col gap-3">
      <Title>Top Hashtags</Title>
      <div className="border rounded-lg p-4 flex flex-row flex-wrap gap-2">
        <span className="cursor-pointer">#Test</span>
        <span className="cursor-pointer">#Test</span>
        <span className="cursor-pointer">#Test</span>
        <span className="cursor-pointer">#Test</span>
        <span className="cursor-pointer">#Test</span>
        <span className="cursor-pointer">#Test</span>
      </div>
    </div>
  );
}
