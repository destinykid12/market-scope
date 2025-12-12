# Supabase Integration Checklist

## ✅ Backend Setup Complete
- [x] Supabase database schema created (`database.sql`)
- [x] Environment variables configured (`.env`)
- [x] Supabase client initialized (`shared/supabase.ts`)
- [x] Database types generated (`shared/database.types.ts`)
- [x] Authentication service created (`shared/auth.service.ts`)
- [x] Business service created (`shared/business.service.ts`)
- [x] Review service created (`shared/review.service.ts`)
- [x] Message service created (`shared/message.service.ts`)
- [x] Product service created (`shared/product.service.ts`)
- [x] User service created (`shared/user.service.ts`)
- [x] Services exported (`shared/services.ts`)
- [x] Auth hook created (`client/hooks/use-auth.ts`)

## 🚀 Next Steps: Migrate Pages to Supabase

### 1. Run Database Migrations
**Status**: Not started
**Steps**:
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy content from `database.sql`
4. Execute the query
5. Verify tables are created

### 2. Update Authentication Pages
**Status**: Partially complete

#### SignUp.tsx
- [x] Updated to use `authService.signUp()`
- [ ] Test registration flow
- [ ] Verify user is created in database

#### SignIn.tsx
- [ ] Update to use `authService.signIn()`
- [ ] Add password reset functionality
- [ ] Test login flow

#### VerifyOTP.tsx
- [ ] Update to use `authService.verifyOTP()`
- [ ] Handle OTP verification
- [ ] Redirect to dashboard on success

### 3. Update Business Pages
**Status**: Not started

#### BusinessDashboard.tsx
- [ ] Replace localStorage with `businessService`
- [ ] Implement `getBusinessByUserId()` to load user's business
- [ ] Implement `createBusiness()` for new business creation
- [ ] Implement `updateBusiness()` for editing
- [ ] Implement `updateBusinessStats()` for views/inquiries
- [ ] Fetch initial data with useEffect
- [ ] Add loading and error states

**Example**:
```typescript
import { businessService } from '@shared/services';
import { useAuth } from '@/hooks/use-auth';

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    if (user?.id) {
      loadBusiness();
    }
  }, [user?.id]);

  const loadBusiness = async () => {
    const { data, error } = await businessService.getBusinessByUserId(user.id);
    if (error) {
      console.error(error);
    } else {
      setBusiness(data);
    }
  };

  const handleSave = async (formData) => {
    if (business?.id) {
      await businessService.updateBusiness(business.id, formData);
    } else {
      await businessService.createBusiness(user.id, formData);
    }
    await loadBusiness();
  };

  // Rest of component...
}
```

#### Profile.tsx
- [ ] Replace localStorage with `userService`
- [ ] Load user profile with `getUserById()`
- [ ] Update profile with `updateUser()`
- [ ] Load business profile with `businessService`
- [ ] Add product management using `productService`

#### ExploreBusiness.tsx
- [x] Updated to use `businessService.getBusinesses()`
- [x] Added category and location filtering
- [ ] Test filtering and search
- [ ] Verify all businesses load correctly

### 4. Update Business Detail Page
**Status**: Not started

#### BusinessDetail.tsx
- [ ] Create this page to show single business
- [ ] Fetch business with `businessService.getBusinessById(id)`
- [ ] Fetch reviews with `reviewService.getBusinessReviews(id)`
- [ ] Display products with `productService.getBusinessProducts(id)`
- [ ] Allow leaving reviews with `reviewService.createReview()`
- [ ] Handle follow/unfollow with `businessService.followBusiness()`

**Example**:
```typescript
import { useParams } from 'react-router-dom';
import { businessService, reviewService, productService } from '@shared/services';

export default function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [biz, revs, prods] = await Promise.all([
        businessService.getBusinessById(id),
        reviewService.getBusinessReviews(id),
        productService.getBusinessProducts(id)
      ]);
      setBusiness(biz.data);
      setReviews(revs.data);
      setProducts(prods.data);
    };
    loadData();
  }, [id]);

  // Rest of component...
}
```

### 5. Update Messages Page
**Status**: Not started

