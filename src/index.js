import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import { Dashboard } from './Dashboard/dashboard';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/lara-light-cyan/theme.css';// for primereact css
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'bootstrap/dist/css/bootstrap.min.css';// for react bootstrap css
import 'primeicons/primeicons.css'; // for icon 
import workoutsList from "../src/Docs/workoutDocs.json"; // this is used to call the json file which contains the details of the workouts

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(localStorage.getItem("selectedLanguage"),"########")
// this local storage is given using "key and value pair"
// this is how we can get the item which is being set inside the localstorage
//let workoutsListls=localStorage.getItem('workouts')
//console.log(workoutList,'@@')
if (localStorage.getItem("workouts")==null){// if already workouts is there na it will return the already value otherwise it will asign as null
  localStorage.setItem("workouts",JSON.stringify(workoutsList))} // this is used to set the details manually to the local storage 
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

