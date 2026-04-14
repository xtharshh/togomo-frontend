# Togomo: Premium Tiffin Subscription Application Blueprint

## Overview
Togomo is a premium React Native-based subscription platform for daily meals that lets users choose monthly, weekly, or per-day plans, customize meals for each day, discover nearby registered restaurants based on location, track assigned delivery agents, and negotiate subscription pricing with restaurants.[cite:41][cite:42][cite:43][cite:47][cite:50] The product should be designed as a full marketplace and operations platform with customer, restaurant, delivery, and admin experiences so it can scale beyond a simple ordering app into a recurring-meal commerce system.[cite:41][cite:44][cite:47][cite:50]

## Product Vision
The core value of Togomo is convenience plus control: users should not only subscribe to meals, but also tailor what they receive on specific days, pause or change plans, negotiate better subscription terms, and see reliable delivery visibility.[cite:42][cite:47] Existing tiffin and meal-subscription products highlight discovery, flexible plans, order management, and service operations, which indicates that a premium entrant should combine those baseline capabilities with a smoother subscription-first experience.[cite:41][cite:43][cite:44][cite:47]

## Primary Users
### Customers
Customers include students, working professionals, families, and people living in PGs or rented accommodation who want dependable recurring meals instead of repeatedly placing ad hoc food orders.[cite:43] These users value affordability, custom meal preferences, flexible scheduling, and visibility into daily delivery.[cite:42][cite:47]

### Restaurant Partners
Restaurant and tiffin partners need a system to manage subscriptions, recurring meal schedules, pricing, serviceable pincodes, customer requests, delivery assignment, and payment collection from repeated customers.[cite:44][cite:47][cite:50] They also need tools to approve negotiated plans and control operational load by day and area.[cite:47][cite:50]

### Delivery Agents
Delivery agents need a lightweight app for route visibility, assigned deliveries, status updates, OTP-based confirmation, and payout tracking.[cite:44][cite:47] Daily traceability improves customer trust and restaurant coordination.[cite:42][cite:47]

### Platform Admins
Admins need onboarding, KYC review, restaurant approval, dispute resolution, commission controls, analytics dashboards, and fraud/risk monitoring for subscriptions, payments, and negotiation workflows.[cite:44][cite:47][cite:50]

## Core Value Proposition
Togomo should differentiate itself with a subscription-native system rather than a conventional food delivery interface.[cite:42][cite:47] The platform should allow a user to build a recurring food calendar, assign meal preferences by date, subscribe from nearby providers, negotiate plans, and still receive trackable daily fulfillment from a local restaurant network.[cite:41][cite:42][cite:43][cite:47]

## Core Features
### Customer Features
- Sign up with mobile OTP, email, or social login, then set home, office, hostel, or PG addresses for serviceability checks.
- Discover nearby registered restaurants using GPS location, saved addresses, and delivery radius filters.[cite:41][cite:43][cite:46]
- Choose subscription mode: per-day, weekly, monthly, trial pack, lunch-only, dinner-only, or combo plan.[cite:41][cite:47]
- Create a day-wise meal calendar with custom meal selection for each date, such as different curries, rotis, rice portions, salads, or add-ons.
- Apply dietary filters including veg, non-veg, high-protein, Jain, low-spice, diabetic-friendly, or regional cuisine preferences.[cite:42][cite:43]
- Pause, resume, skip, reorder, upgrade, downgrade, or cancel upcoming deliveries from the subscription dashboard.[cite:47]
- Negotiate with restaurants on pricing, duration, meal count, or custom packages through structured offer and counter-offer flows.
- Track the delivery agent assigned by the restaurant in real time or near-real time for each active delivery day.[cite:42][cite:47]
- View invoices, savings, active plan details, consumed meals, refunds, wallet balance, and loyalty benefits.
- Rate meals, submit complaints, request replacements, and chat with support or restaurant staff.

