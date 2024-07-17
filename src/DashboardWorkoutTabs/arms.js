import React, { useState, useEffect } from "react"; // hook's component
import { Row, Col } from "react-bootstrap";
//primereact compoments
import { MeterGroup } from "primereact/metergroup";
import { Button } from "primereact/button";

import "./arms.css";

//arms
import BicepCurl from "../Assests/Arms_Workout_Images/arms_bicepsCurl.jpg";
import TricepExtension from "../Assests/Arms_Workout_Images/arms_tricepsExtension.jpg";
import PreacherCurl from "../Assests/Arms_Workout_Images/arms_preacherCurl.jpg";
import PushUps from "../Assests/Arms_Workout_Images/arms_pushUps.jpg";

let  completedTaskCount = 0;// this is used to add the values for the overall count using ++ operator

//The variable isDialogOpen is a state variable used to determine whether a dialog (a modal window) should be displayed or not in a React component

export function Arms({isDialogOpen}){
    let workoutsList = JSON.parse(localStorage.getItem("workouts"));
    let armsWorkouts = workoutsList['Arms'] // this is used to call each object inside the arms

    // state managemnet of different individual excercise inside the "ARMS"
    const [bicepsCurl, setBicepsCurl] = useState(armsWorkouts['Biceps Curl']['Status']);
    const [tricepsExtension, setTricepsExtension] = useState(armsWorkouts['Triceps Extension']['Status']);
    const [pushUps, setPushUps] = useState(armsWorkouts['Push Ups']['Status']);
    const [preacherCurl, setPreacherCurl] = useState(armsWorkouts['Preacher Curl']['Status']);

    // state for the overall inside the arms 

    const [overall,setOverall]=useState(armsWorkouts['Biceps Curl']['Status'] +
        armsWorkouts['Preacher Curl']['Status'] +
        armsWorkouts['Push Ups']['Status'] +
        armsWorkouts['Triceps Extension']['Status'],
    )
    useEffect(() => {
       let  workoutsList = JSON.parse(localStorage.getItem("workouts"));
        let armsWorkouts = workoutsList['Arms']
        completedTaskCount = 0;
        
        // now checking the status of each exercise in order to increase each of its count 
        if (armsWorkouts['Biceps Curl']['Status']) completedTaskCount++
        if (armsWorkouts['Preacher Curl']['Status']) completedTaskCount++
        if (armsWorkouts['Push Ups']['Status']) completedTaskCount++
        if (armsWorkouts['Triceps Extension']['Status']) completedTaskCount++

        // now calling each states and assigning the value to each of the states using setValue 
        setBicepsCurl(armsWorkouts['Biceps Curl']['Status']);
        setTricepsExtension(armsWorkouts['Triceps Extension']['Status']);
        setPushUps(armsWorkouts['Push Ups']['Status']);
        setPreacherCurl(armsWorkouts['Preacher Curl']['Status']);
        setOverall(completedTaskCount);
    },[isDialogOpen]);

    // now checking the status button whether the workout is finished or not
   
    const statusBtn=(status)=>{  // this is a function 
        if(status){
            return( // now the status is true that is workout has been done so the status is a tick 
                <div className="meterGroupDiv">
                <Button
                  icon="pi pi-check"
                  rounded
                  outlined
                  aria-label="Filter"
                  style={{ borderRadius: '37px' }}
                />
              </div>
            )
        }
        else{ // now the status is false that is workout has not been done so the status is a cross
            return(
                <div className="meterGroupDiv">
            <Button
                icon="pi pi-times"
                rounded
                outlined
                severity="danger"
                aria-label="Cancel"
                style={{ borderRadius: '37px' }}
                className="glowingInCompleteWorkoutTask"
          />
        </div>
            )
        }
    }
    // this return is for the main function "Arms"
    return (
        <p className="m-0">
      <h5 className="overAll">Overall</h5>
      <div className="meterGroupDiv"> 
        {/*  the expression value: (overall / 4) * 100 is typically used to compute a value based on the overall variable and convert it into a percentage */}
        <MeterGroup values={[{ color: 'rgb(236 80 80)', value: (overall / 4) * 100 }]} /> 
      </div>
      <Row>
        <Col>
          <center>
            <img src={BicepCurl} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Biceps Curl</h5>
            {statusBtn(bicepsCurl)} 
            {/* used to check the status of the excersise */}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={PreacherCurl}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">Preacher Curl</h5>
            {statusBtn(preacherCurl)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={PushUps} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">Push Ups</h5>
            {statusBtn(pushUps)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={TricepExtension}
              alt="loading..."
              className="workoutGif"
              width={90}
              height={70}
            />
            <h5 className="workoutName">Triceps Extension</h5>
            {statusBtn(tricepsExtension)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
