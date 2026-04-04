import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import logo from "../assets/1a3f094c03c1d28c4439e1d310422bbc5ff07df9.png";
import burger1 from "../assets/28b4c54730b935b5f01ce44fea3dd0b8f721c52c.png";
import burger2 from "../assets/1accdf30ffaa462b4fe2329cf0fa884d91e9d5b0.png";
import burger3 from "../assets/5f168483bf3dffe5fc431528b1c76973c80d58c5.png";
import burger4 from "../assets/1381504f460c565780b909d22f8818a7e5de865c.png";
import burger5 from "../assets/150f9a73ef4707d2c2c8370830102ef590a8b940.png";
import burger6 from "../assets/682f953d4d9be8c2d1c764f8e8939b14bbf90bbf.png";
import { LoginScreen } from "./components/LoginScreen";
import { FoodCard } from "./components/FoodCard";
import { DrinkCard } from "./components/DrinkCard";
import { AddItemModal } from "./components/AddItemModal";
import { CartDrawer, CartItem } from "./components/CartDrawer";

const FOOD_ITEMS = [
  {
    id: "f1",
    name: "RIb Street Raiz",
    description:
      "Pão de tapioca, purê de batata da casa, costela suína desfiada, catupiry, maionese, queijo quente e espinafre.",
    price: 30.0,
    image: burger1,
  },
  {
    id: "f2",
    name: "Mineirão Raiz",
    description:
      "Pão de tapioca, purê de batata da casa, linguiça Toscana, cebola roxa, maionese de bacon, cebola roxa e queijo quente.",
    price: 27.0,
    image: burger2,
  },
  {
    id: "f3",
    name: "Mortadelão",
    description:
      "Pão de tapioca, fatias de mortadela e mussarela, cebola roxa e maionese.",
    price: 22.0,
    image: burger3,
  },
  {
    id: "f4",
    name: "Chicken Street",
    description:
      "Pão de tapioca, purê de batata da casa, frango desfiado, catupiry, maionese e fatias de bacon.",
    price: 27.0,
    image: burger4,
  },
  {
    id: "f5",
    name: "Calabresa Broken",
    description:
      "Pão de tapioca, purê de batata da casa, calabresa, maionese de bacon, cebola roxa e queijo quente.",
    price: 27.0,
    image: burger5,
  },
  {
    id: "f6",
    name: "Costelão",
    description:
      "Pão de tapioca, purê de batata da casa, costela bovina misturada com queijo e catupiry, maionese, cebola roxa, fatias de bacon e queijo quente.",
    price: 35.0,
    image: burger6,
  },
];

const DRINK_ITEMS = [
  { id: "d1", name: "Coca Cola lata", price: 7.0 },
  { id: "d2", name: "Sprite lata", price: 7.0 },
  { id: "d3", name: "Sprite Lemon Fresh", price: 8.0 },
  { id: "d4", name: "Guaraná lata", price: 6.0 },
  { id: "d5", name: "Skol lata 269", price: 5.0 },
  { id: "d6", name: "Original lata 269", price: 6.0 },
];

export default function App() {
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
    price: number;
  }>({
    isOpen: false,
    id: "",
    name: "",
    price: 0,
  });

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const openModal = (id: string, name: string, price: number) => {
    setModalData({ isOpen: true, id, name, price });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleAddToCart = (quantity: number, notes: string) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === modalData.id && item.notes === notes,
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `${modalData.id}-${Date.now()}`,
          name: modalData.name,
          price: modalData.price,
          quantity,
          notes,
        },
      ]);
    }
    closeModal();
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = (address: string) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    let message = `Olá! Meu nome é *${userName}* e gostaria de fazer o seguinte pedido:\n\n📍 *Endereço de entrega:* ${address}\n\n`;

    cartItems.forEach((item) => {
      message += `• ${item.name} (${item.quantity}x)`;
      if (item.notes) {
        message += ` - ${item.notes}`;
      }
      message += "\n";
    });

    message += `\n*Total: R$ ${total.toFixed(2)}*`;

    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-20 md:h-20 object-contain" />
            <div>
              <h1 className="text-xl md:text-3xl text-orange-600 mb-0.5 md:mb-1">Lanches do Biel</h1>
              <p className="text-xs md:text-sm text-gray-600">
                {userName}, seja bem-vindo! Bom apetite!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-white"
          >
            Aqui a pegada STREET é de verdade.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Cada lanche é feito na hora, direto na chapa, carne suculenta e zero
            frescura. É lanche honesto, artesanal e cheio de sabor, do jeito que
            tem que ser.
          </motion.p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Food Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.9 5.6c0-.3-.2-.5-.5-.5H15c-.3 0-.5.2-.5.5s.2.5.5.5h5.9l-1.6 7.8c-.2.8-.9 1.4-1.7 1.4H9.7c-.8 0-1.5-.6-1.7-1.4L6.4 6.1h-.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.2c.2 0 .4.2.5.4l.3 1.6h12.4c.2 0 .4.1.5.3zm-4.4 10.7H9.7c-1.3 0-2.4-1-2.7-2.3L5.4 6.1H2.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3.2c.2 0 .4.2.5.4l1.5 7.9c.2.8.9 1.4 1.7 1.4h7.8c.8 0 1.5-.6 1.7-1.4l1.6-7.9c0-.2.3-.4.5-.4h.9c.3 0 .5.2.5.5s-.2.5-.5.5h-.6l-1.6 7.8c-.2 1.3-1.4 2.3-2.7 2.3zM10 19c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm8 0c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1z" />
              </svg>
            </div>
            <h2 className="text-orange-600">Lanches</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_ITEMS.map((item) => (
              <FoodCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onAdd={() => openModal(item.id, item.name, item.price)}
              />
            ))}
          </div>
        </section>

        {/* Drinks Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 2l2.01 18.23C5.13 21.23 5.97 22 7 22h10c1.03 0 1.87-.77 1.99-1.77L21 2H3zm9 17c-1.66 0-3-1.34-3-3 0-2 3-5.4 3-5.4s3 3.4 3 5.4c0 1.66-1.34 3-3 3zm6.33-11H5.67l-.44-4h13.53l-.43 4z" />
              </svg>
            </div>
            <h2 className="text-blue-600">Bebidas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DRINK_ITEMS.map((item) => (
              <DrinkCard
                key={item.id}
                name={item.name}
                price={item.price}
                onAdd={() => openModal(item.id, item.name, item.price)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Lanches do Biel - Todos os direitos reservados
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Lanche honesto, artesanal e cheio de sabor
          </p>
          <p className="text-gray-600 text-xs mt-3">
            Desenvolvido por Dany Jonathan Bueno
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AddItemModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        itemName={modalData.name}
        itemPrice={modalData.price}
        onConfirm={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
