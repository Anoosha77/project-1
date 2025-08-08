type CardProps = {
  title: string;
  description: string;
};

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
