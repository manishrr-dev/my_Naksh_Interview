# React Native Chat Application

A React Native application featuring a chat interface with swipeable messages, emoji reactions, and feedback functionality.

## Quick Start

### Prerequisites

- Node.js installed
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. **Install dependencies:**

```sh
npm install
```

2. **For iOS only - Install CocoaPods dependencies:**

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

### Running the App

**Start Metro bundler:**

```sh
npm start
```

**Run on Android:**

```sh
npm run android
```

**Run on iOS:**

```sh
npm run ios
```

## Features

- Interactive chat interface
- Swipeable message boxes
- Emoji reactions
- Star ratings
- Feedback chips and tags
- Smooth animations and gestures

## Project Structure

- `src/components/` - React components
  - `chat/` - Chat-related components
  - `home/` - Home screen components
- `src/store/` - State management
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/Routes/` - Navigation configuration

## Demo Video

See the app in action: [video_file.mov](./video_file.mov)
