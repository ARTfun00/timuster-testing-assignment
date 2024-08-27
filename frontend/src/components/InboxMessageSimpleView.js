import {
  Divider,
  Grid,
  Typography
} from '@mui/material';

export default function InboxMessageSimpleView({ messageData = {}, isActive = false, handleClick }) {
  const { email_from, subject, body } = messageData;

  // Probably, setting parameter to the url to filter
  // necessary data on the parent level component
  // would be better here...
  // router.push({
  //   pathname: router.pathname,
  //   query: { ...router.query, selected: id },
  // });
  const handleOnGridContainerClick = () => {
    handleClick(messageData)
  }

  return (
    <Grid
      container
      sx={{
        p: 2,
        pb: 0,
        backgroundColor: isActive ? '#d3e3fd' : 'none'
      }}
      onClick={handleOnGridContainerClick}>
      <Grid item xs={12}>
        <Typography variant="h6" component="div">
          {email_from}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          {subject}
        </Typography>

      </Grid>
      <Grid item xs={12}>
        <Typography color="text.secondary">
          {body.slice(0, 50)}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Divider />
      </Grid>
    </Grid>
  );
}