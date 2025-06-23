import logo from './logo.svg';
import './App.css';
import { Navbar, DashboardLayout, ItemCard, ItemForm } from './components';
import ToastProvider from './components/ToastProvider';

function App() {
  const handleItemSubmit = (values, { resetForm }) => {
    import('react-hot-toast').then(({ toast }) => toast.success('Item submitted!'));
    resetForm();
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ToastProvider />
      <Navbar />
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ItemCard
            title="Textbook: Calculus I"
            price={25}
            description="A well-kept calculus textbook."
            imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80"
            sellerBadge="Trusted Seller"
          />
          <ItemCard
            title="Dorm Lamp"
            price={10}
            description="LED lamp, perfect for late-night study."
            imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          />
        </div>
        <div className="max-w-md mx-auto">
          <ItemForm onSubmit={handleItemSubmit} />
        </div>
      </DashboardLayout>
    </div>
  );
}

export default App;
