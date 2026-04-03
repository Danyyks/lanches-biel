# Lanches do Biel

Cardápio digital para lanchonete, com sistema de carrinho e envio de pedido via WhatsApp.

## Tecnologias

- **React 18** + **TypeScript**
- **Vite 6** (bundler)
- **Tailwind CSS v4**
- **Framer Motion** (animações)
- **Radix UI / shadcn/ui** (componentes base)
- **Lucide React** (ícones)

## Como rodar localmente

```bash
npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`.

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`.

## Deploy na Vercel

O projeto já está configurado para deploy na Vercel via `vercel.json`.

1. Faça push do projeto para um repositório Git (GitHub, GitLab, etc.)
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. A Vercel detectará automaticamente as configurações — clique em **Deploy**

## Estrutura de pastas

```
src/
├── app/
│   ├── App.tsx               # Componente principal (estado global, layout)
│   └── components/
│       ├── LoginScreen.tsx   # Tela de entrada com o nome do cliente
│       ├── FoodCard.tsx      # Card de lanche com imagem e botão adicionar
│       ├── DrinkCard.tsx     # Card de bebida (sem imagem)
│       ├── AddItemModal.tsx  # Modal de quantidade e observações
│       ├── CartDrawer.tsx    # Gaveta lateral do carrinho
│       ├── helpers/
│       │   └── ImageWithFallback.tsx  # Componente de imagem com fallback
│       └── ui/               # Componentes base (shadcn/ui + Radix)
├── assets/                   # Imagens dos lanches
├── styles/
│   ├── index.css             # Entrada de estilos
│   ├── tailwind.css          # Configuração Tailwind v4
│   ├── theme.css             # Variáveis de cor e tema
│   └── fonts.css             # Fontes customizadas
└── main.tsx                  # Entry point da aplicação
```

## Fluxo da aplicação

1. Cliente digita o nome na tela de login
2. Visualiza o cardápio (lanches e bebidas)
3. Clica em "Adicionar" → escolhe quantidade e observações no modal
4. Abre o carrinho → revisa o pedido
5. Clica em "Enviar pedido pelo WhatsApp" → abre o WhatsApp com o pedido formatado

## Personalizando o cardápio

Edite os arrays `FOOD_ITEMS` e `DRINK_ITEMS` no arquivo `src/app/App.tsx` para alterar nomes, descrições, preços e imagens dos produtos.

Para trocar as imagens, substitua os arquivos em `src/assets/` e atualize os imports correspondentes no `App.tsx`.
