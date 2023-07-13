import React from 'react';
// import './ResultJSON.css';

interface ResultJSONProps {
  response: any;
}

const ResultJSON: React.FC<ResultJSONProps> = ({ response }) => {
  return (
    <article className="message">
      <div className="message-body">
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </article>
  );
};

export default ResultJSON;
