import { Box, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const paperWrapperStyles = {
  position: 'fixed',
  bottom: '8px',
  right: '8px',
  width: '400px',
  minWidth: 300,
  height: '500px',
  p: 4,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '10px',
  boxShadow: (theme) => theme.shadows[5]
}
const iconStyles = {
  position: 'absolute',
  right: 4,
  top: 4,
  color: (theme) => theme.palette.grey[500],
}

export default function CustomizedPaperSection({ onCloseAction, children }) {
  return (
    <Box sx={paperWrapperStyles}>
      <Box sx={{ height: '100%', mt: 1 }}>
        <IconButton
          aria-label="close"
          onClick={onCloseAction}
          sx={iconStyles}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Box >
  );
}
