import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedDepartment: '',
      listDepartment: [],
      resMessage: '',
      searchString: '',
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    fetch('department/list', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Успех:', JSON.stringify(response));
        console.log(response);
        this.setState({
          listDepartment: response,
          selectedDepartment: response[0].name
        });
      })
      .catch(error => console.error('Ошибка:', error));
  }

  handleButton(event) {
    fetch(event.target.dataset.uri, {
      method: 'POST',
      body: JSON.stringify({name: this.state.selectedDepartment,
                            searchString: this.state.searchString}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Успех:', JSON.stringify(response));
        console.log(response);
        this.setState({
          resMessage: response.message
        });
      })
      .catch(error => console.error('Ошибка:', error));
  }

  handleChange(event) {
    this.setState({
      selectedDepartment: event.target.value
    });
  }

  handleInput(event) {
    this.setState({
      searchString: event.target.value
    });
  }

    render() {
      return (
        <div>
          <fieldset>

            <legend>Department info.</legend>
            <div className='selectBox'>
              <label htmlFor='select'>Select department:</label><br />
              <select id='select' onChange={this.handleChange}>
                {this.state.listDepartment.map(el =>
                  (<option key={el.id}>
                    {el.name}
                    </option>))}
                    </select>
            </div>

            <input type='button' value='Get head' data-uri='department/head' onClick={this.handleButton} />
            <input type='button' value='Show statistic' data-uri='department/statistic' onClick={this.handleButton} />
            <input type='button' value='Average salary' data-uri='department/salary' onClick={this.handleButton} />
            <input type='button' value='Count lectors' data-uri='department/count' onClick={this.handleButton} />

          </fieldset>

          <fieldset>

            <legend>Search lector.</legend>
            <input type='text' placeholder='Enter name' onChange={this.handleInput} />
            <input type='button' value='Search'  data-uri='lectors/search' onClick={this.handleButton} />

          </fieldset>

          <fieldset>

            <legend>Result.</legend>
            <textarea rows='5' cols='40' value={this.state.resMessage} readOnly />

          </fieldset>

        </div>
      );
    }
}

render( <App />, document.getElementById('root') );
