import { GridRow, GridCol, H1, Paragraph, InputField, Button, Page } from 'govuk-react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Role } from '../../utils/constants';
import Radios from './Radios'

export default function Signup() {
  const [role, setRole] = useState<Role>(Role.PATIENT);

  return (
    <Page>
      <GridRow>
        <GridCol setWidth="one-half">
          <H1>Create an account</H1>
          <Paragraph>Please provide the following details.</Paragraph>
          <InputField
            input={{
              name: 'group1',
              mb: 4,
            }}
          >
            NHS Number
          </InputField>
          {role !== Role.PATIENT && <>
            <InputField
              input={{
                name: 'group1',
                mb: 4,
              }}
            >
              First Name
            </InputField>
            <InputField
              input={{
                name: 'group1',
                mb: 4,
              }}
            >
              Surname
            </InputField>
          </>}
          <InputField
            input={{
              name: 'group1',
              mb: 4,
              type: 'password'
            }}
          >
            Password
          </InputField>
          <InputField
            input={{
              name: 'group1',
              mb: 4,
              type: 'password'
            }}
          >
            Confirm password
          </InputField>
          <Radios role={role} setRole={setRole} />
          <Button>Sign up</Button>

          <Paragraph mb={1}>
            Already have an account?
          </Paragraph>
          <Link to={'/login'}>Login</Link>

        </GridCol>
      </GridRow>
    </Page>
  )
}
