import React, { useState, useEffect, createContext, useContext } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mfk-gixl.onrender.com';
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('authUser', JSON.stringify(data.data.user));
        setToken(data.data.token);
        setUser(data.data.user);
      }
      return data;
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('authUser', JSON.stringify(data.data.user));
        setToken(data.data.token);
        setUser(data.data.user);
      }
      return data;
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return React.createElement(AuthContext.Provider, 
    { value: { user, token, loading, login, signup, logout } }, 
    children
  );
};

const LoginForm = ({ switchToSignup }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const res = await login(email, password);
    if (!res.success) {
      setError(res.error || res.message || 'Login failed');
    }
    setIsLoading(false);
  };

  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'
  }, 
    React.createElement('div', {
      className: 'max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6'
    },
      React.createElement('div', {
        className: 'text-center space-y-2'
      },
        React.createElement('h1', {
          className: 'text-3xl font-bold text-gray-900'
        }, 'Welcome Back'),
        React.createElement('p', {
          className: 'text-gray-600'
        }, 'Sign in to your account to continue')
      ),
      
      React.createElement('form', {
        onSubmit: handleSubmit,
        className: 'space-y-5'
      },
        React.createElement('div', {
          className: 'space-y-1'
        },
          React.createElement('label', {
            className: 'block text-sm font-medium text-gray-700'
          }, 'Email Address'),
          React.createElement('input', {
            type: 'email',
            placeholder: 'Enter your email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none'
          })
        ),
        
        React.createElement('div', {
          className: 'space-y-1'
        },
          React.createElement('label', {
            className: 'block text-sm font-medium text-gray-700'
          }, 'Password'),
          React.createElement('input', {
            type: 'password',
            placeholder: 'Enter your password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none'
          })
        ),
        
        React.createElement('button', {
          type: 'submit',
          disabled: isLoading,
          className: `w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
          }`
        }, isLoading ? 'Signing in...' : 'Sign In')
      ),
      
      error && React.createElement('div', {
        className: 'bg-red-50 border border-red-200 rounded-lg p-4'
      },
        React.createElement('p', {
          className: 'text-red-700 text-sm'
        }, error)
      ),
      
      React.createElement('div', {
        className: 'text-center pt-4 border-t border-gray-200'
      },
        React.createElement('p', {
          className: 'text-gray-600'
        }, 'Don\'t have an account? ',
          React.createElement('button', {
            onClick: switchToSignup,
            className: 'text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200'
          }, 'Sign up')
        )
      )
    )
  );
};

