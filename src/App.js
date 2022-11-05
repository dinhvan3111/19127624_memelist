import logo from "./logo.svg";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import "./App.css";
import axios from "axios";
import Button from "@mui/material/Button";
import MemeList from "./components/MemeList";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
const url = "https://api.imgflip.com/get_memes";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemeApp />
    </QueryClientProvider>
  );
}

function MemeApp() {
  const [memes, setMemes] = useState([]);
  // const fetchMemes = async () => {
  //   const result = await axios.get(url);
  //   if (result != null) {
  //     setMemes(result.data.data.memes);
  //   }
  // };
  // const handleOnclick = () => {
  //   console.log("ok");
  //   fetchMemes();
  // };
  const fetchMemes = async () => {
    const result = await axios.get(url);
    // if (result != null) {
    //   setMemes(result.data.data.memes);
    // }
    return result.data.data.memes;
  };

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["repoData"],
    fetchMemes
    // {
    //   enabled: false,
    // }
  );
  useEffect(() => {
    if (data) {
      // mutate data if you need to
      setMemes(data);
    }
  }, [data]);

  if (isLoading || isFetching)
    return (
      <div className="App">
        <div>
          <Button
            onClick={() => {
              // mutation.mutate(fetchMemes);
            }}
            variant="outlined"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Load meme
          </Button>
        </div>
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="App">
      <Button
        onClick={refetch}
        variant="outlined"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Load meme
      </Button>
      <MemeList imgList={memes}></MemeList>
    </div>
  );
}

export default App;
