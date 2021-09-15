import React, { useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./ScreenDashDataTable.css";
import Loading from "../../../app/layout/Loading/Loading";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import SectionHeading from "../../../app/common/SectionHeading/SectionHeading";

const ScreenDash = () => {
  const rootStore = useContext(RootStoreContext);
  const { displayLoading, screenRegistry, fetchScreens, uniqueScreens } =
    rootStore.screenStore;

  /* Local State Management */

  useEffect(() => {
    if (screenRegistry.size === 0) {
      fetchScreens();
    }
  }, [screenRegistry, fetchScreens]); // eslint-disable-line react-hooks/exhaustive-deps

  /* local variables */

  const dt = useRef(null);

  if (!displayLoading) {
    /* Table Body Templates */

    const AccessionNumberBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Accession Number</span>
          <NavLink to={"/screen/" + rowData.id}>
            {rowData.accessionNumber}
          </NavLink>
        </React.Fragment>
      );
    };

    const GeneNameBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Gene Name</span>
          {rowData.geneName}
        </React.Fragment>
      );
    };

    const StatusBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Status</span>
          {rowData.status}
        </React.Fragment>
      );
    };

    const NotesBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <span className="p-column-title">Notes</span>
          {rowData.notes}
        </React.Fragment>
      );
    };

    /* Table Header  */
    // const header = (
    //   <div className="table-header">
    //     <span className="heading">List of Targets being Screened</span>
    //     {/* <span className="p-input-icon-left">
    //       <i className="pi pi-search" />
    //       <InputText
    //         type="search"
    //         onInput={(e) => setGlobalFilter(e.target.value)}
    //         placeholder="Search"
    //       />
    //     </span> */}
    //   </div>
    // );
    return (
      <div className="datatable-screens">
        <SectionHeading
          icon="icon icon-conceptual icon-chemical"
          heading="Screened Targets"
        />

        <div className="card">
          <DataTable
            ref={dt}
            value={uniqueScreens}
            paginator
            rows={10}
            className="p-datatable-screens"
            //globalFilter={globalFilter}
            emptyMessage="No Screens found."
          >
            <Column
              field="accessionNumber"
              header="Accession Number"
              body={AccessionNumberBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search by A.Number"
              className="narrow-column"
            />

            <Column
              field="geneName"
              header="Protein Name"
              body={GeneNameBodyTemplate}
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search by Protein Name"
              className="narrow-column"
            />

            <Column field="status" header="Status" body={StatusBodyTemplate} />

            <Column field="notes" header="Notes" body={NotesBodyTemplate} />
          </DataTable>
        </div>
      </div>
    );
  }

  /** Loading Overlay */

  return <Loading />;
};

export default observer(ScreenDash);
