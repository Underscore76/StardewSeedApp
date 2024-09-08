import CardHeader from "./CardHeader";

type CardProps = {
  title: string;
  buttons?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Card(props: CardProps) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <CardHeader title={props.title}>{props.buttons}</CardHeader>
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
}
