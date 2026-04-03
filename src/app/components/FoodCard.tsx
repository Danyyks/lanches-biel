import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface FoodCardProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  onAdd: () => void;
}

export function FoodCard({ name, description, price, image, onAdd }: FoodCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {image && (
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-900">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      <div className="p-5">
        <h3 className="mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            R$ {price.toFixed(2)}
          </span>
          <button
            onClick={onAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2.5 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
