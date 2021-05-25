import React from 'react';
import "./Table.css"

function Table({ prefectures }) {
    return (
        <div className="table">
            {prefectures.map(({prefecture, cases }) => (
                <tr>
                    <td>{prefecture}</td> {/* not fetching the data of prfectcutes due to the problem of APP.js */}
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
