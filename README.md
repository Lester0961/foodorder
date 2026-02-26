<img width="1902" height="842" alt="image" src="https://github.com/user-attachments/assets/68379d04-fa47-46aa-9095-478c699e2b90" />
# Lutong Pinoy – Sarap na Lutong Bahay

A modern, fully responsive single-page food delivery web application built for **Lutong Pinoy** — authentic Filipino home-cooked meals delivered straight to your door.

Live Demo: (https://foodorder-lester.vercel.app/)

## Features

- Responsive design (mobile-first, excellent on tablet & desktop)
- Browse menu by category (Appetizers, Main Dishes, Rice Meals, Desserts, Drinks)
- Product detail page with quantity selector + customizable add-ons (extra rice, bagoong, sauce, egg)
- Persistent shopping cart (saved in localStorage — survives refresh)
- Protected checkout flow (requires login)
- Fake authentication modal (login/register/logout)
- Order success page with summary & fake order number
- My Orders page (shows past placed orders from localStorage)
- Toast notifications for feedback (add to cart, login, order placed)
- Real-time form validation + loading state during order submission
- Warm Filipino-inspired color palette (lutong-red, mustard, beige)

## Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context + useReducer (cart & auth)
- **Persistence**: localStorage (cart items, auth token, past orders)
- **Deployment**: Vercel (auto deploys from GitHub)

## Project Structure

```
lutong-pinoy/
├── public/                     # static assets (images, favicon, etc.)
├── src/
│   ├── components/             # reusable UI pieces
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── AuthModal.jsx
│   │   └── Toast.jsx
│   ├── context/                # global state (cart, auth, toast)
│   │   ├── CartContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx
│   ├── pages/                  # route-level pages
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSuccess.jsx
│   │   └── MyOrders.jsx
│   ├── data/
│   │   └── products.js         # static menu data
│   ├── App.jsx                 # main layout + routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind + custom styles
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```
## Installation & Local Development
-in cmd/bash-
1. Clone the repository
```
   git clone https://github.com/Lester0961/foodorder.git
   cd foodorder
```
2. Install dependencies
 ```
   npm install
```   
3. Start development server
```
  npm run dev
```
4. Build for production
```
   npm run build
```

## Future Improvements (ideas)

- Real backend (Supabase / Firebase) for users & orders
- Payment integration (GCash / PayMongo)
- Search bar on Menu page
- Favorites / Wishlist
- Order tracking status
- Dark mode toggle
- PWA support (offline cart)

## License

This project is licensed under the **MIT License** — see the (LICENSE) file for details.

Made with ❤️ in Parañaque City, Philippines  
© 2026 Lutong Pinoy

Happy coding & enjoy the sarap! 🇵🇭🍲
