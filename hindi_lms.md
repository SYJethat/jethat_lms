# Hindi Language LMS — Full Product & Development Prompt

## 1. Project Objective

Build a **production-ready, scalable Hindi Language Learning Management System (LMS)** for web and mobile/responsive use.

The platform must support complete Hindi-language learning from **beginner to advanced level**, combining:

* Gamified learning
* AI-powered learning and assessment
* Live and online classes
* Physical classroom registration
* Digital avatars and virtual teachers
* Study materials and digital libraries
* Competitions and leaderboards
* Assignments and examinations
* Language certification
* Multiple Indian language institutes
* Region/country-based learning groups
* Role-based administration
* Accounting and reporting

The system should not be a prototype or static UI. **All major features must be functional, connected to a backend database, API-driven, secure, responsive, and ready for production deployment.**

---

# 2. Target Users

The platform should support:

1. Individual learners
2. Students enrolled through institutes
3. Teachers
4. Course creators
5. Content contributors
6. Course quality testers
7. Institute administrators
8. Regional administrators
9. Accounting staff
10. Super Admin
11. Sub Admin

The architecture should support expansion from Hindi to other Indian languages in the future.

---

# 3. Core Modules

Create the following modules:

### A. User & Authentication

* Registration
* Login/logout
* Email verification
* Mobile OTP verification
* Forgot password
* Reset password
* Social login if required
* Profile management
* Profile photo
* Country
* State
* City
* Region
* Native language
* Hindi proficiency
* Learning goals
* Notification preferences
* Privacy settings
* Account deletion
* Session management

Support role-based authentication and authorization.

---

# 4. Learning With Game Levels

Create a gamified learning system.

### Level Structure

Example:

* Level 1 — Beginner
* Level 2 — Basic
* Level 3 — Elementary
* Level 4 — Intermediate
* Level 5 — Upper Intermediate
* Level 6 — Advanced
* Level 7 — Professional

Admin must be able to create/edit/delete levels.

Each level can contain:

* Courses
* Lessons
* Chapters
* Vocabulary
* Grammar
* Listening
* Speaking
* Writing
* Reading
* Quizzes
* Assignments
* Tests
* Games

### Gamification

Students earn:

* XP
* Points
* Coins
* Badges
* Streaks
* Achievements
* Level progress

Example:

`Complete Lesson → XP → Unlock next lesson → Earn badge → Increase leaderboard rank`

Create daily/weekly/monthly challenges.

---

# 5. Competition System

Create competitions between learners.

Competition types:

### Country Competition

Students compete based on country.

Example:

`India vs USA vs UK vs Japan`

### Global Competition

All learners compete globally.

### Institute Competition

Students from different institutes compete.

### Regional Competition

State/city/region based competition.

### Individual Competition

One learner competes against another.

Leaderboard metrics:

* XP
* Test score
* Completed lessons
* Speaking score
* Writing score
* Listening score
* Assignment score
* Streak
* Overall proficiency

Competition should support:

* Start date
* End date
* Rules
* Eligibility
* Entry requirements
* Rewards
* Rankings
* Automatic result calculation

---

# 6. Leader Dashboard

Create a comprehensive leaderboard dashboard.

Show:

* Global rank
* Country rank
* Region rank
* Institute rank
* Weekly rank
* Monthly rank
* All-time rank
* XP
* Points
* Badges
* Streak
* Completed courses
* Average score

Charts:

* Learning progress
* XP earned
* Test performance
* Weekly activity
* Speaking improvement
* Vocabulary growth

---

# 7. Progress Level

Create a complete learner progress engine.

Dashboard should display:

`Overall Progress: 68%`

Separate progress:

* Reading
* Writing
* Listening
* Speaking
* Grammar
* Vocabulary
* Pronunciation
* Course completion

Show:

* Current level
* Next level
* Required XP
* Completed lessons
* Pending lessons
* Weak areas
* Recommended lessons

Create an AI recommendation engine:

> "Your listening score is lower than your writing score. Complete these 3 listening lessons."

