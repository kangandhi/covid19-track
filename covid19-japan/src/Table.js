import React from 'react';
import "./Table.css"

//get me the prefectures that available. here in props (instead of props, write prefectures)
// go through all of prefectures & map through them with every single prefecture & return the following. 
function Table({ prefectures }) {
    return (
        <div className="table">
            {prefectures.map(prefecture => (
                <tr>
                    <td>{prefecture.name_en}</td> 
                    <td><strong>{prefecture.cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
