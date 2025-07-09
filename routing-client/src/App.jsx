import { useState } from 'react';
import { ChevronRight, Book, Users, Search, Layers, Package, AlertCircle, Play, Code, Database } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL;

const RouteDemo = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      if (body) {
        options.body = JSON.stringify(body);
      }
      
      const res = await fetch(url, options);
      const data = await res.json();
      
      setResponse({
        status: res.status,
        url,
        method,
        data
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const demos = [
    {
      id: 'static',
      title: 'Static Routes',
      icon: <Book className="w-5 h-5" />,
      description: 'Routes with fixed paths that never change',
      examples: [
        {
          name: 'GET All Books',
          method: 'GET',
          url: `${API_BASE}/api/books`,
          description: 'Fetch all books - static route'
        },
        {
          name: 'POST New Book',
          method: 'POST',
          url: `${API_BASE}/api/books`,
          body: { title: 'New Book', author: 'Demo Author', price: 19.99 },
          description: 'Create a new book - same route, different method'
        }
      ]
    },
    {
      id: 'dynamic',
      title: 'Dynamic Routes (Path Parameters)',
      icon: <Users className="w-5 h-5" />,
      description: 'Routes with variable parameters like :id',
      examples: [
        {
          name: 'GET User by ID',
          method: 'GET',
          url: `${API_BASE}/api/users/123`,
          description: 'Fetch user with ID 123 - dynamic parameter'
        },
        {
          name: 'GET Another User',
          method: 'GET',
          url: `${API_BASE}/api/users/456`,
          description: 'Fetch user with ID 456 - same pattern, different ID'
        }
      ]
    },
    {
      id: 'query',
      title: 'Query Parameters',
      icon: <Search className="w-5 h-5" />,
      description: 'Parameters sent as key-value pairs after ?',
      examples: [
        {
          name: 'Search with Query',
          method: 'GET',
          url: `${API_BASE}/api/search?query=react&limit=5&page=1`,
          description: 'Search with query parameters'
        },
        {
          name: 'Paginated Books',
          method: 'GET',
          url: `${API_BASE}/api/books/paginated?page=1&limit=2`,
          description: 'Pagination using query parameters'
        },
        {
          name: 'Next Page',
          method: 'GET',
          url: `${API_BASE}/api/books/paginated?page=2&limit=2`,
          description: 'Get next page of results'
        }
      ]
    },
    {
      id: 'nested',
      title: 'Nested Routes',
      icon: <Layers className="w-5 h-5" />,
      description: 'Routes that express resource relationships',
      examples: [
        {
          name: 'User Posts',
          method: 'GET',
          url: `${API_BASE}/api/users/123/posts`,
          description: 'Get all posts by user 123'
        },
        {
          name: 'Specific Post',
          method: 'GET',
          url: `${API_BASE}/api/users/123/posts/456`,
          description: 'Get specific post 456 by user 123'
        }
      ]
    },
    {
      id: 'versioning',
      title: 'Route Versioning',
      icon: <Package className="w-5 h-5" />,
      description: 'API versioning for managing changes',
      examples: [
        {
          name: 'V1 Products',
          method: 'GET',
          url: `${API_BASE}/api/v1/products`,
          description: 'Version 1 API - uses "name" field'
        },
        {
          name: 'V2 Products',
          method: 'GET',
          url: `${API_BASE}/api/v2/products`,
          description: 'Version 2 API - uses "title" field (breaking change)'
        }
      ]
    },
    {
      id: 'catchall',
      title: 'Catch-All Route',
      icon: <AlertCircle className="w-5 h-5" />,
      description: 'Handle requests to non-existent endpoints',
      examples: [
        {
          name: 'Non-existent Route',
          method: 'GET',
          url: `${API_BASE}/api/nonexistent`,
          description: 'Try to access a route that doesn\'t exist'
        }
      ]
    }
  ];

  const ResponseDisplay = ({ response }) => {
    if (!response) return null;
    
    return (
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <div className="mb-2">
          <span className="text-blue-400">Status:</span> {response.status}
        </div>
        <div className="mb-2">
          <span className="text-blue-400">URL:</span> {response.url}
        </div>
        <div className="mb-2">
          <span className="text-blue-400">Method:</span> {response.method}
        </div>
        <div className="mb-2">
          <span className="text-blue-400">Response:</span>
        </div>
        <pre className="bg-gray-800 p-2 rounded overflow-x-auto">
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Code className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">HTTP Routing Demo</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Interactive demonstration of different routing concepts
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Database className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">Server Setup Required</span>
            </div>
            <p className="text-yellow-700 text-sm">
              To see live responses, run the Express server on localhost:3001
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demo Categories */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Route Types</h2>
            {demos.map((demo) => (
              <div 
                key={demo.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activeDemo === demo.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setActiveDemo(demo.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {demo.icon}
                    <h3 className="ml-2 font-semibold text-gray-800">{demo.title}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mt-2">{demo.description}</p>
              </div>
            ))}
          </div>

          {/* Demo Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Examples</h2>
            {activeDemo ? (
              <div className="space-y-4">
                {demos.find(d => d.id === activeDemo)?.examples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{example.name}</h4>
                      <button
                        onClick={() => makeRequest(example.url, example.method, example.body)}
                        disabled={loading}
                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Try it
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                    <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                      <span className="text-blue-600 font-bold">{example.method}</span> {example.url}
                    </div>
                    {example.body && (
                      <div className="mt-2 bg-gray-100 p-2 rounded text-sm">
                        <span className="text-gray-600">Body:</span>
                        <pre className="text-xs mt-1">{JSON.stringify(example.body, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a route type to see examples</p>
              </div>
            )}
          </div>
        </div>

        {/* Response Display */}
        {(loading || response || error) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Response</h2>
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Making request...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800 font-semibold">Error</span>
                </div>
                <p className="text-red-700 mt-1">{error}</p>
                <p className="text-red-600 text-sm mt-2">
                  Make sure the Express server is running on localhost:3001
                </p>
              </div>
            )}
            {response && <ResponseDisplay response={response} />}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>🚀 Interactive HTTP Routing Demonstration</p>
          <p className="mt-1">Click on route types and try the examples to see how different routing patterns work</p>
        </div>
      </div>
    </div>
  );
};

export default RouteDemo;