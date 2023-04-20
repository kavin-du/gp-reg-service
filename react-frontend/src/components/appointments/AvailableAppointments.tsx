import { Paragraph, Table } from 'govuk-react';
import { useEffect } from 'react';
import { AppointmentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppointment, fetchAppointments } from '../../redux/appointmentsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { APICallStatus } from '../../utils/constants';

export default function AvailableAppointments() {
  
  const dispatch = useDispatch<AppDispatch>();

  const { entities: appointments, status: appointmentStatus, error } = useSelector((state: RootState) => state.appointments);

  const handleDelete = (id: number) => {
    dispatch(deleteAppointment(id));
  };

  useEffect(() => {
    if(appointmentStatus === APICallStatus.IDLE) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, appointmentStatus]);
  

  return appointments!.length > 0 ? (
    <Table
      caption="List of available appointments"
      head={<Table.Row><Table.Cell>ID</Table.Cell><Table.Cell>Reason</Table.Cell><Table.Cell>Date</Table.Cell></Table.Row>}
    >
      {appointments?.map((item: AppointmentType) =>
        <Table.Row key={item.id}>
          <Table.Cell numeric>
            {item.id}
          </Table.Cell>
          <Table.Cell>
            {item.reason}
          </Table.Cell>
          <Table.Cell>
            {new Date(item.createdAt).toDateString()}
          </Table.Cell>
          <Table.Cell>
            <a href='#' onClick={() => handleDelete(item.id)}>Cancel</a>
          </Table.Cell>
        </Table.Row>)}
    </Table>
  ) : <Paragraph>No appointments available.</Paragraph>
}
