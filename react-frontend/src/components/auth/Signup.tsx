import { GridRow, GridCol, H1, Paragraph, InputField, Button, Page, TopNav, LoadingBox, ErrorText } from 'govuk-react'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import authService from '../../services/auth.service';
import { Role } from '../../utils/constants';
import Radios from './Radios'

export default function Signup() {
  const [role, setRole] = useState<Role>(Role.PATIENT);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { nhs, fname, sname,  pwd1, pwd2 } = document.forms[0];
    const nhsNumber = nhs.value;
    const firstname = fname?.value;
    const surname = sname?.value; 
    const password1 = pwd1.value;
    const password2 = pwd2.value;

    if (!nhsNumber || !password1 || !password2) {
      setError('Details cannot be empty!');
      return;
    }
    if (role !== Role.PATIENT && (!firstname || !surname)) {
      setError('Details cannot be empty!');
      return;
    }
    if (password1 !== password2) {
      setError('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    
    authService.register(nhsNumber, firstname, surname, password1, role)
    .then(_ => {
        document.forms[0].reset();
        setError('Successfully created the user. Please Login.');
      })
      .catch(e => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Page header={<TopNav serviceTitle={<TopNav.NavLink>GP Registration Service</TopNav.NavLink>}></TopNav>}>
      <LoadingBox loading={isLoading}>
        <GridRow>
          <GridCol setWidth="two-third">
            <H1>Create an account</H1>
            <Paragraph>Please provide the following details.</Paragraph>
            <form onSubmit={handleSubmit} >
              <InputField
                input={{
                  name: 'nhs',
                  mb: 4,
                }}
              >
                NHS Number
              </InputField>
              {role !== Role.PATIENT && <>
                <InputField
                  input={{
                    name: 'fname',
                    mb: 4,
                  }}
                >
                  First Name
                </InputField>
                <InputField
                  input={{
                    name: 'sname',
                    mb: 4,
                  }}
                >
                  Surname
                </InputField>
              </>}
              <InputField
                input={{
                  name: 'pwd1',
                  mb: 4,
                  type: 'password'
                }}
              >
                Password
              </InputField>
              <InputField
                input={{
                  name: 'pwd2',
                  mb: 4,
                  type: 'password'
                }}
              >
                Confirm password
              </InputField>
              <Radios role={role} setRole={setRole} />
              <Button type='submit'>Sign up</Button>
            </form>

            {error && <ErrorText>{error}</ErrorText>}

            <Paragraph mb={1}>
              Already have an account?
            </Paragraph>
            <Link to={'/login'}>Login</Link>

          </GridCol>
        </GridRow>
      </LoadingBox>
    </Page>
  )
}
