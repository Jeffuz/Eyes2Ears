# Eyes2Ears

Eyes2Ears is a mobile application designed to assist visually impaired individuals by utilizing advanced AI technologies. The app allows users to capture images using their smartphone camera, which are then processed in real-time to provide audio descriptions of their surroundings. Eyes2Ears aims to enhance the quality of life for visually impaired users by providing intuitive and immediate audio feedback.

## Features

- Capture images and be able to save them.
- Provide text description and audio of captured image surroundings.
- History feature to view past scans.
  
## Installation
1. Clone the respository
2. Install dependencies
```
npm i
```
3. Create a .env file in the root of your project and add your OpenAI API key and Firebase configuration in the following format:
```
OPENAPI_KEY=your_openai_api_key

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```
4. Start the project
```
npx expo start
```
