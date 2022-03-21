import ReactDOM from 'react-dom';
import App from './App';
import phonebookService from './services/phonebook';

phonebookService.getAll()
.then(persons=>{
  ReactDOM.render(
    <App persons={persons}/>,
    document.getElementById('root')
  );
})


