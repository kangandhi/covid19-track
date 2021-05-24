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

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [prefecture, setPrefecture] = useState("japan");
  const [prefectureInfo, setPrefectureInfo] = useState({});

  useEffect(() => {
    const getPrefecturesData = async () => {
      await fetch("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
        .then((response) => response.json())
        .then((data) => {
          const prefectures = data.map((prefecture) => ({
            name: prefecture.name_ja, // (Mapped with API data) In english , UnitedState, United Kingdom
            value: prefecture.name_en, // (Mapped with API) In japanese
          }));
          setPrefectures(prefectures);
        });
    };
    getPrefecturesData();
  }, []);
  const onPrefectureChange = async (event) => {
    const prefectureNCode = event.target.value;
    console.log("YOOOOOOO >>>>>>>>", prefectureNCode);
    setPrefecture(prefectureNCode);

    const url =
      prefectureNCode === "japan"
        ? "https://covid19-japan-web-api.now.sh/api/v1/prefectures"
        : `https://covid19-japan-web-api.now.sh/api/v1/prefectures/${prefectureNCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPrefecture(prefectureNCode);
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
              ><MenuItem value="japan">Japan</MenuItem>
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
            cases={prefectureInfo.cases}
            //total={prefectureInfo.}
          ></InfoBox>
          <InfoBox
            title="Recovered"
            cases={prefectureInfo.discharge}
           // total={prefectureInfo.}
          ></InfoBox>
          <InfoBox
            title="Deaths"
            cases={prefectureInfo.deaths}
            //total={prefectureInfo.}
          ></InfoBox>
        </div>
        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by prefecture</h3>
          {/* Table */}
          <h3>All over Japan new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
