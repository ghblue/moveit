 //no react sempre que for importar um arquivo de estilização será no arquivo javascript
  import './styles/global.css';
  import { ExperienceBar } from './components/ExperienceBar';

function App() {
  return (
    <div className="container">
      <ExperienceBar />
    </div>
  );
}

export default App;
