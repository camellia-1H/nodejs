import mongoose from "mongoose";
mongoose.set("strictQuery", true);

async function connect() {
  try {
    let connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/NodeJsTutor"
    );
    console.log("Connect successfully!!!");
  } catch (e) {
    console.log("Connect failure");
  }
}
export default connect;
