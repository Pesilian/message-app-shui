import Header from './components/header';
import MessageForm from './components/postmessage';
import MyComponent from './components/newMessageBtn';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MessageForm />
      <MyComponent />
    </div>
  );
}

export default App;
