// Components
import Item from "./Item";

export default function Container({ colorScheme, data, type }) {
  console.log(data);

  var color;

  if (colorScheme === "Watermelon") {
    color = `w-52 h-52 dark:bg-night-300 bg-white border border-watermelon-300 dark:border-watermelon-300 rounded-tr-none rounded-lg overflow-y-scroll py-2`;
  } else if (colorScheme === "harlequin") {
    color = `w-52 h-52 dark:bg-night-300 bg-white border border-harlequin-300 dark:border-harlequin-300 rounded-tr-none rounded-lg overflow-y-scroll py-2`;
  } else if (colorScheme === "royal-blue") {
    color = `w-52 h-52 dark:bg-night-300 bg-white border border-royal-blue-300 dark:border-royal-blue-300 rounded-tr-none rounded-lg overflow-y-scroll py-2`;
  } else if (colorScheme === "fire-bush") {
    color = `w-52 h-52 dark:bg-night-300 bg-white border border-fire-bush-300 dark:border-fire-bush-300 rounded-tr-none rounded-lg overflow-y-scroll py-2`;
  } else if (colorScheme === "cinnabar") {
    color = `w-52 h-52 dark:bg-night-300 bg-white border border-cinnabar-300 dark:border-cinnabar-300 rounded-tr-none rounded-lg overflow-y-scroll py-2`;
  } else if (colorScheme === "purple-heart") {
    color = `w-52 h-52 dark:bg-night-300 bg-white border border-purple-heart-300 dark:border-purple-heart-300 rounded-tr-none rounded-lg overflow-y-scroll py-2`;
  }

  if (type === "Chat") {
    const filteredData = data.filter(
      (item) => item.type === "chat" && item.isRead === 0
    );

    if (filteredData.length > 0) {
      return (
        <div className={color}>
          {filteredData.map((item, id) => (
            <Item key={id} item={item} />
          ))}
        </div>
      );
    }

    if (filteredData.length < 1) {
      return (
        <div className={`${color} h-fit w-fit`}>
          <span className="p-2"> No chat notification for this moment</span>
        </div>
      );
    }
  }

  if (type === "Notification") {
    const filteredData = data.filter((item) => item.type !== "chat");

    if (filteredData.length > 0) {
      return (
        <div className={color}>
          {filteredData.map((item, id) => (
            <Item key={id} item={item} />
          ))}
        </div>
      );
    }

    if (filteredData.length < 1) {
      return (
        <div className={`${color} w-fit h-fit`}>
          <span className="p-2">No notification for this moment</span>
        </div>
      );
    }
  }
}
