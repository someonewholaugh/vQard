# vQard

vQard is an easy-to-use web app for creating, editing, and sharing digital cards without the need for login. It stores data in localStorage and Firestore, and lets users favorite cards from others. Images are hosted using ImgBB, making it simple to upload and display pictures.

## Features

- **CRUD**: Easily create, read, update, and delete digital cards.
- **Share Cards**: Share digital cards without requiring authentication.
- **Store Data**: Store user data using **localStorage** and **Firestore**.
- **Favorites**: Mark digital cards from other users as favorites.
- **Image Hosting**: Upload and host images via **ImgBB**.
- **QR Code**: Generate scannable QR codes for easy sharing.
- **Responsive UI**: The app is mobile-friendly and adapts to different screen sizes.

## Technologies Used

This project is built using the following technologies and libraries:

- **React 18** – Frontend framework
- **React Router** – Client-side routing
- **Firebase** – Firestore database for data storage
- **CryptoJS** – Data encryption
- **React Hook Form** – Form handling
- **Zod** – Schema validation
- **Axios** – API handling
- **Tailwind CSS** – Styling
- **QRCode React** – Generate QR codes
- **React Helmet Async** – Manage meta tags for SEO
- **Headless UI** – Accessible UI components
- **ImgBB API** – Image hosting

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) (as the package manager)

## Setup and Installation

1. **Clone the repository and install dependencies**:

First, clone the repository and install the required dependencies:

```bash
git clone https://github.com/your-username/vqard.git
cd vqard
pnpm install
```

2. **Create the .env file**:

In the root of the project, create a `.env` file to store your environment variables. Add the following configuration:

```env
# App Config
VITE_APP_BASE_URL="your-app-base-url"

# Encryption Config
VITE_ENCRYPT_SECRET_KEY="your-encryption-secret-key"

# ImgBB Config
VITE_IMGBB_API_KEY="your-imgbb-api-key"

# Firebase Config
VITE_FIREBASE_API_KEY="your-firebase-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-firebase-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-firebase-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-firebase-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-firebase-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-firebase-measurement-id"
```

3. **Start the development server**:

Once everything is set up, start the development server:

```bash
pnpm run dev
```

This will start the application and you can access it at [http://localhost:3000](http://localhost:3000).

## License

This project is open source and available under the **MIT License**.
