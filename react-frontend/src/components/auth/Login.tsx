import axios from 'axios';
import { Button, ErrorText, GridCol, GridRow, H1, InputField, LoadingBox, Page, Paragraph, TopNav } from 'govuk-react'
import jwtDecode from 'jwt-decode';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { Role, ROUTES } from '../../utils/constants';
import Radios from './Radios';

export default function Login() {

  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(Role.PATIENT);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const { nhs, pwd } = document.forms[0];
    const nhsNumber = nhs.value;
    const password = pwd.value;
    
    if (!nhsNumber || !password) {
      setError('Login details cannot be empty!');
      return;
    }
    
    setIsLoading(true);
    authService.login(nhsNumber, password, role)
      .then(res => {
        const access_token = res.data.access_token;
        localStorage.setItem('access_token', access_token);
        const decodedToken = jwtDecode(access_token);
        localStorage.setItem('user', JSON.stringify(decodedToken));

        setError('');
        navigate(ROUTES.APPOINTMENTS);
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
          <GridCol setWidth="one-half">
            <H1>Login</H1>
            <Paragraph>Please login using your NHS details.</Paragraph>

            <form onSubmit={handleSubmit}>
              <InputField
                input={{
                  name: 'nhs',
                  mb: 4,
                }}
              >
                NHS Number
              </InputField>
              <InputField
                input={{
                  name: 'pwd',
                  mb: 4,
                  type: 'password'
                }}
              >
                Password
              </InputField>
              <Radios role={role} setRole={setRole} />
              <Button type='submit' >Login</Button>
            </form>

            {error && <ErrorText>{error}</ErrorText>}

            <Paragraph mb={1}>
              Don't have an account?
            </Paragraph>
            <Link to={'/signup'}>Sign up</Link>

          </GridCol>
        </GridRow>
      </LoadingBox>
    </Page>
  )
}