### Restaurant Features
- Restaurant onboarding with KYC, menu setup, cuisine tags, serviceable radius, delivery timings, packaging charges, and subscription pricing slabs.[cite:44][cite:47][cite:50]
- Ability to publish per-day, weekly, monthly, corporate, family, student, or custom plans.
- Menu management for day-wise meal options, quantity variants, combo packs, and optional add-ons.
- Subscription dashboard showing active customers, meal demand forecasting, paused users, renewals, due payments, and churn risk.
- Negotiation inbox to accept, reject, or counter customer subscription offers.
- Delivery assignment panel to map orders to in-house delivery agents or third-party fleet partners.[cite:47]
- Live order board with daily prep count, dispatch queue, and delivery completion tracking.[cite:44][cite:47]
- Earnings dashboard, settlement reports, and customer retention analytics.[cite:47][cite:50]

### Delivery Agent Features
- Login with verified number and linked restaurant account.
- Daily route list with optimized stop order and customer notes.
- Navigation support using maps deep links.
- Order status updates: picked up, out for delivery, delayed, delivered, failed.
- OTP, PIN, or proof-of-delivery confirmation.
- Earnings, trips completed, distance traveled, and payout history.

### Admin Features
- Restaurant approval and verification panel.[cite:44][cite:50]
- Subscription oversight across cities, localities, and restaurants.
- Commission and fee management by city, vendor type, or plan type.
- Analytics for GMV, MRR, weekly active subscribers, retention, skip rates, and successful renewals.
- Dispute handling for price conflicts, delivery failures, refunds, and abuse in negotiation chat.
- Coupon, referral, and promotional campaign management.
- Notification control center for transactional and promotional messaging.

## Premium Features
A premium version of Togomo should go beyond standard tiffin management software by adding user-centric convenience and business intelligence layers.[cite:44][cite:47] High-value additions include AI-assisted meal recommendations, smart meal calendar autofill, health-goal plans, office team subscriptions, split billing, family accounts, subscription gifting, and churn prediction for restaurants.[cite:42]

Suggested premium add-ons:
- AI meal planner based on historical choices, taste profile, allergies, and budget.
- Smart auto-negotiation suggestions such as “best offer” or “common market price” recommendations.
- Corporate and society bulk subscriptions.
- Family wallet and multi-user linked accounts.
- Health integrations with calorie and macro estimation.
- Priority delivery or guaranteed time-slot subscriptions.
- Dynamic loyalty tiers and cashback wallets.
- Seasonal and festival meal packs.
- Voice-assisted ordering and multilingual support.

## Subscription Model
| Plan Type | Description | Notes |
|---|---|---|
| Per-day | User chooses meals only for selected dates | Best for irregular schedules |
| Weekly | User subscribes for 7-day or workweek cycles | Good for students and office users |
| Monthly | Full recurring plan with day-wise customization | Core premium plan |
| Trial | 1 to 3 day starter plan | Useful for conversion funnels |
| Custom contract | Negotiated price, custom frequency, group meals | Ideal for families and corporates |

The subscription engine should treat each meal day as a configurable schedule item under a larger plan so users can mix flexibility with commitment.[cite:42][cite:47] This structure supports pausing, replacement meals, carry-forward rules, make-up deliveries, and variable pricing for weekends or add-ons.[cite:47]

## Negotiation Engine
Negotiation can become a signature differentiator if it is structured rather than free-form.[cite:42] Instead of only chat-based bargaining, the app should support controlled negotiation objects with offer price, duration, meal count, exclusions, expiry, and restaurant response history so both sides have traceability and fewer disputes.

Recommended negotiation flow:
1. User selects a restaurant plan.
2. User taps “Request Better Offer.”
3. User proposes budget, plan duration, number of meals, and custom requests.
4. Restaurant accepts, rejects, or counters.
5. Final agreed plan converts into a payable subscription contract.
6. All negotiated terms are stored as an immutable order agreement.

