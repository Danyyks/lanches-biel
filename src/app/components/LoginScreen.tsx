import { useState } from 'react';
import { motion } from 'motion/react';
import logo from '../../assets/1a3f094c03c1d28c4439e1d310422bbc5ff07df9.png';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-32 h-32 mx-auto mb-6 object-contain"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Lanches do Biel
          </h1>
          <p className="text-gray-600">
            Bem-vindo ao nosso cardápio digital!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Qual é o seu nome?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200"
          >
            Entrar no Cardápio
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Aqui a pegada STREET é de verdade!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
