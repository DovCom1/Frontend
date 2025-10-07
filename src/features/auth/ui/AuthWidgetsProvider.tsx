import { LoginWidget } from "./LoginWidget";
import { RegisterWidget } from "./RegisterWidget";

export const AuthWidgetsProvider = () => {
  return (
    <>
      <LoginWidget />
      <RegisterWidget />
    </>
  );
};
