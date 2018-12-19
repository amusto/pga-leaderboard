import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // return (
    //     <div style={{ textAlign: 'center' }}>
    //         <h1>
    //             Dashboard
    //         </h1>
    //         Dashboard Control for your apps
    //     </div>
    // );
    return (
      <div>
          <div className="fixed-action-btn">
              <Link to="/surveys/new" className="btn-floating btn-large red">
                  <i className="material-icons">add</i>
              </Link>
          </div>

      </div>
    )
};

export default Dashboard;