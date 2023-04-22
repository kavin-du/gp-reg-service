import { LoadingBox, GridRow, GridCol } from "govuk-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { APICallStatus, Role } from "../../utils/constants";
import { getUser } from "../../utils/helpers";
import PageWrapper from "../PageWrapper";
import AllMedicalRecords from "./AllMedicalRecords";
import UserMedicalRecords from "./UserMedicalRecords";

export default function MedicalRecords() {
  const recordsStatus = useSelector((state: RootState) => state.medicalRecords.status);
  const { roles } = getUser();

  return (
    <LoadingBox loading={recordsStatus === APICallStatus.LOADING}>
      {roles.includes(Role.PATIENT)
        ? <UserMedicalRecords />
        : <AllMedicalRecords />}
    </LoadingBox>
  )
}
