import { useState } from "react";
import data from "../../assets/data.js";

import { ReactComponent as Folder } from "../../assets/folder.svg";

import "./index.css";

const Representation = () => {
    const [selectedVan, setSelectedVan] = useState("");
    const [vanData, setVanData] = useState([]);

    const handleDropdown = (e) => {
        if(e.target.value === "") {
            setSelectedVan("")
            setVanData([])
        }
        const val = +e.target.value;
        const selectedVanData = data.find(van => van.vehicleid === val);

        setSelectedVan(val);
        if (selectedVanData !== undefined && selectedVanData.visits !== undefined) {
            setVanData(selectedVanData.visits);
        }

        console.log("val", val, typeof val, e.target.value)
    }

    return (
        <div className="data">
            <select className="data__dropdown" onChange={handleDropdown}>
                <option value="">Select a vehicle</option>
                {
                    data.map((van) => {
                        return (
                            <option
                                key={van.vehicleid}
                                value={van.vehicleid}
                                selected={selectedVan === van.vehicleid}
                            >
                                {van.vehicleLabel}
                            </option>
                        )
                    })
                }
            </select>
            {
                (vanData.length === 0) ?
                    <div className="data__empty">
                        <Folder />
                        No Data Found!
                        <br />
                        <br />
                        Please select a Van from the dropdown.
                    </div>
                    :
                    <div className="data__container">
                        <table className="data__table">
                            <tr className="data__table--header">
                                <th className="data__table--heading">Shipment Label</th>
                                <th className="data__table--heading">Address</th>
                                <th className="data__table--heading">Visit Time</th>
                            </tr>
                            {
                                vanData.map((visit) => {
                                    return (
                                        <tr className="data__table--row">
                                            <td className="data__table--cell">{visit.shipmentLabel}</td>
                                            <td className="data__table--cell">{visit.address}</td>
                                            <td className="data__table--cell">{visit.VisitTime}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
            }
        </div>
    )
}

export default Representation;