import { Button, H2, H3, H4, Paragraph, Table } from 'govuk-react';
import { useEffect, useState } from 'react';
import { AppointmentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppointment, fetchUserAppointments } from '../../redux/appointmentsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { APICallStatus } from '../../utils/constants';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function UserAppointments() {

  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModel] = useState<boolean>(false);
  const handleShow = () => setShowModel(true);
  const handleClose = () => setShowModel(false);

  const { entities: appointments, status: appointmentStatus, error } = useSelector((state: RootState) => state.appointments);

  const handleDelete = (id: number) => {
    dispatch(deleteAppointment(id));
  };

  useEffect(() => {
    if (appointmentStatus === APICallStatus.IDLE) {
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
              <a href='#' onClick={handleShow}>Edit</a>
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
        style={ { position: 'absolute'}}
       >
      <Modal.Header closeButton>
        <Modal.Title>Edit your appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button buttonColour='#b1b4b6' onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  ) : <Paragraph>No appointments available.</Paragraph>
}
