import CardList from '../components/CardList.jsx'
import SearchBox from '../components/SearchBox.jsx'
import Scroll from '../components/Scroll.jsx'
import { useEffect, useState } from 'react'
import './App.css'


const App = () => {

  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');

  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users))
  }, [])

  function handleSearchChange(event) {
    setSearchField(event.target.value);
  }

  return (
    <div className='tc'>
      <h1>RoboFriends</h1>
      <SearchBox searchChange={handleSearchChange} />
      {!filteredRobots.length
        ? <h1>No robot was found</h1>
        :
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>}
    </div>
  )
}

export default App