---

# 8. IAP Compliance

Build the platform with appropriate **IAP/app-store compliance** for paid digital learning products.

Support:

* Subscription plans
* Course purchases
* In-app purchases where applicable
* Purchase verification
* Subscription status
* Renewal
* Cancellation
* Expiry
* Transaction history
* Refund status
* Invoice generation

Do not store raw payment-card information.

Payment architecture should allow integration with:

* Razorpay
* Stripe
* Apple In-App Purchase
* Google Play Billing

The exact payment method should be configurable based on platform and geography.

---

# 9. AI Chatbot

Create an AI Hindi Learning Chatbot.

Capabilities:

* Hindi conversation
* Grammar correction
* Vocabulary explanation
* Translation
* Sentence correction
* Hindi practice
* Role-play
* Question answering
* Lesson assistance
* Homework assistance
* Personalized learning

Example:

Student:

> "मुझे बाजार जाना है।"

AI:

> "Good sentence. You can also say: मैं बाजार जा रहा हूँ।"

Chatbot should maintain appropriate learning context and conversation history.

Admin should be able to configure:

* AI model
* System instructions
* Token limits
* Knowledge base
* Safety rules
* Usage limits

---

# 10. Digital Avatar

Create interactive digital avatars.

Avatar capabilities:

* Greeting
* Teaching
* Conversation
* Facial expressions
* Lip synchronization where supported
* Voice output
* Voice input
* Hindi pronunciation
* Lesson explanation

Provide multiple avatar types:

* Male teacher
* Female teacher
* Child-friendly teacher
* Professional teacher

Admin can assign avatars to courses/lessons.

---

# 11. Study Materials

Create a digital study-material management system.

Supported formats:

* PDF
* DOC/DOCX
* PPT/PPTX
* Images
* Audio
* Video
* EPUB
* Text
* Interactive content

Features:

* Upload
* Preview
* Download permissions
* Search
* Categories
* Tags
* Difficulty
* Language
* Course mapping
* Version control

---

# 12. Live Classes

Create live-class functionality.

Features:

* Schedule class
* Teacher assignment
* Student enrollment
* Calendar
* Meeting link
* Attendance
* Recording
* Class notes
* Homework
* Chat
* Q&A
* Notifications

Integration architecture should support services such as:

* Zoom
* Google Meet
* WebRTC/custom video infrastructure

Admin can configure the preferred provider.

---

# 13. Virtual Teachers

Create AI/virtual teacher profiles.

Each virtual teacher should have:

* Name
* Avatar
* Voice
* Teaching style
* Expertise
* Language
* Difficulty level
* Assigned courses
* Conversation capability

Students can select a virtual teacher for practice.

---

# 14. Physical Class Registration

Create region-wise physical classroom registration.

Hierarchy:

`Country → State/Province → City → Region → Institute → Center → Course`

Students should be able to:

1. Select country
2. Select state/region
3. Find nearby institute
4. View available courses
5. View batch timing
6. View teacher
7. View seats
8. Register
9. Pay if applicable
10. Receive confirmation

Institute dashboard should manage:

* Students
* Batches
* Teachers
* Attendance
* Fees
* Courses
* Certificates

---

# 15. Online Classes Registration

Create online course enrollment.

Course page should show:

* Course title
* Teacher
* Level
* Duration
* Schedule
* Price
* Curriculum
* Reviews
* Certificate availability
* Seats
* Language
* Start date

Student can:

`View → Register → Pay → Enroll → Learn`

---

# 16. Multiple Indian Institutes & Certification

Create an **Institute Marketplace/Directory**.

Different Indian institutes can offer Hindi-language certificate courses.

Each institute should have:

* Institute profile
* Logo
* Description
* Location
* Accreditation information
* Courses
* Teachers
* Fees
* Duration
* Certificate details
* Contact details
* Reviews

Certification workflow:

`Course → Learning → Assignments → Tests → Final Exam → Pass → Certificate`

Certificate should contain:

