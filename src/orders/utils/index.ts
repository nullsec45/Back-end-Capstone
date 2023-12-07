import { differenceInDays } from 'date-fns';

export const calculateOrderPriceDetails = (
  productsInRequest: ProductsInRequest[],
  productInfo: ProductsInfo[],
): OrderPriceDetails => {
  const orderPriceDetails: OrderPriceDetails = {
    products: [],
    totalAmount: 0,
  };

  productsInRequest.forEach((product) => {
    const productDetails = productInfo.find((info) => info.id === product.id);

    if (productDetails) {
      const rentFrom = new Date(product.rentFrom);
      const rentTo = new Date(product.rentTo);
      const INCLUDE_TODAY_SELECTED = 1;

      const rentalDurationInDay =
        Math.abs(differenceInDays(rentFrom, rentTo)) + INCLUDE_TODAY_SELECTED;

      const subTotal =
        // quantity * jangka sewa * harga barang
        product.quantity * rentalDurationInDay * productDetails.price;

      orderPriceDetails.products.push({
        id: product.id,
        quantity: product.quantity,
        rentFrom: product.rentFrom,
        rentTo: product.rentTo,
        price: productDetails.price,
        subTotal,
      });

      orderPriceDetails.totalAmount += subTotal;
    }
  });

  return orderPriceDetails;
};

export const checkStockAvailability = (
  productsInRequest: ProductsInRequest[],
  productInfo: ProductsInfo[],
) => {
  let isStockAvailable = true;

  productsInRequest.forEach((product) => {
    const productDetails = productInfo.find((info) => info.id === product.id);
    if (product.quantity > productDetails.availableStock)
      isStockAvailable = false;
  });

  return isStockAvailable;
};

export const mappingOrderPriceDetailProducts = (
  orderPriceDetails: OrderPriceDetails,
) => {
  const mappedOrderPriceDetailProducts = orderPriceDetails.products.map(
    (product) => ({
      quantity: product.quantity,
      rentFrom: product.rentFrom,
      rentTo: product.rentTo,
      price: product.price,
      subTotal: product.subTotal,
      product: {
        connect: {
          id: product.id,
        },
      },
    }),
  );

  return mappedOrderPriceDetailProducts;
};
