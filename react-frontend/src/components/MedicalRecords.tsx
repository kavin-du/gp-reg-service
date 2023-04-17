import { GridCol, GridRow, H1, Table } from "govuk-react";
import { AppointmentType, VaccinationRecordType } from "../utils/types";

const records: VaccinationRecordType[] = [
  {
    "DoseNo": 1,
    "NHSNumber": 94648146751,
    "VaccinationDate": "2001-02-20T00:00:00.000Z",
    "VaccineManufacturer": "(Novavax CZ a.s., ORG-100032020)",
    "DiseaseTargeted": "(COVID-19, 840539006)",
    "VaccineType": "(Novavax, 39473011000001103)",
    "Product": "(Nuvaxovid, EU/1/21/1618)",
    "VaccineBatchNumber": "4302MF031",
    "CountryOfVaccination": "UK",
    "Authority": "Hospital",
    "Site": "Left Arm",
    "TotalSeriesOfDoses": 2,
    "DisplayName": "COVID-19 Vaccine Novavax",
    "SnomedCode": 999001000000000000,
    "DateEntered": "2001-08-20T00:00:00.000Z",
    "ProcedureCode": 1324680000000000,
    "Booster": false
  },
  {
    "DoseNo": 2,
    "NHSNumber": 94648146751,
    "VaccinationDate": "2000-02-25T00:00:00.000Z",
    "VaccineManufacturer": "(Novavax CZ a.s., ORG-100032020)",
    "DiseaseTargeted": "(COVID-19, 840539006)",
    "VaccineType": "(Novavax, 39473011000001103)",
    "Product": "(Nuvaxovid, EU/1/21/1618)",
    "VaccineBatchNumber": "4302MF032",
    "CountryOfVaccination": "UK",
    "Authority": "Hospital",
    "Site": "Left Arm",
    "TotalSeriesOfDoses": 2,
    "DisplayName": "COVID-19 Vaccine Novavax",
    "SnomedCode": 999001000000000000,
    "DateEntered": "2000-04-30T00:00:00.000Z",
    "ProcedureCode": 1324690000000000,
    "Booster": false
  }
];

export default function MedicalRecords() {
  return (<>
    <H1>Your Health Records</H1>
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
  </>)
}
