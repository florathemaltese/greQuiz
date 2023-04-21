**Project Name**

GRE Quantitative Reasoning Practice Quiz

**Description**

This is a web-based practice quiz for the GRE (Graduate Record Examination) Quantitative Reasoning section. It is built with React version 18.2.0 and includes dependencies such as Express, Cookie-parser, UUID, and Testing Library for Jest DOM, React, and User Event. The application is intended for private use only.

The application is built using React and includes features such as user authentication, timer, and displaying questions with multiple-choice options. Users can log in with their username, take the quiz, and see their results at the end.

**Installation**

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies using npm install.

**Usage**

Once the dependencies are installed, you can use the following scripts to run the application:

- npm run start-win: Starts the server on Windows with the port set to 4000.
- npm run start: Starts the server with the port set to 4000.
- npm run dev: Starts the development server for the React application.
- npm run build: Builds the production-ready version of the React application.
- npm run test: Runs tests using Jest for the React application.
- npm run eject: Ejects the React application from Create React App.

Please note that the proxy in the package.json file is set to "[http://localhost:4000](http://localhost:4000/)", so make sure to update it if your server is running on a different port.

**User Guidance**

1. Open your web browser and go to http://localhost:3000.
2. Log in with your username.
3. Take the quiz by selecting the appropriate options for each question.
4. Submit the quiz to see the results.
5. Log out to end the session.

**Dependencies**

GRE Quantitative Reasoning Practice Quiz has the following dependencies:

- "@testing-library/jest-dom": "^5.16.5"
- "@testing-library/react": "^13.4.0"
- "@testing-library/user-event": "^13.5.0"
- "cookie-parser": "^1.4.6"
- "express": "^4.18.2"
- "react": "^18.2.0"
- "react-dom": "^18.2.0"
- "react-scripts": "5.0.1"
- "uuid": "^9.0.0"
- "web-vitals": "^2.1.4"

**Components**

- App: The main component of the application that handles user authentication, renders different components based on the login status, and manages the state for word, username, error, and login status.
- Constants: A module containing constants used in the application.
- Services: A module containing functions for making API calls to the server.
- QuizApp: A component that displays the quiz questions and handles user responses.
- LoginForm: A component that handles user login with a form.
- Loading: A component that displays a loading spinner while waiting for data.
- Status: A component that displays error messages.
- WordDisplay: A component that displays a word and allows the user to update it.
- CatLogo: A component that displays a cat logo.
- reportWebVitals: A wrapper around the web-vitals library that allows you to report web vitals data to a callback function.
- Sessions: A module that provides functions for managing user sessions.

**Contributing**

Contributions to GRE Quantitative Reasoning Practice Quiz! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request on GitHub.

**Acknowledgements**

This project was created using Create React App and incorporates various open-source libraries and dependencies. Special thanks to the authors and contributors of these projects for their valuable contributions to the open-source community.

**Contact**

For any questions or inquiries, please contact the project owner: [Wenyun](mailto:yuan.weny@northeastern.edu) Yuan.

Enjoy using GRE Quantitative Reasoning Practice Quiz!