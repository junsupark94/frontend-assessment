import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

console.log('outside app');


function App() {
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: ""
  })
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get('https://frontend-take-home.fetchrewards.com/form')
      .then(response => {
        setOccupations(response.data.occupations);
        setStates(response.data.states);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://frontend-take-home.fetchrewards.com/form', values)
      .then(response => {
        setSubmitted(true);
      })
      .catch(error => console.error(error));
  }

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value
    }))
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="target">
        <fieldset>
          <legend>Fetch Rewards Form</legend>

          <label>Full Name
            <input
              type="text"
              name="name"
              required
              minLength="3"
              value={values.name}
              onChange={handleChange}
            />
          </label>

          <label>Email
            <input
              type="email"
              name="email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </label>

          <label>Password
            <input
              type="password"
              name="password"
              required
              title="Minimum eight characters, at least one letter, one number and one special character"
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              value={values.password}
              onChange={handleChange}
            />
          </label>

          <label>Occupation
            <select
              name="occupation"
              value={values.occupation}
              required
              onChange={handleChange}
            >
              <option value="" disabled selected>Select your occupation</option>
              {occupations.map(occupation => (
                <option value={occupation} key={occupation}>{occupation}</option>
              ))}
            </select>
          </label>

          <label>State
            <select
              name="state"
              value={values.state}
              onChange={handleChange}
              required
            >
              <option value="" disabled selected>Select your state</option>
              {states.map(state => (
                <option value={state.name} key={state.name}>{state.abbreviation}</option>
              ))}
            </select>
          </label>

        </fieldset>

        <button type="submit">Submit Form</button>
        {submitted && <div>Successfully submitted!</div>}
      </form>

    </div>
  );
}

export default App;
