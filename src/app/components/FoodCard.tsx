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
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl md:text-2xl font-bold text-orange-600 shrink-0">
            R$ {price.toFixed(2)}
          </span>
          <button
            onClick={onAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 md:px-6 py-2.5 transition-colors duration-200 flex items-center gap-1.5 shadow-md hover:shadow-lg text-sm md:text-base shrink-0"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
