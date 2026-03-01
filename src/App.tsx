// import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
    <nav>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/second">Converter</Link>
      </div>
    </nav>
      {/* <Switch> */}
        {/* <Route exact path="/" component={SecondPage} /> */}
      {/* <Routes>
        <Route path="/" Component={SecondPage} />
        <Route path="/second" Component={FirstPage} />
      </Routes> */}
      {/* </Switch> */}
    </>
  )
}

export default App
