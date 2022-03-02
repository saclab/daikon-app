import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SmilesView from "../../../../../app/common/SmilesView/SmilesView";

const FHABaseHits = ({ project }) => {
  const dt = useRef(null);

  let tableData = [];

  if (project?.baseHits.length !== 0) {
    project.baseHits.forEach((baseHit) => {
      console.log(baseHit.baseHit);
      tableData.push({
        id: baseHit.baseHit.compound.id,
        molArea: baseHit.baseHit.compound.molArea,
        molWeight: baseHit.baseHit.compound.molWeight,
        externalCompoundIds: baseHit.baseHit.compound.externalCompoundIds,
        smile: baseHit.baseHit.compound.smile,
        iC50: baseHit.baseHit.iC50,
        mic: baseHit.baseHit.mic,
      });
    });
  }

  const StructureBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div style={{ minWidth: "350px", marginRight: "50px" }}>
          <SmilesView smiles={rowData?.smile} />
        </div>
      </React.Fragment>
    );
  };

  return (
    <div>
      <DataTable
        ref={dt}
        value={tableData}
        emptyMessage="No data."
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        dataKey="id"
      >
        <Column field="externalCompoundIds" header="Ids" />
        <Column field="mic" header="MIC" />
        <Column field="iC50" header="IC50" />
        <Column
          field="smile"
          header="Structure"
          body={StructureBodyTemplate}
          style={{ minWidth: "450px" }}
        />
      </DataTable>
    </div>
  );
};

export default FHABaseHits;
