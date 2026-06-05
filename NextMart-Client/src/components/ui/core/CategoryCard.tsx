import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const isUrl = category?.icon?.startsWith('http') || category?.icon?.startsWith('/');

  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44">
      <div className="w-24 h-24 mx-auto flex items-center justify-center text-4xl">
        {isUrl ? (
          <Image
            src={category?.icon}
            width={96}
            height={96}
            alt="category icon"
            className="w-full h-full object-contain"
          />
        ) : (
          <span>{category?.icon}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
