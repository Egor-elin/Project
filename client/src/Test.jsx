import React from 'react';
import './Test.css';
import axios from 'axios';


class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get("http://localhost:4444/presence").then(response => {
      this.setState({ data: response.data });
    })
  }

  render() {
    return (
      <div className='Test'>
        <h1 className='TestData'>Посещаемость</h1>

        <table className="Table">
          <thead>
            <tr>
              <th scope="col">Id Студента</th>
              <th scope="col">Id Карты</th>
              <th scope="col">Присуствие</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((result) => {
              return (
                <tr>
                  <td>{result.Id_Studet}</td>
                  <td>{result.Id_Card}</td>
                  <td><input type="checkbox" /> </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    );
  }
}

export default Test;