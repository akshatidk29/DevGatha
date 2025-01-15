# DevGatha

DevGatha is an AI-powered code learning platform designed to make programming education accessible and interactive. With personalized lessons, dynamic progress tracking, and an integrated code editor, DevGatha is your one-stop destination to become a coding expert.

## Features

### 1. Interactive Learning Progress
Track your progress across programming languages like Python, C++, and C. Each lesson is marked dynamically, helping you visualize your growth.

### 2. AI-Generated Lessons
Leverage AI to generate personalized coding lessons tailored to your skill level and preferences.

### 3. Integrated Code Editor
Code directly within the platform using the built-in editor. Run your code, see outputs, and experiment without leaving the app.

### 4. Featured Courses
Explore structured courses designed to guide you from beginner to advanced levels in various programming languages.

### 5. AI Chatbot Assistance
An AI chatbot powered by BotPress assists with answering coding queries and providing explanations, making learning seamless.

### 6. Secure Authentication
Ensure a secure experience with robust login and signup functionalities.

### 7. Virtual Study Rooms (Planned Feature)
Collaborate with peers in virtual study rooms with chat and video functionality (Coming Soon).

## Technologies Used

### Frontend
- React with Vite
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js

### Database
- MongoDB for storing user data, progress, and lessons

### AI and Chatbot
- BotPress for knowledge-based AI chatbot functionality

## Installation

Follow these steps to set up DevGatha locally:

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running
- Git installed

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/devgatha.git
   cd devgatha
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the Application**
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```

5. **Access the App**
   Open your browser and navigate to `http://localhost:5173`.

## Contribution Guidelines

We welcome contributions to improve DevGatha! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Roadmap

- Add more languages like JavaScript and Java
- Implement virtual study rooms
- Enhance AI chatbot capabilities
- Mobile app version of DevGatha



## Acknowledgments

- Thanks to the open-source community for the tools and libraries used.
- Built with guidance from ChatGPT.

---

Start your coding journey with DevGatha today!

