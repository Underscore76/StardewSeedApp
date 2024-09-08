type CardHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function CardHeader(props: CardHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {props.title}
          </h3>
        </div>
        {props.children}
      </div>
    </div>
  );
}
