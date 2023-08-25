import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        description={props.meetupData.description}
        date={props.meetupData.date}
        address={props.meetupData.address}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  //connectng to database
  const client = await MongoClient.connect(
    "mongodb+srv://ankitbisen751:Ankitbisen@cluster0.uga3om1.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  //fetching id of each document and store into an array
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://ankitbisen751:Ankitbisen@cluster0.uga3om1.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  
  //extracting document on the basis of ID.
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  // console.log(selectedMeetup);
  // client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        date:selectedMeetup.date,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
