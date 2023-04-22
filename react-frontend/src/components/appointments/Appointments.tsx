import { GridCol, GridRow, LoadingBox } from "govuk-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { APICallStatus, Role } from "../../utils/constants";
import { getUser } from "../../utils/helpers";
import PageWrapper from "../PageWrapper";
import UserAppointments from "./UserAppointments";
import BookAppointment from "./BookAppointment";
import AllAppointments from "./AllAppointments";


export default function Appointments() {

  const appointmentsStatus = useSelector((state: RootState) => state.appointments.status);
  const { roles } = getUser();

  return (
    <PageWrapper>
      <LoadingBox loading={appointmentsStatus === APICallStatus.LOADING}>
        { roles.includes(Role.PATIENT) ? <GridRow>
          <GridCol setWidth={'two-third'}>
            <UserAppointments />
          </GridCol>
          <GridCol setWidth={'one-third'}>
            <BookAppointment />
          </GridCol>
        </GridRow> 
        : <AllAppointments />}
      </LoadingBox>
    </PageWrapper>
  )
}
