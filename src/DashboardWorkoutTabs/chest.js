import React, { useState, useEffect } from "react"; // hook's component
import { Row, Col } from "react-bootstrap";
//primereact compoments
import { MeterGroup } from "primereact/metergroup";
import { Button } from "primereact/button";

import "./chest.css";

//chest
import CableCrossOver from '../Assests/Chest_Workout_Images/chest_cableCrossOver.jpg'
import ChestDip from '../Assests/Chest_Workout_Images/chest_chestDip.jpg'
import ChestFlys from '../Assests/Chest_Workout_Images/chest_chestFlys.jpg'
import FloorPress from '../Assests/Chest_Workout_Images/chest_floorPress.jpg'

let  completedTaskCount = 0;// this is used to add the values for the overall count using ++ operator

//The variable isDialogOpen is a state variable used to determine whether a dialog (a modal window) should be displayed or not in a React component

export function Chest({isDialogOpen}){
    let workoutsList = JSON.parse(localStorage.getItem("workouts"));
    let chestWorkouts = workoutsList['Chest'] // this is used to call each object inside the arms

    // state managemnet of different individual excercise inside the "ARMS"
    const [cableCrossOver, setCableCrossOver] = useState(chestWorkouts['Cable Crossover']['Status'])
    const [chestDip, setChestDip] = useState(chestWorkouts['Chest Dip']['Status'])
    const [chestFlys, setChestFlys] = useState(chestWorkouts['Chest Flys']['Status'])
    const [floorPress, setFloorPress] = useState(chestWorkouts['Floor Press']['Status'])

    // state for the overall inside the arms 

    const [overall,setOverall]=useState( chestWorkouts['Cable Crossover']['Status'] +
        chestWorkouts['Chest Dip']['Status'] +
        chestWorkouts['Chest Flys']['Status'] +
        chestWorkouts['Floor Press']['Status'],
    )
    useEffect(() => {
       let  workoutsList = JSON.parse(localStorage.getItem("workouts"));
        let chestWorkouts = workoutsList['Chest']
        completedTaskCount = 0;
        
        // now checking the status of each exercise in order to increase each of its count 
        if ( chestWorkouts['Cable Crossover']['Status']) completedTaskCount++
        if ( chestWorkouts['Chest Dip']['Status']) completedTaskCount++
        if (chestWorkouts['Chest Flys']['Status']) completedTaskCount++
        if ( chestWorkouts['Floor Press']['Status']) completedTaskCount++

        // now calling each states and assigning the value to each of the states using setValue 
        setCableCrossOver(chestWorkouts['Cable Crossover']['Status'])
        setChestDip(chestWorkouts['Chest Dip']['Status'])
        setChestFlys(chestWorkouts['Chest Flys']['Status'])
        setFloorPress(chestWorkouts['Floor Press']['Status'])
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
            <img src={CableCrossOver} alt="loading..." className="workoutGif" width={80} height={70} />
            <h5 className="workoutName">CableCrossOver</h5>
            {statusBtn(cableCrossOver)} 
            {/* used to check the status of the excersise */}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={ChestDip}
              alt="loading..."
              className="workoutGif"
              width={100}
              height={70}
            />
            <h5 className="workoutName">ChestDip</h5>
            {statusBtn(chestDip)}
          </center>
        </Col>
        <Col>
          <center>
            <img src={ChestFlys} alt="loading..." className="workoutGif" width={100} height={70} />
            <h5 className="workoutName">ChestFlys</h5>
            {statusBtn(chestFlys)}
          </center>
        </Col>
        <Col>
          <center>
            <img
              src={FloorPress}
              alt="loading..."
              className="workoutGif"
              width={90}
              height={70}
            />
            <h5 className="workoutName">FloorPress</h5>
            {statusBtn(floorPress)}
          </center>
        </Col>
      </Row>
    </p>
  )
}