* Student name
* Course
* Institute
* Certificate ID
* Issue date
* Completion date
* Score
* QR code
* Verification URL/status

Create public certificate verification.

---

# 17. Online Assignments

Teachers/course creators can create assignments.

Assignment types:

* Text
* MCQ
* Audio submission
* Video submission
* File upload
* Writing
* Speaking
* Translation
* Grammar
* Vocabulary

Features:

* Deadline
* Marks
* Rubric
* Auto evaluation
* Manual evaluation
* Teacher feedback
* Resubmission
* Late submission tracking

---

# 18. AI Listening Test

AI-powered listening assessment.

System plays Hindi audio.

Student answers questions.

Evaluate:

* Correctness
* Comprehension
* Vocabulary
* Understanding

Generate:

* Score
* CEFR/proficiency mapping
* Weak topics
* Recommendations

---

# 19. AI Writing Test

Student receives a writing topic.

Example:

> "मेरे शहर के बारे में 150 शब्द लिखिए।"

AI evaluates:

* Grammar
* Spelling
* Vocabulary
* Sentence structure
* Coherence
* Relevance
* Writing level

Return:

* Overall score
* Detailed feedback
* Errors
* Corrected sentences
* Improvement suggestions

Teacher should be able to override AI evaluation.

---

# 20. AI Speaking Test

Create AI speaking assessment.

Student speaks Hindi using microphone.

System evaluates:

* Pronunciation
* Fluency
* Grammar
* Vocabulary
* Sentence formation
* Speech clarity
* Response relevance
* Speaking confidence indicators

Generate score and detailed feedback.

Architecture should support speech-to-text and audio analysis.

---

# 21. Libraries

Create digital libraries.

Categories:

* Hindi books
* Grammar books
* Stories
* Newspapers
* Audio books
* Videos
* Vocabulary
* Academic resources
* Cultural resources

Features:

* Search
* Filter
* Bookmark
* Favorites
* Reading history
* Progress tracking
* Access permissions

---

# 22. Online Test System

Create a complete examination engine.

Question types:

* MCQ
* Multiple answer
* True/False
* Fill in blank
* Match
* Ordering
* Listening
* Speaking
* Writing
* Reading

Features:

* Timer
* Random questions
* Question bank
* Difficulty levels
* Negative marking
* Auto-save
* Auto-submit
* Result calculation
* Pass/fail
* Certificate eligibility

Anti-cheating options should be configurable.

---

# 23. Access Levels / RBAC

Create strict Role-Based Access Control.

## Contributor

Can:

* Create content
* Upload materials
* Add questions
* Edit assigned content

Cannot publish directly unless approved.

## Teacher

Can:

* Manage assigned classes
* View students
* Create assignments
* Evaluate assignments
* Conduct classes
* View student progress
* Give feedback

## Course Creator

Can:

* Create courses
* Create lessons
* Create curriculum
* Add tests
* Add assignments
* Submit course for quality review

## Course Quality Tester

Can:

* Review courses
* Test lessons
* Check content
* Check questions
* Report errors
* Approve/reject
* Send for revision

## Admin

Full operational control:

* Users
* Courses
* Institutes
* Teachers
* Payments
* Certificates
* Competitions
* Reports
* Content
* AI
* Settings

## Sub Admin

Admin-defined restricted permissions.

Admin can configure exactly which modules the Sub Admin can access.

## Accounting

Can access:

* Payments
* Transactions
* Revenue
* Refunds
* Invoices
* Subscription
* Institute payments
* Reports

Accounting must not access sensitive learning/content administration unless explicitly granted.

---

# 24. Course Publishing Workflow

Implement approval workflow:

`Contributor/Course Creator`

↓

`Draft`

↓

`Submitted`

↓

`Quality Testing`

↓

`Rejected / Revision Required`

↓

`Approved`

↓

`Admin Approval`

↓

`Published`

↓

`Available to Students`

Maintain complete audit history.

---

# 25. Admin Dashboard

Create a professional admin dashboard.

Show:

