
To set up and run this application locally, follow these steps:

1. **Ensure Node.js is Installed**:
   Make sure you have Node.js installed. You can check by running:
   ```bash
   node -v
   ```
   If it's not installed, download and install it from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**:
   Clone your project repository from your version control system (e.g., GitHub):
   ```bash
   git clone https://github.com/chapainaashish/aakasmik-frontend.git
   cd aakasmik-frontend
   ```

3. **Install Dependencies**:
    Install the dependencies using npm:
   ```bash
   npm install
   ```

4. **Update the .env file**

    Get the google captcha key and update the .env file. You can get the captcha key from: https://developers.google.com/recaptcha

5. **Run the Development Server**:
   Start the development server to view the application locally:
   ```bash
   npm run dev
   ```
   This will start Vite's development server, and you should see output indicating the local server is running. By default, it should be accessible at `http://localhost:5173`.

6. **Build the Application** (for production):
   If you want to create a production build, use:
   ```bash
   npm run build
   ```
   This will compile the TypeScript files and bundle the application using Vite, and output the build files to the `dist` directory.

7. **Preview the Production Build**:
   To preview the production build locally, you can run:
   ```bash
   npm run preview
   ```
   This will serve the production build so you can test it locally.

8. **Lint the Code**:
   To ensure your code adheres to linting rules, run:
   ```bash
   npm run lint
   ```

Finally, you can do the contributions, commit and push the changes and open a pull request. 

