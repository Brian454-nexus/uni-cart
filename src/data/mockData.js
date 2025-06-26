export const categories = [
  { id: "books", name: "Books & Academic", icon: "📚", count: 10 },
  { id: "electronics", name: "Electronics", icon: "💻", count: 10 },
  { id: "fashion", name: "Fashion & Clothing", icon: "👕", count: 10 },
  { id: "appliances", name: "Appliances", icon: "🏠", count: 10 },
  { id: "academic-tools", name: "Academic Tools", icon: "✏️", count: 10 },
  { id: "sports", name: "Sports & Recreation", icon: "⚽", count: 10 },
];

export const mockProducts = [
  // Books & Academic (10 items)
  {
    id: "1",
    title: "Engineering Mathematics Textbook Set",
    price: 3500,
    images: [
      "/images/img_0.jpg",
    ],
    category: "books",
    condition: "good",
    description:
      "Complete set of engineering mathematics textbooks. Includes Calculus, Linear Algebra, and Differential Equations. Some highlighting but all pages intact.",
    location: "Kenyatta University",
    seller: {
      id: "seller2",
      name: "David Ochieng",
      university: "Kenyatta University",
      rating: 4.6,
      totalSales: 15,
    },
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "2",
    title: "Organic Chemistry Textbook - 7th Edition",
    price: 2800,
    images: [
      "/images/img_1.jpg",
    ],
    category: "books",
    condition: "like-new",
    description:
      "Latest edition of organic chemistry textbook. Barely used, no markings. Perfect for chemistry students.",
    location: "University of Nairobi",
    seller: {
      id: "seller3",
      name: "Sarah Wanjiku",
      university: "University of Nairobi",
      rating: 4.8,
      totalSales: 22,
    },
    createdAt: "2024-01-13T10:30:00Z",
  },
  {
    id: "3",
    title: "Data Structures and Algorithms Book",
    price: 4200,
    images: [
      "/images/dsa.jpeg",
    ],
    category: "books",
    condition: "good",
    description:
      "Comprehensive guide to data structures and algorithms. Essential for computer science students.",
    location: "Strathmore University",
    seller: {
      id: "seller4",
      name: "Michael Kiprop",
      university: "Strathmore University",
      rating: 4.7,
      totalSales: 18,
    },
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "4",
    title: "Fundamentals of Physics - Halliday",
    price: 5500,
    images: [
      "/images/img_3.jpg",
    ],
    category: "books",
    condition: "good",
    description:
      "Complete physics textbook with problem solutions. Great for engineering and physics students.",
    location: "JKUAT",
    seller: {
      id: "seller5",
      name: "Grace Mutiso",
      university: "JKUAT",
      rating: 4.5,
      totalSales: 12,
    },
    createdAt: "2024-01-11T09:15:00Z",
  },
  {
    id: "5",
    title: "Financial Accounting Principles",
    price: 3200,
    images: [
      "/images/img_4.jpg",
    ],
    category: "books",
    condition: "like-new",
    description:
      "Latest edition accounting textbook. Perfect condition with all chapters intact.",
    location: "Daystar University",
    seller: {
      id: "seller6",
      name: "Peter Kamau",
      university: "Daystar University",
      rating: 4.9,
      totalSales: 25,
    },
    createdAt: "2024-01-10T16:45:00Z",
  },
  {
    id: "6",
    title: "Business Law and Ethics Textbook",
    price: 2900,
    images: [
      "/images/img_5.jpg",
    ],
    category: "books",
    condition: "good",
    description:
      "Comprehensive business law textbook. Some notes in margins but overall good condition.",
    location: "KCA University",
    seller: {
      id: "seller7",
      name: "Mary Njeri",
      university: "KCA University",
      rating: 4.6,
      totalSales: 14,
    },
    createdAt: "2024-01-09T11:30:00Z",
  },
  {
    id: "7",
    title: "Microeconomics Theory Book",
    price: 3800,
    images: [
      "/images/img_6.jpg",
    ],
    category: "books",
    condition: "good",
    description:
      "Advanced microeconomics textbook with case studies. Great for economics students.",
    location: "Maseno University",
    seller: {
      id: "seller8",
      name: "James Otieno",
      university: "Maseno University",
      rating: 4.4,
      totalSales: 8,
    },
    createdAt: "2024-01-08T13:20:00Z",
  },
  {
    id: "8",
    title: "Human Anatomy and Physiology",
    price: 6500,
    images: [
      "/images/img_7.jpg",
    ],
    category: "books",
    condition: "like-new",
    description:
      "Comprehensive anatomy textbook with detailed illustrations. Perfect for medical students.",
    location: "Moi University",
    seller: {
      id: "seller9",
      name: "Dr. Anne Chebet",
      university: "Moi University",
      rating: 4.9,
      totalSales: 31,
    },
    createdAt: "2024-01-07T08:45:00Z",
  },
  {
    id: "9",
    title: "Research Methods in Social Sciences",
    price: 2500,
    images: [
      "/images/img_8.jpg",
    ],
    category: "books",
    condition: "good",
    description:
      "Essential guide for research methodology. Some highlighting but all content readable.",
    location: "Egerton University",
    seller: {
      id: "seller10",
      name: "Prof. David Mwangi",
      university: "Egerton University",
      rating: 4.7,
      totalSales: 19,
    },
    createdAt: "2024-01-06T15:10:00Z",
  },
  {
    id: "10",
    title: "Linear Algebra and Its Applications",
    price: 4100,
    images: [
      "/images/img_9.jpg",
    ],
    category: "books",
    condition: "good",
    description:
      "Comprehensive linear algebra textbook with solved examples and exercises.",
    location: "Technical University of Kenya",
    seller: {
      id: "seller11",
      name: "Susan Wambui",
      university: "Technical University of Kenya",
      rating: 4.8,
      totalSales: 16,
    },
    createdAt: "2024-01-05T12:30:00Z",
  },

  // Electronics (10 items)
  {
    id: "11",
    title: "MacBook Air M1 - Like New Condition",
    price: 95000,
    images: [
      "/images/img_10.jpg",
      "/images/img_11.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "MacBook Air M1 in excellent condition. Used for 6 months by a computer science student. Perfect for coding, design work, and daily tasks. Comes with original charger and box.",
    location: "University of Nairobi, Main Campus",
    seller: {
      id: "seller1",
      name: "Sarah Kimani",
      avatar:
        "/images/img_12.jpg",
      university: "University of Nairobi",
      rating: 4.8,
      totalSales: 23,
    },
    createdAt: "2024-01-15T10:30:00Z",
    featured: true,
  },
  {
    id: "12",
    title: "iPhone 13 Pro Max - Excellent Condition",
    price: 85000,
    images: [
      "/images/iphone13.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "iPhone 13 Pro Max 256GB in Sierra Blue. Barely used, always kept in case with screen protector. Battery health at 98%.",
    location: "Strathmore University",
    seller: {
      id: "seller4",
      name: "Michael Kiprop",
      university: "Strathmore University",
      rating: 4.7,
      totalSales: 8,
    },
    createdAt: "2024-01-12T14:10:00Z",
    featured: true,
  },
  {
    id: "13",
    title: "Gaming Setup - Keyboard, Mouse & Headset",
    price: 8500,
    images: [
      "/images/img_14.jpg",
    ],
    category: "electronics",
    condition: "good",
    description:
      "Complete gaming setup including mechanical keyboard, gaming mouse, and RGB headset. Perfect for gaming and programming.",
    location: "Technical University of Kenya",
    seller: {
      id: "seller6",
      name: "Brian Mwangi",
      university: "Technical University of Kenya",
      rating: 4.4,
      totalSales: 19,
    },
    createdAt: "2024-01-10T16:45:00Z",
  },
  {
    id: "14",
    title: "HP Pavilion Laptop - 16GB RAM",
    price: 55000,
    images: [
      "/images/img_15.jpg",
    ],
    category: "electronics",
    condition: "good",
    description:
      "HP Pavilion laptop with Intel i5, 16GB RAM, 512GB SSD. Great for students and professionals.",
    location: "Kenyatta University",
    seller: {
      id: "seller12",
      name: "John Maina",
      university: "Kenyatta University",
      rating: 4.6,
      totalSales: 11,
    },
    createdAt: "2024-01-04T09:20:00Z",
  },
  {
    id: "15",
    title: "Samsung Galaxy S22 Ultra",
    price: 72000,
    images: [
      "/images/img_16.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "Samsung Galaxy S22 Ultra with S-Pen. Excellent condition, comes with original accessories.",
    location: "USIU-Africa",
    seller: {
      id: "seller13",
      name: "Alice Wanjiru",
      university: "USIU-Africa",
      rating: 4.9,
      totalSales: 27,
    },
    createdAt: "2024-01-03T14:15:00Z",
  },
  {
    id: "16",
    title: "iPad Pro 11-inch with Apple Pencil",
    price: 68000,
    images: [
      "/images/img_17.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "iPad Pro with Apple Pencil, perfect for digital art and note-taking. Includes keyboard case.",
    location: "Daystar University",
    seller: {
      id: "seller14",
      name: "Mark Kiprotich",
      university: "Daystar University",
      rating: 4.8,
      totalSales: 15,
    },
    createdAt: "2024-01-02T11:45:00Z",
  },
  {
    id: "17",
    title: "Dell XPS 13 Ultrabook",
    price: 78000,
    images: [
      "/images/img_18.jpg",
    ],
    category: "electronics",
    condition: "good",
    description:
      "Dell XPS 13 ultrabook, lightweight and powerful. Perfect for students on the go.",
    location: "Moi University",
    seller: {
      id: "seller15",
      name: "Lucy Cherop",
      university: "Moi University",
      rating: 4.7,
      totalSales: 13,
    },
    createdAt: "2024-01-01T16:30:00Z",
  },
  {
    id: "18",
    title: "Wireless Bluetooth Earbuds",
    price: 3500,
    images: [
      "/images/img_19.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "High-quality wireless earbuds with noise cancellation. Perfect for studying and music.",
    location: "Maseno University",
    seller: {
      id: "seller16",
      name: "Paul Otieno",
      university: "Maseno University",
      rating: 4.5,
      totalSales: 9,
    },
    createdAt: "2023-12-31T10:20:00Z",
  },
  {
    id: "19",
    title: "Portable External Hard Drive 2TB",
    price: 6500,
    images: [
      "/images/img_20.jpg",
    ],
    category: "electronics",
    condition: "good",
    description:
      "2TB portable external hard drive. Perfect for backing up files and storing large projects.",
    location: "Egerton University",
    seller: {
      id: "seller17",
      name: "Rose Njoroge",
      university: "Egerton University",
      rating: 4.6,
      totalSales: 12,
    },
    createdAt: "2023-12-30T13:45:00Z",
  },
  {
    id: "20",
    title: "Gaming Monitor 24-inch 144Hz",
    price: 25000,
    images: [
      "/images/img_21.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "24-inch gaming monitor with 144Hz refresh rate. Perfect for gaming and professional work.",
    location: "KCA University",
    seller: {
      id: "seller18",
      name: "Kevin Mwangi",
      university: "KCA University",
      rating: 4.8,
      totalSales: 17,
    },
    createdAt: "2023-12-29T08:30:00Z",
  },

  // Fashion & Clothing (10 items)
  {
    id: "21",
    title: "Vintage Denim Jacket - Trendy Campus Style",
    price: 2800,
    images: [
      "/images/img_22.jpg",
    ],
    category: "fashion",
    condition: "good",
    description:
      "Stylish vintage denim jacket perfect for campus life. Size Medium. Great for layering and casual outfits.",
    location: "USIU-Africa",
    seller: {
      id: "seller3",
      name: "Grace Wanjiku",
      university: "USIU-Africa",
      rating: 4.9,
      totalSales: 31,
    },
    createdAt: "2024-01-13T09:20:00Z",
  },
  {
    id: "22",
    title: "Nike Air Force 1 Sneakers - Size 42",
    price: 8500,
    images: [
      "/images/img_23.jpg",
    ],
    category: "fashion",
    condition: "like-new",
    description:
      "Classic Nike Air Force 1 sneakers in white. Size 42, worn only a few times. Perfect condition.",
    location: "University of Nairobi",
    seller: {
      id: "seller19",
      name: "Tony Kiprotich",
      university: "University of Nairobi",
      rating: 4.7,
      totalSales: 14,
    },
    createdAt: "2023-12-28T15:10:00Z",
  },
  {
    id: "23",
    title: "Formal Blazer - Professional Look",
    price: 4500,
    images: [
      "/images/img_24.jpg",
    ],
    category: "fashion",
    condition: "like-new",
    description:
      "Navy blue formal blazer, perfect for presentations and job interviews. Size Large.",
    location: "Strathmore University",
    seller: {
      id: "seller20",
      name: "Diana Wambui",
      university: "Strathmore University",
      rating: 4.8,
      totalSales: 20,
    },
    createdAt: "2023-12-27T12:30:00Z",
  },
  {
    id: "24",
    title: "Casual Summer Dress Collection",
    price: 3200,
    images: [
      "/images/img_25.jpg",
    ],
    category: "fashion",
    condition: "good",
    description:
      "Set of 3 casual summer dresses in different colors. Perfect for campus events and outings.",
    location: "Daystar University",
    seller: {
      id: "seller21",
      name: "Faith Mutindi",
      university: "Daystar University",
      rating: 4.6,
      totalSales: 18,
    },
    createdAt: "2023-12-26T10:45:00Z",
  },
  {
    id: "25",
    title: "Leather Backpack - Stylish & Functional",
    price: 5500,
    images: [
      "/images/img_26.jpg",
    ],
    category: "fashion",
    condition: "like-new",
    description:
      "Premium leather backpack with laptop compartment. Perfect for daily campus use.",
    location: "JKUAT",
    seller: {
      id: "seller22",
      name: "Daniel Mutua",
      university: "JKUAT",
      rating: 4.9,
      totalSales: 25,
    },
    createdAt: "2023-12-25T14:20:00Z",
  },
  {
    id: "26",
    title: "Adidas Track Suit - Size M",
    price: 6500,
    images: [
      "/images/adidas-track.jpeg",
    ],
    category: "fashion",
    condition: "good",
    description:
      "Adidas track suit in black and white. Size Medium, great for workouts and casual wear.",
    location: "Moi University",
    seller: {
      id: "seller23",
      name: "Samuel Ruto",
      university: "Moi University",
      rating: 4.5,
      totalSales: 11,
    },
    createdAt: "2023-12-24T09:15:00Z",
  },
  {
    id: "27",
    title: "Elegant Evening Gown",
    price: 7800,
    images: [
      "/images/evening-gown.jpg",
    ],
    category: "fashion",
    condition: "like-new",
    description:
      "Beautiful evening gown perfect for formal events and graduation ceremonies. Size Small.",
    location: "Maseno University",
    seller: {
      id: "seller24",
      name: "Esther Akinyi",
      university: "Maseno University",
      rating: 4.8,
      totalSales: 16,
    },
    createdAt: "2023-12-23T16:40:00Z",
  },
  {
    id: "28",
    title: "Canvas Sneakers - Comfortable Daily Wear",
    price: 2800,
    images: [
      "/images/img_29.jpg",
    ],
    category: "fashion",
    condition: "good",
    description:
      "Comfortable canvas sneakers perfect for daily campus walks. Size 40, multiple colors available.",
    location: "Egerton University",
    seller: {
      id: "seller25",
      name: "Joseph Kamau",
      university: "Egerton University",
      rating: 4.4,
      totalSales: 13,
    },
    createdAt: "2023-12-22T11:25:00Z",
  },
  {
    id: "29",
    title: "Winter Coat - Warm & Stylish",
    price: 6200,
    images: [
      "/images/winter-jacket.jpg",
    ],
    category: "fashion",
    condition: "like-new",   
    description:
      "Warm winter coat with hood. Perfect for cold weather. Size Large, worn only a few times.",
    location: "Technical University of Kenya",
    seller: {
      id: "seller26",
      name: "Rebecca Njeri",
      university: "Technical University of Kenya",
      rating: 4.7,
      totalSales: 19,
    },
    createdAt: "2023-12-21T13:50:00Z",
  },
  {
    id: "30",
    title: "Designer Handbag Collection",
    price: 4800,
    images: [
      "/images/img_31.jpg",
    ],
    category: "fashion",
    condition: "good",
    description:
      "Set of 2 designer handbags in different styles. Perfect for various occasions and outfits.",
    location: "KCA University",
    seller: {
      id: "seller27",
      name: "Mercy Wanjala",
      university: "KCA University",
      rating: 4.6,
      totalSales: 22,
    },
    createdAt: "2023-12-20T08:30:00Z",
  },

  // Appliances (10 items)
  {
    id: "31",
    title: "Mini Fridge - Perfect for Dorm Room",
    price: 12000,
    images: [
      "/images/img_32.jpg",
    ],
    category: "appliances",
    condition: "good",
    description:
      "Compact mini fridge ideal for dorm rooms or studio apartments. Energy efficient and barely used. Perfect for keeping drinks and snacks cold.",
    location: "Jomo Kenyatta University of Agriculture and Technology",
    seller: {
      id: "seller5",
      name: "Anne Mutiso",
      university: "JKUAT",
      rating: 4.5,
      totalSales: 12,
    },
    createdAt: "2024-01-11T11:30:00Z",
  },
  {
    id: "32",
    title: "Microwave Oven - 20L Capacity",
    price: 8500,
    images: [
      "/images/img_33.jpg",
    ],
    category: "appliances",
    condition: "like-new",
    description:
      "Compact microwave oven perfect for student accommodation. 20L capacity with multiple power settings.",
    location: "University of Nairobi",
    seller: {
      id: "seller28",
      name: "Collins Ombati",
      university: "University of Nairobi",
      rating: 4.8,
      totalSales: 16,
    },
    createdAt: "2023-12-19T14:15:00Z",
  },
  {
    id: "33",
    title: "Electric Kettle - Fast Boiling",
    price: 2200,
    images: [
      "/images/electric-kettle.jpg",
    ],
    category: "appliances",
    condition: "good",
    description:
      "Stainless steel electric kettle with auto shut-off feature. Perfect for making tea and coffee.",
    location: "Kenyatta University",
    seller: {
      id: "seller29",
      name: "Christine Wairimu",
      university: "Kenyatta University",
      rating: 4.6,
      totalSales: 14,
    },
    createdAt: "2023-12-18T10:30:00Z",
  },
  {
    id: "34",
    title: "Blender - Multi-purpose Kitchen Tool",
    price: 4500,
    images: [
      "/images/blender.jpg",
    ],
    category: "appliances",
    condition: "like-new",
    description:
      "Powerful blender perfect for smoothies, soups, and food preparation. Multiple speed settings.",
    location: "Strathmore University",
    seller: {
      id: "seller30",
      name: "Patrick Mwangi",
      university: "Strathmore University",
      rating: 4.7,
      totalSales: 18,
    },
    createdAt: "2023-12-17T15:45:00Z",
  },
  {
    id: "35",
    title: "Rice Cooker - 1.5L Capacity",
    price: 3800,
    images: [
      "/images/img_36.jpg",
    ],
    category: "appliances",
    condition: "good",
    description:
      "Automatic rice cooker with steaming function. Perfect for cooking rice and steaming vegetables.",
    location: "USIU-Africa",
    seller: {
      id: "seller31",
      name: "Agnes Muthoni",
      university: "USIU-Africa",
      rating: 4.5,
      totalSales: 12,
    },
    createdAt: "2023-12-16T09:20:00Z",
  },
  {
    id: "36",
    title: "Iron Box - Steam Function",
    price: 2800,
    images: [
      "/images/img_37.jpg",
    ],
    category: "appliances",
    condition: "like-new",
    description:
      "Steam iron with non-stick soleplate. Perfect for keeping clothes wrinkle-free.",
    location: "Daystar University",
    seller: {
      id: "seller32",
      name: "Francis Kiprotich",
      university: "Daystar University",
      rating: 4.8,
      totalSales: 21,
    },
    createdAt: "2023-12-15T12:10:00Z",
  },
  {
    id: "37",
    title: "Vacuum Cleaner - Portable",
    price: 6500,
    images: [
      "/images/img_38.jpg",
    ],
    category: "appliances",
    condition: "good",
    description:
      "Lightweight portable vacuum cleaner. Perfect for cleaning dorm rooms and small apartments.",
    location: "Moi University",
    seller: {
      id: "seller33",
      name: "Gladys Chepkoech",
      university: "Moi University",
      rating: 4.6,
      totalSales: 15,
    },
    createdAt: "2023-12-14T16:30:00Z",
  },
  {
    id: "38",
    title: "Coffee Maker - Automatic Drip",
    price: 5200,
    images: [
      "/images/img_39.jpg",
    ],
    category: "appliances",
    condition: "like-new",
    description:
      "Automatic drip coffee maker with timer function. Perfect for coffee lovers.",
    location: "Maseno University",
    seller: {
      id: "seller34",
      name: "Victor Odhiambo",
      university: "Maseno University",
      rating: 4.7,
      totalSales: 13,
    },
    createdAt: "2023-12-13T11:45:00Z",
  },
  {
    id: "39",
    title: "Toaster - 2-Slice Capacity",
    price: 3500,
    images: [
      "/images/toaster.jpg",
    ],
    category: "appliances",
    condition: "good",
    description:
      "2-slice toaster with adjustable browning settings. Perfect for quick breakfast preparation.",
    location: "Egerton University",
    seller: {
      id: "seller35",
      name: "Martha Wanjiku",
      university: "Egerton University",
      rating: 4.4,
      totalSales: 10,
    },
    createdAt: "2023-12-12T08:25:00Z",
  },
  {
    id: "40",
    title: "Water Dispenser - Hot & Cold",
    price: 15000,
    images: [
      "/images/water-dispenser.jpg",
    ],
    category: "appliances",
    condition: "like-new",
    description:
      "Hot and cold water dispenser with bottle storage. Perfect for offices and student accommodation.",
    location: "Technical University of Kenya",
    seller: {
      id: "seller36",
      name: "Robert Kiprotich",
      university: "Technical University of Kenya",
      rating: 4.9,
      totalSales: 24,
    },
    createdAt: "2023-12-11T13:55:00Z",
  },

  // Academic Tools (10 items)
  {
    id: "41",
    title: "Scientific Calculator - Casio fx-991ES",
    price: 2800,
    images: [
      "/images/calculator.jpeg",
    ],
    category: "academic-tools",
    condition: "like-new",
    description:
      "Advanced scientific calculator perfect for engineering and mathematics students. All functions working perfectly.",
    location: "University of Nairobi",
    seller: {
      id: "seller37",
      name: "George Mwangi",
      university: "University of Nairobi",
      rating: 4.8,
      totalSales: 17,
    },
    createdAt: "2023-12-10T10:20:00Z",
  },
  {
    id: "42",
    title: "Microscope - Student Grade",
    price: 12000,
    images: [
      "/images/microscope.jpeg",
    ],
    category: "academic-tools",
    condition: "good",
    description:
      "Student-grade microscope with multiple objectives. Perfect for biology and medical students.",
    location: "Kenyatta University",
    seller: {
      id: "seller38",
      name: "Dr. Jane Wanjiru",
      university: "Kenyatta University",
      rating: 4.9,
      totalSales: 28,
    },
    createdAt: "2023-12-09T14:40:00Z",
  },
  {
    id: "43",
    title: "Engineering Drawing Set",
    price: 3500,
    images: [
      "/images/img_44.jpg",
    ],
    category: "academic-tools",
    condition: "like-new",
    description:
      "Complete engineering drawing set with compass, rulers, and drawing tools. Essential for engineering students.",
    location: "JKUAT",
    seller: {
      id: "seller39",
      name: "Peter Mbugua",
      university: "JKUAT",
      rating: 4.7,
      totalSales: 15,
    },
    createdAt: "2023-12-08T09:30:00Z",
  },
  {
    id: "44",
    title: "Graphing Calculator - TI-84 Plus",
    price: 8500,
    images: [
      "/images/graphic-calculator.jpeg",
    ],
    category: "academic-tools",
    condition: "good",
    description:
      "TI-84 Plus graphing calculator. Perfect for advanced mathematics, statistics, and engineering courses.",
    location: "Strathmore University",
    seller: {
      id: "seller40",
      name: "Sarah Kimani",
      university: "Strathmore University",
      rating: 4.8,
      totalSales: 22,
    },
    createdAt: "2023-12-07T15:15:00Z",
  },
  {
    id: "45",
    title: "Lab Coat - Medical/Science Students",
    price: 1800,
    images: [
      "/images/labcoat.png",
    ],
    category: "academic-tools",
    condition: "like-new",
    description:
      "White lab coat for medical and science students. Size Large, barely used.",
    location: "Moi University",
    seller: {
      id: "seller41",
      name: "David Rutto",
      university: "Moi University",
      rating: 4.6,
      totalSales: 11,
    },
    createdAt: "2023-12-06T11:50:00Z",
  },
  {
    id: "46",
    title: "Digital Multimeter - Fluke 115",
    price: 15000,
    images: [
      "/images/img_47.jpg",
    ],
    category: "academic-tools",
    condition: "like-new",
    description:
      "Professional digital multimeter perfect for electrical and electronics students. Accurate and reliable.",
    location: "Technical University of Kenya",
    seller: {
      id: "seller42",
      name: "James Ochieng",
      university: "Technical University of Kenya",
      rating: 4.9,
      totalSales: 26,
    },
    createdAt: "2023-12-05T16:25:00Z",
  },
  {
    id: "47",
    title: "Stethoscope - Medical Students",
    price: 5500,
    images: [
      "/images/stethoscope.jpeg",
    ],
    category: "academic-tools",
    condition: "good",
    description:
      "Professional stethoscope for medical students. Good acoustic quality, comes with extra ear tips.",
    location: "Maseno University",
    seller: {
      id: "seller43",
      name: "Dr. Mary Achieng",
      university: "Maseno University",
      rating: 4.8,
      totalSales: 19,
    },
    createdAt: "2023-12-04T12:10:00Z",
  },
  {
    id: "48",
    title: "Protractor Set - Architecture Students",
    price: 2200,
    images: [
      "/images/protractor.jpg",
    ],
    category: "academic-tools",
    condition: "like-new",
    description:
      "Professional protractor set for architecture and engineering students. High precision tools.",
    location: "Daystar University",
    seller: {
      id: "seller44",
      name: "Michael Waweru",
      university: "Daystar University",
      rating: 4.5,
      totalSales: 8,
    },
    createdAt: "2023-12-03T08:45:00Z",
  },
  {
    id: "49",
    title: "Safety Goggles - Lab Use",
    price: 1200,
    images: [
      "/images/img_50.jpg",
    ],
    category: "academic-tools",
    condition: "new",
    description:
      "Safety goggles for laboratory use. Essential for chemistry and physics practicals.",
    location: "USIU-Africa",
    seller: {
      id: "seller45",
      name: "Grace Mutindi",
      university: "USIU-Africa",
      rating: 4.7,
      totalSales: 14,
    },
    createdAt: "2023-12-02T14:30:00Z",
  },
  {
    id: "50",
    title: "Slide Rule - Engineering Classic",
    price: 3800,
    images: [
      "/images/img_51.jpg",
    ],
    category: "academic-tools",
    condition: "good",
    description:
      "Classic slide rule for engineering calculations. Great for understanding fundamental principles.",
    location: "Egerton University",
    seller: {
      id: "seller46",
      name: "Prof. John Kamau",
      university: "Egerton University",
      rating: 4.9,
      totalSales: 32,
    },
    createdAt: "2023-12-01T10:15:00Z",
  },

  // Sports & Recreation (10 items)
  {
    id: "51",
    title: "Football - Official Size",
    price: 2500,
    images: [
      "/images/football.jpg",
    ],
    category: "sports",
    condition: "good",
    description:
      "Official size football in good condition. Perfect for campus games and training.",
    location: "University of Nairobi",
    seller: {
      id: "seller47",
      name: "Kevin Omondi",
      university: "University of Nairobi",
      rating: 4.6,
      totalSales: 12,
    },
    createdAt: "2023-11-30T13:20:00Z",
  },
  {
    id: "52",
    title: "Basketball - Indoor/Outdoor",
    price: 2800,
    images: [
      "/images/img_53.jpg",
    ],
    category: "sports",
    condition: "like-new",
    description:
      "High-quality basketball suitable for both indoor and outdoor courts. Excellent grip and bounce.",
    location: "Strathmore University",
    seller: {
      id: "seller48",
      name: "Mark Kiprotich",
      university: "Strathmore University",
      rating: 4.8,
      totalSales: 18,
    },
    createdAt: "2023-11-29T09:45:00Z",
  },
  {
    id: "53",
    title: "Tennis Racket - Wilson Pro Staff",
    price: 8500,
    images: [
      "/images/racket.jpeg",
    ],
    category: "sports",
    condition: "good",
    description:
      "Wilson Pro Staff tennis racket with grip tape. Perfect for intermediate to advanced players.",
    location: "USIU-Africa",
    seller: {
      id: "seller49",
      name: "Linda Wanjiru",
      university: "USIU-Africa",
      rating: 4.7,
      totalSales: 16,
    },
    createdAt: "2023-11-28T15:30:00Z",
  },
  {
    id: "54",
    title: "Gym Dumbbells Set - 5kg each",
    price: 4500,
    images: [
      "/images/dumbbells.jpeg",
    ],
    category: "sports",
    condition: "good",
    description:
      "Set of 2 dumbbells, 5kg each. Perfect for home workouts and strength training.",
    location: "Kenyatta University",
    seller: {
      id: "seller50",
      name: "Paul Mwangi",
      university: "Kenyatta University",
      rating: 4.5,
      totalSales: 9,
    },
    createdAt: "2023-11-27T11:15:00Z",
  },
  {
    id: "55",
    title: "Yoga Mat - Premium Quality",
    price: 2200,
    images: [
      "/images/img_56.jpg",
    ],
    category: "sports",
    condition: "like-new",
    description:
      "Premium quality yoga mat with excellent grip and cushioning. Perfect for yoga and fitness routines.",
    location: "Daystar University",
    seller: {
      id: "seller51",
      name: "Nancy Wambui",
      university: "Daystar University",
      rating: 4.9,
      totalSales: 23,
    },
    createdAt: "2023-11-26T16:40:00Z",
  },
  {
    id: "56",
    title: "Swimming Goggles - Professional",
    price: 1800,
    images: [
      "/images/img_57.jpg",
    ],
    category: "sports",
    condition: "like-new",
    description:
      "Professional swimming goggles with anti-fog coating. Perfect for pool training and competitions.",
    location: "Moi University",
    seller: {
      id: "seller52",
      name: "Brian Kiplagat",
      university: "Moi University",
      rating: 4.6,
      totalSales: 11,
    },
    createdAt: "2023-11-25T08:25:00Z",
  },
  {
    id: "57",
    title: "Badminton Racket Set",
    price: 3500,
    images: [
      "/images/img_58.jpg",
    ],
    category: "sports",
    condition: "good",
    description:
      "Set of 2 badminton rackets with shuttlecocks. Perfect for recreational games and tournaments.",
    location: "JKUAT",
    seller: {
      id: "seller53",
      name: "Alice Njeri",
      university: "JKUAT",
      rating: 4.7,
      totalSales: 15,
    },
    createdAt: "2023-11-24T12:50:00Z",
  },
  {
    id: "58",
    title: "Running Shoes - Nike Air Zoom",
    price: 6500,
    images: [
      "/images/img_59.jpg",
    ],
    category: "sports",
    condition: "good",
    description:
      "Nike Air Zoom running shoes, size 42. Great for jogging and athletic training.",
    location: "Maseno University",
    seller: {
      id: "seller54",
      name: "Samuel Ochieng",
      university: "Maseno University",
      rating: 4.8,
      totalSales: 20,
    },
    createdAt: "2023-11-23T14:35:00Z",
  },
  {
    id: "59",
    title: "Volleyball - Official Size",
    price: 2800,
    images: [
      "/images/img_60.jpg",
    ],
    category: "sports",
    condition: "like-new",
    description:
      "Official size volleyball in excellent condition. Perfect for beach and indoor volleyball.",
    location: "Technical University of Kenya",
    seller: {
      id: "seller55",
      name: "Grace Cherotich",
      university: "Technical University of Kenya",
      rating: 4.5,
      totalSales: 7,
    },
    createdAt: "2023-11-22T10:10:00Z",
  },
  {
    id: "60",
    title: "Cycling Helmet - Safety First",
    price: 3200,
    images: [
      "/images/cycling-helmet.jpg",
    ],
    category: "sports",
    condition: "like-new",
    description:
      "Professional cycling helmet with ventilation system. Essential safety gear for cycling enthusiasts.",
    location: "Egerton University",
    seller: {
      id: "seller56",
      name: "Dennis Kipkorir",
      university: "Egerton University",
      rating: 4.9,
      totalSales: 25,
    },
    createdAt: "2023-11-21T17:05:00Z",
  },
  {
    id: "100",
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 42000,
    images: [
      "/images/img_62.jpg",
    ],
    category: "electronics",
    condition: "like-new",
    description:
      "Industry-leading noise canceling headphones. Crystal clear sound, 30 hours battery life, and ultra-comfortable fit. Perfect for study, travel, and music lovers.",
    location: "Kenyatta University",
    seller: {
      id: "seller99",
      name: "Janet Muthoni",
      avatar:
        "/images/img_63.jpg",
      university: "Kenyatta University",
      rating: 4.9,
      totalSales: 34,
    },
    createdAt: "2024-01-20T09:00:00Z",
    featured: true,
  },
];
