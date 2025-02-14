import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/ai/get-response",
        { code }
      );
      setResult(data);
    } catch (error) {
      console.error("Error fetching response", error);
    }
  };

  return (
    <div>
      <main>
        {/* Left Section - Code Input */}
        <div className="left">
          <div className="code">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here"
              className="txt"
            />
          </div>
          <div className="btn">
            <button onClick={handleSubmit}>Review</button>
          </div>
        </div>

        {/* Right Section - Review Output */}
        <div className="right">
          <div className="result">
            {result ? (
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    return !inline ? (
                      <SyntaxHighlighter
                        style={dracula}
                        language="javascript"
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {result}
              </ReactMarkdown>
            ) : (
              <p>Submit your code for review...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
