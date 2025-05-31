import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import api from "../../config/axios";
import Chair from "./svg/char";
import "./Table.css"; 

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newTableSeats, setNewTableSeats] = useState(2);

  // Fetch tables from backend
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const res = await api.get("/api/table");
    setTables(res.data);
  };

  const handleAddTable = async () => {
    await api.post("/api/table", { numberOfSeats: newTableSeats });
    setShowDialog(false);
    setNewTableSeats(2);
    fetchTables();
  };

  const handleDeleteTable = async (id) => {
    await api.delete(`/api/table/${id}`);
    fetchTables();
  };

  // For dropdown seat options
  const seatOptions = Array.from({ length: 12 }, (_, i) => ({
    label: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`,
    value: i + 1,
  }));

  return (
    <div className="table-page-container">
      <h2 className="table-page-title">Tables</h2>
      <div className="table-grid">
        {tables.map((table, idx) => (
          <Card
            key={table._id}
            className="table-card"
          >
            <Button
              icon="pi pi-trash"
              className="p-button-text p-button-sm table-delete-btn"
              onClick={() => handleDeleteTable(table._id)}
              tooltip="Delete Table"
              tooltipOptions={{ position: "left" }}
            />
            <div className="table-card-header">
              <span className="table-card-label">Table</span>
              <span className="table-card-number">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
            </div>
            <div className="table-card-chair">
                <div className="table-chair-info">
                    <Chair></Chair>
                    {table.numberOfSeats}{" "}
                </div>
            </div>
          </Card>
        ))}
        {/* Add Table Card */}
        <Card
          className="table-add-card"
          onClick={() => setShowDialog(true)}
        >
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-text"
          />
        </Card>
      </div>
      {/* Add Table Dialog */}
      <Dialog
        header="Add Table"
        visible={showDialog}
        style={{ width: 320 }}
        onHide={() => setShowDialog(false)}
        footer={
          <Button
            label="Create"
            icon="pi pi-check"
            onClick={handleAddTable}
            disabled={!newTableSeats}
            style={{ width: "100%" }}
          />
        }
      >
        <div
          className="p-fluid table-dialog-content"
        >
          
          <label>Chair</label>
          <Dropdown
            value={newTableSeats}
            options={seatOptions}
            onChange={(e) => setNewTableSeats(e.value)}
            style={{ width: "100%" }}
            placeholder="Select chairs"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TablePage;
