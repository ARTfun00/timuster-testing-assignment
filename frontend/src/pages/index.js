import { Box, Fab, Grid } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CustomizedPaperSection from '../components/CustomizedPaperSection';
import InboxMessageSimpleView from '../components/InboxMessageSimpleView';
import InboxSearchSection from '../components/InboxSearchSection';
import MessageContentSimpleView from '../components/MessageContentSimpleView';
import NoDataStub from '../components/NoDataStub';
import React from 'react';
import ScrollableContainer from '../components/ScrollableContainer';
import SendMessageSimpleForm from '../components/SendMessageSimpleForm';
import { useState } from 'react';

// TO DO: to move all styles outside of JSX
// then move them to the separate file
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16
};

// TO DO: move constants to the separate folder and file with constants
const token = "pochynok_ar@icloud.com"
const API_FULL_URL = `http://localhost:3001/emails/search`

export async function getServerSideProps(context) {
  const { search = "" } = context.query; // Extract the query parameter
  // Define the API endpoint based on the query parameter
  const apiUrl = `${API_FULL_URL}?text=${encodeURIComponent(search)}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  console.log(apiUrl)
  let data = null;
  let isLoading = true;
  let error = null;

  try {
    // Fetch data from our backend API
    const response = await fetch(apiUrl, requestOptions);
    data = await response.json();
  } catch (err) {
    error = err.message;
  } finally {
    isLoading = false;
  }

  return {
    props: {
      data: data?.data || null,
      isLoading,
      error: error || null
    },
  };
}

export default function Home({ data, isLoading, error }) {
  // TO DO: handle error with error component
  const [isAddMessageFormOpen, setIsAddMessageFormOpen] = useState(false)

  const handlePaperSectionStateChange = () => {
    setIsAddMessageFormOpen((prevState) => !prevState)
  }

  const [messageDataState, setMessageDataState] = React.useState(null)
  const handleInboxMessageContainerClick = (messageData) => {
    setMessageDataState(messageData)
  }

  const isDataExist = !isLoading && data?.length > 0

  return (
    <Box sx={{ height: '100vh', boxSizing: 'border-box' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={4} sx={{ height: '100%', borderRight: '1px solid grey' }}>
          <ScrollableContainer headerActionsSection={<InboxSearchSection />}>
            {isDataExist ? data.map((item) => (
              <InboxMessageSimpleView
                key={item?.id}
                messageData={item}
                handleClick={handleInboxMessageContainerClick}
                isActive={messageDataState?.id === item?.id}
              />
            )) : <NoDataStub text="No messages yet" />}
          </ScrollableContainer>
        </Grid>
        <Grid item xs={8} sx={{ height: '100%' }}>
          <ScrollableContainer>
            {!messageDataState ? <NoDataStub text="No message Selected" /> : <MessageContentSimpleView messageData={messageDataState} />}
          </ScrollableContainer>
        </Grid>
      </Grid>
      {isAddMessageFormOpen
        ? (
          <CustomizedPaperSection onCloseAction={handlePaperSectionStateChange}>
            <SendMessageSimpleForm onFinish={handlePaperSectionStateChange} />
          </CustomizedPaperSection>
        )
        : (
          <Fab
            sx={fabStyle}
            color="primary"
            aria-label="add"
            onClick={handlePaperSectionStateChange}>
            <AddIcon />
          </Fab>
        )}
    </Box>
  );
}
