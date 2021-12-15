import React, { useEffect, useRef } from "react";
import SmilesDrawer from "smiles-drawer";
import { ContextMenu } from "primereact/contextmenu";
import { toast } from "react-toastify";

const SmilesView = ({ smiles, width = 200, height = 200 }) => {
  const cm = useRef(null);

  let canId = smiles + Date.now() + Math.floor(Math.random() * 100);

  useEffect(() => {
    let options = { width: width, height: height };

    // Initialize the drawer to draw to canvas
    let smilesDrawer = new SmilesDrawer.Drawer(options);
    SmilesDrawer.parse(
      smiles,
      function (tree) {
        smilesDrawer.draw(tree, canId, "light", false);
      },
      function (err) {
        console.log(err);
      }
    );
  }, [height, smiles, width]);

  const contextMenuItems = [
    {
      label: "Copy Smile String",
      icon: "icon icon-conceptual icon-structures",
      command: () => {
        navigator.clipboard.writeText(smiles);
        toast.success("Copied " + smiles + " to clipboard");
      },
    },
  ];

  return (
    <React.Fragment>
      <ContextMenu model={contextMenuItems} ref={cm} />
      <canvas id={canId} onContextMenu={(e) => cm.current.show(e)} />
    </React.Fragment>
  );
};

export default SmilesView;
