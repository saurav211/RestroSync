import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import api from "../../config/axios";
import "./Table.css"; 

const TableDashboard = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const res = await api.get("/api/table");
    setTables(res.data);
  };
  
  return (
    <div className="table-dashboard-container">
      <div className="table-grid">
        {tables.map((table, idx) => (
          <Card
            key={table._id}
            className={"table-card-dashboard" + (table.booked ? "booked" : "")}
          >
            <div className="table-card-header">
              <span className="table-card-label">{table.name ? table.name : "Table"}</span>
              <span className="table-card-number">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TableDashboard;
