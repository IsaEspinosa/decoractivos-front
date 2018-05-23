import React, {Component} from 'react';
import logo from './logo.svg';
import Header from './components/web/Header'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
            </div>
        );
    }
}

export default App;