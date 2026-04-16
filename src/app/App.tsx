import { useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LoginScreen } from './components/LoginScreen';
import { FoodCard } from './components/FoodCard';
import { DrinkCard } from './components/DrinkCard';
import { AddItemModal } from './components/AddItemModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPanel } from './components/admin/AdminPanel';
import { useMenuData } from './hooks/useMenuData';

export default function App() {
  // ── Cardápio e perfil vindos do Supabase ────────────────────
  const { foods, drinks, combos, profile, loading, error, refresh } =
    useMenuData();

  // ── Estado do cliente ───────────────────────────────────────
  const [userName, setUserName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    id: string;
    name: string;
    price: number;
  }>({ isOpen: false, id: '', name: '', price: 0 });

  // ── Estado do admin ─────────────────────────────────────────
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // ── Handlers do cliente ─────────────────────────────────────
  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const openModal = (id: string, name: string, price: number) => {
    setModalData({ isOpen: true, id, name, price });
  };

  const closeModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddToCart = (quantity: number, notes: string) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === modalData.id && item.notes === notes,
    );

    if (existingIndex >= 0) {
      setCartItems(
        cartItems.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `${modalData.id}-${Date.now()}`,
          productId: modalData.id,
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
      if (item.notes) message += ` - ${item.notes}`;
      message += '\n';
    });

    message += `\n*Total: R$ ${total.toFixed(2)}*`;

    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ── Itens visíveis para o cliente (somente ativos) ──────────
  // Nota: o RLS do Supabase já filtra por active=true para usuários anônimos,
  // mas filtramos aqui também por segurança no frontend.
  const activeFoods = foods.filter((f) => f.active);
  const activeDrinks = drinks.filter((d) => d.active);
  const activeCombos = combos.filter((c) => c.active);

  // ── Tela de carregamento inicial ────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-gray-500 text-sm">Carregando cardápio...</p>
      </div>
    );
  }

  // ── Tela de erro (Supabase não configurado ou offline) ──────
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 gap-4 px-6 text-center">
        <p className="text-red-600 font-medium">Erro ao conectar ao banco de dados</p>
        <p className="text-gray-500 text-sm max-w-sm">{error}</p>
        <button
          onClick={refresh}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // ── Tela de login do cliente ────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} logo={profile.logo} />
        {/* Botão admin discreto sobreposto à tela de login */}
        <button
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-3 right-3 text-[10px] text-white/30 hover:text-white/60 transition-colors z-50 select-none"
          aria-label="Acesso admin"
        >
          admin
        </button>
        <AdminLogin
          isOpen={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onLogin={() => {
            setShowAdminLogin(false);
            setIsAdminLoggedIn(true);
          }}
        />
        {isAdminLoggedIn && (
          <AdminPanel
            onLogout={() => {
              setIsAdminLoggedIn(false);
              refresh(); // Recarrega o cardápio após o admin fazer alterações
            }}
          />
        )}
      </>
    );
  }

  // ── Site principal (cliente logado) ─────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={profile.logo}
              alt="Logo"
              className="w-10 h-14 md:w-16 md:h-20 object-contain shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xl md:text-3xl text-orange-600 mb-0.5 md:mb-1">
                Lanches do Biel
              </h1>
              <p className="text-xs md:text-sm text-gray-600 truncate">
                {userName}, seja bem-vindo! Bom apetite!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Abrir carrinho${totalItems > 0 ? `, ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}` : ''}`}
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
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 md:mb-4 text-white text-xl md:text-2xl"
          >
            Aqui a pegada STREET é de verdade.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Cada lanche é feito na hora, direto na chapa, carne suculenta e zero
            frescura. É lanche honesto, artesanal e cheio de sabor, do jeito que
            tem que ser.
          </motion.p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ── Seção Lanches ── */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 rounded-full p-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.9 5.6c0-.3-.2-.5-.5-.5H15c-.3 0-.5.2-.5.5s.2.5.5.5h5.9l-1.6 7.8c-.2.8-.9 1.4-1.7 1.4H9.7c-.8 0-1.5-.6-1.7-1.4L6.4 6.1h-.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.2c.2 0 .4.2.5.4l.3 1.6h12.4c.2 0 .4.1.5.3zm-4.4 10.7H9.7c-1.3 0-2.4-1-2.7-2.3L5.4 6.1H2.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3.2c.2 0 .4.2.5.4l1.5 7.9c.2.8.9 1.4 1.7 1.4h7.8c.8 0 1.5-.6 1.7-1.4l1.6-7.9c0-.2.3-.4.5-.4h.9c.3 0 .5.2.5.5s-.2.5-.5.5h-.6l-1.6 7.8c-.2 1.3-1.4 2.3-2.7 2.3zM10 19c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm8 0c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1z" />
              </svg>
            </div>
            <h2 className="text-orange-600">Lanches</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeFoods.map((item) => (
              <FoodCard
                key={item.id}
                name={item.name}
                description={item.description ?? ''}
                price={item.price}
                image={item.image}
                onAdd={() => openModal(item.id, item.name, item.price)}
              />
            ))}
          </div>
        </section>

        {/* ── Seção Combos (só aparece se houver combos ativos) ── */}
        {activeCombos.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
                </svg>
              </div>
              <h2 className="text-red-600">Combos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCombos.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  description={item.description ?? ''}
                  price={item.price}
                  image={item.image}
                  onAdd={() => openModal(item.id, item.name, item.price)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Seção Bebidas ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 rounded-full p-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 2l2.01 18.23C5.13 21.23 5.97 22 7 22h10c1.03 0 1.87-.77 1.99-1.77L21 2H3zm9 17c-1.66 0-3-1.34-3-3 0-2 3-5.4 3-5.4s3 3.4 3 5.4c0 1.66-1.34 3-3 3zm6.33-11H5.67l-.44-4h13.53l-.43 4z" />
              </svg>
            </div>
            <h2 className="text-blue-600">Bebidas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeDrinks.map((item) => (
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
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-gray-500 text-sm">Desenvolvido por:</span>
            <img
              src="/khode-logo.svg"
              alt="Khode Systems"
              className="h-8 opacity-70"
            />
          </div>
          {/* Acesso admin — discreto, invisível para clientes comuns */}
          <button
            onClick={() => setShowAdminLogin(true)}
            className="mt-4 text-[10px] text-gray-700 hover:text-gray-500 transition-colors select-none"
            aria-label="Acesso restrito"
          >
            admin
          </button>
        </div>
      </footer>

      {/* ── Modais do cliente ── */}
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

      {/* ── Admin ── */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={() => {
          setShowAdminLogin(false);
          setIsAdminLoggedIn(true);
        }}
      />

      {isAdminLoggedIn && (
        <AdminPanel
          onLogout={() => {
            setIsAdminLoggedIn(false);
            refresh(); // Recarrega o cardápio após o admin salvar alterações
          }}
        />
      )}
    </div>
  );
}