## Delivery Tracking Model
Daily delivery tracking should connect the restaurant dispatch panel, delivery agent app, and customer live order view.[cite:42][cite:47] Depending on budget and rollout stage, the first version can offer status-based tracking with periodic location pings, while later versions can support live GPS tracking and ETA prediction.[cite:42]

Delivery milestones should include:
- Meal prepared
- Packed
- Assigned to rider
- Out for delivery
- Arriving soon
- Delivered
- Issue reported

## Recommended Technical Stack
Since the target client is React Native, the platform can use a cross-platform mobile architecture with a modular backend and role-specific dashboards.[cite:8][cite:17] The stack below is optimized for scalability, real-time updates, and product polish.

### Frontend
- React Native with Expo if fast iteration is the priority, or bare React Native if deep native modules and performance tuning are expected.[cite:8]
- TypeScript for type safety and maintainability.
- React Navigation for app routing.
- Zustand or Redux Toolkit for global state.
- React Query or TanStack Query for server-state caching and sync.
- NativeWind or Styled Components for design system implementation.
- React Hook Form plus Zod for form handling and validation.
- Map integration using Google Maps SDK or Mapbox for location, ETA, and live agent tracking.
- Socket-based live updates for delivery status, chat, and negotiation events.

### Backend
- Node.js with NestJS or Express for a fast, modular API layer, especially if real-time negotiation and delivery updates are central.[cite:17]
- Alternative backend: Django plus Django REST Framework if strong admin tooling and relational workflows are priorities.
- PostgreSQL as the primary database for subscriptions, pricing, contracts, users, and restaurant operations.
- Redis for caching, session-like ephemeral data, rate limiting, queues, and presence.
- WebSocket layer using Socket.IO or native WebSocket gateways.
- Background jobs using BullMQ or Celery for reminders, renewals, settlement jobs, and notification scheduling.
- Elasticsearch or Meilisearch for fast restaurant and menu search if catalog scale grows.

### Admin and Restaurant Dashboards
- React web app using Next.js for admin and restaurant management.
- Component library such as shadcn/ui or custom design system.
- Role-based access controls for admin, restaurant owner, staff, support, and finance users.

### Payments and Finance
- Razorpay for UPI, cards, net banking, autopay, and subscription collections in India.
- Wallet ledger for cashback, refunds, and credit notes.
- Settlement engine for restaurant payouts and commission reconciliation.

### Notifications and Communication
- Firebase Cloud Messaging for push notifications, which aligns well with the user’s prior work in mobile notifications.[cite:2][cite:3]
- SMS OTP provider such as MSG91, Twilio, or a local Indian gateway.
- WhatsApp Business API for order updates, renewals, and support escalation.
- In-app messaging for negotiation and support chat.

### Infrastructure and DevOps
- AWS, GCP, or Azure for scalable deployment.
- Dockerized services for API, workers, and realtime services.
- Nginx or managed gateway for routing and rate limiting.
- CI/CD with GitHub Actions.
- Sentry for crash reporting.
- PostHog, Mixpanel, or Firebase Analytics for product analytics.
- Cloudinary or S3-compatible storage for menu images and documents.

## Suggested Data Model
Core entities should include:
- User
- Address
- Restaurant
- RestaurantBranch
- MenuItem
- MealPlan
- Subscription
- SubscriptionDay
- NegotiationRequest
- NegotiationOffer
- DeliveryAgent
- DeliveryTask
- Payment
- WalletTransaction
- Coupon
- Review
- SupportTicket
- NotificationLog

The most important structural choice is to model subscriptions at both plan and day levels, because Togomo depends on date-wise customization and operational fulfillment for recurring meals.[cite:42][cite:47] A `Subscription` record should represent the contract, while `SubscriptionDay` records should represent actual scheduled meal instances with item selections, notes, and status.