* Total users
* Active users
* New registrations
* Courses
* Institutes
* Teachers
* Live classes
* Revenue
* Subscriptions
* Certificates issued
* Tests completed
* Average score
* AI usage
* Competition activity

Charts:

* User growth
* Revenue
* Course enrollment
* Learning activity
* Country-wise users
* Institute performance

---

# 26. Student Dashboard

Dashboard should contain:

### Header

* Profile
* Notifications
* Search
* Language
* Settings

### Main

* Current course
* Current level
* Progress
* XP
* Streak
* Continue learning

### Sections

* Recommended courses
* Assignments
* Upcoming classes
* Tests
* Competitions
* Leaderboard
* Certificates
* Library
* AI teacher
* Chatbot

---

# 27. Notification System

Create centralized notifications.

Channels:

* In-app
* Email
* Push
* SMS/WhatsApp where legally/configurably supported

Events:

* New assignment
* Assignment deadline
* Class reminder
* Test result
* Certificate issued
* Competition started
* Rank changed
* Subscription expiry
* New course
* Teacher message

---

# 28. Search System

Global search should search:

* Courses
* Lessons
* Teachers
* Institutes
* Books
* Videos
* Tests
* Assignments
* Certificates

Filters:

* Level
* Region
* Institute
* Course type
* Price
* Rating
* Duration
* Online/offline

---

# 29. Database Design

Create a normalized database architecture.

Minimum entities:

* users
* roles
* permissions
* user_roles
* countries
* states
* regions
* cities
* institutes
* institute_centers
* teachers
* students
* courses
* course_levels
* modules
* lessons
* learning_materials
* questions
* question_options
* assignments
* submissions
* tests
* test_attempts
* enrollments
* classes
* class_sessions
* attendance
* competitions
* leaderboards
* achievements
* badges
* xp_transactions
* progress
* certificates
* certificate_verifications
* subscriptions
* payments
* invoices
* refunds
* notifications
* chatbot_sessions
* ai_assessments
* library_items
* audit_logs

Use proper primary keys, foreign keys, indexes and timestamps.

---

# 30. API Architecture

Build REST API or equivalent service architecture.

Example:

`POST /api/auth/register`

`POST /api/auth/login`

`GET /api/courses`

`GET /api/courses/{id}`

`POST /api/courses`

`POST /api/enrollments`

`GET /api/student/progress`

`GET /api/leaderboard`

`POST /api/tests/{id}/submit`

`POST /api/assignments/{id}/submit`

`POST /api/ai/speaking-test`

`POST /api/ai/writing-test`

`POST /api/ai/listening-test`

`POST /api/chat`

`GET /api/certificates/{id}`

`GET /api/certificates/verify/{certificateId}`

All APIs must have authentication, authorization, validation and error handling.

---

# 31. Security

Implement:

* JWT/session authentication
* Password hashing
* OTP security
* RBAC
* API authorization
* Input validation
* Rate limiting
* CSRF protection where applicable
* XSS protection
* SQL injection protection
* Secure file upload
* File type validation
* Encryption for sensitive data
* Audit logs
* Admin activity logs
* Payment security
* Secure secrets management

Never expose API keys or AI provider keys in frontend code.

---

# 32. AI Architecture

Create an abstraction layer so AI providers can be changed without rewriting the application.

Possible providers:

* OpenAI
* Anthropic
* Google
* Open-source models

AI services:

`AI Gateway`

→ Chat

→ Writing evaluation

→ Speaking evaluation

→ Listening evaluation

→ Recommendation engine

→ Virtual teacher

→ Content assistance

Store AI evaluation metadata and scores, but keep the architecture provider-independent.

---

# 33. Analytics

Track:

* Login
* Lesson completion
* Course completion
* Time spent
* Quiz attempts
* Test scores
* Speaking attempts
* Writing attempts
* Listening attempts
* Assignment submissions
* Class attendance
* Purchases
* Subscription
* Competition participation

Create analytics dashboards for:

* Student
* Teacher
* Institute
* Admin

---

# 34. Responsive UI

The system must work properly on:

