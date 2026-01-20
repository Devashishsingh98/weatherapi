// Product Database for Bhilai Shopping Store
const productsData = {
  categories: [
    {
      id: 'groceries',
      name: 'Groceries',
      icon: 'fas fa-utensils',
      description: 'Fresh fruits, vegetables, and daily essentials'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: 'fas fa-tshirt',
      description: 'Trendy clothing and accessories for all ages'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: 'fas fa-mobile-alt',
      description: 'Mobile phones and electronic gadgets'
    },
    {
      id: 'home-kitchen',
      name: 'Home & Kitchen',
      icon: 'fas fa-home',
      description: 'Household items and kitchen appliances'
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: 'fas fa-pills',
      description: 'Medicines and healthcare products'
    },
    {
      id: 'bakery',
      name: 'Bakery',
      icon: 'fas fa-birthday-cake',
      description: 'Fresh bread, cakes, and confectionery'
    }
  ],

  products: [
    // Groceries
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'groceries',
      price: 40,
      originalPrice: 50,
      discount: 20,
      rating: 4.5,
      reviews: 128,
      stock: 50,
      unit: 'kg',
      description: 'Fresh, juicy organic tomatoes grown locally in Chhattisgarh. Perfect for salads, cooking, and making sauces.',
      longDescription: 'Our organic tomatoes are grown without any chemical pesticides or fertilizers. Each tomato is hand-picked at peak ripeness to ensure maximum flavor and nutrition. Rich in vitamins A and C, these tomatoes are perfect for maintaining a healthy diet.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iNjAiIGZpbGw9IiNFRjQ0NEEiLz4KPHN2ZyB4PSIxNDAiIHk9IjE0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC40MTcgMiA2IDQuNDE3IDYgOEM2IDExLjU4MyA4LjQxNyAxNCAxMiAxNFMxOCAxMS41ODMgMTggOEMxOCA0LjQxNyAxNS41ODMgMiAxMiAyWk0xMCA4QzEwIDYuOSAxMC45IDYgMTIgNkMxMy4xIDYgMTQgNi45IDE0IDhTMTMuMSA5IDEyIDlDMTAgOSAxMCA4LjEgMTAgOFoiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2Zz4KPHRleHQgeD0iMjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+U3dlZXQgT3JnYW5pYyBUb21hdG9lczwvdGV4dD4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNFRjQ0NEEiLz4KPGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSI0MCIgZmlsbD0iI0VGRjQ0NEEiLz4KPHRleHQgeD0iMjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+RnJlc2ggJm9tcDsgSnVpY3k8L3RleHQ+Cjwvc3ZnPg==',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwTDE1MCAyMDBMMjUwIDIwMFoiIGZpbGw9IiNFRjQ0NEEiLz4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+T3JnYW5pYyBRdWFsaXR5PC90ZXh0Pgo8L3N2Zz4='
      ],
      tags: ['organic', 'fresh', 'vegetable', 'healthy'],
      reviews: [
        { user: 'Rahul Sharma', rating: 5, comment: 'Very fresh and tasty tomatoes!', date: '2024-01-15' },
        { user: 'Priya Patel', rating: 4, comment: 'Good quality, will buy again.', date: '2024-01-10' },
        { user: 'Amit Kumar', rating: 5, comment: 'Perfect for making sauces.', date: '2024-01-08' }
      ]
    },
    {
      id: 2,
      name: 'Premium Basmati Rice',
      category: 'groceries',
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.8,
      reviews: 95,
      stock: 25,
      unit: 'kg',
      description: 'Long grain premium basmati rice from the finest farms. Perfect for biryani and daily meals.',
      longDescription: 'Our premium basmati rice is sourced from the best rice-growing regions. Each grain is long, slender, and aromatic, making it perfect for traditional Indian dishes like biryani, pulao, and everyday meals.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xMDAgMjAwUTUwIDIwMCA1MCAxNTBRNTAgMTAwIDEwMCAxMDBMMzAwIDEwMFExNTAgMTAwIDIwMCAxNTBRMjUwIDIwMCAyMDAgMjAwTDEwMCAyMDAiIGZpbGw9IiNGQkY3QjciLz4KPHN2ZyB4PSIxNDAiIHk9IjE0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC40MTcgMiA2IDQuNDE3IDYgOEM2IDExLjU4MyA4LjQxNyAxNCAxMiAxNFMxOCAxMS41ODMgMTggOEMxOCA0LjQxNyAxNS41ODMgMiAxMiAyWk0xMCA4QzEwIDYuOSAxMC45IDYgMTIgNkMxMy4xIDYgMTQgNi45IDE0IDhTMTMuMSA5IDEyIDlDMTAgOSAxMCA4LjEgMTAgOFoiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2Zz4KPHRleHQgeD0iMjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+UHJlbWl1bSBCYXNtYXRpIFJpY2U8L3RleHQ+Cjwvc3ZnPg==',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iODAiIGZpbGw9IiNGQkY3QjciLz4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+TG9uZyBHcmFpbiBBcm9tYTwvdGV4dD4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwTDE4MCAxODBMMTUwIDIxMEwxMjAgMTgwWiIgc3Ryb2tlPSIjRkJGN0I3IiBzdHJva2Utd2lkdGg9IjEwIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkZpbmlzaCBGb3IgQmlyeWFuaTwvdGV4dD4KPHN2Zz4K'
      ],
      tags: ['rice', 'basmati', 'premium', 'aromatic'],
      reviews: [
        { user: 'Sunita Gupta', rating: 5, comment: 'Perfect for biryani making!', date: '2024-01-12' },
        { user: 'Rajesh Verma', rating: 5, comment: 'Best basmati rice I\'ve tried.', date: '2024-01-09' },
        { user: 'Meera Singh', rating: 4, comment: 'Good quality and aroma.', date: '2024-01-05' }
      ]
    },

    // Fashion
    {
      id: 3,
      name: 'Cotton Kurti - Blue',
      category: 'fashion',
      price: 450,
      originalPrice: 600,
      discount: 25,
      rating: 4.3,
      reviews: 67,
      stock: 15,
      unit: 'piece',
      description: 'Beautiful hand-block printed cotton kurti. Comfortable and stylish for everyday wear.',
      longDescription: 'This elegant cotton kurti features traditional hand-block printing with modern design elements. Made from 100% pure cotton, it\'s perfect for all seasons. The comfortable fit and beautiful patterns make it ideal for casual outings and office wear.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNTAgNTBMMjUwIDUwTDIyMCAxNTBMMjIwIDI1MEwxODAgMjUwTDE4MCAxNTBaIiBmaWxsPSIjM0I4MkZDNiIvPgo8Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkNvdHRvbiBLdXJ0aSAtIEJsdWU8L3RleHQ+Cjwvc3ZnPg==',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgNjBMMjYwIDYwTDI0MCAxNDBMMjQwIDI2MEwxNjAgMjYwTDE2MCAxNDBaIiBmaWxsPSIjM0I4MkZDNiIvPgo8dGV4dCB4PSIyMDAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5IYW5kLUJsb2NrIFByaW50PC90ZXh0Pgo8L3N2Zz4=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiMzQjgyRkM2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkNvbWZvcnRhYmxlIEZpdDwvdGV4dD4KPHN2Zz4K'
      ],
      tags: ['kurti', 'cotton', 'traditional', 'comfortable'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blue', 'Red', 'Green', 'Pink'],
      reviews: [
        { user: 'Kavita Jain', rating: 5, comment: 'Beautiful kurti, perfect fit!', date: '2024-01-14' },
        { user: 'Anjali Sharma', rating: 4, comment: 'Comfortable for daily wear.', date: '2024-01-11' },
        { user: 'Poonam Gupta', rating: 4, comment: 'Nice print and good quality.', date: '2024-01-08' }
      ]
    },

    // Electronics
    {
      id: 4,
      name: 'Samsung Galaxy M32',
      category: 'electronics',
      price: 14999,
      originalPrice: 18999,
      discount: 21,
      rating: 4.4,
      reviews: 234,
      stock: 8,
      unit: 'piece',
      description: 'Powerful smartphone with 64MP camera, 6000mAh battery, and stunning display.',
      longDescription: 'The Samsung Galaxy M32 comes with a massive 6000mAh battery that keeps you powered throughout the day. Featuring a 64MP quad camera setup, 6.4-inch Super AMOLED display, and MediaTek Helio G80 processor, this phone delivers exceptional performance at an affordable price.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgODBMMjYwIDgwTDI2MCAzMjBMMTQwIDMyMFoiIGZpbGw9IiMxQTFBMUEiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI1MCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5TTR2PC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5TYW1zdW5nIEdhbGF4eSBNMzI8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPjY0TVAgUGx1cyBDYW1lcmE8L3RleHQ+Cjwvc3ZnPg==',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgODBMMjYwIDgwTDI2MCAzMjBMMTQwIDMyMFoiIGZpbGw9IiMxQTFBMUEiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByIjcwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPjYwMDBtQWg8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkJhdHRlcnkgTGlmZTwvdGV4dD4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgODBMMjYwIDgwTDI2MCAzMjBMMTQwIDMyMFoiIGZpbGw9IiMxQTFBMUEiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByIjcwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjIyMCIgcj0iMzAiIGZpbGw9IiMzQjgyRkM2Ii8+CjxjaXJjbGUgY3g9IjI0MCIgY3k9IjIyMCIgcj0iMzAiIGZpbGw9IiNGRjZCNzUiLz4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+U3VwZXIgQU1PTEVEPC90ZXh0Pgo8L3N2Zz4='
      ],
      tags: ['smartphone', 'samsung', 'camera', 'battery'],
      specifications: {
        display: '6.4-inch Super AMOLED',
        camera: '64MP + 8MP + 2MP + 2MP',
        battery: '6000mAh',
        processor: 'MediaTek Helio G80',
        ram: '6GB',
        storage: '128GB',
        os: 'Android 11'
      },
      reviews: [
        { user: 'Amit Sharma', rating: 5, comment: 'Amazing battery life and camera!', date: '2024-01-13' },
        { user: 'Priya Singh', rating: 4, comment: 'Good value for money.', date: '2024-01-10' },
        { user: 'Rahul Kumar', rating: 4, comment: 'Display is stunning.', date: '2024-01-07' }
      ]
    },

    // Home & Kitchen
    {
      id: 5,
      name: 'Prestige Pressure Cooker',
      category: 'home-kitchen',
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      rating: 4.6,
      reviews: 156,
      stock: 12,
      unit: 'piece',
      description: '5L stainless steel pressure cooker with safety features. Perfect for Indian cooking.',
      longDescription: 'This Prestige pressure cooker is made from high-quality stainless steel and features multiple safety mechanisms. The 5L capacity is perfect for medium-sized families. It comes with a warranty and is designed for efficient cooking of rice, dal, and vegetables.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMTAwIiBmaWxsPSIjQzRDNEM0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iODAiIGZpbGw9IiNGOUY5RjkiLz4KPHN2ZyB4PSIxNDAiIHk9IjE0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC40MTcgMiA2IDQuNDE3IDYgOEM2IDExLjU4MyA4LjQxNyAxNCAxMiAxNFMxOCAxMS41ODMgMTggOEMxOCA0LjQxNyAxNS41ODMgMiAxMiAyWk0xMCA4QzEwIDYuOSAxMC45IDYgMTIgNkMxMy4xIDYgMTQgNi45IDE0IDhTMTMuMSA5IDEyIDlDMTAgOSAxMCA4LjEgMTAgOFoiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2Zz4KPHRleHQgeD0iMjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+UHJlc3RpZ2UgNSwgUHJlc3N1cmUgQ29va2VyPC90ZXh0Pgo8L3N2Zz4=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMTEwIiBmaWxsPSIjQzRDNEM0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj41TDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+U3RhaW5sZXNzIFN0ZWVsPC90ZXh0Pgo8L3N2Zz4=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMTEwIiBmaWxsPSIjQzRDNEM0Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjIyMCIgcj0iMTUiIGZpbGw9IiNGMzY2MUEiLz4KPGNpcmNsZSBjeD0iMjQwIiBjeT0iMjIwIiByPSIxNSIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIyMDAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5TYWZldHkgRmVhdHVyZXM8L3RleHQ+Cjwvc3ZnPg=='
      ],
      tags: ['pressure-cooker', 'kitchen', 'cooking', 'stainless-steel'],
      specifications: {
        capacity: '5L',
        material: 'Stainless Steel',
        safetyFeatures: 'Multiple safety valves',
        warranty: '5 years'
      },
      reviews: [
        { user: 'Sunita Mehta', rating: 5, comment: 'Excellent quality and very safe!', date: '2024-01-12' },
        { user: 'Rajendra Prasad', rating: 4, comment: 'Good for daily cooking.', date: '2024-01-09' },
        { user: 'Kavita Singh', rating: 5, comment: 'Worth the price, very durable.', date: '2024-01-06' }
      ]
    },

    // Pharmacy
    {
      id: 6,
      name: 'Paracetamol Tablets 500mg',
      category: 'pharmacy',
      price: 25,
      originalPrice: null,
      discount: 0,
      rating: 4.7,
      reviews: 89,
      stock: 100,
      unit: 'strip',
      description: 'Effective pain relief and fever reducer. Contains 10 tablets per strip.',
      longDescription: 'Paracetamol 500mg tablets provide effective relief from headache, body ache, and fever. Each strip contains 10 tablets. Always consult a doctor before use and follow the prescribed dosage.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgMTAwTDI2MCAxMDBMMjYwIDMwMEwxNDAgMzAwWiIgc3Ryb2tlPSIjRjM2NjE5IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9IiNGRkYiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI0MCIgZmlsbD0iI0YzNjYxOSIgbm9uZT0iMCIvPgo8dGV4dCB4PSIyMDAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+UGFzPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj41MDBtZyAxMCBUYWJsZXRzPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzMzMyIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5Q29uc3VsdCBEb2N0b3IgQmVmb3JlIFVzZTwvdGV4dD4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgMTAwTDI2MCAxMDBMMjYwIDMwMEwxNDAgMzAwWiIgc3Ryb2tlPSIjRjM2NjE5IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9IiNGRkYiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByIzUwIiBmaWxsPSIjRjNGM0YzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj5QYXI8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkFjZXRhbWlub3BoZW48L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPkZldmVyICYmbXBwOyBQYWluIFJlbGllZjwvdGV4dD4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxwYXRoIGQ9Ik0xNDAgMTAwTDI2MCAxMDBMMjYwIDMwMEwxNDAgMzAwWiIgc3Ryb2tlPSIjRjM2NjE5IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9IiNGRkYiLz4KPHJlY3QgeD0iMTgwIiB5PSIxODAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0YzNjYxOSIgbm9uZT0iMCIvPgo8cmVjdCB4PSIxODAiIHk9IjIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjQzM2NjE5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPk1lZGljYWwgR3JhZGU8L3RleHQ+Cjwvc3ZnPg=='
      ],
      tags: ['medicine', 'pain-relief', 'fever', 'pharmacy'],
      specifications: {
        activeIngredient: 'Paracetamol 500mg',
        tabletsPerStrip: '10',
        dosage: 'As directed by physician',
        storage: 'Store in cool, dry place'
      },
      reviews: [
        { user: 'Dr. Sharma', rating: 5, comment: 'Effective and reliable medication.', date: '2024-01-11' },
        { user: 'Ritu Jain', rating: 4, comment: 'Works well for fever.', date: '2024-01-08' },
        { user: 'Vijay Kumar', rating: 5, comment: 'Good quality tablets.', date: '2024-01-05' }
      ]
    },

    // Bakery
    {
      id: 7,
      name: 'Fresh Chocolate Cake',
      category: 'bakery',
      price: 450,
      originalPrice: 550,
      discount: 18,
      rating: 4.9,
      reviews: 203,
      stock: 6,
      unit: 'kg',
      description: 'Rich and moist chocolate cake made with premium cocoa. Perfect for celebrations.',
      longDescription: 'Our signature chocolate cake is made with the finest cocoa and fresh ingredients. Each cake is baked fresh daily and decorated beautifully. Available in 1kg and 2kg sizes. Custom orders and decorations available.',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMTEwIiBmaWxsPSIjM0UyNTI1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iODAiIGZpbGw9IiM2MzQ3MzciLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTYwIiByPSIyMCIgZmlsbD0iI0ZGRDMzQi8+CjxjaXJjbGUgY3g9IjIyMCIgY3k9IjIyMCIgcj0iMTUiIGZpbGw9IiNGRkRDQzMiLz4KPHRleHQgeD0iMjAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+RnJlc2ggQ2hvY29sYXRlIENha2U8L3RleHQ+Cjwvc3ZnPg==',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMTEwIiBmaWxsPSIjM0UyNTI1Ii8+CjxwYXRoIGQ9Ik0xNDAgMjIwTDE4MCAyNDBMMjIwIDIyMFoiIGZpbGw9IiNGRkRDQzMiLz4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+UHJlbWl1bSBDYWthbyAmYW1wOyBGcmVzaCBDcmVhbTwvdGV4dD4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjRGNEY0Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMTEwIiBmaWxsPSIjM0UyNTI1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj4xSBLZzwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMzMzMiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiI+Q3VzdG9tIERlY29yYXRpb25zPC90ZXh0Pgo8L3N2Zz4K'
      ],
      tags: ['cake', 'chocolate', 'bakery', 'celebration'],
      sizes: ['500g', '1kg', '2kg'],
      flavors: ['Chocolate', 'Vanilla', 'Strawberry', 'Butterscotch'],
      reviews: [
        { user: 'Priya Sharma', rating: 5, comment: 'Absolutely delicious! Best cake ever!', date: '2024-01-15' },
        { user: 'Rahul Gupta', rating: 5, comment: 'Perfect for birthday celebrations.', date: '2024-01-12' },
        { user: 'Anjali Verma', rating: 5, comment: 'Fresh and moist, highly recommended!', date: '2024-01-09' }
      ]
    }
  ],

  users: [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      address: 'Sector 5, Bhilai, Chhattisgarh',
      orders: []
    }
  ],

  orders: [],
  cart: []
};

// Helper functions
function getProductById(id) {
  return productsData.products.find(product => product.id === id);
}

function getProductsByCategory(category) {
  return productsData.products.filter(product => product.category === category);
}

function searchProducts(query) {
  const lowercaseQuery = query.toLowerCase();
  return productsData.products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

function getFeaturedProducts() {
  return productsData.products.filter(product => product.rating >= 4.5).slice(0, 8);
}