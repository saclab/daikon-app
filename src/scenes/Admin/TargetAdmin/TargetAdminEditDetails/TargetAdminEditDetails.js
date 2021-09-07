import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu } from "primereact/menu";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";
import SectionHeading from "../../../../app/common/SectionHeading/SectionHeading";
import NotFound from "../../../../app/layout/NotFound/NotFound";
import { observer } from "mobx-react-lite";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const TargetAdminEditDetails = ({ match, history }) => {
  const toast = useRef(null);
  const rootStore = useContext(RootStoreContext);
  const { fetchTargetAdmin, selectedTarget, displayLoading } =
    rootStore.targetStoreAdmin;

  useEffect(() => {
    console.log("EFFECT");
    console.log(match.params.id);

    if (selectedTarget === null) {
      fetchTargetAdmin(match.params.id);
    }
  }, [match.params.id, selectedTarget, fetchTargetAdmin]);

  const items = [
    {
      label: "Sections",
      items: [
        {
          label: "Edit Target Properties",
          icon: "ri-git-repository-private-fill",
        },
        {
          label: "",
          icon: "",
        },
      ],
    },
  ];

  if (displayLoading) {
    console.log("Loading.....");
    return <Loading />;
  }

  if (selectedTarget !== null) {
    console.log("Target ID");
    console.log(selectedTarget.id);
    console.log(selectedTarget);
    const breadCrumbItems = [
      {
        label: "Target",
        command: () => {
          history.push("/admin/selectedTarget/");
        },
      },
      { label: selectedTarget.accessionNumber },
    ];

    return (
      <React.Fragment>
        <Toast ref={toast} />
        <br />
        <div className="p-d-flex">
          <div className="p-mr-2">
            <Menu model={items} />
          </div>
          <div className="p-mr-2">
            <div className="p-d-flex p-flex-column">
              <div className="p-mb-2">
                <BreadCrumb model={breadCrumbItems} />
              </div>
              <div className="p-mb-2">
                <SectionHeading
                  icon="icon icon-common icon-selectedTarget"
                  heading={selectedTarget.accessionNumber}
                  link={"some data"}
                />
              </div>
              <div className="p-mb-2">
                <TabView>
                  <TabPanel style={{ width: "1200px" }}>
                    <div className="p-field p-grid">
                      <label
                        htmlFor="score"
                        className="p-col-fixed"
                        style={{ width: "200px" }}
                      >
                        Score
                      </label>
                      <div className="p-col">
                        <InputText
                          id="score"
                          type="text"
                          style={{ width: "100px" }}
                          value={selectedTarget.score}
                          onChange={(e) => (selectedTarget.score = e.target.value)}
                          
                        />
                      </div>
                    </div>

                    <div className="p-field p-grid">
                      <label
                        htmlFor="htsfeasibility"
                        className="p-col-fixed"
                        style={{ width: "200px" }}
                      >
                        HTS Feasibility
                      </label>
                      <div className="p-col">
                        <InputText
                          id="htsfeasibility"
                          type="text"
                          style={{ width: "100px" }}
                          value={selectedTarget.htsFeasibility}
                          onChange={(e) => (selectedTarget.htsFeasibility = e.target.value)}
                          
                        />
                      </div>
                    </div>

                    <div className="p-field p-grid">
                      <label
                        htmlFor="sbdfeasibility"
                        className="p-col-fixed"
                        style={{ width: "200px" }}
                      >
                        SBD Feasibility
                      </label>
                      <div className="p-col">
                        <InputText
                          id="sbdfeasibility"
                          type="text"
                          style={{ width: "100px" }}
                          value={selectedTarget.sbdFeasibility}
                          onChange={(e) => (selectedTarget.sbdFeasibility = e.target.value)}
                          
                        />
                      </div>
                    </div>

                    <div className="p-field p-grid">
                      <label
                        htmlFor="progressibility"
                        className="p-col-fixed"
                        style={{ width: "200px" }}
                      >
                        Progressibility
                      </label>
                      <div className="p-col">
                        <InputText
                          id="progressibility"
                          type="text"
                          style={{ width: "100px" }}
                          value={selectedTarget.progressibility}
                          onChange={(e) => (selectedTarget.progressibility = e.target.value)}
                          
                        />
                      </div>
                    </div>

                    <div className="p-field p-grid">
                      <label
                        htmlFor="safety"
                        className="p-col-fixed"
                        style={{ width: "200px" }}
                      >
                        Safety
                      </label>
                      <div className="p-col">
                        <InputText
                          id="safety"
                          type="text"
                          style={{ width: "100px" }}
                          value={selectedTarget.safety}
                          onChange={(e) => (selectedTarget.safety = e.target.value)}
                          
                        />
                      </div>
                    </div>
                  </TabPanel>
                </TabView>

                <div className="p-d-flex p-jc-end">
                  <Button
                    label="Submit"
                    className="p-button-primary"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return <NotFound />;
};

export default observer(TargetAdminEditDetails);
