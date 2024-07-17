import React, { useState, useEffect } from "react"; // hook's component
import { Row, Col } from "react-bootstrap";
//primereact compoments
import { MeterGroup } from "primereact/metergroup";
import { Button } from "primereact/button";

import "./leg.css";

//leg
import Lunge from '../Assests/Leg_Workout_Images/lunge.jpg'
import SingleLegDeadLift from '../Assests/Leg_Workout_Images/singleLegDeadLift.jpeg'
import Squats from '../Assests/Leg_Workout_Images/squats.jpg'
import StepUps from '../Assests/Leg_Workout_Images/stepUps.png'
let  completedTaskCount = 0;// this is used to add the values for the overall count using ++ operator

//The variable isDialogOpen is a state variable used to determine whether a dialog (a modal window) should be displayed or not in a React component

export function Leg({isDialogOpen}){
    let workoutsList = JSON.parse(localStorage.getItem("workouts"));
    let legWorkouts = workoutsList['Leg'] // this is used to call each object inside the back

    // state managemnet of different individual excercise inside the "Back"
    const [lunge, setLunge] = useState(legWorkouts['Lunge']['Status'])
    const [singleLegDeadLift, setSingleLegDeadLift] = useState(
        legWorkouts['Single-Leg DeadLift']['Status'],
    )
    const [squats, setSquats] = useState(legWorkouts['Squats']['Status'])
    const [stepUps, setStepUps] = useState(legWorkouts['Step-Ups']['Status'])
  
    const [overall, setOverall] = useState(
        legWorkouts['Lunge']['Status'] +
        legWorkouts['Single-Leg DeadLift']['Status'] +
        legWorkouts['Squats']['Status'] +
        legWorkouts['Step-Ups']['Status'],
    )

    // state for the overall inside the arms 

    useEffect(() => {
      let workoutsList = JSON.parse(localStorage.getItem("workouts"));
      let legWorkouts = workoutsList['Leg'];
      completedTaskCount = 0;
        
        // now checking the status of each exercise in order to increase each of its count 
      if ( legWorkouts['Lunge']['Status']) completedTaskCount++
      if ( legWorkouts['Single-Leg DeadLift']['Status']) completedTaskCount++
      if ( legWorkouts['Squats']['Status']) completedTaskCount++
      if (legWorkouts['Step-Ups']['Status']) completedTaskCount++

        // now calling each states and assigning the value to each of the states using setValue 
      setLunge(legWorkouts['Lunge']['Status'])
      setSingleLegDeadLift(legWorkouts['Single-Leg DeadLift']['Status'])
      setSquats(legWorkouts['Squats']['Status'])
      setStepUps(legWorkouts['Step-Ups']['Status'])
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
            <img src={Lunge} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">Lunge</h5>
            {statusBtn(lunge)} 
            {/* used to check the status of the excersise using state */}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={SingleLegDeadLift}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">SingleLegDeadLift</h5>
            {statusBtn(singleLegDeadLift)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={Squats} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">Squats</h5>
            {statusBtn(squats)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={StepUps}
              alt="loading..."
              className="workoutGif"
              width={90}
              height={70}
            />
            <h5 className="workoutName">StepUps</h5>
            {statusBtn(stepUps)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
