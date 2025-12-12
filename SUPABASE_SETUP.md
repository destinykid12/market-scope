# Supabase Backend Setup Guide

## Overview
This project now has a complete Supabase backend integration with database schema, authentication, and service layers for managing businesses, reviews, messages, products, and user data.

## Project Credentials
- **URL**: https://bxmvdfuwphbaewcfrysb.supabase.co
- **Anon Key**: Configured in `.env`
- **Service Role Key**: Stored securely (use for backend operations only)

## Quick Start

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Setup Database Schema
1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor**
4. Create a new query
5. Copy the entire content from `database.sql`
6. Execute the query

This will create:
- Tables: users, businesses, products, reviews, messages, conversations, categories, business_followers
- Indexes for optimal performance
- Row Level Security (RLS) policies
- Default categories

### 3. Environment Variables
The `.env` file is already configured with your Supabase credentials. Make sure it's in your root directory.

## Service Layer Architecture

### Authentication Service (`shared/auth.service.ts`)
Handles user registration, login, OTP verification, and profile management.

**Key Methods**:
- `sendOTP(phone)` - Send OTP to phone number
- `verifyOTP(phone, token, userData?)` - Verify OTP and create/get user
- `signUp(data)` - Email/password registration
- `signIn(data)` - Email/password login
- `getCurrentUser()` - Get authenticated user
- `signOut()` - Logout user
- `updateProfile(userId, updates)` - Update user profile

**Usage**:
```typescript
import { authService } from '@shared/services';

// Send OTP
const { success, error } = await authService.sendOTP('+234801234567');

// Verify OTP
const { user, error } = await authService.verifyOTP('+234801234567', '123456', {
  full_name: 'John Doe',
  email: 'john@example.com',
  role: 'business'
});
```

### Business Service (`shared/business.service.ts`)
Manage business listings, search, filtering, and follower management.

**Key Methods**:
- `getBusinesses(filters)` - Get all businesses with filters
- `getBusinessById(id)` - Get single business
- `getBusinessByUserId(userId)` - Get user's business
- `createBusiness(userId, data)` - Create new business
- `updateBusiness(id, updates)` - Update business
- `updateBusinessStats(id, stats)` - Update views, inquiries, followers
- `deleteBusiness(id)` - Delete business
- `followBusiness(userId, businessId)` - Follow a business
- `unfollowBusiness(userId, businessId)` - Unfollow business

**Usage**:
```typescript
import { businessService } from '@shared/services';

// Get businesses with filters
const { data, error } = await businessService.getBusinesses({
  category: 'Fashion & Textiles',
  location: 'Lagos',
  searchQuery: 'fabric',
  limit: 10
});

// Create business
const { data: business } = await businessService.createBusiness(userId, {
  name: 'My Business',
  category: 'Fashion & Textiles',
  location: 'Lagos',
  address: '123 Main St',
  description: 'High quality fabrics',
  phone: '+234801234567',
  email: 'business@example.com'
});
```

### Review Service (`shared/review.service.ts`)
Manage business reviews and ratings.

**Key Methods**:
- `getBusinessReviews(businessId)` - Get all reviews for a business
- `getReviewById(id)` - Get single review
- `createReview(data)` - Create new review
- `updateReview(id, updates)` - Update review
- `deleteReview(id)` - Delete review
- `getBusinessAverageRating(businessId)` - Get business average rating
- `hasUserReviewedBusiness(userId, businessId)` - Check if user reviewed

**Usage**:
```typescript
import { reviewService } from '@shared/services';

// Create review
const { data } = await reviewService.createReview({
  business_id: businessId,
  user_id: userId,
  rating: 5,
  comment: 'Excellent service!'
});

// Get reviews
const { data: reviews } = await reviewService.getBusinessReviews(businessId);
```

### Message Service (`shared/message.service.ts`)
Handle user-to-business messaging and conversations.

**Key Methods**:
- `sendMessage(senderId, recipientId, content)` - Send message
- `getConversationMessages(userId, otherUserId)` - Get conversation
- `getUserConversations(userId)` - Get all conversations for user
- `getOrCreateConversation(userId, businessId)` - Get or create conversation
- `markAsRead(messageId)` - Mark message as read
- `markConversationAsRead(userId, otherUserId)` - Mark all as read
- `getUnreadCount(userId)` - Get unread message count

**Usage**:
```typescript
import { messageService } from '@shared/services';

// Send message
const { data } = await messageService.sendMessage(userId, businessUserId, 'Hello!');

// Get conversations
const { data: conversations } = await messageService.getUserConversations(userId);

// Mark as read
await messageService.markAsRead(messageId);
```

### Product Service (`shared/product.service.ts`)
Manage business products and services.

**Key Methods**:
- `getBusinessProducts(businessId)` - Get all products
- `getProductById(id)` - Get single product
- `createProduct(data)` - Create product
- `updateProduct(id, updates)` - Update product
- `deleteProduct(id)` - Delete product
- `createBulkProducts(products)` - Create multiple products
- `deleteBulkProducts(productIds)` - Delete multiple products

**Usage**:
```typescript
import { productService } from '@shared/services';

// Create product
const { data } = await productService.createProduct({
  business_id: businessId,
  name: 'Premium Fabric',
  description: 'High quality cotton',
  image_url: 'https://example.com/fabric.jpg',
  price: 5000
});
```

### User Service (`shared/user.service.ts`)
Manage user profiles and data.