* Mobile
* Tablet
* Laptop
* Desktop

UI should be:

* Modern
* Clean
* Accessible
* Fast
* Simple for beginners
* Professional for institutes

Use reusable components.

---

# 35. Accessibility

Support:

* Keyboard navigation
* Screen readers
* Proper contrast
* Adjustable font size
* Captions
* Audio controls
* Accessible forms
* ARIA where necessary

---

# 36. Internationalization

Although the initial product is for Hindi learning, architecture must support:

* Hindi
* English
* Other Indian languages

Do not hard-code language-specific strings.

Use translation/i18n files.

---

# 37. Reporting

Generate reports:

### Student

* Learning progress
* Test performance
* Attendance
* Assignments
* Certificates

### Teacher

* Student performance
* Class attendance
* Assignment results

### Institute

* Enrollment
* Revenue
* Student performance
* Courses
* Certificates

### Admin

* Platform usage
* Revenue
* Country statistics
* Institute statistics
* User statistics

Allow CSV/PDF export where applicable.

---

# 38. Audit System

Every important administrative action must be logged.

Log:

* User
* Role
* Action
* Module
* Previous value
* New value
* Timestamp
* IP/device metadata where appropriate

Example:

`Admin → Course → Published → 27 Aug 2026 10:25`

---

# 39. Payment & Accounting

Accounting dashboard:

* Total revenue
* Today's revenue
* Monthly revenue
* Course sales
* Subscription revenue
* Institute revenue
* Refunds
* Pending payments
* Failed payments

Transaction states:

`Pending → Success → Failed → Refunded`

Generate invoice/receipt records.

---

# 40. Certificate System

Certificate generation should be automated after successful completion.

Certificate:

* Unique certificate number
* Student name
* Course
* Institute
* Score
* Grade
* Issue date
* QR code
* Verification status

Anyone should be able to verify a certificate using its ID/QR code.

---

# 41. Recommendation Engine

Build personalized recommendations.

Input:

* Level
* Scores
* Previous lessons
* Weak areas
* Learning history
* Interests
* Goal

Output:

* Next lesson
* Course recommendation
* Practice exercises
* AI conversation topic
* Tests
* Study material

---

# 42. Gamification Rules Engine

Make XP and rewards configurable from Admin.

Example:

* Lesson completed = +20 XP
* Quiz passed = +30 XP
* Assignment = +50 XP
* Speaking test = +100 XP
* 7-day streak = +200 XP

Do not hard-code these values.

---

# 43. Content Management

CMS should support:

* Draft
* Review
* Approved
* Published
* Archived

Version history must be maintained.

Admin should be able to restore previous versions.

---

# 44. Error Handling

Every module must have:

* Loading state
* Empty state
* Error state
* Success message
* Validation messages
* Retry mechanism

Backend should return standardized API errors.

---

# 45. Performance

Optimize for:

* Fast page load
* API caching
* Database indexes
* Pagination
* Lazy loading
* CDN for media
* Background processing
* Queue-based AI processing where needed

Large videos/audio/files should not unnecessarily pass through application servers.

---

# 46. Deployment Architecture

Prepare separate environments:

* Development
* Staging
* Production

Use:

* Environment variables
* CI/CD
* Database migrations
* Automated tests
* Logging
* Monitoring
* Backup
* Disaster recovery

---

# 47. Testing

Create:

### Unit tests

For:

* Authentication
* XP calculation
* Progress
* Scoring
* Payments
* Certificates
* Permissions

### Integration tests

For:

* APIs
* Database
* Payment gateway
* AI services
* Notifications

### End-to-end tests

Test complete journeys:

`Register → Login → Course → Lesson → Quiz → Progress`

and:

`Course → Enrollment → Payment → Learning → Test → Certificate`

---

# 48. Important User Journeys

## Student Journey

`Register`

→ `Select Hindi Level`

→ `Assessment`

→ `Recommended Course`

→ `Enroll`

→ `Learn`

→ `Play Games`

→ `Earn XP`

→ `Complete Assignment`

