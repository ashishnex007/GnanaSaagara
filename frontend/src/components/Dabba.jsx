import React, { useState,useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../index.css";
import { SayButton } from 'react-say';

const Dabba = (props) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [relatedSearches, setRelatedSearches] = useState([]);

  const handleRelatedClick = (clickedQuery) => {
    setQuery(clickedQuery);
  };

  const colorBackgroundMap = {
    primary: "light",
    warning: "dark",
    danger: "light",
    dark: "light",
    info: "dark",
  };

  const fontMap = {
    roboto: "roboto",
    serif:"serif",
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/wiki/${query}`
      );
      setResult(response.data.query.pages[0]);
      const imageResponse = await axios.get(`https://source.unsplash.com/400x400/?${query}`);
      setImageUrl(imageResponse.request.responseURL);

      // Fetch related searches
      const relatedResponse = await axios.get(
        `http://localhost:5000/api/related/${query}`
      );
      setRelatedSearches(relatedResponse.data[1]);
    } catch (error) {
      console.error("Error fetching Wikipedia article:", error);
    }
  };

  const handleFont = () =>{
    return fontMap[props.font];
  }

  const getBackgroundColor = () => {
    return colorBackgroundMap[props.color] || "light"; 
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  

  return (
    <div className="my-4">
      <div
        className={`container text-${
          props.mode === "light" ? "dark" : "light"
        }`}
      >

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Form.Text className={`text-${
            props.mode === "light" ? "muted" : "secondary"
          }`}>
            Powered by the biggest encyclopedia library
          </Form.Text>
        </Form.Group>

        <Button variant="secondary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <br />
      <div
        className={`my-4 container rounded-4 py-2 bg-${getBackgroundColor()}`}
      >
        {result && (
          <div>
                <h2
                className={`container ${handleFont()} fs-${props.size > 2 ? props.size - 2 : props.size} text-${props.color} fw-bold my-4`}
                >
                {result.title}
                </h2>
                <div className="d-flex">
                <div className="text-container">
                    <p
                    className={`container ${handleFont()} fs-${props.size} text-${props.color} `}
                    >
                    {result.extract && result.extract.replace(/=/g, '') }
                    </p>
                </div>
                {imageUrl && (
                    <img
                    src={imageUrl}
                    alt="Wikipedia Image"
                    className="img-fluid"
                    style={{ objectFit: "cover", height: "12rem", width: "12rem",padding:"0.7rem",borderRadius:"2rem" }}
                    />
                )}
                </div>
            <div className="container">
          <SayButton
            onClick={ event => console.log(event) }
            speak={result.extract && result.extract.replace(/=/g, '') }
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89z"/>
              <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
            </svg>
          </SayButton>        
        </div>
          </div>
        )}
      </div>
      <div className="container mt-3 ">
        <h4 className={`text-${
          props.mode === "light" ? "muted" : "white"
        }`}>Related Searches:</h4>
        <ul className={`text-${
          props.mode === "light" ? "muted" : "white"
        }`}>
          {relatedSearches.map((search, index) => (
            <li key={index} style={{ cursor: "pointer" }} onClick={() => handleRelatedClick(search)}>
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dabba;
