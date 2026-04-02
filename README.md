# DevMarket
A platform that acts as a marketplace to explore, upload, review, and manage applications.

[Installation Guide](#getting-started) · [Contact](#contact)

## Table of Contents
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## About The Project
The DevMarket platform is a full-stack MERN application designed to serve as a marketplace for developers and users. Users can search for apps, submit reviews, and download applications, while administrators retain full control to vet and approve incoming uploads, making it a safe ecosystem for software distribution.

### Key Capabilities

**App Management and Discovery**
Allows easy upload of app details, external APK links, and screenshots, along with instant searching and categorized browsing.

**Review System**
Integrated user rating and review system to foster a community, helping users decide by observing peer feedback.

**Admin Dashboards and Roles**
Empowers administrators to review, approve applications to go "Live," and securely remove malicious submissions to maintain platform integrity.

**Secure Authentication**
Uses robust JWT-based authentication to manage user and centralized admin sessions efficiently.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## Built With
- **Node.js**: Server and runtime environment.
- **Express**: Backend and REST API framework.
- **React**: Interactive and responsive frontend dashboard.
- **MongoDB Atlas**: Cloud NoSQL database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT & Bcrypt**: For secure, encrypted authentication and authorization.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher) 
- A MongoDB cluster URL (like MongoDB Atlas)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shlokbshetty/Devmarket.git
   ```

2. **Install Packages**
   Install all dependencies for both root (acting as server) and client directories:
   ```bash
   npm install && cd client && npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (where server files live) and populate it with your valid cluster details:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devmarket?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## Usage

### Start the Server and Client
You can run both the frontend and backend servers concurrently using the custom script defined in the root setup:

```bash
npm run dev
```

### Run server separately
If you prefer, you can just start the server alone and view the APIs:
```bash
npm run dev:server
```

**Access the Applications:** 
- The backend API runs at `http://localhost:5000`
- The React application runs locally at `http://localhost:3000`

### API Layout Options
- **Public & Authentication:** `POST /api/auth/register`, `POST /api/auth/login`
- **Application Handling:** `POST /api/apps/upload`, `GET /api/apps/search`, `GET /api/apps/:id`
- **Reviews Support:** `POST /api/reviews`
- **Administrator Role:** `PUT /api/admin/approve/:id` and `DELETE /api/admin/remove/:id`

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## Roadmap
- [ ] Add real-time notifications for approved apps
- [ ] Enhance admin moderation dashboard with graphical statistics
- [ ] Integrate a recommendation engine based on user activity
- [ ] Allow multi-platform app hosting, beyond mobile apps.
- [ ] Enable built-in app monetization handling

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

## Contact
Shlok Shetty
- GitHub: [@shlokbshetty](https://github.com/shlokbshetty)
- Email: shettyshlok87@gmail.com
- Project Link: [https://github.com/shlokbshetty/Devmarket](https://github.com/shlokbshetty/Devmarket)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>
