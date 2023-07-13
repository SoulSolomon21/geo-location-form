import React, { useState } from 'react';
import classnames from 'classnames';
import ResultJSON from './ResultJSON';
import ResultList from './ResultList';


const RESULT_TAB = 'RESULT_TAB';
const JSON_TAB = 'JSON_TAB';

interface GeocodingResultsProps {
  response: {
    results?: any[];
  };
}

const GeocodingResults: React.FC<GeocodingResultsProps> = ({ response }) => {
  const [activeTab, setActiveTab] = useState(RESULT_TAB);

  const renderTab = (title: string, tab: string, icon: string) => (
    <li className={classnames({ 'is-active': activeTab === tab })}>
      <a
        href="/"
        onClick={e => {
          e.preventDefault();
          setActiveTab(tab);
        }}
      >
        <span className="icon is-small">
          <i className={icon} aria-hidden="true" />
        </span>
        <span>{title}</span>
      </a>
    </li>
  );

  const results = response.results || [];

  return (
    <div className="box results">
      <div className="tabs is-boxed vh">
        <ul>
          {renderTab('Results', RESULT_TAB, 'fas fa-list-ul')}
          {results.length > 0 && renderTab('JSON Result', JSON_TAB, 'fab fa-js')}
        </ul>
      </div>
      {/* List of results */}
      {activeTab === RESULT_TAB && results.length > 0 && <ResultList response={response} />}
      {/* JSON result */}
      {activeTab === JSON_TAB && results.length > 0 && <ResultJSON response={response} />}
    </div>
  );
};

export default GeocodingResults;
