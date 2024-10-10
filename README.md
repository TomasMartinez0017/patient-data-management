# Project Overview

## Technologies Used

### 1. Vite for React App

The app was built using [**Vite**](https://vite.dev/guide/why.html), a fast and modern build tool that offers several advantages:

- **Blazing Fast**: Vite uses native ES modules during development, allowing for faster builds and immediate changes, without bundling.
- **Hot Module Replacement (HMR)**: Vite offers instant hot module replacement, making the development process smoother by updating modules without a full page reload.
- **Optimized for Production**: It automatically bundles and optimizes the app for production, ensuring a smooth deployment experience.

### 2. UI Avatars API for Avatar Generation

To handle users that don’t have a profile picture, I used the [**UI Avatars API**](https://ui-avatars.com/api). This service dynamically generates avatars based on the user's name, which is particularly useful when no image is provided. It's fast and eliminates the need for additional storage or image assets.

### 3. Axios for Data Fetching

For making HTTP requests, I used [**Axios**](https://axios-http.com/), a popular library for data fetching in JavaScript.

## How to Run the App

1. Clone this repository:

   ```bash
   git clone https://github.com/TomasMartinez0017/patient-data-management.git
   ```

2. Change directory to `patient-data-management`

   ```bash
   cd patient-data-management
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Run the app
   ```bash
   npm run dev
   ```
