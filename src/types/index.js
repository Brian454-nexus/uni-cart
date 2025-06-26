
// Product data structure
export const ProductSchema = {
    id: '',
    title: '',
    price: 0,
    images: [],
    category: '',
    condition: '', // 'new' | 'like-new' | 'good' | 'fair'
    description: '',
    location: '',
    seller: {
      id: '',
      name: '',
      avatar: '',
      university: '',
      rating: 0,
      totalSales: 0
    },
    createdAt: '',
    featured: false
  };
  
  // Category data structure
  export const CategorySchema = {
    id: '',
    name: '',
    icon: '',
    count: 0
  };
  
  // Payment request structure
  export const PaymentRequestSchema = {
    productId: '',
    phoneNumber: '',
    amount: 0
  };
  
  // Payment status structure
  export const PaymentStatusSchema = {
    id: '',
    status: '', // 'pending' | 'success' | 'failed'
    message: ''
  };
  