import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SIGN_OUT_ACTION } from '../../reduxStore/userState';
import { Box, Button, Card, TextField, Modal, Typography, Paper } from '@mui/material';
import AxiosBackend from '../../lib/axios/AxiosBackend';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../images/userBackground.jpg'

function UserPage() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ open, setOpen ] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [ userUpdateForm, setUserUpdateForm ] = useState({
    firstName: '',
    lastName: '',
    address: '',
  })

  async function handleUpdateUser(e) {

    e.preventDefault();

    try {

      let payload = await AxiosBackend.put(
        'edit-user/',
        {
          userUpdateForm: userUpdateForm
        },
      )
        .then(
          AxiosBackend.get('/sign-out').then(() => {
            dispatch({ type: SIGN_OUT_ACTION });
          }).catch(error => console.log('there was an error signing out')),

          navigate('/sign-in')
        )

    } catch (e) {

      console.log(e);

    }
  }

  const [ expanded, setExpanded ] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Layout>
      <Box>
          <Box sx={{
            mx: 'auto',
            maxWidth: 600,
            p: 10,
            m: 'auto',
            fontSize: '0.875rem',
            fontWeight: '700',
          }}>
      <Box>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
              id="panel1a-header"
                style={{ background: '#c2ddff' }}
          >
                <Typography sx={{ fontWeight: 'bold', mx: 1 }}>{user.firstName}'s Profile</Typography>
          </AccordionSummary>
            <AccordionDetails sx={{ mx: 1 }}>
              <br />
                <Typography><b>First Name: </b> {user.firstName}</Typography>
              <br />
                <Typography><b>Last Name: </b> {user.lastName}</Typography>
              <br />
                <Typography><b>Address:  </b>{user.address}</Typography>
              <br />
              <div>
                <Box>
                  <Button onClick={handleOpen}>Edit Profile</Button>
                </Box>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style.modal}>
                      <Box>
                        <h4>Update Profile</h4>
                      </Box>
                      <Box pb={3}>
                        <TextField
                          sx={{
                            width: "100%"
                          }}
                          id="filled-large"
                          label="First Name"
                          variant="filled"
                          size="large"
                          value={userUpdateForm.firstName}
                          onChange={(event) => {
                            setUserUpdateForm({ ...userUpdateForm, firstName: event.target.value });
                          }}
                        />
                        <TextField
                          sx={{
                            width: "100%"
                          }}
                          id="filled-large"
                          label="Last Name"
                          variant="filled"
                          size="large"
                          value={userUpdateForm.lastName}
                          onChange={(event) => {
                            setUserUpdateForm({ ...userUpdateForm, lastName: event.target.value });
                          }}
                        />
                        <TextField
                          sx={{
                            width: "100%"
                          }}
                          id="filled-large"
                          label="Address"
                          variant="filled"
                          size="large"
                          value={userUpdateForm.address}
                          onChange={(event) => {
                            setUserUpdateForm({ ...userUpdateForm, address: event.target.value });
                          }}
                        />
                      <Box mx={1}>
                        <Button variant="contained" onClick={handleUpdateUser}>Update Profile</Button>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </div>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
              <Typography sx={{ mx: 5 }}>Shoping History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        
        </Box>
      </Box>
      </Box>
    </Layout>
  )
}

export default UserPage

const style = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
}
