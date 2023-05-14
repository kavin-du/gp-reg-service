import { Caption, GridCol, GridRow, H3, LoadingBox, Paragraph, Table } from "govuk-react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMedicalRecords } from "../../redux/medicalRecordsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { APICallStatus } from "../../utils/constants";
import { VaccinationRecordType } from "../../utils/types";
import PageWrapper from "../PageWrapper";

export default function UserMedicalRecords() {
  const dispatch = useDispatch<AppDispatch>();

  const { entities: records, status } = useSelector((state: RootState) => state.medicalRecords);

  useEffect(() => {
    if (status === APICallStatus.IDLE || status === APICallStatus.FORCE_REFETCH) {
      dispatch(fetchUserMedicalRecords());
    }
  }, [dispatch, status]);

  return (
    <PageWrapper>
      {records.length > 0 ? (
        <LoadingBox loading={status === APICallStatus.LOADING}>
          <H3>Your Health Records</H3>
          <GridRow>
            <GridCol setWidth={'two-third'}>
              {records.map((item: VaccinationRecordType, itemNo: number) =>
                <Fragment key={itemNo}>
                  <Caption size="M">{`Record No: ${itemNo + 1}`}</Caption>
                  <Table>
                    {Object.entries(item).map(([key, value], i) =>
                      <Table.Row key={i}>
                        <Table.Cell>{key}</Table.Cell>
                        <Table.Cell>{typeof value === 'boolean' ? value.toString() : value}</Table.Cell>
                      </Table.Row>
                    )}
                  </Table>
                </Fragment>
              )}
            </GridCol>
          </GridRow>
        </LoadingBox>
      ) : <Paragraph>No medical records available.</Paragraph>}
    </PageWrapper>)
}
