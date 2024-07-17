import React, { useState, useEffect} from "react"; // hook's component
import { Row, Col } from "react-bootstrap";

import "./dashboard.css";

//primereact compoments
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { InputNumber } from "primereact/inputnumber";
import { Accordion, AccordionTab } from "primereact/accordion"; // It is used for displaying the each metergroup inside the dialog box
import { FloatLabel } from "primereact/floatlabel"; // It is used to display the inputnumber inside the textbox
// upper row elemnts
import CaloriesBurn from "../Assests/caloriesBurning.gif";
import Cycling from "../Assests/cycling.gif";
import Workouts from "../Assests/workout.gif";
// Legs
import { Leg } from '../DashboardWorkoutTabs/leg'
// Shoulder
import { Shoulder } from '../DashboardWorkoutTabs/shoulder'
// Back
import { Back } from '../DashboardWorkoutTabs/back'
//Arms
import { Arms } from '../DashboardWorkoutTabs/arms'
//Chest
import { Chest } from '../DashboardWorkoutTabs/chest'

let oop=1
export function Dashboard() {
  // functional component
  // these things are the "STATES"
  //const workoutsListRef = useRef();
  // JSON.parse() is used to convert to "object"
  let workoutsList = JSON.parse(localStorage.getItem("workouts"))
  // this is how we have to use objects to call the details inside a JSON file
  //console.log(workoutsList["Leg"]["Lunge"]["Descriptions"],"@#$%");

  // state management for the different functions perfomed 
  const [myWorkoutDialogBox, setMyWorkoutDialogBox] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // functional component passing value for each excerise using isDialogOpen
  const [overAllPercentage, setOverAllPercentage] = useState(0) // for overall percentage
  const [caloriesBurned, setCaloriesBurned] = useState(0) // for calculating the total calories burned 
  const [cyclingValue, setCyclingValue] = useState(0);//  for calculating the total minutes of cycling 
  const [completedTaskCount, setCompletedTaskCount] = useState(0) // for managing the count of the tasks completed 
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  //const values = [{ label: "Space used", value: 15 }];
  //const [visible, setVisible] = useState(false);
  


  useEffect(() => {
    //workoutsListRef.current = JSON.parse(localStorage.getItem("workouts"));
     workoutsList = JSON.parse(localStorage.getItem("workouts")) // this is used to get the value from the local storage and converting the it into object for iterating using "parse"
    let pendingWorkout = 0
    let completedWorkout = 0
    let totalCaloriesBurned = 0
    Object.keys(workoutsList).map((key) =>
      Object.keys(workoutsList[key]).map( // here when we are iterating through array when the status is 1 then increment the completedworkouts count else increase the pending workouts count
        (key2) =>workoutsList[key][key2]['Status'] === 1 ? completedWorkout++ : pendingWorkout++,
      ),
    )
    Object.keys(workoutsList).forEach((muscleGroup) => {// here musclegroup is a varaible  iterating through each elemnt using for each loop
      Object.keys(workoutsList[muscleGroup]).forEach((exercise) => { // here we are iterating inside the child element using another for each loop
        if (workoutsList[muscleGroup][exercise].Status === 1) {
          totalCaloriesBurned += workoutsList[muscleGroup][exercise].CaloriesBurned
        }
      })
    })
    console.log(totalCaloriesBurned, '@!@')
    
    
    // calling the states using "setValue"
    setCaloriesBurned(totalCaloriesBurned) 
    let totalWorkout = pendingWorkout + completedWorkout // calculating the total workouts by adding the values 
    console.log(pendingWorkout, '%%', completedWorkout)
    setCompletedTaskCount(completedWorkout)
    setOverAllPercentage((completedWorkout / totalWorkout) * 100) // converting the overall into percentage 

    // workoutsList 
    setCyclingValue(workoutsList['Cycling']) // here this is used in order to prevent from deleting the data even after the page is refreshed 
    const documentStyle = getComputedStyle(document.documentElement)
    const data={
      datasets:[
        {
          data: [ (completedWorkout / totalWorkout) * 100,
            100 - (completedWorkout / totalWorkout) * 100, // formula for calculating the overall percentage
          ],
          backgroundColor: [
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
          ],
        },
      ],
    }
    const options = {
      cutout: "60%",
    }

    setChartData(data)
    setChartOptions(options)
   // console.log(workoutsList["Cycling"],"$$$$")
  }, [])// this is used for rendering each time the page is loaded at once

  // calling the states using "setValue"
  const myWorkoutDialogBoxFunc = () => { // here we are updating the value entered to the local storage  for the dialop box
    setMyWorkoutDialogBox(true)
  }
  const repsOnChange = (e, workoutObj) => { // here we are updating the value entered to the local storage  for the reps
    workoutObj['Reps'] = e
    localStorage.setItem('workouts', JSON.stringify(workoutsList))
    workoutsList = JSON.parse(localStorage.getItem('workouts'))
  }
  const setsOnChange = (e, workoutObj) => { // here we are updating the value entered to the local storage  for the sets
    workoutObj['Sets'] = e
    localStorage.setItem('workouts', JSON.stringify(workoutsList))
    workoutsList = JSON.parse(localStorage.getItem('workouts'))
  }
  
  const workoutStatusOnClick = (status, workoutObj) => {
    workoutObj['Status'] = status
    localStorage.setItem('workouts', JSON.stringify(workoutsList))
    workoutsList = JSON.parse(localStorage.getItem('workouts'))
    setIsDialogOpen(oop++)
  }
  // set cycling value
  const cyclingValueOnChange = (value,) =>{
    setCyclingValue(value)
    workoutsList["Cycling"]= value; // here we are updating the value entered to the local storage for cycling
    localStorage.setItem("workouts", JSON.stringify(workoutsList));// here we are setting the value again to the local storage so that each item when the values get changed it will be updated in the local storage
  }
  const myWorkoutDialogBoxOnHide = () => {
    let pendingWorkout = 0
    let completedWorkout = 0
    Object.keys(workoutsList).map((key) =>
      Object.keys(workoutsList[key]).map((key2) =>
        workoutsList[key][key2]['Status'] === 1 ? completedWorkout++ : pendingWorkout++,
      ),
    )
    let totalWorkout = pendingWorkout + completedWorkout
    setCompletedTaskCount(completedWorkout)
    setOverAllPercentage((completedWorkout / totalWorkout) * 100)

    let totalCaloriesBurned = 0

    Object.keys(workoutsList).forEach((muscleGroup) => {
      Object.keys(workoutsList[muscleGroup]).forEach((exercise) => {
        if (workoutsList[muscleGroup][exercise].Status === 1) {
          totalCaloriesBurned += workoutsList[muscleGroup][exercise].CaloriesBurned
        }
      })
    })
    console.log(totalCaloriesBurned, '@!@')
    setCaloriesBurned(totalCaloriesBurned)

    if (!myWorkoutDialogBox) return // the myWorkoutDialogBox variable is falsey (i.e., null, undefined, false, 0, NaN, or an empty string) and returns early if it is. If myWorkoutDialogBox is not falsey, it proceeds to set myWorkoutDialogBox to false.
    setMyWorkoutDialogBox(false)
  }
  const workoutUpdates = (workoutObj) => {
    if (workoutObj !== undefined)
      return (
        <Row>
          <Col>
            <FloatLabel>
              <InputNumber
                id="number-input"
                value={workoutObj['Reps']}
                min={20}
                onValueChange={(e) => repsOnChange(e.value, workoutObj)}
                disabled
              />
              <label htmlFor="number-input">No. of Reps (per set)</label>
            </FloatLabel>
          </Col>
          <Col>
            <FloatLabel>
              <InputNumber
                id="number-input"
                value={workoutObj['Sets']}
                min={3}
                onValueChange={(e) => setsOnChange(e.value, workoutObj)}
                disabled
              />
              <label htmlFor="number-input">No. of Set</label>
            </FloatLabel>
          </Col>

          <Col>
            {workoutObj['Status'] ? ( // this means if status is 1(TRUE) then tick mark will come  otherwise cross mark will come
              <Button
                icon="pi pi-check"
                rounded
                aria-label="Filter"
                style={{ borderRadius: '37px' }}
                onClick={() => workoutStatusOnClick(0, workoutObj)} // here status is 0 which means the workout has been done
              />
            ) : (
              <Button
                icon="pi pi-times"
                rounded
                severity="danger"
                aria-label="Cancel"
                style={{ borderRadius: '37px' }}
                onClick={() => workoutStatusOnClick(1, workoutObj)}
              />
            )}
          </Col>
        </Row>
      )
  }
  console.log('$$ RENDER DASHBOARD $$')

  return (
    <div >
      <center>
      <h1 className="title">Varun's Fitness Tracking App</h1>
      </center>
    <Row>
      <Col>
        <div  className="myWorkoutNavDiv">
          <Button
            label="MY WORKOUT"
            className="myWorkoutNavBtn"
            onClick={myWorkoutDialogBoxFunc}
          ></Button>

          {/* <Button
            label="History"
            className="myWorkoutNavBtn"
            onClick={myWorkoutDialogBoxFunc}
          ></Button> */}
        </div>
      </Col>
    </Row>

    <Dialog
      header="My Workouts"
      visible={myWorkoutDialogBox}
      // style={{ width: '50vw' }}
      className="myWorkoutDialogBox"
      onHide={() => {
        myWorkoutDialogBoxOnHide(myWorkoutDialogBox)
      }}
    >
      <p className="m-0">
        <div className="cyclingDiv">
          <h4>Cycling</h4>{' '}
          <div>
            <InputNumber
              inputId="integeronly"
              value={cyclingValue}
              className="cyclingInput"
              onValueChange={(e) => cyclingValueOnChange(e.value, workoutsList)}
            />
          </div>
          <p className="cyclingMinutesLbl">minutes</p>
        </div>
        <TabView className="myWorkoutTabs">
          <TabPanel header="Leg" className="workoutTabHeader">
            <Accordion activeIndex={0}>
              <AccordionTab header="Lunge">
                <p className="m-0">
                  {workoutsList['Leg']['Lunge']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Leg']['Lunge'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Single Leg Dead Lift">
                <p className="m-0">
                  {workoutsList['Leg']['Single-Leg DeadLift']['Descriptions']} <br /> <br />
                  {workoutUpdates(workoutsList['Leg']['Single-Leg DeadLift'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Squats">
                <p className="m-0">
                  {workoutsList['Leg']['Squats']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Leg']['Squats'])}
                </p>
              </AccordionTab>

              <AccordionTab header="Step-Ups">
                <p className="m-0">
                  {workoutsList['Leg']['Step-Ups']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Leg']['Step-Ups'])}
                </p>
              </AccordionTab>
            </Accordion>
          </TabPanel>
          <TabPanel header="Shoulder" className="workoutTabHeader">
            <Accordion activeIndex={0}>
              <AccordionTab header="Barbell Front Raise">
                <p className="m-0">
                  {workoutsList['Shoulder']['Barbell Front Raise']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Shoulder']['Barbell Front Raise'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Face Pull">
                <p className="m-0">
                  {workoutsList['Shoulder']['Face Pull']['Descriptions']} <br /> <br />
                  {workoutUpdates(workoutsList['Shoulder']['Face Pull'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Lateral Raise">
                <p className="m-0">
                  {workoutsList['Shoulder']['Lateral Raise']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Shoulder']['Lateral Raise'])}
                </p>
              </AccordionTab>

              <AccordionTab header="Reverse Fly">
                <p className="m-0">
                  {workoutsList['Shoulder']['Reverse Fly']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Shoulder']['Reverse Fly'])}
                </p>
              </AccordionTab>
            </Accordion>
          </TabPanel>
          <TabPanel header="Back" className="workoutTabHeader">
            <Accordion activeIndex={0}>
              <AccordionTab header="Dead Lift">
                <p className="m-0">
                  {workoutsList['Back']['Dead Lift']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Back']['Dead Lift'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Pull-Up">
                <p className="m-0">
                  {workoutsList['Back']['Pull-Up']['Descriptions']} <br /> <br />
                  {workoutUpdates(workoutsList['Back']['Pull-Up'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Lat Pull-Down">
                <p className="m-0">
                  {workoutsList['Back']['Lat Pull-Down']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Back']['Lat Pull-Down'])}
                </p>
              </AccordionTab>

              <AccordionTab header="Seated Row">
                <p className="m-0">
                  {workoutsList['Back']['Seated Row']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Back']['Seated Row'])}
                </p>
              </AccordionTab>
            </Accordion>
          </TabPanel>
          <TabPanel header="Arms" className="workoutTabHeader">
            <Accordion activeIndex={0}>
              <AccordionTab header="Biceps Curl">
                <p className="m-0">
                  {workoutsList['Arms']['Biceps Curl']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Arms']['Biceps Curl'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Preacher Curl">
                <p className="m-0">
                  {workoutsList['Arms']['Preacher Curl']['Descriptions']} <br /> <br />
                  {workoutUpdates(workoutsList['Arms']['Preacher Curl'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Push Ups">
                <p className="m-0">
                  {workoutsList['Arms']['Push Ups']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Arms']['Push Ups'])}
                </p>
              </AccordionTab>

              <AccordionTab header="Triceps Extension">
                <p className="m-0">
                  {workoutsList['Arms']['Triceps Extension']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Arms']['Triceps Extension'])}
                </p>
              </AccordionTab>
            </Accordion>
          </TabPanel>
          <TabPanel header="Chest" className="workoutTabHeader">
            <Accordion activeIndex={0}>
              <AccordionTab header="Cable Crossover">
                <p className="m-0">
                  {workoutsList['Chest']['Cable Crossover']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Chest']['Cable Crossover'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Chest Dip">
                <p className="m-0">
                  {workoutsList['Chest']['Chest Dip']['Descriptions']} <br /> <br />
                  {workoutUpdates(workoutsList['Chest']['Chest Dip'])}
                </p>
              </AccordionTab>
              <AccordionTab header="Chest Flys">
                <p className="m-0">
                  {workoutsList['Chest']['Chest Flys']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Chest']['Chest Flys'])}
                </p>
              </AccordionTab>

              <AccordionTab header="Floor Press">
                <p className="m-0">
                  {workoutsList['Chest']['Floor Press']['Descriptions']} <br />
                  <br />
                  {workoutUpdates(workoutsList['Chest']['Floor Press'])}
                </p>
              </AccordionTab>
            </Accordion>
          </TabPanel>
        </TabView>
      </p>
    </Dialog>

    <br />
    <Row className="dashbaordCardRow">
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card title="Calories Burned Today">
          <Row>
            <Col>
              <img
                src={CaloriesBurn}
                alt="loading..."
                className="burningGif"
                width={110}
                height={100}
              />
            </Col>
            <Col>
              <div className="caloriesBurnedValue">
                <center>
                  <h1>{caloriesBurned}</h1> <p>calories</p>
                </center>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card title="Cycling" className="cyclingCard">
          <Row>
            <Col>
              <img
                src={Cycling}
                alt="loading..."
                className="cyclingGif"
                width={110}
                height={100}
              />
            </Col>
            <Col>
              <div className="caloriesBurnedValue">
                <center>
                  <h1>{cyclingValue}</h1> <p>minutes</p>
                </center>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card title="No. of Workouts">
          <Row>
            <Col>
              <img
                src={Workouts}
                alt="loading..."
                className="workoutGif"
                width={110}
                height={100}
              />
            </Col>
            <Col>
              <div className="caloriesBurnedValue">
                <center>
                  <h1>{completedTaskCount}/20</h1> <p>workouts</p>
                </center>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xl={3} lg={6} md={6} sm={12} xs={12}>
        <Card title="Overall">
          <Row>
            <Col>
              <Chart
                type="doughnut"
                data={chartData}
                options={chartOptions}
                className="dashboardOverallDonut"
              />
            </Col>
            <Col>
              <div className="caloriesBurnedValue">
                <center>
                  <h1>{overAllPercentage} %</h1> <p>Completed Today</p>
                </center>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <br />
    <TabView className="workoutTabs">
      <TabPanel header="LEG" className="workoutTabHeader">
        <Leg isDialogOpen={isDialogOpen} />
      </TabPanel>
      <TabPanel header="SHOULDER" className="workoutTabHeader">
        <Shoulder isDialogOpen={isDialogOpen} />
      </TabPanel>
      <TabPanel header="BACK" className="workoutTabHeader">
        <Back isDialogOpen={isDialogOpen} />
      </TabPanel>
      <TabPanel header="ARMS" className="workoutTabHeader">
        <Arms isDialogOpen={isDialogOpen} />
      </TabPanel>
      <TabPanel header="CHEST" className="workoutTabHeader">
        <Chest isDialogOpen={isDialogOpen} />
      </TabPanel>
    </TabView>
    {/* <Button label="Submit" /> */}
  </div>
)
}
    