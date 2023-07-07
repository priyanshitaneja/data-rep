import { useMemo, useState } from "react";
import data from "../../assets/data.js";
import Pagination from "../Pagination/index.js";

import { ReactComponent as Folder } from "../../assets/folder.svg";
import "./index.css";

let pageSize = 15;

const Representation = () => {
    const [selectedVan, setSelectedVan] = useState("");
    const [vanData, setVanData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return vanData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, vanData]);

    const handleDropdown = (e) => {
        if (e.target.value === "") {
            setSelectedVan("")
            setVanData([])
        }
        const val = +e.target.value;
        const selectedVanData = data.find(van => van.vehicleid === val);

        setSelectedVan(val);
        if (selectedVanData !== undefined && selectedVanData.visits !== undefined) {
            setVanData(selectedVanData.visits);
        }
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
                (currentTableData.length === 0) ?
                    <div className="data__empty">
                        <Folder />
                        No Data Found!
                        <br />
                        Please select a Van from the dropdown.
                    </div>
                    :
                    <div className="data__container">
                        <table className="data__table">
                            <tr className="data__table--header">
                                <th className="data__table--heading"></th>
                                <th className="data__table--heading">Shipment Label</th>
                                <th className="data__table--heading">Address</th>
                                <th className="data__table--heading">Visit Time</th>
                            </tr>
                            {
                                currentTableData.map((visit, index) => {
                                    return (
                                        <tr className="data__table--row">
                                            <td className="data__table--cell">{index + 1}</td>
                                            <td className="data__table--cell">{visit.shipmentLabel}</td>
                                            <td className="data__table--cell">{visit.address}</td>
                                            <td className="data__table--cell">{Date(visit.VisitTime)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                        <Pagination
                            className="pagination__bar"
                            currentPage={currentPage}
                            totalCount={vanData.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
            }
        </div>
    )
}

export default Representation;