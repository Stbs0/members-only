API Endpoints Design
1. Users
Create User (Register):
POST /api/users/register

User Login:
POST /api/users/login

Get User Profile:
GET /api/users/:id

Update User Profile:
PUT /api/users/:id

Delete User Profile:
DELETE /api/users/:id

2. Messages

Create Message (Authenticated users):
POST /api/messages

Get All Messages:
GET /api/messages (supports pagination, search by title/content)

Get Message by ID:
GET /api/messages/:id

Update Message (Authenticated users, own messages):
PUT /api/messages/:id

Delete Message (Authenticated users, own messages):
DELETE /api/messages/:id

3. Clubs
Create Club (Admin):
POST /api/clubs

Get All Clubs:
GET /api/clubs (supports pagination)

Get Club by ID:
GET /api/clubs/:id

Delete Club (Admin):
DELETE /api/clubs/:id

Authentication and Authorization
Auth Routes
Register:
POST /api/auth/register

Login:
POST /api/auth/login

Additional Functionalities
Search and Pagination
Search Messages by Title or Content:
GET /api/messages?search=keyword&page=1&limit=10
Paginate Messages:
GET /api/messages?page=1&limit=10
Paginate Clubs:
GET /api/clubs?page=1&limit=10
File Uploads
Upload Message Image:
POST /api/messages/:id/upload
Relationships and Memberships
Add User to Club:
POST /api/clubs/:clubId/join
Get Users in a Club:
GET /api/clubs/:clubId/users
Get Clubs of a User:
GET /api/users/:userId/clubs