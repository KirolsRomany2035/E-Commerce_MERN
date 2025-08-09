import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  _id: string;
  title: string;
  image: string;
  price:string;
}
export default function ProductCart({  title, image, price, }: Props) {
  return (
    <Card sx={{  margin: 'auto', mt:2, mb: 4, width:264
, boxShadow:2, borderRadius: 2, backgroundColor: '#f5f5f5', transition: 'transform 0.2s', '&:hover': { transform:
  'scale(1.05)' } }}>
      <CardMedia
        sx={{ height:255, borderRadius: 2, }}
        component ="img"
        src={image}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Price: {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">
          Add to Cart
          </Button>
       
      </CardActions>
    </Card>
  );
}
