import './CSS/DashBoard.css'
import Cash from './Cash';
import Balance from './Balance';
import PropTypes from 'prop-types';
import Gains from './Gains';

export default function Dashboard({render}) {

    return (
        <div id='dash'>
            <Cash render={render} />
            <Balance render={render} />
            <Gains render={render} />
        </div>
    
    )
}
Dashboard.propTypes ={
    render: PropTypes.bool
}

