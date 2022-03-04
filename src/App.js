import { useState } from 'react';
import { buildWordingSync } from './utils/syncSheetContent';
import './App.css';

function App() {
  const [ wordings, setWordings ] = useState(null);
  const [ sheetId, setSheetId ] = useState('');
  const [ showSheet, setShowSheet ] = useState(false);
  const [ apiKey, setApiKey ] = useState('');
  
  function handleSyncWording() {
    buildWordingSync(sheetId, apiKey).then(data => setWordings(data));
  }

  return (
    <div className="App" style={{
      display: 'flex',
    }}>
      <div style={{ width: '100vw' }}>
        <div style={{ padding: '12px' }}>
          <div>
            <div>Input your google api key: </div>
            <input type="text" value={apiKey} onChange={e => setApiKey(e.currentTarget.value)} style={{ width: '340px' }} />
          </div>
          <br />
          <div>
            <div>Input your googlesheet id: </div>
            <input type="text" value={sheetId} onChange={e => setSheetId(e.currentTarget.value)} style={{ width: '340px' }} />
            <button onClick={_ => setShowSheet(!showSheet)}>
              { showSheet ? 'Hide' : 'Show' } sheet
            </button>
          </div>
          <br />
          <button onClick={handleSyncWording}>Convert to JSON</button>
          <br />
        </div>
        <hr />
        { wordings?.map((wording, i) =>
          <div key={i} style={{ padding: '12px' }}>
            <div>{wording.name}</div>
            <pre><code>{ JSON.stringify(wording.data, null, 2) }</code></pre>
          </div>
        ) }
      </div>
      <div>
        {
          showSheet &&
          <iframe src="https://docs.google.com/spreadsheets/d/1xCR7HRNMLD6zOnJTFiDxCIZ9hzPUO6DkrinySVHVvqw/edit#gid=0" style={{
            border: '0',
            width: '50vw',
            height: '100vh'
          }}></iframe>
        }
      </div>
    </div>
  );
}

export default App;
