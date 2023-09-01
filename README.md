&nbsp;

<p align="center">
 <a href="https://mmp.trackier.com">JOSH Talks </a>
</p>
<p align="center">
  <a href="https://www.joshtalks.com" target="_blank">
    <img src="https://www.joshtalks.com/wp-content/themes/josh_talks/img/josh-logo.svg" alt="MMP" width="200px">
  </a>
</p>

<p align="center">
JOSH Talks | React | Quiz 
</p>


## Application overview
<ul>
 <li>
  In this application, I have structured the codebase into modular components to facilitate easy debugging and code maintenance. Here's an overview of the key components and their roles:
 </li>
 <li>
StartPage: This component handles the user's email submission, capturing their input.
</li>
  <li>
Quiz: This component manages the quiz interface, including the timer countdown. It is responsible for displaying and navigating between the 15 questions.
</li>
 <li>
Question: A reusable component that renders individual quiz questions. It receives question data and user responses as props.
 </li>
 <li>
Timer: A standalone component that displays and manages the countdown timer. It triggers auto-submission when the timer reaches zero.
 </li>
 <li>

ReportPage: This component is responsible for generating and displaying the quiz report, including the user's answers and correct answers side by side.
</li>
 <li>
DataStore: A store or context provider that manages data across the application. It ensures efficient data access and sharing between components, such as storing user responses and question details.
 </li>
  <li>
By using clear and consistent naming conventions for components and maintaining a dedicated data store for managing application data, the codebase is well-organized and easily maintainable. These practices enhance code reusability, optimize performance, and simplify debugging during development and testing.
 </li>
</ul>
# Quickstart install

## Prerequisites

- `Git`
- `Node: any 16.x version starting with v16.0.0 or greater`
- `npm` <a href="https://docs.npmjs.com/cli/v6">- [npm website for installation instructions] </a>
- `A clone of the [JOSH Talks Quiz- repo]` on your local machine

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/akcse16/quiz-application
   ```
2. Go into the project root
   ```sh
   cd quiz-application
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

## Running locally

This commands will start the hot-reloading server
npm start

<br/>
<p align="start">OPEN</p>

```sh
   http://localhost:3000
```

<p align="center">or</p>

```sh
   http://192.168.1.2:3000
```


## Additional Feature
<p align="start">We have restricted the user from reloading and going back to the previous page while being in between the quiz.</p>
<p align="start">We have maintained different routes for our authenticated and public users i.e. Public and Private routes.</p>
<p align="start">We have used the Yup Library with a react hook form to validate the email submission form </p>
to open the site in your favorite browser
