import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Helper function that displays login OR logout in header
class Header extends Component {

    componentDidMount() {

    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                  <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [

                    <li key="0">
                        <Link to={this.props.auth ? '/players' : '/'}>
                            LeaderBoard
                        </Link>
                    </li>,
                    <li key="1">
                        <Link to={this.props.auth ? '/userInfo' : '/'}>
                            User Details
                        </Link>
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ]
        }
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
                        to={this.props.auth ? '/players' : '/'}
                        className="left brand-logo"
                        style={{ margin: '0 10px' }}>
                          Leader Board</Link>
                      <ul className="right">
                          {this.renderContent()}
                      </ul>
                  </div>
              </nav>
              {this.props.auth && <div style={addPlayerRow}>
                  <Link
                      to={this.props.auth ? '/AddPlayer' : '/'}
                      className="waves-effect waves-light btn"
                      style={{ margin: '0 10px' }}>
                      Add Player</Link>
              </div>}
          </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header);