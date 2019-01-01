import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Helper function that displays login OR logout in header
class Header extends Component {

    componentDidMount() {

    }

    renderContent() {
        return [
            <li key="0">
                <Link to={'/'}>
                    Home
                </Link>
            </li>,
            <li key="1">
                <Link to={'/players'}>
                    LeaderBoard
                </Link>
            </li>
        ]
    }

    render() {
        let addPlayerRow = {
            width: '100%',
            margin: '5px',
            textAlign: 'right'
        }
        return (
          <div>
              <nav>
                  <div className="nav-wrapper">
                      <Link
                        to={'/players'}
                        className="left brand-logo"
                        style={{ margin: '0 10px' }}>
                          Leader Board</Link>
                      <ul className="right">
                          {this.renderContent()}
                      </ul>
                  </div>
              </nav>
              <div style={addPlayerRow}>
                  <Link
                      to={'/AddPlayer'}
                      className="waves-effect waves-light btn"
                      style={{ margin: '0 10px' }}>
                      Add Player</Link>
              </div>
          </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header);