# Quiz Application

## Overview

This is a **Quiz Application** built with **React**. The application allows users to attempt a quiz with multiple-choice questions. Users can navigate through questions, answer them, and submit the quiz. The application keeps track of visited and answered questions and shows a color-coded status for each question.

### Key Features:
- Timer that counts down and displays the remaining time.
- Color-coded question buttons for easy navigation:
  - **Green**: Answered questions.
  - **Yellow**: Visited but unanswered questions.
  - **Grey**: Unvisited questions.
- A clean layout with a sidebar for displaying the number of attempted and not-attempted questions.
- Ability to navigate between questions using "Previous" and "Next" buttons.
- Submit the quiz with a button to finalize and show the results.

## Approach

- **React** is used for building the user interface with state management for user interactions.
- The quiz data (questions, options, and answers) is passed down as props, and user responses are stored in state.
- **Color-Coded Navigation**: Each question button is dynamically styled based on whether it has been answered, visited, or unvisited.
- A timer function is included to count down the time left for the quiz.
- The user can navigate between questions and submit the quiz, which triggers the `finishQuiz` function.

### Components:
1. **Quiz**: Main component where the quiz is rendered, with logic to handle question navigation, timer display, and color-coded buttons.
2. **Question Buttons**: Rendered as buttons that allow users to navigate directly to a specific question.
3. **Question Display**: Shows the current question, options, and allows users to select an answer.

## Setup / Installation Instructions

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install dependencies**:
    If you haven't already, make sure you have **Node.js** installed on your system. Then, install the dependencies using:
    ```bash
    npm install
    ```

3. **Run the application**:
    After the dependencies are installed, you can run the application locally:
    ```bash
    npm start
    ```
    This will start the development server and open the application in your browser at `http://localhost:3000`.

4. **Test the application**:
    - Open your browser and navigate to `http://localhost:3000` to see the quiz app in action.

## Assumptions

- The application assumes that the quiz data (questions and options) are passed as props from a parent component.
- The user will have access to a functional timer that counts down while they take the quiz.
- The app assumes that the quiz data is already structured correctly with each question having a `question`, `options`, and `answer` field.
- The app uses basic styling via Bootstrap for layout and responsiveness.

## Challenges and How They Were Overcome

1. **Managing State for Multiple Questions**: 
   - Keeping track of which questions have been answered and which have only been visited posed a challenge. 
   - Solution: I used two sets: `visited` to track which questions have been viewed and `answered` to track which questions have received an answer. By leveraging React's state management system, I ensured the UI reflected these states accurately.

2. **Timer Implementation**:
   - Integrating a timer to count down and display the remaining time while the user is taking the quiz was tricky.
   - Solution: I used `setInterval` to update the timer state every second. To handle cleanup when the component unmounts, I used `clearInterval` to avoid memory leaks.

3. **Dynamic Styling**:
   - Ensuring the buttons correctly reflected the color coding based on the user's interactions (visited, answered, not visited).
   - Solution: I used conditional classes to apply the appropriate colors dynamically based on the sets of `visited` and `answered`.