**Key Methods**:
- `getUserById(id)` - Get user by ID
- `getUserByEmail(email)` - Get user by email
- `getUserByPhone(phone)` - Get user by phone
- `updateUser(id, updates)` - Update user
- `getUsersByRole(role)` - Get users by role
- `searchUsers(query)` - Search users
- `deleteUser(id)` - Delete user account
- `verifyUser(id)` - Verify user

## Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- email (Text, Unique)
- phone (Text, Unique)
- full_name (Text)
- avatar_url (Text)
- role (Text: 'customer' | 'business')
- is_verified (Boolean)
- verification_code (Text)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Businesses Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key → users)
- name (Text)
- category (Text)
- location (Text)
- address (Text)
- description (Text)
- phone (Text)
- email (Text)
- image_url (Text)
- rating (Decimal)
- reviews_count (Integer)
- verified (Boolean)
- views (Integer)
- inquiries (Integer)
- followers (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Products Table
```sql
- id (UUID, Primary Key)
- business_id (UUID, Foreign Key → businesses)
- name (Text)
- description (Text)
- image_url (Text)
- price (Decimal)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Reviews Table
```sql
- id (UUID, Primary Key)
- business_id (UUID, Foreign Key → businesses)
- user_id (UUID, Foreign Key → users)
- rating (Integer: 1-5)
- comment (Text)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Messages Table
```sql
- id (UUID, Primary Key)
- sender_id (UUID, Foreign Key → users)
- recipient_id (UUID, Foreign Key → users)
- content (Text)
- read (Boolean)
- created_at (Timestamp)
```

### Conversations Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key → users)
- business_id (UUID, Foreign Key → businesses)
- last_message_id (UUID)
- unread_count (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Categories Table
```sql
- id (UUID, Primary Key)
- name (Text, Unique)
- icon (Text)
- count (Integer)
- created_at (Timestamp)
```

### Business Followers Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key → users)
- business_id (UUID, Foreign Key → businesses)
- created_at (Timestamp)
- UNIQUE(user_id, business_id)
```

## Security & Row Level Security (RLS)

All tables have RLS enabled with the following policies:

### Users
- Users can only view and update their own data

### Businesses
- Anyone can view businesses
- Users can only create/update their own businesses

### Reviews
- Anyone can view reviews
- Users can only create/update their own reviews

### Messages
- Users can only view messages where they are sender or recipient
- Users can only send messages as themselves

### Conversations
- Users can only view their own conversations

## Migration from localStorage to Supabase

The app currently uses localStorage for data. To migrate to Supabase:

### 1. Update Authentication Pages
- SignUp.tsx → Use `authService.signUp()`
- SignIn.tsx → Use `authService.signIn()`
- VerifyOTP.tsx → Use `authService.verifyOTP()`

### 2. Update Business Pages
- BusinessDashboard.tsx → Replace `businessService` localStorage with Supabase `businessService`
- Profile.tsx → Use Supabase `userService` and `businessService`

### 3. Update Business Listing Pages
- ExploreBusiness.tsx → Use `businessService.getBusinesses(filters)`
- BusinessDetail.tsx → Use `businessService.getBusinessById()` and `reviewService.getBusinessReviews()`

### 4. Update Messages
- Messages.tsx → Use `messageService.getUserConversations()` and `messageService.sendMessage()`

### 5. Update Search
- Search.tsx → Use `businessService.getBusinesses()` with search filters

## Environment Variables

Current `.env` file includes:
```
VITE_SUPABASE_URL=https://bxmvdfuwphbaewcfrysb.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

For production:
- Anon Key: Public-facing, for client-side authentication
- Service Role Key: Server-side only, for admin operations

## Best Practices

1. **Always handle errors** - All service methods return `{ data, error }`
2. **Use TypeScript types** - Import types from `shared/database.types`
3. **RLS is your security** - Rely on RLS policies, not client-side checks
4. **Cache when possible** - Consider using React Query for caching
5. **Real-time updates** - Use Supabase subscriptions for live updates
6. **Image uploads** - Use Supabase Storage for images
7. **Indexes** - Database already has proper indexes for common queries

## Troubleshooting

### RLS Policy Errors
If you get "new row violates row-level security policy":
- Check that user is authenticated
- Verify RLS policy allows the operation
- Ensure foreign key IDs match authenticated user

### Connection Issues
If you get connection errors:
- Verify `.env` has correct credentials
- Check Supabase project is running
- Ensure internet connectivity
- Check browser console for CORS issues

### Data Not Showing
- Verify RLS policies allow SELECT
- Check filters in query (WHERE clauses)
- Ensure data exists in database
- Check browser network tab for actual error

## File Structure

```
shared/
├── supabase.ts              # Supabase client
├── database.types.ts        # Database types
├── services.ts              # Service exports
├── auth.service.ts          # Authentication
├── business.service.ts      # Business management
├── review.service.ts        # Reviews
├── message.service.ts       # Messaging
├── product.service.ts       # Products
└── user.service.ts          # Users

database.sql                # Schema & migrations
.env                        # Environment variables
```

## Next Steps

1. Run the SQL migrations in Supabase dashboard
2. Update pages to use service layer instead of localStorage
3. Test authentication flow with OTP
4. Test business CRUD operations
5. Test messaging functionality
6. Add real-time subscriptions for messages
7. Implement image uploads to Supabase Storage

## Support

For issues:
1. Check Supabase dashboard for data integrity
2. Review RLS policies
3. Check browser console for errors
4. Verify service method parameters match schema
