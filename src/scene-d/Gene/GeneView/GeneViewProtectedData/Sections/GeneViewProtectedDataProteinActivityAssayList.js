import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { BlockUI } from "primereact/blockui";
import { Sidebar } from "primereact/sidebar";
import { observer } from "mobx-react-lite";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import GeneViewProtectedDataAddProteinActivityAssayForm from "./GeneViewProtectedDataAddProteinActivityAssayForm";

const GeneViewProtectedDataProteinActivityAssayList = ({
  data,
  edit,
  editing,
  add,
  adding,
}) => {
  const [tableData, setTableData] = useState([...data]);
  const [displayAddSideBar, setDisplayAddSideBar] = useState(false);

  /* Add functions */

  const tableHeader = (
    <div className="table-header">
      <div className="flex justify-content-end">
        <div className="flex">
          <Button
            type="button"
            icon="icon icon-common icon-plus-circle"
            label="Add"
            className="p-button-text p-button-sm"
            style={{ height: "30px", marginRight: "5px" }}
            onClick={() => setDisplayAddSideBar(true)}
          />
        </div>
      </div>
    </div>
  );

  /* ---- */

  /* Row edit functions */
  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  let saveEdits = (e) => {
    let { newData } = e;
    edit(newData);
  };
  /* ---*/

  return (
    <React.Fragment>
      <div className="card p-fluid">
        <BlockUI blocked={editing}>
          <DataTable
            value={tableData}
            header={tableHeader}
            responsiveLayout="scroll"
            editMode="row"
            dataKey="id"
            onRowEditComplete={saveEdits}
          >
            <Column
              field="activity"
              header="Activity"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="type"
              header="Type"
              editor={(options) => textEditor(options)}
            />
            <Column
              field="throughput"
              header="Throughput"
              editor={(options) => textEditor(options)}
            />
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </BlockUI>
      </div>
      <Sidebar
        visible={displayAddSideBar}
        onHide={() => setDisplayAddSideBar(false)}
        position="right"
        className="p-sidebar-sm"
      >
        <div className="flex flex-column gap-3 pl-3  w-full">
          <div className="flex">
            <h3>
              <i className="icon icon-common icon-plus-circle"></i>Add Protein
              Activity Assay List
            </h3>
          </div>
          <div className="flex w-full">
            <GeneViewProtectedDataAddProteinActivityAssayForm.js
              add={add}
              adding={adding}
              closeSidebar={() => setDisplayAddSideBar(false)}
            />
          </div>
        </div>
      </Sidebar>
    </React.Fragment>
  );
};

export default observer(GeneViewProtectedDataProteinActivityAssayList);
