import React from 'react';

interface ResultListProps {
  response: {
    rate?: any;
    results?: any[];
  };
}

const ResultList: React.FC<ResultListProps> = ({ response }) => {
  const rate = response.rate || {};
  const results = response.results || [];

  return (
    <article className="message">
      <div className="message-body">
        <ol>
          {results.map((result, index) => (
            <li key={index}>
              {result.annotations.flag} {result.formatted}
              <br />
              <code>
                {result.geometry.lat} {result.geometry.lng}
              </code>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
};

export default ResultList;
