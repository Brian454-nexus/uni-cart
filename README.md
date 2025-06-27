# UniCart - Campus Marketplace

UniCart is a full-stack web application for university students to buy and sell items securely within their campus community. It features real-time chat, secure payments via Paystack, and a modern, responsive UI.

---

## Features

- **Product Search & Filtering:**
  - Search by product name or category.
  - Filter by category, condition, and more.
- **Seller/Buyer Modes:**
  - Switch between Seller and Buyer modes from the Navbar.
  - Seller dashboard for posting new items (with Formik validation).
- **Product Posting:**
  - Post new items with images, category, and description.
  - Items are instantly available in the marketplace and correct category.
- **Favorites/Liked Products:**
  - Like/unlike products (heart icon turns blue).
  - View all liked products on a dedicated page.
- **Product Details:**
  - View detailed product info, seller profile, and similar products.
  - Share product links via Web Share API or copy-to-clipboard.
- **Real-Time Chat:**
  - Contact sellers instantly via chat modal (Flask-SocketIO backend).
  - Chat history is saved and loaded per product/user pair.
- **Secure Payments:**
  - Pay for items using Paystack (test and live keys supported).
  - Payment is verified on the backend before confirming purchase.
- **Authentication:**
  - JWT-based login/register/logout.
  - Auth tokens are passed to all protected endpoints.
- **Responsive Design:**
  - Fully responsive and mobile-friendly UI.
  - Modern look with Tailwind CSS.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Formik, socket.io-client
- **Backend:** Flask, Flask-SocketIO, SQLAlchemy, JWT, Paystack API
- **Database:** PostgreSQL (default), can be swapped for others
- **Other:** Docker, Docker Compose, Nginx (optional for deployment)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.10+
- PostgreSQL (or use Docker)
- [Paystack account](https://paystack.com/) for payment keys

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/unicart.git
cd unicart
```

### 2. Environment Variables

Create a `.env` file in the root and in `backend/app/`:

**Frontend `.env`**

```
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxx
VITE_SOCKET_URL=http://localhost:5000
```

**Backend `.env` or set as environment variables**

```
PAYSTACK_SECRET_KEY=sk_test_xxx
PAYSTACK_PUBLIC_KEY=pk_test_xxx
DATABASE_URL=postgresql://unicart:unicart@localhost:5432/unicart
SECRET_KEY=your-secret
JWT_SECRET_KEY=your-jwt-secret
```

### 3. Install Dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd backend
pip install -r requirements.txt
```

### 4. Database Setup

```bash
cd backend
flask db upgrade
```

### 5. Run the App

#### Backend (Flask + SocketIO)

```bash
cd backend
flask run
# or with SocketIO support:
python wsgi.py
```

#### Frontend (React)

```bash
npm run dev
```

### 6. Using Docker (Optional)

```bash
docker-compose up --build
```

---

## Usage

- Register/login as a student.
- Switch to Seller mode to post items.
- Browse, search, and filter products.
- Like products to save them to your favorites.
- Contact sellers via chat.
- Pay securely with Paystack.

---

## Project Structure

```
unicart/
  backend/         # Flask backend (API, SocketIO, DB models)
  public/          # Static assets (images, etc.)
  src/             # React frontend
    components/    # UI components
    pages/         # Main pages (Home, ProductDetail, LikedProducts, etc.)
    data/          # Mock/demo data (for development)
    lib/           # Utility libraries (Paystack, etc.)
    contexts/      # React context providers (Auth, etc.)
```

---

## Deployment

- For production, use Docker Compose or deploy backend and frontend separately.
- Use Nginx or Caddy as a reverse proxy for HTTPS.
- Set all environment variables securely.

---

## Testing

- Backend: `pytest backend/tests/`
- Frontend: Add tests as needed (Jest, React Testing Library recommended)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Credits

- [Paystack](https://paystack.com/)
- [Flask-SocketIO](https://flask-socketio.readthedocs.io/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contact

For support or questions, open an issue or contact the maintainer at [your-email@example.com].
