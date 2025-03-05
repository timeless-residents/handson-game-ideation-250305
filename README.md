# じぶんでつくる音楽 (Create Your Own Music)

A simple interactive music creation game built with React and Tone.js. This application allows users to create and play back melodies using keyboard controls.

## Features

- Select musical notes using arrow keys
- Play and record notes using the space key
- Play back recorded melodies
- Reset recordings
- Visual piano key interface
- Real-time feedback and instructions

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Tone.js for audio synthesis

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## How to Use

1. Press the space key to initialize the audio context
2. Use the up/down arrow keys to select different notes
3. Press the space key to play and record a note
4. Press Enter to play back your recorded melody
5. Press Escape to reset your recording

## Controls

- ↑/↓ keys: Select note
- Space key: Play and record note
- Enter key: Play back recorded melody
- Escape key: Reset recording

## Building for Production

To build the application for production:

```
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```
npm run preview
```

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch. The deployment is handled by a GitHub Actions workflow.

To manually trigger a deployment:

1. Go to the Actions tab in the GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
