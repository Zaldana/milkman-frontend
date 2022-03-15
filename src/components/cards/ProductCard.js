import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { addToCartActionCreator } from '../../reduxStore/cartState';

export default function ProductCard(props) {

    const dispatch = useDispatch();

    const {
        product,
    } = props;

    //Image url
    const imgObj = product.images.find(el => el.perspective === "front");
    const imageSizeObj = imgObj.sizes.find(el => el.size === "large");
    const image = imageSizeObj.url

    //Item price
    const itemsObj = product.items.find(el => el.price);
    const priceObj = itemsObj.price;
    const price = priceObj.regular

    //Item Brand
    const brand = product.brand;

    //Item Id
    const productId = product.productId;

    //Item Description
    const description = product.description;

    //MongoDb Id
    const mongoId = product._id

    //Item size

    const handleAddToCart = () => {

        dispatch(addToCartActionCreator(
            mongoId,
            productId,
            brand,
            price,
            image,
            description
        ))

    }

    return (
        <Card sx={{ mx: 'auto', width: 300, height: 430 }} style={{ padding: '4px' }}>
            <CardMedia
                component="img"
                height="270"
                image={image}
                alt={description}
            />
            <CardContent>
                <Typography variant="h7">{brand}</Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="contained" onClick={handleAddToCart}>Add to cart</Button>
                <Typography variant="h5" sx={{ marginLeft: "auto", paddingRight: 2 }}>${price} </Typography>
            </CardActions>
        </Card>
    );
}
