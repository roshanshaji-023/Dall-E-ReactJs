
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "\n make your imaginations into Image..\n Search for Rabit with a paint brush on skyrocket...or\n anything you wanted to!"
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating the image you imagined ..Please Wait..</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
        <h1>Dall-E Api With ReactJS</h1>
          <h2>Generate an Image using Open AI API</h2>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="5"
            cols="60"
          />
          <br /><br /><br /><br />
          <button onClick={generateImage}>Generate an Image</button> <br /><br />
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
            
          ) : (
            <>
            </>
          )}
        </>
      )}
      {
        <>
        <h6>Made as a learn-by-do project ! <a href="https://github.com/roshanshaji-023/Dall-E-ReactJs/">View Source Code</a></h6><br />
       
        </>
      }
    </div>
  );
}

export default App;
