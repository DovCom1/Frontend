import Sidebar from "../components/chatsPage/Sidebar";
import Header from "../components/Header";

import MeetButtons from "../components/mainPage/MeetButtons";
import Middle from "../components/mainPage/Middle";
import { AuthWidgetsProvider } from "../features/auth/ui/AuthWidgetsProvider";

const MainPage = () => {
  return (
    <div className={"main-page-container"}>
      <Header />
      <main>
        <Middle />
        <AuthWidgetsProvider />
        <MeetButtons />
      </main>
    </div>
  );
};

export default MainPage;
