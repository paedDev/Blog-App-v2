import mongoose from "mongoose";

export default function connectDb() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://paed:paed@cluster0.fj8qvxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log(`Connected to mongodb`))
    .catch(() => console.log(`Failed to connect to mongodb`));
}
