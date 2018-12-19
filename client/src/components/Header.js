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
                    <li key="0"><a href="/api/current_user">User</a></li>,
                    <li key="1"><a href="/api/logout">Logout</a></li>
                ]
        }
    }

    render() {
        return (
          <nav>
              <div className="nav-wrapper">
                  <Link
                    to={this.props.auth ? '/dashboard' : '/'}
                    className="left brand-logo"
                    style={{ margin: '0 10px' }}>
                      My Dashboard</Link>
                  <ul className="right">
                      {this.renderContent()}
                  </ul>
              </div>
          </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header);