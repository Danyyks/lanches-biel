# Lanches do Biel

Cardápio digital desenvolvido para uma lanchonete real, substituindo o atendimento manual de pedidos por um fluxo simples: o cliente escolhe os itens, monta o carrinho e envia o pedido formatado direto para o WhatsApp da loja.

O projeto nasceu de uma necessidade prática do dono do negócio, que recebia pedidos por mensagem de forma desorganizada. A solução manteve o canal que ele já usava (WhatsApp), mas padronizou a forma como o pedido chega: com itens, quantidades e observações já organizados em texto.

## Tecnologias

- React 18 e TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion para as animações de interface
- Radix UI e shadcn/ui para os componentes base
- Supabase para persistência dos dados do cardápio
- Lucide React para os ícones

## Como funciona

O cliente abre o link, informa o nome e visualiza o cardápio com lanches e bebidas. Ao adicionar um item, escolhe a quantidade e pode incluir observações (tipo "sem cebola" ou "ponto da carne"). Os itens vão se acumulando no carrinho, que pode ser revisado antes da finalização. Ao confirmar, o app monta uma mensagem com todos os detalhes do pedido e abre o WhatsApp já com o texto pronto para envio.

## Estrutura do código

```
src/
├── app/
│   ├── App.tsx               # estado global e layout principal
│   └── components/
│       ├── LoginScreen.tsx   # tela de entrada com o nome do cliente
│       ├── FoodCard.tsx      # card de lanche
│       ├── DrinkCard.tsx     # card de bebida
│       ├── AddItemModal.tsx  # modal de quantidade e observações
│       ├── CartDrawer.tsx    # carrinho lateral
│       ├── helpers/
│       │   └── ImageWithFallback.tsx
│       └── ui/               # componentes base (shadcn/ui + Radix)
├── assets/                   # imagens dos lanches
└── styles/                   # estilos e tema
```

## Rodando o projeto localmente

```bash
npm install
npm run dev
```

O app fica disponível em `http://localhost:5173`.

Para rodar localmente é preciso criar um arquivo `.env` com base no `.env.example`, com o número de WhatsApp e as credenciais do Supabase.

## Build

```bash
npm run build
```

Os arquivos finais ficam em `dist/`.