#### Messages.tsx
- [ ] Replace localStorage with `messageService`
- [ ] Fetch conversations with `getUserConversations()`
- [ ] Load messages with `getConversationMessages()`
- [ ] Send messages with `sendMessage()`
- [ ] Mark messages as read with `markAsRead()`
- [ ] Real-time updates (optional): Use Supabase subscriptions

**Example**:
```typescript
import { messageService } from '@shared/services';
import { useAuth } from '@/hooks/use-auth';

export default function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (user?.id) {
      loadConversations();
    }
  }, [user?.id]);

  const loadConversations = async () => {
    const { data } = await messageService.getUserConversations(user.id);
    setConversations(data);
  };

  const handleSendMessage = async (recipientId, content) => {
    await messageService.sendMessage(user.id, recipientId, content);
    await loadConversations();
  };

  // Rest of component...
}
```

### 6. Update Home/Dashboard Pages
**Status**: Not started

#### Home.tsx / Index.tsx
- [ ] Show user's business dashboard if logged in
- [ ] Show recommended businesses
- [ ] Show user's followed businesses

### 7. Update Search Page
**Status**: Not started

#### Search.tsx
- [ ] Use `businessService.getBusinesses()` with search filters
- [ ] Real-time search as user types
- [ ] Show category and location filters

## 🔧 Utility Functions to Create

### Image Upload Handler
Create `client/lib/upload.ts`:
```typescript
import { supabase } from '@shared/services';

export async function uploadImage(file: File, bucket: string = 'business-images') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
  
  if (error) throw error;
  
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
}
```

### Real-time Messaging Subscription
Create `client/lib/subscriptions.ts`:
```typescript
import { supabase } from '@shared/services';

export function subscribeToMessages(userId: string, callback: (message: any) => void) {
  return supabase
    .channel(`messages:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `recipient_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
}
```

## 📝 Testing Checklist

### Authentication
- [ ] Sign up with email/password
- [ ] Sign up with OTP
- [ ] Sign in with email/password
- [ ] Sign in with OTP
- [ ] User data persists across page refresh
- [ ] Logout clears user data
- [ ] Profile update works
- [ ] Password reset works

### Businesses
- [ ] User can create a business listing
- [ ] Listings show in explore page
- [ ] Filtering by category works
- [ ] Filtering by location works
- [ ] Search functionality works
- [ ] Business stats update (views, inquiries, followers)
- [ ] Can follow/unfollow businesses
- [ ] Business rating updates after review

### Reviews
- [ ] Can leave review on business
- [ ] Review appears immediately
- [ ] Average rating updates
- [ ] Can edit own review
- [ ] Can delete own review
- [ ] Cannot review same business twice

### Messages
- [ ] Can send message to business
- [ ] Conversation appears in list
- [ ] Messages load in conversation
- [ ] Mark as read works
- [ ] Unread count shows correctly
- [ ] Delete message works

### Products
- [ ] Business owner can add products
- [ ] Products appear on business page
- [ ] Can edit product details
- [ ] Can delete products
- [ ] Product images display correctly

## 🔐 Security Checklist

- [ ] RLS policies are enabled on all tables
- [ ] Auth token is stored securely
- [ ] Sensitive data not logged to console
- [ ] User can only access their own data
- [ ] Service role key never exposed to client
- [ ] CORS properly configured
- [ ] Rate limiting in place (optional)

## 📦 Deployment Checklist

- [ ] Environment variables set on hosting platform
- [ ] Database backups configured
- [ ] Error logging configured (Sentry/LogRocket)
- [ ] Analytics configured
- [ ] SSL certificate active
- [ ] Database indexes verified
- [ ] Backup and restore tested

## 📚 Documentation Needed

- [ ] API documentation
- [ ] Setup guide for new developers
- [ ] Database schema documentation
- [ ] Troubleshooting guide
- [ ] Performance optimization guide

## Timeline Estimate

- Database migrations: 5 minutes
- Update authentication pages: 1-2 hours
- Update business pages: 2-3 hours
- Update messaging: 1-2 hours
- Update other pages: 1-2 hours
- Testing: 2-3 hours
- **Total: 1-2 days**

## Notes

- Use `useAuth()` hook in components instead of localStorage
- Always handle loading and error states
- Consider using React Query for data caching
- Implement proper error boundaries
- Add success notifications after actions
- Consider optimistic updates for better UX
