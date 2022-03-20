import { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../AuxFolder/AuxFile';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuth} userId={this.props.userId} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;