## Architecture Approach
A modular monolith is the best phase-one architecture because it is faster to build than microservices while still allowing clear domain boundaries. Recommended domain modules include Auth, User Profile, Restaurants, Menus, Discovery, Subscriptions, Negotiation, Delivery, Payments, Notifications, Support, and Analytics.

This approach reduces early DevOps overhead while keeping migration paths open if growth demands service extraction later. Realtime events for negotiation and tracking should still be event-driven internally through queues and socket gateways even if the deployment begins as one backend codebase.

## Security and Trust
A meal subscription platform handling live locations, payments, and negotiation requires strong trust controls. The app should include:
- JWT or session token security with refresh token rotation.
- OTP-based login and device verification.
- Role-based permissions for users, restaurants, agents, and admins.
- KYC and document verification for restaurants and delivery partners.
- Payment reconciliation and signed webhook validation.
- Rate limiting for OTP, login, and negotiation endpoints.
- Audit logs for admin actions and negotiated contract changes.
- Encryption for sensitive personal data and secure secrets management.

## Product UX Principles
The app should feel premium, simple, and reliable. Because recurring meal products are habit-driven, the UX should optimize for low daily effort and high predictability rather than flashy discovery alone.

Recommended UX principles:
- Subscription first, not cart first.
- Make day-wise customization visual using a meal calendar.
- Keep the “pause tomorrow” and “change next week” actions one tap away.
- Use clean plan summaries with transparent savings and delivery windows.
- Show trust markers like verified kitchens, hygiene score, and on-time rate.
- Make negotiation structured and professional rather than chaotic.
- Keep delivery tracking simple and precise.

## Monetization Model
Togomo can support multiple revenue streams:
- Commission on subscription orders.[cite:44][cite:47]
- Featured placement for restaurants.
- SaaS tools for restaurant management.[cite:44][cite:47][cite:50]
- Delivery fees or premium express subscription add-ons.
- Customer premium membership for loyalty rewards, priority support, and extra negotiation benefits.
- Corporate subscription packages.
- Advertising for meal add-ons and partner brands.

## Key Metrics
The first dashboard should monitor:
- Monthly recurring revenue
- Gross merchandise value
- Active subscribers
- Plan renewal rate
- Churn rate
- Skip or pause frequency
- Average negotiated discount
- Restaurant acceptance rate for offers
- On-time delivery rate
- Complaint rate
- Average revenue per restaurant
- CAC to LTV ratio

## Rollout Plan
### Phase 1: MVP
- User onboarding and address setup.
- Nearby restaurant listing.
- Weekly/monthly/per-day plans.
- Day-wise meal customization.
- Basic restaurant dashboard.
- Payment integration.
- Delivery assignment and status updates.
- Push notifications.

### Phase 2: Growth
- Live delivery tracking.
- Structured negotiation engine.
- Coupons, referrals, and loyalty.
- Ratings, support, and issue management.
- Advanced analytics for restaurants.
- Wallet and refund ledger.

### Phase 3: Premium Scale
- Corporate subscriptions.
- AI meal recommendations.
- Family/shared plans.
- Predictive retention and churn tools.
- Multi-city operations.
- Dynamic pricing and time-slot guarantees.

## Suggested Team Structure
A serious premium build would ideally include:
- 1 product manager
- 1 UI/UX designer
- 2 React Native developers
- 1 frontend web developer for admin dashboards
- 2 backend engineers
- 1 QA engineer
- 1 DevOps engineer part-time or shared
- 1 data analyst later-stage

A smaller startup version can begin with one full-stack lead, one React Native developer, one designer, and one backend engineer, but the roadmap should still be structured for scale.

## Final Direction
Togomo has the potential to become more than a tiffin ordering app if it is built around subscriptions, day-wise personalization, local restaurant aggregation, operational visibility, and negotiated pricing. The product should be positioned as a premium recurring meal platform for modern urban users who want homemade or restaurant meals with the flexibility of a custom meal calendar and the reliability of a managed subscription system.[cite:41][cite:42][cite:43][cite:47]
