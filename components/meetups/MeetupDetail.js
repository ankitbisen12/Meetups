import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";
import Card from "../UI/Card";

const MeetupDetail = (props) => {
  return (
    <Card>
      <section className={classes.detail}>
        <img className={classes.img} src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <span>{props.date}</span>
        <p>{props.description}</p>
      </section>
    </Card>
  );
};

export default MeetupDetail;
