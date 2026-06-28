# Real Estate Platform - Complete Documentation

## Table of Contents
1. [Frontend Architecture](#frontend-architecture)
2. [Component Documentation](#component-documentation)
3. [API Integration](#api-integration)
4. [State Management](#state-management)
5. [Styling Guide](#styling-guide)
6. [Performance Optimization](#performance-optimization)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## Frontend Architecture

### Directory Structure

```
frontend/
├── app/                          # Next.js 13+ App Router
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── properties/              # Properties section
│   ├── login/ & register/       # Auth pages
│   └── my-properties/           # User dashboard
│
├── components/
│   ├── home/                    # Home page components
│   ├── property/                # Property-related components
│   ├── layout/                  # Persistent layout (Navbar, Footer)
│   ├── auth/                    # Authentication forms
│   └── ui/                      # Reusable UI primitives
│
├── context/                     # React Context for global state
├── services/                    # API calls (Axios)
├── public/                      # Static assets
└── package.json
```

---

## Component Documentation

### 1. Home Page Components

#### **Hero.jsx**
```javascript
// Location: components/home/Hero.jsx
// Purpose: Main landing section with call-to-action
```

**Features:**
- Blue gradient background (`from-blue-600 via-blue-500 to-blue-700`)
- Decorative blur elements in corners
- Statistics display (5K+ properties, 2K+ buyers, 150+ cities)
- Two-column layout: text on left, image on right
- Responsive: hides image on mobile

**Key Code Elements:**
```jsx
// Decorative background
<div className="absolute inset-0 opacity-10">
  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
</div>

// Main heading with gradient text
<h1 className="text-5xl lg:text-7xl font-black leading-tight">
  Find Your Perfect<br />
  <span className="bg-gradient-to-r from-yellow-200 to-amber-100 bg-clip-text text-transparent">
    Dream Home Today
  </span>
</h1>

// Statistics grid
<div className="grid grid-cols-3 gap-8">
  <div>
    <h3 className="text-4xl font-black text-yellow-300">5K+</h3>
    <p className="text-blue-100 mt-2">Properties</p>
  </div>
  {/* More stats... */}
</div>
```

**Styling Breakdown:**
- Background: Gradient blue
- Text: White (`text-white`) with blue accents (`text-blue-100`)
- Highlights: Yellow-300 for stats, yellow-200 gradient for "Dream Home Today"
- Responsive: `text-5xl` on mobile, `lg:text-7xl` on desktop

**Customization:**
- Change gradient: Modify `from-blue-600 via-blue-500 to-blue-700`
- Adjust heading size: Change `text-5xl lg:text-7xl`
- Update statistics: Edit the numbers and labels in the grid
- Change image: Replace `/images/Modern-villa.jpg`

---

#### **SearchBar.jsx**
```javascript
// Location: components/home/SearchBar.jsx
// Purpose: Advanced property search interface
```

**Features:**
- Tab navigation (Buy, Rent, Commercial)
- City dropdown with multiple options
- Search input with search icon
- Filter options: Property type, BHK, Budget, Status, New Projects
- Quick search tips at bottom
- Responsive grid layout

**State Management:**
```javascript
const [activeTab, setActiveTab] = useState("Buy");           // Current tab
const [selectedCity, setSelectedCity] = useState("Chennai");  // Selected city
const [propertyType, setPropertyType] = useState("House");    // House or Land
const [bedrooms, setBedrooms] = useState("");                 // BHK count
const [minPrice, setMinPrice] = useState("");                 // Min budget
const [maxPrice, setMaxPrice] = useState("");                 // Max budget
```

**Key Functions:**

```javascript
// Constructs search query and navigates to properties page
const handleSearch = useCallback(() => {
  const params = new URLSearchParams();
  
  if (selectedCity) params.append("city", selectedCity);
  if (propertyType) params.append("property_type", propertyType);
  if (bedrooms) params.append("bedrooms", bedrooms);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);
  
  router.push(`/properties?${params.toString()}`);
}, [selectedCity, propertyType, bedrooms, minPrice, maxPrice, router]);
```

**Styling:**
- Background: Gradient `from-blue-50 to-slate-50`
- Cards: White background with slate borders
- Buttons: Blue gradient `from-blue-600 to-blue-700`
- Inputs: Rounded `rounded-[16px]` with focus ring
- Text: Slate colors with hover effects

**Responsive Layout:**
```javascript
// 7-column grid that adapts to screen size
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
```

---

#### **FeaturedProperties.jsx**
```javascript
// Location: components/home/FeaturedProperties.jsx
// Purpose: Showcase top 3 properties on home page
```

**Features:**
- Fetches first 3 properties from API
- Auto-assigns ratings (4.9, 4.8, 4.7)
- Marks as verified
- Premium section badge
- "View All Properties" CTA button
- Loading state management

**Data Flow:**
```javascript
const fetchFeaturedProperties = async () => {
  try {
    setLoading(true);
    // 1. Fetch properties from API
    const res = await API.get("/properties");
    
    // 2. Take first 3
    const featured = res.data.properties.slice(0, 3);
    
    // 3. Add ratings
    featured[0].rating = 4.9;
    featured[1].rating = 4.8;
    featured[2].rating = 4.7;
    
    // 4. Mark as verified
    featured.forEach((property) => {
      property.verified = true;
      property.listingType = "For Sale";
      property.status = "Ready to Move";
    });
    
    // 5. Update state
    setProperties(featured);
  } catch (error) {
    console.error("Featured Properties Error:", error);
  } finally {
    setLoading(false);
  }
};
```

**Styling:**
- Section background: Gradient `from-white to-slate-50`
- Title: `text-5xl font-black`
- Badge: Blue background with white text
- Button: Blue gradient with hover effects

---

### 2. Property Components

#### **PropertyCard.jsx**
```javascript
// Location: components/property/PropertyCard.jsx
// Purpose: Display single property in grid
```

**Features:**
- Responsive tile design
- Lazy-loaded images
- Status badge
- Price display with currency formatting
- Property metadata (BHK, area)
- Rating and verification badges
- Memoized with React.memo for performance

**Code Structure:**
```javascript
export default memo(function PropertyCard({ property }) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-lg transition">
        {/* Image Section */}
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"                    // Lazy loading
          decoding="async"                  // Async decoding
          className="h-40 w-full object-cover"
        />
        
        {/* Content Section */}
        <div className="p-4">
          <p className="text-xs font-semibold text-blue-600">{property.city}</p>
          <h3 className="text-lg font-bold mt-2">{property.title}</h3>
          
          {/* Metadata */}
          <div className="flex justify-between mt-3 text-xs text-slate-600">
            <span>{property.bedrooms} BHK</span>
            <span>{property.area} sq.ft</span>
          </div>
          
          {/* Price and Status */}
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-xs text-slate-500">Starting</p>
              <p className="text-xl font-bold">₹{formatPrice(property.price)}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">
              {property.status || "Ready to Move"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});
```

**Performance Optimization:**
- Wrapped in `React.memo()` to prevent re-renders
- Image lazy loading with `loading="lazy"`
- Async decoding with `decoding="async"`

---

#### **PropertyCardSkeleton.jsx**
```javascript
// Location: components/property/PropertyCardSkeleton.jsx
// Purpose: Loading placeholder while fetching properties
```

**Features:**
- 12 animated skeleton cards
- Matches PropertyCard layout
- Pulse animation
- Better perceived performance

**Usage:**
```javascript
{loading ? (
  <PropertyCardSkeleton /> // Shows 12 animated skeletons
) : (
  properties.map(property => <PropertyCard key={property.id} property={property} />)
)}
```

---

#### **PropertyFilters.jsx**
```javascript
// Location: components/property/PropertyFilters.jsx
// Purpose: Sidebar filter panel
```

**Features:**
- Property type dropdown
- Bedrooms input
- Price range (min/max)
- Sort option
- Reset button

**Layout:** Positioned on left (`lg:col-span-1`), sticky at `top-20`

---

#### **PropertyGrid.jsx**
```javascript
// Location: components/property/PropertyGrid.jsx
// Purpose: Display properties in responsive grid
```

**Features:**
- Responsive grid layout
- 12 items per page
- Pagination support
- Empty state handling
- Loading state with skeletons

---

### 3. Layout Components

#### **MainLayout.jsx**
```javascript
// Location: components/layout/MainLayout.jsx
// Purpose: Wraps all pages with Navbar and Footer
```

**Structure:**
```jsx
<>
  <Navbar />           {/* Top navigation */}
  <main>{children}</main>
  <Footer />           {/* Footer - included once globally */}
</>
```

**Important:** Footer is included here, so don't import it in individual pages.

#### **Navbar.jsx**
```javascript
// Location: components/layout/Navbar.jsx
// Purpose: Top navigation bar
```

**Features:**
- Logo/brand link
- Navigation links (Home, Properties, My Properties)
- Authentication links (Login, Register)
- Responsive menu

#### **Footer.jsx**
```javascript
// Location: components/layout/Footer.jsx
// Purpose: Footer section with links and info
```

**Sections:**
1. **Brand** - Company description
2. **Quick Links** - Navigation links
3. **Company** - About, Contact, Blog, Careers
4. **Support** - Privacy, Terms, FAQ, Help
5. **Social Links** - Social media placeholders
6. **Copyright** - Legal text

**Styling:**
- Dark background: `bg-slate-900`
- 4-column grid on desktop, 1 column on mobile
- Links: Slate-400 with blue hover effect

---

### 4. Authentication Components

#### **LoginForm.jsx & RegisterForm.jsx**
```javascript
// Location: components/auth/LoginForm.jsx & RegisterForm.jsx
// Purpose: User authentication forms
```

**Features:**
- Email/password inputs
- Form validation
- Error handling
- Loading states
- API integration

---

### 5. UI Components

#### **Button.jsx**
```javascript
// Location: components/ui/Button.jsx
// Reusable button component

<Button size="lg" className="bg-blue-600">
  Click Me
</Button>
```

**Props:**
- `size`: "sm", "md", "lg"
- `variant`: "primary", "secondary"
- `className`: Custom Tailwind classes
- `disabled`: Button state
- `onClick`: Click handler

#### **Card.jsx**
```javascript
// Location: components/ui/Card.jsx
// Reusable card container

<Card>
  {/* Content */}
</Card>
```

#### **Container.jsx**
```javascript
// Location: components/ui/Container.jsx
// Responsive max-width container

<Container>
  <div>Max-width constrained content</div>
</Container>
```

---

## API Integration

### API Service (services/api.js)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Add JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### Common API Endpoints

```javascript
// Properties
GET /properties                    // Get all properties
GET /properties/:id               // Get single property
POST /properties                  // Create property
PUT /properties/:id               // Update property
DELETE /properties/:id            // Delete property
GET /properties/search/filter     // Search with filters

// Authentication
POST /auth/login                  // User login
POST /auth/register              // User registration
GET /auth/profile                // Get current user

// Inquiries
POST /inquiries                  // Create inquiry
GET /inquiries                   // Get user inquiries
```

### Making API Calls

```javascript
import API from '@/services/api';

// GET request
const res = await API.get('/properties');
const properties = res.data.properties;

// POST request
const res = await API.post('/properties', {
  title: 'New Property',
  price: 5000000,
  // ... other fields
});

// With query parameters
const res = await API.get('/properties/search/filter', {
  params: {
    city: 'Chennai',
    minPrice: 1000000,
    maxPrice: 10000000,
  }
});
```

---

## State Management

### React Context (context/AuthContext.jsx)

```javascript
// Global authentication state
const { user, isAuthenticated, login, logout, register } = useContext(AuthContext);
```

### Local State (useState)

```javascript
// Component-level state
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(false);
const [filters, setFilters] = useState({});
```

### Performance Optimization (useCallback)

```javascript
// Prevents recreating function on every render
const handleSearch = useCallback(() => {
  // Search logic
}, [dependencies]);
```

---

## Styling Guide

### Tailwind CSS Classes

**Colors:**
```
Blue: blue-600, blue-700, blue-100, blue-50
Slate: slate-900, slate-800, slate-600, slate-400, slate-50
Yellow: yellow-300, yellow-200, amber-100
White: white
```

**Spacing:**
```
Padding: p-4, px-6, py-3
Margin: m-4, mt-8, mb-12
Gap: gap-4, gap-8
```

**Typography:**
```
Font size: text-xs, text-sm, text-lg, text-4xl, text-7xl
Font weight: font-normal, font-semibold, font-bold, font-black
Line height: leading-tight, leading-8, leading-relaxed
```

**Responsive:**
```
sm: < 640px
md: 640px - 1024px
lg: 1024px - 1280px
xl: > 1280px

Usage: sm:flex md:grid lg:grid-cols-4
```

**Hover & Active States:**
```
hover:bg-blue-700
active:scale-95
transition (for smooth animation)
focus:border-blue-500 focus:ring-1 focus:ring-blue-500
```

---

## Performance Optimization

### 1. Component Memoization
```javascript
// Prevent unnecessary re-renders
export default memo(PropertyCard);
```

### 2. Lazy Image Loading
```javascript
<img
  src={url}
  loading="lazy"      // Only load when visible
  decoding="async"    // Async decoding
/>
```

### 3. useCallback Optimization
```javascript
// Create stable function reference
const handleSearch = useCallback(() => {
  // Logic here
}, [dependencies]);
```

### 4. Skeleton Loaders
```javascript
// Show animated placeholder while loading
{loading ? <Skeleton /> : <Content />}
```

### 5. Code Splitting
```javascript
// Dynamic imports for large components
const LargeComponent = dynamic(() => import('@/components/Large'));
```

---

## Common Patterns

### 1. Search & Filter Pattern
```javascript
// State
const [filters, setFilters] = useState({});

// Handle filter change
const handleFilterChange = (key, value) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};

// Apply filters
const handleSearch = useCallback(() => {
  router.push(`/properties?${new URLSearchParams(filters)}`);
}, [filters, router]);
```

### 2. Pagination Pattern
```javascript
const [page, setPage] = useState(1);
const [limit] = useState(12);

const handleNextPage = useCallback(() => {
  setPage(prev => prev + 1);
}, []);

const handlePrevPage = useCallback(() => {
  setPage(prev => (prev > 1 ? prev - 1 : 1));
}, []);
```

### 3. Loading State Pattern
```javascript
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/endpoint');
      setData(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### 4. Controlled Input Pattern
```javascript
const [value, setValue] = useState('');

return (
  <input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter value"
  />
);
```

---

## Troubleshooting

### Problem: Double Footer
**Cause:** Footer imported in both MainLayout and page
**Solution:** Remove Footer import from individual pages; it's already in MainLayout

### Problem: Images Not Loading
**Cause:** Image path incorrect or file missing
**Solution:** 
- Verify file exists in `/public/images/`
- Use correct path: `/images/filename.jpg`
- Check console for 404 errors

### Problem: API Connection Error
**Cause:** Backend not running or CORS issue
**Solution:**
- Ensure backend is running on port 5000
- Check API baseURL in `services/api.js`
- Verify CORS headers in backend

### Problem: Styles Not Applying
**Cause:** Tailwind CSS not processing classes
**Solution:**
- Verify class names are valid Tailwind classes
- Check `tailwind.config.js` includes all template paths
- Use `npm run dev` to rebuild

### Problem: State Not Updating
**Cause:** Direct state mutation or missing dependency in useEffect
**Solution:**
- Always use setState, never mutate state directly
- Add all dependencies to useEffect dependency array
- Use useCallback for event handlers

### Problem: Page Flickering
**Cause:** Components re-rendering unnecessarily
**Solution:**
- Use React.memo for list items
- Use useCallback for event handlers
- Move state up to prevent prop changes

---

## Best Practices

1. **Component Organization**
   - Keep components small and focused
   - One component per file
   - Use descriptive names

2. **State Management**
   - Lift state up when multiple components need it
   - Use Context for global state
   - Keep local state when possible

3. **Performance**
   - Memoize expensive components
   - Lazy load images
   - Use useCallback for handlers
   - Avoid inline functions

4. **Styling**
   - Use Tailwind utility classes
   - Maintain consistent spacing
   - Test on multiple screen sizes
   - Use semantic HTML

5. **API Integration**
   - Use error handling in try-catch
   - Show loading states
   - Validate data before using
   - Log errors for debugging

6. **Accessibility**
   - Use semantic HTML tags
   - Add alt text to images
   - Ensure keyboard navigation
   - Use proper heading hierarchy

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Axios Docs:** https://axios-http.com

---

**Last Updated:** June 2026
**Version:** 1.0.0
