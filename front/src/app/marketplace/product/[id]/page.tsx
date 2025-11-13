import { Box, Typography } from '@mui/material';

export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <Box component='div'>
      <Typography variant='h3'>produto, id: {id}</Typography>
    </Box>
  );
}
