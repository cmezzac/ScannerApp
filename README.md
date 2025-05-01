# 📱 Expo React Native Project Setup Guide

This guide helps you set up and start an **Expo React Native project** on a computer that has **no dependencies installed**.

## ✅ Step 1: Environment Setup

### 🔹 Install Node.js and npm
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download and install the **LTS (Recommended)** version for your system
3. Open your terminal and verify installation:
   ```bash
   node -v
   npm -v
   ```

### 🔹 Install Expo CLI
1. Install Expo CLI globally using npm:
   ```bash
   npm install -g expo-cli
   ```
2. Verify the installation:
   ```bash
   expo --version
   ```

## ✅ Step 2: Project Setup

### 🔹 Clone the Repository and Install Dependencies
1. Clone the project repository in VsCode:
   ```bash
   git clone https://github.com/cmezzac/ScannerAppPrototype.git
   ```
2. Navigate into the project folder:
   ```bash
   cd client
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```

## ✅ Step 3: Start Development

### 🔹 Start the Development Server
To start the app, run:
```bash
npm start
```
Or:
```bash
expo start
```

You will now see a QR code generated! So you can preview on the phone follow the following steps:

### 📱 Preview on Your Phone
1. Install the Expo Go app:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code that pops up in the terminal with your phone camera and it will work!
