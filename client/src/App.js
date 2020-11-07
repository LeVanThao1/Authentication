import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/header'
import Body from './components/body'

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Body />
            </div>
        </Router>
    )
}

export default App
