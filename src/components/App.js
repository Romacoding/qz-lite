import React from "react";
import { useQuery, gql } from "@apollo/client";

const LATEST_QUERY = gql`
  query {
    posts {
      nodes {
        postId
        link
        title
        content
      }
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery( LATEST_QUERY );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  const postsArr = data.posts.nodes;

  return (
    <main>
      <div className="full-container">
        <p>
          Text-Only Version
          <a className="full-version-link button" href="https://qz.com">
            Full Version
          </a>
        </p>
        <h1>Quartz Lite</h1>
		<p>
            <a href="/">Home</a>
    	</p>
        <div className="post-container">
          <hr className="qz-line" align="left" color="168dd9" size="4"></hr>
          {new Date().toDateString()}
          {/* dangerouslySetInnerHTML is a replacement for innerHTML in the browser DOM. 
		  In general, setting HTML from code is risky because it can expose your users to 
		  a cross-site scripting (XSS) attack. 
		  It is better to sanitise your raw HTML (for ex. using DOMPurify) before injecting 
		  it into the DOM. In our case it is a trusted source so we can skip this step. */}
          <ul>
            {window.location.pathname.length > 1
              ? postsArr &&
                typeof postsArr === "object" && (
                  <div
					className="post-content"
                    dangerouslySetInnerHTML={{
                      __html: postsArr.filter(({ postId }) => {
                        return window.location.pathname === `/${postId}`;
                      })[0].content,
                    }}
                  ></div>
                )
              : postsArr &&
                typeof postsArr === "object" &&
                postsArr.map(({ postId, title }) => (
                  <li key={postId}>
                    <a href={`/${postId}`}>{title}</a>
                  </li>
                ))}
          </ul>
        </div>

        <hr className="qz-line" align="left" color="168dd9" size="4"></hr>
        <p>
          <span>&#169; </span> QZ.com
        </p>
      </div>
    </main>
  );
}
