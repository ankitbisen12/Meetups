import { MongoClient } from "mongodb";

// /api/new-meetup
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    const client = await MongoClient.connect(
      "mongodb+srv://ankitbisen751:Ankitbisen@cluster0.uga3om1.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    // console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted!" });
  }
};

export default handler;
