# Obolus — Frontend

Frontend for Obolus, a full stack e-commerce marketplace where anyone can buy and sell products (transactions aren't allowed since this is merely an educational project). 
Built with React and TypeScript, connected to a FastAPI backend with PostgreSQL.

🌐 **Live site:** [obolus-by-emilianopadilla.vercel.app](https://obolus-by-emilianopadilla.vercel.app)  
🔧 **Backend repo:** [github.com/EmilianoPadilla/ecommerce-backend](https://github.com/EmilianoPadilla/ecommerce-backend)

> ⚠️ This project is purely educational and not intended for commercial use. All products are for demonstration purposes only.

---

## Features

- **Product browsing** — browse products with images, prices, and seller info
- **Real-time search** — search products from the navbar instantly
- **Category filtering** — browse products by category
- **JWT Authentication** — register, login, and logout with persistent sessions
- **Shopping cart** — persistent cart backed by the database with optimistic updates
- **Seller functionality** — any authenticated user can list, edit, and delete their own products
- **Homepage** — featured products and "Almost Gone" low stock section
- **Responsive design** — fully mobile-friendly with hamburger navbar
- **Protected routes** — cart and seller pages require authentication

---

## Tech Stack

- **React** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components
- **TanStack Query** — server state management with caching and optimistic updates
- **Zustand** — global client state (auth)
- **React Router** — client-side navigation
- **React Hook Form** + **Zod** — form validation
- **react-hot-toast** — notifications
- **Vercel** — deployment

---

## Pages

| Page | Description |
|------|-------------|
| `/` | Homepage with featured products and low stock section |
| `/products` | All products with search and filtering |
| `/products/:id` | Product detail with Add to Cart |
| `/categories` | All categories |
| `/categories/:id` | Products filtered by category |
| `/cart` | Shopping cart with quantity controls |
| `/checkout` | Checkout confirmation page |
| `/login` | Login with JWT authentication |
| `/register` | Create a new account |
| `/sell` | List a new product (protected) |
| `/my-products` | Manage your listings (protected) |

---

## Running Locally

```bash
git clone https://github.com/EmilianoPadilla/obolus-frontend.git
cd obolus-frontend
npm install
```

Create a `.env` file in the root:

```
VITE_API_URL=https://emilianopadilla-ecommerce-backend.onrender.com
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Related

- **Backend API:** [github.com/EmilianoPadilla/ecommerce-backend](https://github.com/EmilianoPadilla/ecommerce-backend)
- **API Docs:** [emilianopadilla-ecommerce-backend.onrender.com/docs](https://emilianopadilla-ecommerce-backend.onrender.com/docs)

---

## Contact

- 🌐 [emilianopadilla.com](https://emilianopadilla.com)
- 💼 [linkedin.com/in/emiliano-padilla-robles](https://linkedin.com/in/emiliano-padilla-robles)
- 🐙 [github.com/EmilianoPadilla](https://github.com/EmilianoPadilla)
