
# **🌩️ Telegram Weather Bot** 

## Project Overview
Telegram Weather Bot is a project consisting of two main components:

1. **nest-backend-bot**:  
   A Telegram bot built with NestJS that integrates the OpenWeatherMap API and MongoDB to provide weather information to users.

2. **admin-panel**:  
   A web-based admin panel to control and monitor users of the Telegram bot, as well as manage API keys.

---

## Folder Structure
```
root/
 ├── nest-backend-bot/   # Backend for the Telegram bot
 └── admin-panel/        # Frontend admin panel to manage the bot
```

- **`nest-backend-bot`**: Contains the NestJS backend project that powers the Telegram bot.  
- **`admin-panel`**: Contains the React + Vite frontend project for the admin panel.

---

## Deployment
- **Telegram Bot**: [Live Bot Link](#https://t.me/rishabh_weather_astbot)  
- **Admin Panel**: [Admin Panel Link](#https://manage-weather-bot-rishabh.vercel.app/)
         //this will show my api (ik not good for production)
---

## How to Run Locally

### Prerequisites
- Node.js (v16 or above)
- npm or yarn
- MongoDB

### 1. Clone the Repository
```bash
git clone https://github.com/rishabhknowss/Weather_bot.git
cd Weather_bot
```

### 2. Setup Environment Variables
Create `.env` files for both `nest-backend-bot` and `admin-panel`.

#### `nest-backend-bot/.env`
```
TELEGRAM_BOT_TOKEN=your-tg-bot-token
WEATHER_API_KEY=openweather-api
CITY=lucknow
DATABASE_CONNECTION_STRING=mongodb-connection-string
```

#### `admin-panel/.env`
```
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 3. Start the Backend
```bash
cd nest-backend-bot
npm install
npm start
```

### 4. Start the Admin Panel
```bash
cd ../admin-panel
npm install
npm run dev
```

---

## Features
- **Telegram Bot**: Provides weather updates to users by fetching data from the OpenWeatherMap API.  
- **Admin Panel**:  
  - View and manage Telegram bot users  
  - Handle and update API keys  
  - OAuth Google login for secure access  

---

## Tech Stack
- **Backend**: NestJS, MongoDB, OpenWeatherMap API  
- **Frontend**: React, Vite, Tailwind CSS, Axios, Google OAuth  

---

## Contact
Built by [Rishabh](https://twitter.com/rishabhknows)