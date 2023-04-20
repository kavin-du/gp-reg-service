import { GridCol, GridRow, LoadingBox } from "govuk-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { APICallStatus } from "../../utils/constants";
import PageWrapper from "../PageWrapper";
import AvailableAppointments from "./AvailableAppointments";
import BookAppointment from "./BookAppointment";

export default function Appointments() {

  const appointmentsStatus = useSelector((state: RootState) => state.appointments.status);

  return (
    <PageWrapper>
      <LoadingBox loading={appointmentsStatus === APICallStatus.LOADING}>
        <GridRow>
          <GridCol setWidth={'two-third'}>
            <AvailableAppointments />
          </GridCol>
          <GridCol setWidth={'one-third'}>
            <BookAppointment />
          </GridCol>
        </GridRow>
      </LoadingBox>
    </PageWrapper>
  )
}
