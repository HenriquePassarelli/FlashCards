import { CardContextProvider } from "./Context/Context";
import { LoginContextProvider } from "./Context/LoginContext";
import Page from "./Pages/MainPage";

export default function App() {
  return (
    <div className="App">
      <LoginContextProvider >
        <CardContextProvider>
          <Page />
        </CardContextProvider>
      </LoginContextProvider>
    </div>
  );
}