→ `Take AI Tests`

→ `Join Live Class`

→ `Participate in Competition`

→ `Complete Course`

→ `Receive Certificate`

---

## Teacher Journey

`Login`

→ `Dashboard`

→ `View Classes`

→ `View Students`

→ `Create Assignment`

→ `Conduct Class`

→ `Evaluate Work`

→ `Track Progress`

→ `Provide Feedback`

---

## Course Creator Journey

`Create Course`

→ `Add Modules`

→ `Add Lessons`

→ `Add Materials`

→ `Add Tests`

→ `Submit for Quality Review`

---

## Quality Tester Journey

`Review Course`

→ `Test Content`

→ `Check Questions`

→ `Check Media`

→ `Approve / Reject`

→ `Send Feedback`

---

## Admin Journey

`Dashboard`

→ `Manage Users`

→ `Manage Institutes`

→ `Manage Courses`

→ `Manage Teachers`

→ `Manage Payments`

→ `Manage AI`

→ `Manage Competitions`

→ `Reports`

→ `System Settings`

---

# 49. Required Deliverables

Build and deliver:

1. Complete responsive frontend
2. Complete backend
3. Database
4. Authentication
5. RBAC
6. Admin panel
7. Student panel
8. Teacher panel
9. Course creator panel
10. Quality tester panel
11. Accounting panel
12. Institute panel
13. AI services
14. Chatbot
15. Virtual teacher
16. Gamification
17. Competition
18. Leaderboard
19. Assignment engine
20. Test engine
21. AI speaking test
22. AI writing test
23. AI listening test
24. Live class integration
25. Payment integration
26. Subscription system
27. Certificate system
28. Digital library
29. Notification system
30. Analytics
31. Audit logs
32. API documentation
33. Database schema
34. Test suite
35. Deployment documentation

---

# 50. Development Rules

The implementation must follow these rules:

* Do not create fake buttons.
* Do not create non-functional dashboards.
* Every major UI action must connect to a real backend/API.
* Do not use hard-coded demo data in production functionality.
* Use database-driven content.
* Use role-based permissions.
* Validate all forms.
* Handle API failures gracefully.
* Use pagination for large datasets.
* Protect all private APIs.
* Keep secrets on the server.
* Make configurable values editable from Admin.
* Maintain audit logs for sensitive actions.
* Write reusable components/services.
* Keep frontend, backend and AI services modular.
* Make the architecture scalable.
* Add proper loading, empty, error and success states.

---

# 51. Final Acceptance Criteria

The application will be considered complete only when the following complete flow works:

**Student**

`Registration`

→ `Assessment`

→ `Level Assignment`

→ `Course Search`

→ `Enrollment`

→ `Payment`

→ `Learning`

→ `Game`

→ `XP`

→ `Progress`

→ `Assignment`

→ `AI Listening Test`

→ `AI Writing Test`

→ `AI Speaking Test`

→ `Online Test`

→ `Live Class`

→ `Competition`

→ `Leaderboard`

→ `Course Completion`

→ `Certificate`

→ `Certificate Verification`

And simultaneously:

**Admin**

`User Management`

→ `Course Management`

→ `Institute Management`

→ `Teacher Management`

→ `Content Approval`

→ `Competition Management`

→ `AI Management`

→ `Payment Management`

→ `Accounting`

→ `Certificate Management`

→ `Reports`

→ `System Settings`

must all work from the admin panel.

## Final Instruction to the Development AI

**Do not only generate the UI. Build the complete working LMS product.**

First create the architecture and database schema, then implement authentication/RBAC, backend APIs, core learning engine, dashboards, gamification, assessments, AI services, classes, payments, certificates, reporting and administration.

For every module, implement:

`Database → Backend/API → Business Logic → Frontend → Validation → Authorization → Error Handling → Testing`

Use clean, modular, production-grade code. Avoid duplicated logic. Keep all configurable business rules in the database/admin settings instead of hard-coding them.

The final application must be deployable and usable by real students, teachers, institutes and administrators.
