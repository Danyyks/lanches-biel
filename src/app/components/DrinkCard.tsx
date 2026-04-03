import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface DrinkCardProps {
  name: string;
  price: number;
  onAdd: () => void;
}

export function DrinkCard({ name, price, onAdd }: DrinkCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-200"
    >
      <div>
        <h4 className="mb-1">{name}</h4>
        <span className="text-orange-600 font-semibold">
          R$ {price.toFixed(2)}
        </span>
      </div>
      <button
        onClick={onAdd}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-colors duration-200"
      >
        <Plus className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
