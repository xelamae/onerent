import React from 'react'
import PropTypes from 'prop-types'
import { Item } from 'semantic-ui-react'

const Property = ({id, street, city, state, zip, rent, user, search}) => {
    var firstName = '';
    var lastName = '';
    if(user !== null){
        firstName = user.firstName !== undefined ? user.firstName : '';
        lastName = user.lastName !== undefined ? user.lastName : '';
    }

    return (
        <Item>
            <div className="content align-left">
                <div className="header">Property ID: {id}</div>
                <div className="description">
                    Street: {street}<br />
                    City: {city}<br />
                    State: {state}<br />
                    Zip: {zip}<br />
                    Rent: {rent}<br />
                </div>
                <div className="meta"> Owner: {firstName} {lastName}</div>
            </div>
        </Item>
    )
}

Property.propTypes = {
    id: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    rent: PropTypes.number,
}

export default Property