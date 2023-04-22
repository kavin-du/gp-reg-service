import { Radio } from 'govuk-react'
import { Role } from '../../utils/constants'

type RadiosProps = {
  role: Role;
  setRole: (_: Role) => void;
}

export default function Radios({ role, setRole}: RadiosProps) {
  return (
    <>
      <Radio inline name="userType" value={Role.PATIENT} checked={role === Role.PATIENT} onChange={() => setRole(Role.PATIENT)} >Patient</Radio>
      <Radio inline name="userType" value={Role.ADMIN} checked={role === Role.ADMIN} onChange={() => setRole(Role.ADMIN)}>Receptionist</Radio>
      <Radio inline name="userType" value={Role.DOCTOR} checked={role === Role.DOCTOR} onChange={() => setRole(Role.DOCTOR)}>Doctor</Radio>

    </>
  )
}