const SignupForm = ({ switchToLogin }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const res = await signup(name, email, password);
    if (!res.success) {
      setError(res.error || res.message || 'Signup failed');
    }
    setIsLoading(false);
  };

  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'
  }, 
    React.createElement('div', {
      className: 'max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6'
    },
      React.createElement('div', {
        className: 'text-center space-y-2'
      },
        React.createElement('h1', {
          className: 'text-3xl font-bold text-gray-900'
        }, 'Create Account'),
        React.createElement('p', {
          className: 'text-gray-600'
        }, 'Join us and start your journey today')
      ),
      
      React.createElement('form', {
        onSubmit: handleSubmit,
        className: 'space-y-5'
      },
        React.createElement('div', {
          className: 'space-y-1'
        },
          React.createElement('label', {
            className: 'block text-sm font-medium text-gray-700'
          }, 'Full Name'),
          React.createElement('input', {
            type: 'text',
            placeholder: 'Enter your full name',
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 outline-none'
          })
        ),
        
        React.createElement('div', {
          className: 'space-y-1'
        },
          React.createElement('label', {
            className: 'block text-sm font-medium text-gray-700'
          }, 'Email Address'),
          React.createElement('input', {
            type: 'email',
            placeholder: 'Enter your email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 outline-none'
          })
        ),
        
        React.createElement('div', {
          className: 'space-y-1'
        },
          React.createElement('label', {
            className: 'block text-sm font-medium text-gray-700'
          }, 'Password'),
          React.createElement('input', {
            type: 'password',
            placeholder: 'Create a secure password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 outline-none'
          })
        ),
        
        React.createElement('button', {
          type: 'submit',
          disabled: isLoading,
          className: `w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg'
          }`
        }, isLoading ? 'Creating Account...' : 'Create Account')
      ),
      
      error && React.createElement('div', {
        className: 'bg-red-50 border border-red-200 rounded-lg p-4'
      },
        React.createElement('p', {
          className: 'text-red-700 text-sm'
        }, error)
      ),
      
      React.createElement('div', {
        className: 'text-center pt-4 border-t border-gray-200'
      },
        React.createElement('p', {
          className: 'text-gray-600'
        }, 'Already have an account? ',
          React.createElement('button', {
            onClick: switchToLogin,
            className: 'text-green-600 hover:text-green-700 font-medium transition-colors duration-200'
          }, 'Sign in')
        )
      )
    )
  );
};

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-purple-50 to-pink-100'
  },
    React.createElement('div', {
      className: 'bg-white shadow-sm border-b border-gray-200'
    },
      React.createElement('div', {
        className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      },
        React.createElement('div', {
          className: 'flex justify-between items-center py-6'
        },
          React.createElement('div', {
            className: 'flex items-center space-x-4'
          },
            React.createElement('div', {
              className: 'w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'
            },
              React.createElement('span', {
                className: 'text-purple-600 font-bold text-lg'
              }, user?.name?.charAt(0)?.toUpperCase() || 'U')
            ),
            React.createElement('div', null,
              React.createElement('h1', {
                className: 'text-2xl font-bold text-gray-900'
              }, `Welcome, ${user?.name || 'User'}`),
              React.createElement('p', {
                className: 'text-gray-600'
              }, user?.email)
            )
          ),
          React.createElement('button', {
            onClick: logout,
            className: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium'
          }, 'Logout')
        )
      )
    ),
    
    React.createElement('div', {
      className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
    },
      React.createElement('div', {
        className: 'bg-white rounded-2xl shadow-lg p-8'
      },
        React.createElement('div', {
          className: 'mb-6'
        },
          React.createElement('h2', {
            className: 'text-2xl font-bold text-gray-900 mb-2'
          }, 'User Directory'),
          React.createElement('p', {
            className: 'text-gray-600'
          }, 'Browse all registered users in the system')
        ),
        
        error && React.createElement('div', {
          className: 'bg-red-50 border border-red-200 rounded-lg p-4 mb-6'
        },
          React.createElement('p', {
            className: 'text-red-700'
          }, error)
        ),
        
        isLoading ? React.createElement('div', {
          className: 'flex justify-center items-center py-12'
        },
          React.createElement('div', {
            className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'
          })
        ) : users.length === 0 ? React.createElement('div', {
          className: 'text-center py-12'
        },
          React.createElement('p', {
            className: 'text-gray-500 text-lg'
          }, 'No users found')
        ) : React.createElement('div', {
          className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
        },
          users.map((u) => React.createElement('div', {
            key: u.id,
            className: 'bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200'
          },
            React.createElement('div', {
              className: 'flex items-center space-x-4'
            },
              React.createElement('div', {
                className: 'w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'
              },
                React.createElement('span', {
                  className: 'text-purple-600 font-bold text-lg'
                }, u.name?.charAt(0)?.toUpperCase() || 'U')
              ),
              React.createElement('div', {
                className: 'flex-1'
              },
                React.createElement('h3', {
                  className: 'text-lg font-semibold text-gray-900'
                }, u.name),
                React.createElement('p', {
                  className: 'text-gray-600 text-sm'
                }, u.email)
              )
            )
          ))
        )
      )
    )
  );
};

const LoadingScreen = () => {
  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'
  },
    React.createElement('div', {
      className: 'text-center space-y-4'
    },
      React.createElement('div', {
        className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'
      }),
      React.createElement('p', {
        className: 'text-gray-600 text-lg'
      }, 'Loading...')
    )
  );
};

const App = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) return React.createElement(LoadingScreen);
  if (user) return React.createElement(Dashboard);
  return isLogin 
    ? React.createElement(LoginForm, { switchToSignup: () => setIsLogin(false) })
    : React.createElement(SignupForm, { switchToLogin: () => setIsLogin(true) });
};

const AppWithAuth = () => {
  return React.createElement(AuthProvider, null, React.createElement(App));
};

export default AppWithAuth;