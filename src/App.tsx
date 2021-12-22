import { CardContextProvider } from "./Context/Context";
import Page from "./Pages/MainPage";

export default function App() {
  return (
    <div className="App">
      <CardContextProvider>
        <Page />
      </CardContextProvider>
    </div>
  );
}
