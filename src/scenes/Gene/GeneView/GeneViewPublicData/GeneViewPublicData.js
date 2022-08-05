import { Fieldset } from "primereact/fieldset";
import KeyValList from "../../../../app/common/KeyValList/KeyValList";
import GeneViewPublicDataProteindataBank from "./GeneViewPublicDataProteinDataBank/GeneViewPublicDataProteindataBank";

const GeneViewPublicData = ({
  gene,
  edit,
  cancelEdit,
  fetchGeneHistory,
  historyDisplayLoading,
  geneHistory,
}) => {
  console.log("From Gene View");

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex flex-column gap-2">
          <div className="flex">
            <Fieldset legend="General annotation">
              <KeyValList
                data={gene}
                filter={[
                  "geneName",
                  "function",
                  "product",
                  "functionalCategory",
                  "type",
                ]}
                fetchHistory={() => fetchGeneHistory()}
                historyDisplayLoading={historyDisplayLoading}
                history={geneHistory}
              />
              <hr style={{ borderTop: "1px solid #CCCCCC" }} />
              <KeyValList
                data={gene.genePublicData}
                filter={["comments"]}
                editFunc={() => edit()}
                cancelEdit={() => cancelEdit()}
                fetchHistory={() => fetchGeneHistory()}
                historyDisplayLoading={historyDisplayLoading}
                history={geneHistory}
              />
            </Fieldset>
          </div>
          <div className="flex gap-2">
            <div className="flex">
              <Fieldset legend="Protein summary">
                <KeyValList
                  data={gene.genePublicData}
                  filter={[
                    "molecularMass",
                    "isoelectricPoint",
                    "proteinLength",
                  ]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                  fetchHistory={() => fetchGeneHistory()}
                  historyDisplayLoading={historyDisplayLoading}
                  history={geneHistory}
                />
              </Fieldset>
            </div>

            <div className="flex">
              <Fieldset legend="Gene summary">
                <KeyValList
                  data={gene.genePublicData}
                  filter={["geneLength", "location"]}
                  editFunc={() => edit()}
                  cancelEdit={() => cancelEdit()}
                />
              </Fieldset>
            </div>

          </div>

          <div className="flex flex-grow-1">
            <Fieldset legend="Protein databank">
              <GeneViewPublicDataProteindataBank
                accessionNumber={gene.accessionNumber}
              />
            </Fieldset>
          </div>
          <div className="flex">
            <Fieldset legend="Genomic sequence" toggleable collapsed={true}>
              <div
                className="p-text-lowercase"
                style={{
                  maxWidth: "50vw",
                  wordWrap: "break-word",
                  fontFamily: "monospace",
                }}
              >
                {gene.genePublicData?.geneSequence}
              </div>
            </Fieldset>
          </div>
          <div className="flex">
            <Fieldset legend="Protein sequence" toggleable collapsed={true}>
              <div
                style={{
                  maxWidth: "50vw",
                  wordWrap: "break-word",
                  fontFamily: "monospace",
                }}
              >
                {gene.genePublicData?.proteinSequence}
              </div>
            </Fieldset>
          </div>
        </div>


        <div className="flex flex-column gap-2">
          <div className="flex">
            <Fieldset legend="Coordinates">
              <KeyValList
                data={gene.genePublicData}
                filter={["start", "end", "orientation"]}
                editFunc={() => edit()}
                cancelEdit={() => cancelEdit()}
              />
            </Fieldset>
          </div>

          <div className="flex">
            <Fieldset legend="Orthologs">
              <KeyValList
                data={gene.genePublicData}
                filter={["m_Leprae", "m_Marinum", "m_Smegmatis"]}
                labels={{ m_Leprae: "M. leprae", m_Marinum: "M. marinum", m_Smegmatis: "M. smegmatis" }}

                // link={{ m_Leprae: "https://mycobrowser.epfl.ch/genes/" }}
                editFunc={() => edit()}
                cancelEdit={() => cancelEdit()}
                fetchHistory={() => fetchGeneHistory()}
                historyDisplayLoading={historyDisplayLoading}
                history={geneHistory}
              />
            </Fieldset>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeneViewPublicData;
