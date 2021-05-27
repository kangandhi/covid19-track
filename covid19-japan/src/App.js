import React, { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";

// STATE = how to write a variable in REACT <<<<<<
//https://covid19-japan-web-api.now.sh/api/v1/prefectures
//USEEFFECT = run a piece of code based on a given condition (The code inside in USEFFET will run once when the components loads & not again)
//asyn => send a request, wait for it, do something with

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [prefecture, setPrefecture] = useState("japan");
  const [prefectureInfo, setPrefectureInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // useEffect to fetch data from total japan cases
  useEffect(() => {
    fetch("https://covid19-japan-web-api.now.sh/api/v1/total")
      .then((response) => response.json())
      .then((data) => {
        setPrefectureInfo(data);
      });
  }, []);

  // useEffect to fetch cases from each prefectures 
  useEffect(() => {
    const getPrefecturesData = async () => {
      await fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
        .then((response) => response.json())
        .then((data) => {
          const prefectures = data.map((prefecture) => ({
            name: prefecture.name_en, // (Mapped with API data) In english , hokkaido, aomori
            value: prefecture.id, // (Mapped with API) with ID
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setTableData(data);
          setPrefectures(prefectures);
        });
    };
    getPrefecturesData();
  }, []);

  // onPrefectureChange event define in return statement 
  const onPrefectureChange = async (event) => {
    const prefectureID = event.target.value;
    // console.log("YOOOOOOO >>>>>>>>", prefectureID);
    setPrefecture(prefectureID);
    const url =
      prefectureID === "japan"
        ? "https://covid19-japan-web-api.now.sh/api/v1/total"
        : `https://covid19-japan-web-api.now.sh/api/v1/prefectures/${prefectureID}`;

    //`https://covid19-japan-web-api.now.sh/api/v1/prefectures/${prefectureID}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPrefecture(prefectureID);
        // All of the data ....  from the prefecture response
        setPrefectureInfo(data);
      });
  };
  console.log("PREFECTURE INFO >>>>>", prefectureInfo);



  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              varient="outlined"
              onChange={onPrefectureChange}
              value={prefecture}
            >
              <MenuItem value="japan">Japan</MenuItem>
              {/* loop through all the prefectures and show a drop down list of the option */}
              {prefectures.map((prefecture) => (
                <MenuItem value={prefecture.value}>{prefecture.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* header */}
        {/* Title + Select input dropdown field */}
        {/* InfoBox title="Coronavirus cases" */}
        {/* InfoBox title="Coronavirus recoveries" */}
        {/* InfoBox  */}
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={prefectureInfo.positive} // for all over japan 
            // cases={prefectureInfo.cases} // for each prefecture
            //total={2000}
          ></InfoBox>

          <InfoBox
            title="Recovered"
            cases={prefectureInfo.discharge} // for all over japan 
            // cases={prefectureInfo.discharge} // for each prefecture
            //total={2000}
          ></InfoBox>

          <InfoBox
            title="Deaths"
            cases={prefectureInfo.death} // for all over japan 
            // cases={prefectureInfo.deaths} // for each prefecture
            //total={0}
          ></InfoBox>
        </div>
        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by prefecture</h3>
          <h4>I am a table</h4>
          {/* Table */}
          <Table prefectures={tableData}></Table>
          <h3>All over Japan new cases</h3>
          <h4>I am a graph</h4>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
