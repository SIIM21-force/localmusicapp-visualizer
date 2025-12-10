# Music Player with Audio Visualizer

This is a web-based music player with a bar spectrum audio visualizer. The user interface is inspired by YouTube Music and allows users to play local audio files.

## Features

*   **YouTube Music-inspired UI:** A modern and intuitive interface built with Material-UI.
*   **Local Music Playback:** Users can select and play audio files from their local device.
*   **Audio Visualization:** A bar spectrum visualizer powered by `audioMotion-analyzer` and the Web Audio API.
*   **Responsive Design:** The application is responsive and works on both desktop and mobile devices.

## Tech Stack

*   **Frontend:** React, TypeScript
*   **UI Library:** Material-UI
*   **Audio Visualization:** `audio-motion-analyzer`
*   **Routing:** `react-router-dom`

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm installed.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/your_repository_name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```

## Deployment to GitHub Pages

To deploy this application to GitHub Pages, follow these steps:

1.  **Install `gh-pages`**

    ```sh
    npm install -D gh-pages
    ```

2.  **Set the `homepage` in `package.json`**

    Open your `package.json` file and add a `homepage` field:

    ```json
    "homepage": "https://your_username.github.io/your_repository_name",
    ```

3.  **Update `vite.config.ts`**

    In your `vite.config.ts` file, you need to set the `base` option to your repository name.

    ```ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      base: '/your_repository_name/'
    })
    ```

4.  **Add `deploy` scripts to `package.json`**

    Add the following scripts to your `package.json`:

    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

5.  **Deploy the application**

    Run the following command to deploy your application to GitHub Pages:

    ```sh
    npm run deploy
    ```

    This will create a `gh-pages` branch in your repository and deploy the contents of the `dist` folder to it. You can then access your application at the URL you specified in the `homepage` field.
