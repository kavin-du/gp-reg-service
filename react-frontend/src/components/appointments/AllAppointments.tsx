import { H3, Paragraph, Table } from 'govuk-react';
import { useEffect } from 'react';
import { AppointmentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppointment, fetchAllAppointments } from '../../redux/appointmentsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { APICallStatus, Role } from '../../utils/constants';
import { getUser } from '../../utils/helpers';

export default function AllAppointments() {

  const dispatch = useDispatch<AppDispatch>();

  const { entities: appointments, status: appointmentStatus, error } = useSelector((state: RootState) => state.appointments);
  const { roles } = getUser();

  const handleDelete = (id: number) => {
    dispatch(deleteAppointment(id));
  };

  useEffect(() => {
    if (appointmentStatus === APICallStatus.IDLE || appointmentStatus === APICallStatus.FORCE_REFETCH) {
      dispatch(fetchAllAppointments());
    }
  }, [dispatch, appointmentStatus]);


  return appointments!.length > 0 ? (
    <>
      <H3>All user appointments</H3>
      <Table
        head={<Table.Row>
          <Table.Cell>ID</Table.Cell>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>NHS number</Table.Cell>
          <Table.Cell>Reason</Table.Cell>
          <Table.Cell>Date</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>}
      >
        {appointments?.map((item: AppointmentType) =>
          <Table.Row key={item.id}>
            <Table.Cell>
              {item.id}
            </Table.Cell>
            <Table.Cell>
              {item.user?.firstname} {item.user?.surname}
            </Table.Cell>
            <Table.Cell>
              {item.user?.nhsNumber}
            </Table.Cell>
            <Table.Cell>
              {item.reason}
            </Table.Cell>
            <Table.Cell>
              {new Date(item.createdAt).toDateString()}
            </Table.Cell>
            {!roles.includes(Role.DOCTOR) && <Table.Cell>
              <a href='#' onClick={() => handleDelete(item.id)}>Cancel</a>
            </Table.Cell>}
          </Table.Row>)}
      </Table>
    </>
  ) : <Paragraph>No appointments available.</Paragraph>
}
