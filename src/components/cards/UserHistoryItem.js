// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import AxiosBackend from '../../lib/axios/AxiosBackend';


// const CartItem = (props) => {

//     const {
//            productId
//         } = props;
    
   
//     //Image url
//     const imgObj = product.images.find(el => el.perspective === "front");
//     const imageSizeObj = imgObj.sizes.find(el => el.size === "large");
//     const image = imageSizeObj.url
//     //Item price
//     const itemsObj = product.items.find(el => el.price);
//     const priceObj = itemsObj.price;
//     const price = priceObj.regular
//     //Item Brand
//     const brand = product.brand;

//     return (
//         <Card sx={{ display: 'flex', maxWidth: 800, flexGrow: 1 }}>
//             <Box display="flex" flexDirection="column" justifyContent="center">
//                 <CardMedia
//                     component="img"
//                     sx={{ height: 80, maxWidth: 50, p: 1, mr: 6}}
//                     image={image}
//                     alt="Live from space album cover"
//                 />
//             </Box>
//             <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}  >
//                 <Box mb={1}>
//                     <Typography fontWeight="bold">{brand} </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}  >
//                     <Box mb={1}>
//                         <Typography fontWeight="bold">${price}</Typography>
//                     </Box>
//                 </Box>
//             </Box>
//         </Card>
//     );
// };

// export default CartItem;