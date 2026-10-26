# Interactive Bouncing Circles (TypeScript & Canvas API)

## Overview
This is an interactive web-based animation built using **TypeScript** and the **HTML5 Canvas 2D API**. The application simulates physics by animating bouncing circles within a defined boundary. It features a fully interactive UI that allows users to manipulate individual circles in real-time by changing their properties such as color, speed, and position.

## Features
- **Smooth Animation Loop:** Utilizes `requestAnimationFrame` for high-performance, smooth 2D rendering.
- **Physics Simulation:** Calculates dynamic movement based on velocity (`vx`, `vy`) and delta time (`dt`), with collision detection to make circles bounce off the canvas edges.
- **Interactive DOM UI:** Users can select a specific circle from a dropdown to:
  - Change its fill color via a color picker.
  - Adjust its horizontal speed dynamically.
  - Reposition it by clicking anywhere on the canvas (Pointer Events).
- **State Management:** Includes "Pause/Resume" functionality to freeze the animation, and a "Reset" button to revert all circles to their original state.
- **Strict TypeScript:** Built with strict type checking, interfaces, and DOM element validation for robust and error-free code.

## Tech Stack
- **Language:** TypeScript (ES2020)
- **Frontend:** HTML5 (Canvas), CSS3
- **Tooling:** Node.js, npm, `http-server`

## Project Structure
- `src/main.ts`: The core TypeScript logic containing the physics engine, rendering loop, and event listeners.
- `index.html`: The main entry point containing the UI layout and the Canvas element.
- `tsconfig.json`: TypeScript compiler configuration targeting ES2020 and outputting to the `dist` folder.
- `package.json`: Project dependencies and scripts.

## How to Run Locally
1. Clone this repository to your local machine.
2. Ensure you have [Node.js](https://nodejs.org/) installed.
3. Open your terminal in the project directory and run the following commands:
   ```bash
   # Install development dependencies (TypeScript and http-server)
   npm install

   # Compile the TypeScript code to JavaScript
   npx tsc

   # Start a local web server
   npx http-server