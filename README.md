# Interactive Bouncing Circles (TypeScript & Canvas API)

## Overview
An interactive web animation built with **TypeScript** and the **HTML5 Canvas 2D API**. Circles move inside a defined boundary and bounce off its edges. A control panel lets users change a circle's color, speed and position in real time.

## Features
- **Animation Loop:** Uses `requestAnimationFrame` for smooth 2D rendering.
- **Edge-Collision Animation:** Movement is calculated from velocity (`vx`, `vy`) and delta time (`dt`), and circles bounce off the canvas edges.
- **Interactive DOM UI:** Users can select a circle from a dropdown to:
  - Change its fill color with a color picker.
  - Adjust its horizontal speed.
  - Reposition it by clicking anywhere on the canvas (Pointer Events).
- **State Control:** A "Pause/Resume" button freezes the animation, and a "Reset" button returns all circles to their original state.
- **Strict TypeScript:** Written with strict type checking, interfaces and DOM element validation.

## Tech Stack
- **Language:** TypeScript (ES2020)
- **Frontend:** HTML5 (Canvas), CSS3
- **Tooling:** Node.js, npm, `http-server`

## Project Structure
- `main.ts`: Core logic: movement and collision calculation, rendering loop and event listeners.
- `index.html`: Entry point with the UI layout and the Canvas element.
- `tsconfig.json`: TypeScript compiler configuration (ES2020, output to the `dist` folder).
- `package.json`: Dependencies and scripts.

## How to Run Locally
1. Clone this repository.
2. Install [Node.js](https://nodejs.org/).
3. In the project folder, run:
   ```bash
   # Install development dependencies (TypeScript and http-server)
   npm install

   # Compile the TypeScript code to JavaScript
   npx tsc

   # Start a local web server
   npx http-server
   ```
4. Open the address shown in the terminal (usually `http://localhost:8080`).

## Author
Kerollus Adel. Individual work.
