import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    purchaseDate: '',
    image: null
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const leavesContainerRef = useRef(null);

  // Check if form is valid whenever formData changes
  useEffect(() => {
    const isValid = formData.itemName.trim() !== '' &&
                   formData.itemDescription.trim() !== '' &&
                   formData.purchaseDate !== '' &&
                   formData.image !== null;
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const createLeaves = () => {
    const newLeaves = [];
    // Create 80 leaves for heavy hay-like effect
    for (let i = 0; i < 80; i++) {
      newLeaves.push({
        id: i,
        left: Math.random() * 100,
        size: 0.8 + Math.random() * 0.7, // Varied sizes
        rotation: Math.random() * 360,
        opacity: 0.7 + Math.random() * 0.3
      });
    }
    setLeaves(newLeaves);
  };

  const animateLeaves = () => {
    if (!leavesContainerRef.current) return;
   
    const leafElements = leavesContainerRef.current.querySelectorAll('.leaf');
   
    // Simple CSS-based animation fallback
    leafElements.forEach((leaf, index) => {
      const startDelay = Math.random() * 300;
      const swayAmount = 50 + Math.random() * 100;
      const fallDuration = 1200 + Math.random() * 600;
     
      // Apply CSS animations
      leaf.style.animation = `leafFall ${fallDuration}ms ease-in-out ${startDelay}ms forwards`;
      leaf.style.setProperty('--sway-amount', `${swayAmount}px`);
    });
  };

  const handleRecycleClick = () => {
    if (isFormValid) {
      setShowAnimation(true);
      createLeaves();
     
      // Start animation after leaves are rendered
      setTimeout(() => {
        animateLeaves();
      }, 50);
     
      // Hide animation after 1.5 seconds
      setTimeout(() => {
        setShowAnimation(false);
        setLeaves([]);
        // Show success message after animation ends
        setShowSuccessMessage(true);
       
        // Hide success message after 2 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      }, 1500);
    }
  };

  const handleReset = () => {
    setFormData({
      itemName: '',
      itemDescription: '',
      purchaseDate: '',
      image: null
    });
    setShowSuccessMessage(false);
    setShowAnimation(false);
    setLeaves([]);
  };

  // Create style element for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .leaf {
        will-change: transform, opacity;
      }

      @keyframes leafFall {
        0% {
          transform: translateY(-50px) translateX(0) rotate(0deg);
          opacity: 0.9;
        }
        30% {
          transform: translateY(30vh) translateX(calc(var(--sway-amount) * -0.5)) rotate(180deg);
          opacity: 0.8;
        }
        70% {
          transform: translateY(70vh) translateX(var(--sway-amount)) rotate(360deg);
          opacity: 0.6;
        }
        100% {
          transform: translateY(100vh) translateX(calc(var(--sway-amount) * -0.3)) rotate(540deg);
          opacity: 0;
        }
      }

      @keyframes success-message {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(-30px) scale(0.8);
        }
        10% {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1.05);
        }
        15% {
          transform: translateX(-50%) translateY(0) scale(1);
        }
        85% {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px) scale(0.95);
        }
      }

      .animate-success-message {
        animation: success-message 2s ease-out forwards;
      }

      .upload-icon {
        width: 96px;
        height: 96px;
        stroke: currentColor;
        fill: none;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .calendar-icon {
        width: 20px;
        height: 20px;
        stroke: currentColor;
        fill: none;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .arrow-icon {
        width: 24px;
        height: 24px;
        stroke: currentColor;
        fill: none;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Custom SVG icons as React elements
  const UploadIcon = () => React.createElement('svg', {
    className: 'upload-icon',
    viewBox: '0 0 24 24'
  }, [
    React.createElement('path', {
      key: 'path1',
      d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'
    }),
    React.createElement('polyline', {
      key: 'path2',
      points: '7,10 12,15 17,10'
    }),
    React.createElement('line', {
      key: 'path3',
      x1: '12',
      y1: '15',
      x2: '12',
      y2: '3'
    })
  ]);

  const CalendarIcon = () => React.createElement('svg', {
    className: 'calendar-icon',
    viewBox: '0 0 24 24'
  }, [
    React.createElement('rect', {
      key: 'rect',
      x: '3',
      y: '4',
      width: '18',
      height: '18',
      rx: '2',
      ry: '2'
    }),
    React.createElement('line', {
      key: 'line1',
      x1: '16',
      y1: '2',
      x2: '16',
      y2: '6'
    }),
    React.createElement('line', {
      key: 'line2',
      x1: '8',
      y1: '2',
      x2: '8',
      y2: '6'
    }),
    React.createElement('line', {
      key: 'line3',
      x1: '3',
      y1: '10',
      x2: '21',
      y2: '10'
    })
  ]);

  const ArrowLeftIcon = () => React.createElement('svg', {
    className: 'arrow-icon',
    viewBox: '0 0 24 24'
  }, [
    React.createElement('line', {
      key: 'line1',
      x1: '19',
      y1: '12',
      x2: '5',
      y2: '12'
    }),
    React.createElement('polyline', {
      key: 'polyline',
      points: '12,19 5,12 12,5'
    })
  ]);

  return React.createElement('div', {
    className: 'min-h-screen bg-gray-50 p-6'
  }, [
    // Success Message
    showSuccessMessage && React.createElement('div', {
      key: 'success-message',
      className: 'fixed top-8 left-1/2 transform -translate-x-1/2 z-50'
    }, React.createElement('div', {
      className: 'bg-white text-green-600 px-12 py-6 rounded-2xl shadow-2xl border-2 border-green-200 animate-success-message'
    }, React.createElement('div', {
      className: 'flex items-center space-x-3'
    }, [
      React.createElement('div', {
        key: 'emoji',
        className: 'text-2xl'
      }, '🌿'),
      React.createElement('div', {
        key: 'text',
        className: 'text-xl font-semibold'
      }, 'Thank you for submitting the item for recycling')
    ]))),

    // Falling Leaves Animation
    showAnimation && React.createElement('div', {
      key: 'leaves-container',
      ref: leavesContainerRef,
      className: 'fixed inset-0 pointer-events-none z-40 overflow-hidden'
    }, leaves.map((leaf) => React.createElement('div', {
      key: leaf.id,
      className: 'leaf absolute text-green-500',
      style: {
        left: `${leaf.left}%`,
        fontSize: `${leaf.size * 24}px`,
        transform: `rotate(${leaf.rotation}deg)`,
        opacity: leaf.opacity,
        top: '-50px'
      }
    }, '🍃'))),

    // Main Content
    React.createElement('div', {
      key: 'main-content',
      className: 'max-w-4xl mx-auto'
    }, [
      // Header
      React.createElement('div', {
        key: 'header',
        className: 'flex items-center mb-8'
      }, [
        React.createElement('div', {
          key: 'arrow',
          className: 'mr-4 text-gray-600'
        }, React.createElement(ArrowLeftIcon)),
        React.createElement('h1', {
          key: 'title',
          className: 'text-2xl font-bold text-gray-800'
        }, 'RECYCLE')
      ]),

      // Main Form Container
      React.createElement('div', {
        key: 'form-container',
        className: 'flex gap-8'
      }, [
        // Left Column - Image Upload
        React.createElement('div', {
          key: 'left-column',
          className: 'flex-1'
        }, React.createElement('div', {
          className: 'bg-blue-100 rounded-lg p-8 h-80 flex flex-col items-center justify-center border-2 border-dashed border-blue-300'
        }, formData.image ? React.createElement('div', {
          className: 'relative w-full h-full'
        }, [
          React.createElement('img', {
            key: 'uploaded-image',
            src: formData.image,
            alt: 'Uploaded item',
            className: 'w-full h-full object-cover rounded-lg'
          }),
          React.createElement('button', {
            key: 'remove-image',
            onClick: () => handleInputChange('image', null),
            className: 'absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600'
          }, '×')
        ]) : [
          React.createElement('div', {
            key: 'upload-icon',
            className: 'text-gray-400 mb-4'
          }, React.createElement(UploadIcon)),
          React.createElement('p', {
            key: 'frame-text',
            className: 'text-gray-500 text-lg mb-4'
          }, 'Frame'),
          React.createElement('p', {
            key: 'upload-text',
            className: 'text-gray-400 mb-4'
          }, 'Upload image or take picture'),
          React.createElement('input', {
            key: 'file-input',
            type: 'file',
            accept: 'image/*',
            onChange: handleImageUpload,
            className: 'hidden',
            id: 'image-upload'
          }),
          React.createElement('label', {
            key: 'upload-label',
            htmlFor: 'image-upload',
            className: 'bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'
          }, 'Choose Image')
        ])),

        // Right Column - Form Fields
        React.createElement('div', {
          key: 'right-column',
          className: 'flex-1 space-y-6'
        }, [
          // Item Name
          React.createElement('div', {
            key: 'item-name'
          }, [
            React.createElement('label', {
              key: 'name-label',
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Item name'),
            React.createElement('input', {
              key: 'name-input',
              type: 'text',
              value: formData.itemName,
              onChange: (e) => handleInputChange('itemName', e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              placeholder: 'Enter item name'
            })
          ]),

          // Item Description
          React.createElement('div', {
            key: 'item-description'
          }, [
            React.createElement('label', {
              key: 'description-label',
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Item description'),
            React.createElement('textarea', {
              key: 'description-input',
              value: formData.itemDescription,
              onChange: (e) => handleInputChange('itemDescription', e.target.value),
              className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none',
              placeholder: 'Enter item description'
            })
          ]),

          // Purchase Date
          React.createElement('div', {
            key: 'purchase-date'
          }, [
            React.createElement('label', {
              key: 'date-label',
              className: 'block text-gray-700 font-medium mb-2'
            }, 'Purchase date'),
            React.createElement('div', {
              key: 'date-container',
              className: 'relative'
            }, [
              React.createElement('input', {
                key: 'date-input',
                type: 'date',
                value: formData.purchaseDate,
                onChange: (e) => handleInputChange('purchaseDate', e.target.value),
                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }),
              React.createElement('div', {
                key: 'calendar-icon',
                className: 'absolute right-3 top-2.5 text-gray-400 pointer-events-none'
              }, React.createElement(CalendarIcon))
            ])
          ]),

          // Buttons
          React.createElement('div', {
            key: 'buttons',
            className: 'flex gap-4 pt-4'
          }, [
            React.createElement('button', {
              key: 'recycle-btn',
              onClick: handleRecycleClick,
              disabled: !isFormValid,
              className: `px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                isFormValid
                  ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`
            }, 'Recycle'),
            React.createElement('button', {
              key: 'cancel-btn',
              onClick: handleReset,
              className: 'px-8 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors'
            }, 'Cancel')
          ])
        ])
      ])
    ])
  ]);
};

export default App;