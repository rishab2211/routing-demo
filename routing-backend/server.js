const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99 },
  { id: 3, title: '1984', author: 'George Orwell', price: 13.99 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 11.99 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 15.99 }
];

const users = [
  { id: 123, name: 'John Doe', email: 'john@example.com' },
  { id: 456, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 789, name: 'Bob Johnson', email: 'bob@example.com' }
];

const posts = [
  { id: 456, userId: 123, title: 'My First Post', content: 'This is my first blog post!' },
  { id: 789, userId: 123, title: 'Learning React', content: 'React is amazing for building UIs.' },
  { id: 101, userId: 456, title: 'Web Development Tips', content: 'Here are some useful tips...' }
];

const productsV1 = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Phone', price: 699.99 }
];

const productsV2 = [
  { id: 1, title: 'Laptop', price: 999.99 },
  { id: 2, title: 'Phone', price: 699.99 }
];

// 1. STATIC ROUTES
// Get all books
app.get('/api/books', (req, res) => {
  res.json({
    message: 'Static Route - GET all books',
    data: books
  });
});

// Create a new book
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title || 'New Book',
    author: req.body.author || 'Unknown Author',
    price: req.body.price || 10.99
  };
  books.push(newBook);
  
  res.json({
    message: 'Static Route - POST new book created',
    data: books
  });
});

// 2. DYNAMIC ROUTES (Path Parameters)
// Get specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({
    message: `Dynamic Route - GET user with ID: ${userId}`,
    data: user,
    extractedId: userId
  });
});

// 3. QUERY PARAMETERS
// Search with query parameters
app.get('/api/search', (req, res) => {
  const { query, limit = 10, page = 1 } = req.query;
  
  res.json({
    message: 'Query Parameters Demo',
    searchQuery: query,
    pagination: {
      limit: parseInt(limit),
      page: parseInt(page)
    },
    data: `Search results for: ${query || 'all items'}`
  });
});

// Pagination example
app.get('/api/books/paginated', (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  
  const paginatedBooks = books.slice(startIndex, endIndex);
  
  res.json({
    message: 'Pagination with Query Parameters',
    data: paginatedBooks,
    metadata: {
      total: books.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(books.length / limit),
      limit: parseInt(limit)
    }
  });
});

// 4. NESTED ROUTES
// Get all posts by a specific user
app.get('/api/users/:userId/posts', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userPosts = posts.filter(post => post.userId === userId);
  
  res.json({
    message: `Nested Route - GET all posts by user ${userId}`,
    data: userPosts,
    userId: userId
  });
});

// Get specific post by specific user
app.get('/api/users/:userId/posts/:postId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);
  
  const post = posts.find(p => p.id === postId && p.userId === userId);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found for this user' });
  }
  
  res.json({
    message: `Nested Route - GET post ${postId} by user ${userId}`,
    data: post,
    parameters: {
      userId: userId,
      postId: postId
    }
  });
});

// 5. ROUTE VERSIONING
// Version 1 API
app.get('/api/v1/products', (req, res) => {
  res.json({
    message: 'Version 1 API - Products with "name" field',
    version: 'v1',
    data: productsV1
  });
});

// Version 2 API (breaking change: name -> title)
app.get('/api/v2/products', (req, res) => {
  res.json({
    message: 'Version 2 API - Products with "title" field',
    version: 'v2',
    data: productsV2,
    deprecationNotice: 'v1 is deprecated, please migrate to v2'
  });
});

// 6. CATCH-ALL ROUTE (404 handler)
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Catch-All Route - Endpoint not found',
    requestedPath: req.path,
    method: req.method,
    availableEndpoints: [
      'GET /api/books',
      'POST /api/books',
      'GET /api/users/:id',
      'GET /api/search',
      'GET /api/books/paginated',
      'GET /api/users/:userId/posts',
      'GET /api/users/:userId/posts/:postId',
      'GET /api/v1/products',
      'GET /api/v2/products'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\n🚀 Available Routes:');
  console.log('📚 Static Routes:');
  console.log('  GET  /api/books');
  console.log('  POST /api/books');
  console.log('\n👤 Dynamic Routes:');
  console.log('  GET /api/users/:id');
  console.log('\n🔍 Query Parameters:');
  console.log('  GET /api/search?query=value&limit=10&page=1');
  console.log('  GET /api/books/paginated?page=1&limit=2');
  console.log('\n🔗 Nested Routes:');
  console.log('  GET /api/users/:userId/posts');
  console.log('  GET /api/users/:userId/posts/:postId');
  console.log('\n📦 Versioned Routes:');
  console.log('  GET /api/v1/products');
  console.log('  GET /api/v2/products');
  console.log('\n❌ Catch-All:');
  console.log('  GET /* (any undefined route)');
});

module.exports = app;