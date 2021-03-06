import { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/AuxFolder/AuxFile';
import Match from './Match/Match';
import axios from '../../axios-instance';
import moment from 'moment';


class Matches extends Component {
  state = {
    matches: null,
    loaded: false
  }

  componentDidMount() {
    this.getMatches();
  }

  getMatches = () => {
    const url = '/matches';
    axios.get(url)
      .then(response => {
        this.setState({
          matches: response.data,
          loaded: true
        })
      })
  }

  createMatches = () => {
    const url = '/matches';
    let body = {}
    axios.post(url, body)
      .then(() => {
        this.getMatches();
      })
  }

  completeMatch = (match_id) => {
    axios.post('/matches/complete/' + match_id)
      .then(() => {
        this.getMatches();
      })
  }

  formatDate = (date) => {
    const newDate = new Date(date);
    return moment(newDate).format('MMMM Do YYYY');
  }

  render() {
    let matches = <Spinner />
    if (this.state.loaded) {
      if(this.state.matches.length === 0) {
        matches = <p>You don't have any matches at the moment. Check back soon!</p>
      } else {
        matches = this.state.matches.map(match => {
          let current_user_id = this.props.current_user.id
          let user1_id = match.user1.id
          let user2_id = match.user2.id
          if (!match.complete && (current_user_id === user1_id || current_user_id === user2_id)) {
            return <Match 
                      key={match.id}
                      id={match.id}
                      user1={match.user1}
                      user2={match.user2}
                      language={match.language.name}
                      startTime={this.formatDate(match.start_time)} 
                      complete={match.complete} 
                      completeMatch={this.completeMatch}/>
          }
        })
      } 
    }
    return(
      <Aux>
        <Button btnType="Neutral" clicked={this.createMatches}>Make Matches</Button>
        <h2>Matches:</h2>
        {matches}
      </Aux>
    )
  }
}

export default Matches;