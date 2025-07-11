import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [rewardPoints, setRewardPoints] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Mock data initialization
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        itemName: 'HDPE Plastic Container',
        itemDescription: 'High-density polyethylene container, 2L capacity, used for household chemicals. Container is cleaned and ready for industrial recycling process.',
        purchaseDate: '2024-06-15',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBsYXN0aWMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0f41OGUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNwbGFzdGljKSIgcng9IjEyIi8+PHJlY3QgeD0iNjAiIHk9IjgwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE0MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiByeD0iOCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTYwIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhEUEU8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxODAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29udGFpbmVyPC90ZXh0Pjwvc3ZnPg==',
        submittedDate: '2024-07-08',
        status: 'pending',
        submittedBy: 'Dr. Sarah Chen',
        email: 'sarah.chen@techcorp.com',
        category: 'Plastic',
        weight: '0.8 kg',
        estimatedValue: '$0.15'
      },
      {
        id: 2,
        itemName: 'Corrugated Cardboard Packaging',
        itemDescription: 'Industrial-grade corrugated cardboard from electronics packaging. Clean, dry, and free of contaminants. Suitable for high-quality recycling.',
        purchaseDate: '2024-06-20',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNhcmRib2FyZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Y1OWUwYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2VhNTgwYyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2NhcmRib2FyZCkiIHJ4PSIxMiIvPjxyZWN0IHg9IjUwIiB5PSI3MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgcng9IjgiLz48dGV4dCB4PSIxNTAiIHk9IjE1NSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DYXJkYm9hcmQ8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxNzUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UGFja2FnaW5nPC90ZXh0Pjwvc3ZnPg==',
        submittedDate: '2024-07-09',
        status: 'approved',
        submittedBy: 'Michael Rodriguez',
        email: 'michael.rodriguez@logistics.com',
        rewardPoints: 25,
        approvedDate: '2024-07-09',
        category: 'Paper',
        weight: '2.3 kg',
        estimatedValue: '$0.45'
      },
      {
        id: 3,
        itemName: 'Aluminum Beverage Cans',
        itemDescription: 'Collection of 24 aluminum beverage cans, cleaned and compressed. High-grade aluminum suitable for infinite recycling with minimal quality loss.',
        purchaseDate: '2024-07-01',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImFsdW1pbml1bSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzEwYjk4MSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzA1OWY2OSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2FsdW1pbml1bSkiIHJ4PSIxMiIvPjxyZWN0IHg9IjUwIiB5PSI3MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgcng9IjgiLz48dGV4dCB4PSIxNTAiIHk9IjE1NSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BbHVtaW51bTwvdGV4dD48dGV4dCB4PSIxNTAiIHk9IjE3NSIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5CZXZlcmFnZSBDYW5zPC90ZXh0Pjwvc3ZnPg==',
        submittedDate: '2024-07-10',
        status: 'pending',
        submittedBy: 'Amanda Foster',
        email: 'amanda.foster@university.edu',
        category: 'Metal',
        weight: '1.2 kg',
        estimatedValue: '$1.80'
      },
      {
        id: 4,
        itemName: 'Borosilicate Glass Laboratory Equipment',
        itemDescription: 'Used laboratory glassware including beakers and flasks. Made from borosilicate glass, contains trace chemicals requiring specialized handling.',
        purchaseDate: '2024-06-25',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZGMxNzI1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYjkxYzFjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZ2xhc3MpIiByeD0iMTIiLz48cmVjdCB4PSI1MCIgeT0iNzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHJ4PSI4Ii8+PHRleHQgeD0iMTUwIiB5PSIxNTUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R2xhc3M8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxNzUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TGFib3JhdG9yeTwvdGV4dD48L3N2Zz4=',
        submittedDate: '2024-07-07',
        status: 'rejected',
        submittedBy: 'Dr. James Wilson',
        email: 'james.wilson@research.org',
        rejectionReason: 'Laboratory glassware contains hazardous chemical residues requiring specialized disposal through certified hazardous waste management facility.',
        rejectedDate: '2024-07-08',
        category: 'Glass',
        weight: '3.5 kg',
        estimatedValue: 'N/A'
      },
      {
        id: 5,
        itemName: 'Mixed Office Paper',
        itemDescription: 'High-quality office paper including letterhead, envelopes, and reports. All confidential documents have been properly shredded.',
        purchaseDate: '2024-05-15',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhcGVyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOGI1Y2Y2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjN2M0ZGZmIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjcGFwZXIpIiByeD0iMTIiLz48cmVjdCB4PSI1MCIgeT0iNzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHJ4PSI4Ii8+PHRleHQgeD0iMTUwIiB5PSIxNTUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+T2ZmaWNlPC90ZXh0Pjx0ZXh0IHg9IjE1MCIgeT0iMTc1IiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRvY3VtZW50czwvdGV4dD48L3N2Zz4=',
        submittedDate: '2024-07-06',
        status: 'pending',
        submittedBy: 'Corporate Services',
        email: 'facilities@enterprise.com',
        category: 'Paper',
        weight: '15.8 kg',
        estimatedValue: '$2.35'
      },
      {
        id: 6,
        itemName: 'E-Waste Circuit Boards',
        itemDescription: 'Decommissioned server motherboards and network cards. Contains precious metals including gold, silver, and rare earth elements.',
        purchaseDate: '2024-04-10',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImVsZWN0cm9uaWMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZjc3MmIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwNTY5MmIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNlbGVjdHJvbmljKSIgcng9IjEyIi8+PHJlY3QgeD0iNTAiIHk9IjcwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiByeD0iOCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTU1IiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkUtV2FzdGU8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxNzUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2lyY3VpdCBCb2FyZHM8L3RleHQ+PC9zdmc+',
        submittedDate: '2024-07-05',
        status: 'approved',
        submittedBy: 'IT Operations',
        email: 'it.disposal@techcorp.com',
        rewardPoints: 85,
        approvedDate: '2024-07-06',
        category: 'Electronics',
        weight: '8.7 kg',
        estimatedValue: '$12.50'
      }
    ];
    
    setRequests(mockRequests);
    
    const stats = mockRequests.reduce((acc, request) => {
      acc.total++;
      acc[request.status]++;
      return acc;
    }, { total: 0, pending: 0, approved: 0, rejected: 0 });
    
    setStats(stats);
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
    setRewardPoints('');
    setRejectionReason('');
  };

  const handleApprove = () => {
    if (!rewardPoints || rewardPoints <= 0) {
      alert('Please enter valid reward points');
      return;
    }

    const updatedRequests = requests.map(request => 
      request.id === selectedRequest.id 
        ? { 
            ...request, 
            status: 'approved', 
            rewardPoints: parseInt(rewardPoints),
            approvedDate: new Date().toISOString().split('T')[0]
          }
        : request
    );
    
    setRequests(updatedRequests);
    setShowModal(false);
    setSelectedRequest(null);
    setRewardPoints('');
    
    const newStats = updatedRequests.reduce((acc, request) => {
      acc.total++;
      acc[request.status]++;
      return acc;
    }, { total: 0, pending: 0, approved: 0, rejected: 0 });
    setStats(newStats);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    const updatedRequests = requests.map(request => 
      request.id === selectedRequest.id 
        ? { 
            ...request, 
            status: 'rejected', 
            rejectionReason: rejectionReason,
            rejectedDate: new Date().toISOString().split('T')[0]
          }
        : request
    );
    
    setRequests(updatedRequests);
    setShowRejectModal(false);
    setShowModal(false);
    setSelectedRequest(null);
    setRejectionReason('');
    
    const newStats = updatedRequests.reduce((acc, request) => {
      acc.total++;
      acc[request.status]++;
      return acc;
    }, { total: 0, pending: 0, approved: 0, rejected: 0 });
    setStats(newStats);
  };

  const calculateSuggestedPoints = () => {
    let points = 0;
    if (selectedRequest) {
      const weight = parseFloat(selectedRequest.weight.split(' ')[0]);
      const categoryMultiplier = {
        'Plastic': 10,
        'Paper': 5,
        'Metal': 15,
        'Glass': 8,
        'Electronics': 20
      }[selectedRequest.category] || 5;
      
      points = Math.round(weight * categoryMultiplier);
      points = Math.min(Math.max(points, 5), 1000);
    }
    setRewardPoints(points.toString());
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        bg: 'bg-gradient-to-r from-amber-50 to-orange-50', 
        text: 'text-amber-800', 
        border: 'border-amber-200',
        icon: '⏳',
        dot: 'bg-amber-400'
      },
      approved: { 
        bg: 'bg-gradient-to-r from-emerald-50 to-teal-50', 
        text: 'text-emerald-800', 
        border: 'border-emerald-200',
        icon: '✓',
        dot: 'bg-emerald-400'
      },
      rejected: { 
        bg: 'bg-gradient-to-r from-red-50 to-pink-50', 
        text: 'text-red-800', 
        border: 'border-red-200',
        icon: '✕',
        dot: 'bg-red-400'
      }
    };
    return configs[status] || configs.pending;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Plastic': '🧪',
      'Paper': '📄',
      'Metal': '🔗',
      'Glass': '🧊',
      'Electronics': '⚡'
    };
    return icons[category] || '♻️';
  };

  // SVG Icons as React components
  const SearchIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('circle', {
      cx: '11',
      cy: '11',
      r: '8',
      strokeWidth: '2'
    }),
    React.createElement('path', {
      d: 'm21 21-4.35-4.35',
      strokeWidth: '2'
    })
  ]);

  const FilterIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
      strokeWidth: '2'
    })
  ]);

  const ViewIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
      strokeWidth: '2'
    }),
    React.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '3',
      strokeWidth: '2'
    })
  ]);

  const CloseIcon = () => React.createElement('svg', {
    className: 'w-6 h-6',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M6 18L18 6M6 6l12 12',
      strokeWidth: '2'
    })
  ]);

  const TrendingIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M23 6l-9.5 9.5-5-5L1 18',
      strokeWidth: '2'
    }),
    React.createElement('path', {
      d: 'M17 6h6v6',
      strokeWidth: '2'
    })
  ]);

  const RefreshIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      strokeWidth: '2'
    })
  ]);

  const ExportIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      strokeWidth: '2'
    })
  ]);

  const WarningIcon = () => React.createElement('svg', {
    className: 'w-5 h-5',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor'
  }, [
    React.createElement('path', {
      d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      strokeWidth: '2'
    })
  ]);

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50' }, [
    // Header Section
    React.createElement('div', { 
      key: 'header',
      className: 'bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl' 
    }, [
      React.createElement('div', { 
        key: 'header-content',
        className: 'max-w-7xl mx-auto px-6 py-8' 
      }, [
        React.createElement('div', { 
          key: 'header-main',
          className: 'flex items-center justify-between' 
        }, [
          React.createElement('div', { key: 'header-text' }, [
            React.createElement('h1', { 
              key: 'main-title',
              className: 'text-4xl font-bold text-white mb-2 tracking-tight' 
            }, 'Waste Management Operations'),
            React.createElement('p', { 
              key: 'subtitle',
              className: 'text-blue-200 text-lg font-medium' 
            }, 'Enterprise Recycling Request Management System')
          ]),
          React.createElement('div', { 
            key: 'header-badge',
            className: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3' 
          }, [
            React.createElement('div', { 
              key: 'badge-content',
              className: 'flex items-center gap-2' 
            }, [
              React.createElement(TrendingIcon),
              React.createElement('span', { 
                key: 'badge-text',
                className: 'text-white font-semibold' 
              }, 'Live Dashboard')
            ])
          ])
        ])
      ])
    ]),

    // Main Content
    React.createElement('div', { 
      key: 'main-content',
      className: 'max-w-7xl mx-auto px-6 py-8' 
    }, [
      // Stats Section
      React.createElement('div', { 
        key: 'stats-section',
        className: 'mb-8' 
      }, [
        React.createElement('h2', { 
          key: 'stats-title',
          className: 'text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3' 
        }, [
          React.createElement('div', { 
            key: 'stats-icon',
            className: 'w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center' 
          }, React.createElement('span', { className: 'text-white font-bold text-sm' }, '📊')),
          'Performance Analytics'
        ]),
        React.createElement('div', { 
          key: 'stats-grid',
          className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' 
        }, [
          // Total Requests Stat
          React.createElement('div', { 
            key: 'total-stat',
            className: 'bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' 
          }, [
            React.createElement('div', { 
              key: 'total-header',
              className: 'flex items-center justify-between mb-4' 
            }, [
              React.createElement('div', { 
                key: 'total-icon',
                className: 'w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg' 
              }, React.createElement('span', { className: 'text-white text-xl font-bold' }, '📋')),
              React.createElement('div', { 
                key: 'total-trend',
                className: 'text-right' 
              }, [
                React.createElement('div', { 
                  key: 'total-change',
                  className: 'text-xs text-slate-500 font-medium' 
                }, '+12% from last month'),
                React.createElement('div', { 
                  key: 'total-indicator',
                  className: 'w-3 h-3 bg-green-400 rounded-full ml-auto mt-1' 
                })
              ])
            ]),
            React.createElement('div', { key: 'total-content' }, [
              React.createElement('div', { 
                key: 'total-number',
                className: 'text-3xl font-bold text-slate-800 mb-1' 
              }, stats.total),
              React.createElement('div', { 
                key: 'total-label',
                className: 'text-slate-600 font-medium' 
              }, 'Total Requests'),
              React.createElement('div', { 
                key: 'total-desc',
                className: 'text-xs text-slate-500 mt-2' 
              }, 'All submission requests')
            ])
          ]),
          
          // Pending Requests Stat
          React.createElement('div', { 
            key: 'pending-stat',
            className: 'bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' 
          }, [
            React.createElement('div', { 
              key: 'pending-header',
              className: 'flex items-center justify-between mb-4' 
            }, [
              React.createElement('div', { 
                key: 'pending-icon',
                className: 'w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg' 
              }, React.createElement('span', { className: 'text-white text-xl font-bold' }, '⏳')),
              React.createElement('div', { 
                key: 'pending-trend',
                className: 'text-right' 
              }, [
                React.createElement('div', { 
                  key: 'pending-change',
                  className: 'text-xs text-amber-600 font-medium' 
                }, 'Requires attention'),
                React.createElement('div', { 
                  key: 'pending-indicator',
                  className: 'w-3 h-3 bg-amber-400 rounded-full ml-auto mt-1 animate-pulse' 
                })
              ])
            ]),
            React.createElement('div', { key: 'pending-content' }, [
              React.createElement('div', { 
                key: 'pending-number',
                className: 'text-3xl font-bold text-amber-800 mb-1' 
              }, stats.pending),
              React.createElement('div', { 
                key: 'pending-label',
                className: 'text-amber-700 font-medium' 
              }, 'Pending Review'),
              React.createElement('div', { 
                key: 'pending-desc',
                className: 'text-xs text-amber-600 mt-2' 
              }, 'Awaiting admin action')
            ])
          ]),
          
          // Approved Requests Stat
          React.createElement('div', { 
            key: 'approved-stat',
            className: 'bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' 
          }, [
            React.createElement('div', { 
              key: 'approved-header',
              className: 'flex items-center justify-between mb-4' 
            }, [
              React.createElement('div', { 
                key: 'approved-icon',
                className: 'w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg' 
              }, React.createElement('span', { className: 'text-white text-xl font-bold' }, '✓')),
              React.createElement('div', { 
                key: 'approved-trend',
                className: 'text-right' 
              }, [
                React.createElement('div', { 
                  key: 'approved-change',
                  className: 'text-xs text-emerald-600 font-medium' 
                }, '+8% efficiency'),
                React.createElement('div', { 
                  key: 'approved-indicator',
                  className: 'w-3 h-3 bg-emerald-400 rounded-full ml-auto mt-1' 
                })
              ])
            ]),
            React.createElement('div', { key: 'approved-content' }, [
              React.createElement('div', { 
                key: 'approved-number',
                className: 'text-3xl font-bold text-emerald-800 mb-1' 
              }, stats.approved),
              React.createElement('div', { 
                key: 'approved-label',
                className: 'text-emerald-700 font-medium' 
              }, 'Approved'),
              React.createElement('div', { 
                key: 'approved-desc',
                className: 'text-xs text-emerald-600 mt-2' 
              }, 'Successfully processed')
            ])
          ]),
          
          // Rejected Requests Stat
          React.createElement('div', { 
            key: 'rejected-stat',
            className: 'bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-red-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' 
          }, [
            React.createElement('div', { 
              key: 'rejected-header',
              className: 'flex items-center justify-between mb-4' 
            }, [
              React.createElement('div', { 
                key: 'rejected-icon',
                className: 'w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg' 
              }, React.createElement('span', { className: 'text-white text-xl font-bold' }, '✕')),
              React.createElement('div', { 
                key: 'rejected-trend',
                className: 'text-right' 
              }, [
                React.createElement('div', { 
                  key: 'rejected-change',
                  className: 'text-xs text-red-600 font-medium' 
                }, 'Quality control'),
                React.createElement('div', { 
                  key: 'rejected-indicator',
                  className: 'w-3 h-3 bg-red-400 rounded-full ml-auto mt-1' 
                })
              ])
            ]),
            React.createElement('div', { key: 'rejected-content' }, [
              React.createElement('div', { 
                key: 'rejected-number',
                className: 'text-3xl font-bold text-red-800 mb-1' 
              }, stats.rejected),
              React.createElement('div', { 
                key: 'rejected-label',
                className: 'text-red-700 font-medium' 
              }, 'Rejected'),
              React.createElement('div', { 
                key: 'rejected-desc',
                className: 'text-xs text-red-600 mt-2' 
              }, 'Did not meet criteria')
            ])
          ])
        ])
      ]),

      // Controls Section
      React.createElement('div', { 
        key: 'controls-section',
        className: 'mb-8' 
      }, [
        React.createElement('div', { 
          key: 'controls-container',
          className: 'bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20' 
        }, [
          React.createElement('div', { 
            key: 'controls-header',
            className: 'flex items-center justify-between mb-6' 
          }, [
            React.createElement('h3', { 
              key: 'controls-title',
              className: 'text-xl font-bold text-slate-800 flex items-center gap-3' 
            }, [
              React.createElement('div', { 
                key: 'controls-icon',
                className: 'w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center' 
              }, React.createElement('span', { className: 'text-white text-xs font-bold' }, '⚙️')),
              'Request Management Controls'
            ]),
            React.createElement('div', { 
              key: 'controls-badge',
              className: 'px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm font-medium text-blue-800' 
            }, `${filteredRequests.length} Results`)
          ]),
          React.createElement('div', { 
            key: 'controls-grid',
            className: 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
          }, [
            React.createElement('div', { 
              key: 'search-control',
              className: 'space-y-3' 
            }, [
              React.createElement('label', { 
                key: 'search-label',
                className: 'block text-sm font-semibold text-slate-700' 
              }, 'Search Requests'),
              React.createElement('div', { 
                key: 'search-wrapper',
                className: 'relative' 
              }, [
                React.createElement('div', { 
                  key: 'search-icon',
                  className: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400' 
                }, React.createElement(SearchIcon)),
                React.createElement('input', { 
                  key: 'search-input',
                  type: 'text',
                  placeholder: 'Search by item name, submitter, or category...',
                  className: 'w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium placeholder-slate-400',
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value)
                })
              ])
            ]),
            React.createElement('div', { 
              key: 'filter-control',
              className: 'space-y-3' 
            }, [
              React.createElement('label', { 
                key: 'filter-label',
                className: 'block text-sm font-semibold text-slate-700' 
              }, 'Filter by Status'),
              React.createElement('div', { 
                key: 'filter-wrapper',
                className: 'relative' 
              }, [
                React.createElement('div', { 
                  key: 'filter-icon',
                  className: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400' 
                }, React.createElement(FilterIcon)),
                React.createElement('select', { 
                  key: 'filter-select',
                  className: 'w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium appearance-none cursor-pointer',
                  value: filterStatus,
                  onChange: (e) => setFilterStatus(e.target.value)
                }, [
                  React.createElement('option', { key: 'filter-all', value: 'all' }, 'All Requests'),
                  React.createElement('option', { key: 'filter-pending', value: 'pending' }, 'Pending Review'),
                  React.createElement('option', { key: 'filter-approved', value: 'approved' }, 'Approved'),
                  React.createElement('option', { key: 'filter-rejected', value: 'rejected' }, 'Rejected')
                ])
              ])
            ])
          ])
        ])
      ]),

      // Requests Grid Section
      React.createElement('div', { 
        key: 'requests-section',
        className: 'mb-8' 
      }, [
        React.createElement('div', { 
          key: 'requests-header',
          className: 'flex items-center justify-between mb-6' 
        }, [
          React.createElement('h3', { 
            key: 'requests-title',
            className: 'text-2xl font-bold text-slate-800 flex items-center gap-3' 
          }, [
            React.createElement('div', { 
              key: 'requests-icon',
              className: 'w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center' 
            }, React.createElement('span', { className: 'text-white font-bold text-sm' }, '📋')),
            'Recycling Requests'
          ]),
          React.createElement('div', { 
            key: 'requests-actions',
            className: 'flex items-center gap-3' 
          }, [
            React.createElement('button', { 
              key: 'refresh-btn',
              className: 'px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-medium hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2',
              onClick: () => window.location.reload()
            }, [
              React.createElement(RefreshIcon),
              'Refresh Data'
            ]),
            React.createElement('button', { 
              key: 'export-btn',
              className: 'px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2'
            }, [
              React.createElement(ExportIcon),
              'Export Report'
            ])
          ])
        ]),
        React.createElement('div', { 
          key: 'requests-grid',
          className: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
        }, filteredRequests.map(request => {
          const statusConfig = getStatusConfig(request.status);
          return React.createElement('div', { 
            key: `request-${request.id}`,
            className: `${statusConfig.bg} rounded-2xl p-6 shadow-lg border ${statusConfig.border} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`,
            onClick: () => handleViewDetails(request)
          }, [
            React.createElement('div', { 
              key: `request-header-${request.id}`,
              className: 'flex items-start justify-between mb-4' 
            }, [
              React.createElement('div', { 
                key: `request-image-${request.id}`,
                className: 'w-16 h-16 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300' 
              }, React.createElement('img', {
                src: request.image,
                alt: request.itemName,
                className: 'w-full h-full object-cover'
              })),
              React.createElement('div', { 
                key: `request-status-${request.id}`,
                className: 'flex items-center gap-2' 
              }, [
                React.createElement('div', { 
                  key: `status-dot-${request.id}`,
                  className: `w-3 h-3 ${statusConfig.dot} rounded-full` 
                }),
                React.createElement('span', { 
                  key: `status-text-${request.id}`,
                  className: `text-sm font-semibold ${statusConfig.text} capitalize` 
                }, request.status)
              ])
            ]),
            React.createElement('div', { 
              key: `request-content-${request.id}`,
              className: 'mb-4' 
            }, [
              React.createElement('h4', { 
                key: `request-title-${request.id}`,
                className: 'text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors' 
              }, request.itemName),
              React.createElement('p', { 
                key: `request-description-${request.id}`,
                className: 'text-sm text-slate-600 leading-relaxed mb-3' 
              }, request.itemDescription.substring(0, 120) + '...'),
              React.createElement('div', { 
                key: `request-meta-${request.id}`,
                className: 'flex items-center gap-4 text-xs text-slate-500' 
              }, [
                React.createElement('span', { 
                  key: `request-category-${request.id}`,
                  className: 'flex items-center gap-1' 
                }, [
                  React.createElement('span', { key: `category-icon-${request.id}` }, getCategoryIcon(request.category)),
                  request.category
                ]),
                React.createElement('span', { key: `request-weight-${request.id}` }, request.weight),
                React.createElement('span', { 
                  key: `request-value-${request.id}`,
                  className: 'font-semibold text-green-600' 
                }, request.estimatedValue)
              ])
            ]),
            React.createElement('div', { 
              key: `request-footer-${request.id}`,
              className: 'flex items-center justify-between pt-4 border-t border-slate-200/50' 
            }, [
              React.createElement('div', { 
                key: `request-submitter-${request.id}`,
                className: 'text-sm' 
              }, [
                React.createElement('div', { 
                  key: `submitter-name-${request.id}`,
                  className: 'font-semibold text-slate-700' 
                }, request.submittedBy),
                React.createElement('div', { 
                  key: `submitted-date-${request.id}`,
                  className: 'text-xs text-slate-500' 
                }, `Submitted: ${request.submittedDate}`)
              ]),
              React.createElement('button', { 
                key: `view-btn-${request.id}`,
                className: 'px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm',
                onClick: (e) => {
                  e.stopPropagation();
                  handleViewDetails(request);
                }
              }, 'View Details')
            ])
          ]);
        }))
      ])
    ]),

    // Request Details Modal
    showModal && React.createElement('div', { 
      key: 'modal-overlay',
      className: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4',
      onClick: (e) => {
        if (e.target === e.currentTarget) {
          setShowModal(false);
          setSelectedRequest(null);
        }
      }
    }, [
      React.createElement('div', { 
        key: 'modal-content',
        className: 'bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl' 
      }, [
        React.createElement('div', { 
          key: 'modal-header',
          className: 'bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 rounded-t-2xl' 
        }, [
          React.createElement('div', { 
            key: 'modal-header-content',
            className: 'flex items-center justify-between' 
          }, [
            React.createElement('h3', { 
              key: 'modal-title',
              className: 'text-2xl font-bold' 
            }, 'Request Details & Review'),
            React.createElement('button', { 
              key: 'modal-close',
              className: 'text-white hover:text-gray-200 transition-colors',
              onClick: () => {
                setShowModal(false);
                setSelectedRequest(null);
              }
            }, React.createElement(CloseIcon))
          ])
        ]),
        React.createElement('div', { 
          key: 'modal-body',
          className: 'p-6' 
        }, [
          React.createElement('div', { 
            key: 'modal-grid',
            className: 'grid grid-cols-1 lg:grid-cols-2 gap-6' 
          }, [
            React.createElement('div', { 
              key: 'modal-image-section',
              className: 'space-y-4' 
            }, [
              React.createElement('h4', { 
                key: 'image-title',
                className: 'text-lg font-bold text-slate-800' 
              }, 'Item Documentation'),
              React.createElement('div', { 
                key: 'image-container',
                className: 'w-full h-64 rounded-xl overflow-hidden shadow-lg' 
              }, React.createElement('img', {
                src: selectedRequest.image,
                alt: selectedRequest.itemName,
                className: 'w-full h-full object-cover'
              })),
              React.createElement('div', { 
                key: 'status-display',
                className: `${getStatusConfig(selectedRequest.status).bg} p-4 rounded-xl border ${getStatusConfig(selectedRequest.status).border}` 
              }, [
                React.createElement('div', { 
                  key: 'status-header',
                  className: 'flex items-center justify-between' 
                }, [
                  React.createElement('span', { 
                    key: 'status-label',
                    className: 'text-sm font-medium text-slate-600' 
                  }, 'Current Status'),
                  React.createElement('span', { 
                    key: 'status-value',
                    className: `text-lg font-bold ${getStatusConfig(selectedRequest.status).text} capitalize flex items-center gap-2` 
                  }, [
                    React.createElement('span', { key: 'status-icon' }, getStatusConfig(selectedRequest.status).icon),
                    selectedRequest.status
                  ])
                ])
              ])
            ]),
            React.createElement('div', { 
              key: 'modal-details-section',
              className: 'space-y-4' 
            }, [
              React.createElement('h4', { 
                key: 'details-title',
                className: 'text-lg font-bold text-slate-800' 
              }, 'Request Information'),
              React.createElement('div', { 
                key: 'details-grid',
                className: 'space-y-4' 
              }, [
                React.createElement('div', { 
                  key: 'item-name-field',
                  className: 'bg-slate-50 p-4 rounded-xl' 
                }, [
                  React.createElement('label', { 
                    key: 'item-name-label',
                    className: 'block text-sm font-semibold text-slate-700 mb-2' 
                  }, 'Item Name'),
                  React.createElement('div', { 
                    key: 'item-name-value',
                    className: 'text-lg font-bold text-slate-800' 
                  }, selectedRequest.itemName)
                ]),
                React.createElement('div', { 
                  key: 'description-field',
                  className: 'bg-slate-50 p-4 rounded-xl' 
                }, [
                  React.createElement('label', { 
                    key: 'description-label',
                    className: 'block text-sm font-semibold text-slate-700 mb-2' 
                  }, 'Description'),
                  React.createElement('div', { 
                    key: 'description-value',
                    className: 'text-slate-700 leading-relaxed' 
                  }, selectedRequest.itemDescription)
                ]),
                React.createElement('div', { 
                  key: 'metadata-grid',
                  className: 'grid grid-cols-2 gap-4' 
                }, [
                  React.createElement('div', { 
                    key: 'category-field',
                    className: 'bg-slate-50 p-4 rounded-xl' 
                  }, [
                    React.createElement('label', { 
                      key: 'category-label',
                      className: 'block text-sm font-semibold text-slate-700 mb-2' 
                    }, 'Category'),
                    React.createElement('div', { 
                      key: 'category-value',
                      className: 'text-slate-800 font-medium flex items-center gap-2' 
                    }, [
                      React.createElement('span', { key: 'category-icon' }, getCategoryIcon(selectedRequest.category)),
                      selectedRequest.category
                    ])
                  ]),
                  React.createElement('div', { 
                    key: 'weight-field',
                    className: 'bg-slate-50 p-4 rounded-xl' 
                  }, [
                    React.createElement('label', { 
                      key: 'weight-label',
                      className: 'block text-sm font-semibold text-slate-700 mb-2' 
                    }, 'Weight'),
                    React.createElement('div', { 
                      key: 'weight-value',
                      className: 'text-slate-800 font-bold' 
                    }, selectedRequest.weight)
                  ]),
                  React.createElement('div', { 
                    key: 'purchase-date-field',
                    className: 'bg-slate-50 p-4 rounded-xl' 
                  }, [
                    React.createElement('label', { 
                      key: 'purchase-date-label',
                      className: 'block text-sm font-semibold text-slate-700 mb-2' 
                    }, 'Purchase Date'),
                    React.createElement('div', { 
                      key: 'purchase-date-value',
                      className: 'text-slate-800 font-medium' 
                    }, selectedRequest.purchaseDate)
                  ]),
                  React.createElement('div', { 
                    key: 'estimated-value-field',
                    className: 'bg-slate-50 p-4 rounded-xl' 
                  }, [
                    React.createElement('label', { 
                      key: 'estimated-value-label',
                      className: 'block text-sm font-semibold text-slate-700 mb-2' 
                    }, 'Estimated Value'),
                    React.createElement('div', { 
                      key: 'estimated-value-value',
                      className: 'text-slate-800 font-bold text-green-600' 
                    }, selectedRequest.estimatedValue)
                  ])
                ]),
                React.createElement('div', { 
                  key: 'submitter-info',
                  className: 'bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200' 
                }, [
                  React.createElement('h5', { 
                    key: 'submitter-title',
                    className: 'text-sm font-semibold text-blue-800 mb-3' 
                  }, 'Submitter Information'),
                  React.createElement('div', { 
                    key: 'submitter-details',
                    className: 'space-y-2' 
                  }, [
                    React.createElement('div', { 
                      key: 'submitter-name',
                      className: 'text-blue-700 font-medium' 
                    }, selectedRequest.submittedBy),
                    React.createElement('div', { 
                      key: 'submitter-email',
                      className: 'text-blue-600 text-sm' 
                    }, selectedRequest.email),
                    React.createElement('div', { 
                      key: 'submit-date',
                      className: 'text-blue-600 text-sm' 
                    }, `Submitted: ${selectedRequest.submittedDate}`)
                  ])
                ])
              ])
            ])
          ])
        ]),
        selectedRequest.status === 'pending' && React.createElement('div', { 
          key: 'modal-actions',
          className: 'p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl' 
        }, [
          React.createElement('div', { 
            key: 'actions-content',
            className: 'space-y-4' 
          }, [
            React.createElement('h4', { 
              key: 'actions-title',
              className: 'text-lg font-bold text-slate-800' 
            }, 'Administrative Actions'),
            React.createElement('div', { 
              key: 'reward-points-section',
              className: 'bg-white p-4 rounded-xl border border-slate-200' 
            }, [
              React.createElement('label', { 
                key: 'points-label',
                className: 'block text-sm font-semibold text-slate-700 mb-3' 
              }, 'Reward Points Allocation'),
              React.createElement('div', { 
                key: 'points-input-container',
                className: 'flex items-center gap-4' 
              }, [
                React.createElement('div', { 
                  key: 'points-input-wrapper',
                  className: 'relative flex-1' 
                }, [
                  React.createElement('input', { 
                    key: 'points-input',
                    type: 'number',
                    min: '0',
                    max: '1000',
                    className: 'w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium',
                    placeholder: 'Enter points (0-1000)',
                    value: rewardPoints,
                    onChange: (e) => setRewardPoints(e.target.value)
                  }),
                  React.createElement('span', { 
                    key: 'points-suffix',
                    className: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium' 
                  }, 'points')
                ]),
                React.createElement('button', { 
                  key: 'calculate-btn',
                  className: 'px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl',
                  onClick: calculateSuggestedPoints
                }, 'Calculate')
              ])
            ]),
            React.createElement('div', { 
              key: 'decision-buttons',
              className: 'grid grid-cols-1 md:grid-cols-2 gap-4' 
            }, [
              React.createElement('button', { 
                key: 'approve-btn',
                className: 'px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3',
                onClick: handleApprove
              }, [
                React.createElement('span', { key: 'approve-icon', className: 'text-xl' }, '✓'),
                'Approve Request'
              ]),
              React.createElement('button', { 
                key: 'reject-btn',
                className: 'px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3',
                onClick: () => setShowRejectModal(true)
              }, [
                React.createElement('span', { key: 'reject-icon', className: 'text-xl' }, '✕'),
                'Reject Request'
              ])
            ]),
            React.createElement('div', { 
              key: 'notes-section',
              className: 'bg-white p-4 rounded-xl border border-slate-200' 
            }, [
              React.createElement('label', { 
                key: 'notes-label',
                className: 'block text-sm font-semibold text-slate-700 mb-3' 
              }, 'Administrative Notes'),
              React.createElement('textarea', { 
                key: 'notes-textarea',
                className: 'w-full p-4 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium min-h-[100px]',
                placeholder: 'Add internal notes or comments for the submitter...',
                value: adminNotes,
                onChange: (e) => setAdminNotes(e.target.value)
              })
            ])
          ])
        ])
      ])
    ]),

    // Rejection Reason Modal
    showRejectModal && React.createElement('div', { 
      key: 'reject-modal-overlay',
      className: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4',
      onClick: (e) => {
        if (e.target === e.currentTarget) {
          setShowRejectModal(false);
        }
      }
    }, [
      React.createElement('div', { 
        key: 'reject-modal-content',
        className: 'bg-white rounded-2xl max-w-md w-full shadow-2xl' 
      }, [
        React.createElement('div', { 
          key: 'reject-modal-header',
          className: 'bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-t-2xl' 
        }, [
          React.createElement('div', { 
            key: 'reject-modal-header-content',
            className: 'flex items-center justify-between' 
          }, [
            React.createElement('h3', { 
              key: 'reject-modal-title',
              className: 'text-xl font-bold' 
            }, 'Rejection Reason'),
            React.createElement('button', { 
              key: 'reject-modal-close',
              className: 'text-white hover:text-gray-200 transition-colors',
              onClick: () => setShowRejectModal(false)
            }, React.createElement(CloseIcon))
          ])
        ]),
        React.createElement('div', { 
          key: 'reject-modal-body',
          className: 'p-6' 
        }, [
          React.createElement('div', { 
            key: 'reject-form',
            className: 'space-y-4' 
          }, [
            React.createElement('div', { 
              key: 'reject-warning',
              className: 'bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3' 
            }, [
              React.createElement(WarningIcon),
              React.createElement('div', { 
                key: 'warning-text',
                className: 'text-red-700 text-sm' 
              }, 'Please provide a clear reason for rejection. This will be sent to the submitter.')
            ]),
            React.createElement('div', { 
              key: 'reason-field',
              className: 'space-y-2' 
            }, [
              React.createElement('label', { 
                key: 'reason-label',
                className: 'block text-sm font-semibold text-slate-700' 
              }, 'Rejection Reason'),
              React.createElement('textarea', { 
                key: 'reason-textarea',
                className: 'w-full p-4 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium min-h-[120px]',
                placeholder: 'Explain why this request is being rejected...',
                value: rejectionReason,
                onChange: (e) => setRejectionReason(e.target.value)
              })
            ])
          ])
        ]),
        React.createElement('div', { 
          key: 'reject-modal-footer',
          className: 'p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end gap-3' 
        }, [
          React.createElement('button', { 
            key: 'cancel-reject-btn',
            className: 'px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200',
            onClick: () => setShowRejectModal(false)
          }, 'Cancel'),
          React.createElement('button', { 
            key: 'confirm-reject-btn',
            className: 'px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl',
            onClick: handleReject
          }, 'Confirm Rejection')
        ])
      ])
    ])
  ]);
};

export default AdminDashboard;