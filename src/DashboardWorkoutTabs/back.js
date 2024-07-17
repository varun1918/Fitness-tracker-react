import React, { useState, useEffect } from "react"; // hook's component
import { Row, Col } from "react-bootstrap";
//primereact compoments
import { MeterGroup } from "primereact/metergroup";
import { Button } from "primereact/button";

import "./back.css";

//back
import DeadLift from '../Assests/Back_Workout_Images/back_deadLift.png'
import LatPullDown from '../Assests/Back_Workout_Images/back_latPullDown.jpg'
import PullUp from '../Assests/Back_Workout_Images/back_pullUp.jpg'
import SeatedRow from '../Assests/Back_Workout_Images/back_seatedRow.jpg'
let  completedTaskCount = 0;// this is used to add the values for the overall count using ++ operator

//The variable isDialogOpen is a state variable used to determine whether a dialog (a modal window) should be displayed or not in a React component

export function Back({isDialogOpen}){
    let workoutsList = JSON.parse(localStorage.getItem("workouts"));
    let backWorkouts = workoutsList['Back'] // this is used to call each object inside the back

    // state managemnet of different individual excercise inside the "Back"
    const [deadLift, setDeadLift] = useState(backWorkouts['Dead Lift']['Status'])
    const [pullUp, setPullUp] = useState(backWorkouts['Pull-Up']['Status'])
    const [latPullDown, setLatPullDown] = useState(backWorkouts['Lat Pull-Down']['Status'])
    const [seatedRow, setSeatedRow] = useState(backWorkouts['Seated Row']['Status'])

    // state for the overall inside the arms 

    const [overall,setOverall]=useState(backWorkouts['Dead Lift']['Status'] +
      backWorkouts['Pull-Up']['Status'] +
      backWorkouts['Lat Pull-Down']['Status'] +
      backWorkouts['Seated Row']['Status'],
  )
    useEffect(() => {
        let workoutsList = JSON.parse(localStorage.getItem("workouts"));
        let backWorkouts = workoutsList['Back']
        completedTaskCount = 0;
        
        // now checking the status of each exercise in order to increase each of its count 
        if (backWorkouts['Dead Lift']['Status']) completedTaskCount++
        if (backWorkouts['Pull-Up']['Status']) completedTaskCount++
        if (backWorkouts['Lat Pull-Down']['Status']) completedTaskCount++
        if (backWorkouts['Seated Row']['Status']) completedTaskCount++

        // now calling each states and assigning the value to each of the states using setValue 
        setDeadLift(backWorkouts['Dead Lift']['Status'])
        setPullUp(backWorkouts['Pull-Up']['Status'])
        setLatPullDown(backWorkouts['Lat Pull-Down']['Status'])
        setSeatedRow(backWorkouts['Seated Row']['Status'])
        setOverall(completedTaskCount);
    },[isDialogOpen])

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
            <img src={DeadLift} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">DeadLift</h5>
            {statusBtn(deadLift)} 
            {/* used to check the status of the excersise using state */}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={PullUp}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">PullUp</h5>
            {statusBtn(pullUp)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={LatPullDown} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">Lat Pull Down</h5>
            {statusBtn(latPullDown)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={SeatedRow}
              alt="loading..."
              className="workoutGif"
              width={90}
              height={70}
            />
            <h5 className="workoutName">SeatedRow</h5>
            {statusBtn(seatedRow)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
