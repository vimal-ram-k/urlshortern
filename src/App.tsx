import LongtoShort from "./component/LongtoShort";
import ShorttoLong from "./component/ShorttoLong";

function App() {
  return (
    <div
      className=" bg-black d-flex flex-column flex-lg-row justify-content-center"
      style={{ height: "100dvh" }}
    >
      <LongtoShort />
      <ShorttoLong />
    </div>
  );
}

export default App;
