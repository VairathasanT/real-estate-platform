# Real Estate Platform

A modern, full-stack real estate web application built with Next.js, React, and Node.js. Browse, list, and manage properties with an intuitive interface and powerful search capabilities.

## 🚀 Features

### Frontend
- **Modern Home Page** - Stunning hero section with gradient background, statistics, and search interface
- **Advanced Property Search** - Filter by city, property type, budget, BHK, status, and more
- **Property Listings** - Responsive grid display with lazy-loaded images
- **Featured Properties** - Showcase top 3 properties on home page with ratings
- **Skeleton Loaders** - Animated loading states for better UX
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Authentication** - Login/Register system with JWT tokens
- **User Dashboard** - Manage personal properties

### Backend
- **RESTful API** - Comprehensive endpoints for property management
- **Database** - PostgreSQL with normalized schema
- **Authentication** - JWT-based security
- **File Uploads** - Image upload support for properties
- **Rate Limiting** - API rate limiting for protection
- **Search & Filters** - Advanced filtering capabilities

## 📁 Project Structure

```
real-estate-platform/
├── frontend/                    # Next.js frontend application
│   ├── app/                    # App router pages
│   │   ├── page.tsx           # Home page
│   │   ├── properties/        # Properties listing pages
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   └── layout.tsx         # Root layout with MainLayout
│   ├── components/
│   │   ├── home/              # Home page components
│   │   │   ├── Hero.jsx                    # Hero banner
│   │   │   ├── SearchBar.jsx              # Search interface
│   │   │   ├── FeaturedProperties.jsx     # Featured properties section
│   │   │   └── search/                    # Search filter components
│   │   ├── property/          # Property-related components
│   │   │   ├── PropertyCard.jsx           # Single property tile
│   │   │   ├── PropertyCardSkeleton.jsx   # Loading skeleton
│   │   │   ├── PropertyFilters.jsx        # Sidebar filters
│   │   │   ├── PropertyGrid.jsx           # Grid layout
│   │   │   └── ...other property components
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.jsx    # Top navigation
│   │   │   └── Footer.jsx    # Footer section
│   │   ├── auth/              # Auth components
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── ...other UI components
│   ├── context/               # React Context
│   │   └── AuthContext.jsx    # Authentication context
│   ├── services/
│   │   └── api.js            # Axios API client
│   ├── public/                # Static assets
│   └── package.json
│
└── backend/                    # Node.js/Express backend
    ├── server.js             # Main server entry
    ├── package.json
    ├── config/               # Configuration files
    ├── controllers/          # Route handlers
    │   ├── authController.js
    │   ├── propertyController.js
    │   └── inquiryController.js
    ├── routes/               # API routes
    │   ├── authRoutes.js
    │   ├── propertyRoutes.js
    │   └── inquiryRoutes.js
    ├── middleware/           # Express middleware
    │   ├── authMiddleware.js
    │   └── rateLimiter.js
    ├── db/                   # Database connection
    │   └── db.js
    ├── swagger/              # API documentation
    │   └── swagger.js
    └── uploads/              # User uploaded files

```

## 🎨 Design Highlights

### Color Scheme
- **Primary Blue**: `#2563eb` (Blue-600) - Main brand color
- **Text White**: White text on dark backgrounds
- **Accent Yellow**: `#fef08a` (Yellow-200) - Highlights on hero
- **Background**: Gradient from blue to slate

### Typography
- **Headings**: Bold, high contrast (text-5xl to text-7xl)
- **Body Text**: Clear hierarchy with multiple text sizes
- **Interactive Elements**: Clear visual feedback on hover

### Components Structure
- **Modular**: Each component is self-contained
- **Reusable**: UI components can be used across pages
- **Performance**: React.memo for optimization, lazy image loading

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (backend)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

## 📝 Key Technologies

### Frontend
- **Next.js 13+** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hooks** - State management (useState, useEffect, useCallback)

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Multer** - File upload handling

## 🎯 Key Features Explained

### Home Page (`app/page.tsx`)
- Wraps Hero, SearchBar, and FeaturedProperties
- Uses MainLayout for consistent navbar/footer
- Responsive grid layout

### Property Search (`properties/page.jsx`)
- Left sidebar with PropertyFilters
- Main grid with PropertyCard components
- Pagination support (12 items per page)
- Loading skeleton display
- Uses useCallback for pagination handlers

### Component Optimization
- **React.memo** - Prevents unnecessary re-renders
- **useCallback** - Stable function references
- **Lazy Loading** - Images load on demand with `loading="lazy"`
- **Skeleton Loaders** - 12 animated skeletons during fetch

## 🔐 Authentication

- JWT tokens stored in localStorage
- AuthContext provides auth state globally
- Protected routes via middleware
- Login/Register pages for user management

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (lg, xl)

All components use Tailwind's responsive classes (sm:, md:, lg:)

## 🗄️ Database Schema

### Properties Table
- id, title, description
- price, property_type, status
- bedrooms, bathrooms, area
- city, locality, landmark
- images (array of URLs)
- rating, verified status
- created_at, updated_at

### Users Table
- id, email, password (hashed)
- name, phone
- created_at, updated_at

## 🐛 Common Issues & Solutions

### Double Footer
**Issue**: Two footers appearing on page
**Solution**: MainLayout already includes Footer; don't import Footer separately in individual pages

### Image Not Loading
**Issue**: Images show 404 error
**Solution**: Ensure images are in `public/images/` directory

### API Connection Error
**Issue**: Cannot reach backend
**Solution**: Verify backend is running on port 5000 and CORS is configured

## 📚 Documentation

For detailed component documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

## 👥 Team & Support

- **Frontend**: React/Next.js development
- **Backend**: Node.js/Express API development

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🔗 Live Demo

Coming soon...

---

**Last Updated**: June 2026
**Version**: 1.0.0
