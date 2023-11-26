export default function Indicator({ style, notifications }) {
  return <div className={style}>{notifications.length}</div>;
}
