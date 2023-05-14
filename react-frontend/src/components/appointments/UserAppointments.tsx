import { Button, H3, Paragraph, Table } from 'govuk-react';
import { useEffect, useState } from 'react';
import { AppointmentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppointment, fetchUserAppointments, updateAppointment } from '../../redux/appointmentsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { APICallStatus } from '../../utils/constants';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type NewReasonType = {
  id?: number;
  reason?: string;
}

export default function UserAppointments() {

  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModel] = useState<boolean>(false);
  const [newReason, setNewReason] = useState<NewReasonType>();
  const handleShow = (id: number) => {
    // to make sure accidential update, we omit reason here to set overwrite the prev reason
    // and set as undefined
    setNewReason({
      id
    });
    setShowModel(true)
  };
  const handleClose = () => setShowModel(false);
  const handleNewReasonChange = (e: any) => {
    setNewReason({
      ...newReason,
      reason: e.target.value
    });
  }

  const { entities: appointments, status: appointmentStatus, error } = useSelector((state: RootState) => state.appointments);

  const handleDelete = (id: number) => {
    dispatch(deleteAppointment(id));
  };

  const handleUpdate = () => {
    const id = newReason?.id as number;
    const reason = newReason?.reason as string;
    dispatch(updateAppointment({ id, reason }));
    handleClose();
  };

  useEffect(() => {
    if (appointmentStatus === APICallStatus.IDLE || appointmentStatus === APICallStatus.FORCE_REFETCH) {
      dispatch(fetchUserAppointments());
    }
  }, [dispatch, appointmentStatus]);


  return appointments!.length > 0 ? (
    <>
      <H3>List of available appointments</H3>
      <Table
        head={<Table.Row>
          <Table.Cell>ID</Table.Cell>
          <Table.Cell>Reason</Table.Cell>
          <Table.Cell>Date</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>}
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
              <a href='#' onClick={() => handleShow(item.id)}>Update</a>
            </Table.Cell>
            <Table.Cell>
              <a href='#' onClick={() => handleDelete(item.id)}>Cancel</a>
            </Table.Cell>
          </Table.Row>)}
      </Table>

      <Modal
        show={showModal}
        backdrop="static"
        onHide={handleClose}
        centered
       >
      <Modal.Header closeButton>
        <Modal.Title>Edit your appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>New Reason</Form.Label>
            <Form.Control
              placeholder="type here"
              autoFocus
              onChange={handleNewReasonChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button buttonColour='#b1b4b6' onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  ) : <Paragraph>No appointments available.</Paragraph>
}
