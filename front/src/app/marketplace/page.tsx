import Carousel from '@/components/carousel';
import bannerData from '@/mockData/banner';
import categorieData from '@/mockData/categories';
import productsData from '@/mockData/products';
import { Search } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function MarketPlace() {
  return (
    <>
      <Carousel>
        {bannerData.map((banner, index) => (
          <Box
            key={index}
            component='img'
            src={banner}
            alt='Banner'
            sx={{
              backgroundColor: '#D9D9D9',
              width: '100%',
              height: '15em',
              objectFit: 'cover',
            }}
          />
        ))}
      </Carousel>
      <Box
        sx={{
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <TextField
          id='marketSearch'
          variant='filled'
          size='small'
          hiddenLabel
          placeholder='Procurar por um item...'
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {categorieData.map((categorie, index) => (
            <Button
              key={index}
              sx={{ display: 'flex', flexDirection: 'column', gap: '0.25em' }}
            >
              <Box
                component='img'
                src={categorie.img}
                alt='Icone da Categoria'
                sx={{
                  width: '2em',
                  height: '2em',
                  borderRadius: '0.5em',
                  boxShadow: '1px 1px 2px',
                }}
              />
              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ fontSize: 12 }}
              >
                {categorie.name}
              </Typography>
            </Button>
          ))}
        </Box>
        <Grid
          container
          spacing={1.5}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 7 }}
        >
          {productsData.map((product, index) => (
            <Grid key={index} size={1}>
              <Link
                href={`/marketplace/product/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card
                  variant='outlined'
                  sx={{ borderRadius: '0.5em', height: '100%' }}
                >
                  <CardMedia
                    component='img'
                    height={160}
                    image={product.image}
                  />
                  <CardContent sx={{ padding: 1 }}>
                    <Typography variant='body2' color='textSecondary'>
                      {product.name}
                    </Typography>
                    <Typography variant='body1' color='primary'>
                      R$ {product.price}
                    </Typography>
                  </CardContent>
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      padding: 0,
                      paddingTop: 1,
                      margin: 1,
                      marginTop: 0,
                      borderTop: '1px solid #7C7F85',
                    }}
                  >
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={product.seller.Avatar}
                        alt={`${product.seller.name} avatar`}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant='body2' sx={{ fontSize: 12 }}>
                        {product.seller.name}
                      </Typography>
                    </Box>
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant='body2' sx={{ fontSize: 12 }}>
                        {(() => {
                          const now = new Date();
                          const date = new Date(product.dateTime);
                          const diffMs = now.getTime() - date.getTime();
                          const diffHours = Math.floor(
                            diffMs / (1000 * 60 * 60)
                          );
                          const diffDays = Math.floor(
                            diffMs / (1000 * 60 * 60 * 24)
                          );

                          if (diffHours < 24) {
                            return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
                          } else if (diffDays === 1) {
                            return 'ontem';
                          } else {
                            return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
                          }
                        })()}
                      </Typography>
                      <Typography variant='body2' sx={{ fontSize: 12 }}>
                        {product.location.city} - {product.location.state}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
