import Header from "../components/Header";
import MeetButtons from "../components/mainPage/MeetButtons";

import Middle from "../components/mainPage/Middle";

const MainPage = () => {
  return (
    <div className={"main-page-container"}>
      <Header />
      <main>
        <Middle />
        <MeetButtons />
      </main>
    </div>
  );
};

export default MainPage;
