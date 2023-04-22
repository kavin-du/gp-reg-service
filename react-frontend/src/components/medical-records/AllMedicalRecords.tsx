import { GridCol, GridRow, H1, LoadingBox, Paragraph, Table } from "govuk-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMedicalRecords } from "../../redux/medicalRecordsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { APICallStatus } from "../../utils/constants";
import { VaccinationRecordType } from "../../utils/types";
import PageWrapper from "../PageWrapper";

export default function AllMedicalRecords() {
  const dispatch = useDispatch<AppDispatch>();

  const { entities: records, status } = useSelector((state: RootState) => state.medicalRecords);

  useEffect(() => {
    if (status === APICallStatus.IDLE) {
      dispatch(fetchAllMedicalRecords());
    } 
  }, [dispatch, status]);

  return (
    <PageWrapper>
      {records.length > 0 ? (
        <LoadingBox loading={status === APICallStatus.LOADING}>
          <H1>All Health Records</H1>
          <GridRow>
            <GridCol setWidth={'two-third'}>
              {records.map((item: VaccinationRecordType, itemNo: number) =>
                <Table key={itemNo}
                  caption={`Record No: ${itemNo + 1}`}
                >
                  {Object.entries(item).map(([key, value], i) =>
                    <Table.Row key={i}>
                      <Table.Cell>{key}</Table.Cell>
                      <Table.Cell>{typeof value === 'boolean' ? value.toString() : value}</Table.Cell>
                    </Table.Row>
                  )}
                </Table>
              )}
            </GridCol>
          </GridRow>
        </LoadingBox>
      ) : <Paragraph>No medical records available.</Paragraph>}
    </PageWrapper>)
}
