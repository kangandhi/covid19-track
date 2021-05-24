import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title"color="textSecondary">{title}</Typography>
        {/*  +120 Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* 1.2 M Total */}
        <Typography className="infoBox__total" color="textSecondary">
            {total} total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
