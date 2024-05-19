import axios from "axios";
import Routess from "./Routess";
import { UserContextProvider } from "./UserContext";


function App() {
  axios.defaults.baseURL = "https://ecommerce-ai-one.vercel.app/";
  // axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials =false;
  
  return (
    <UserContextProvider>
      <Routess />
    </UserContextProvider>
  );
}

export default App;
