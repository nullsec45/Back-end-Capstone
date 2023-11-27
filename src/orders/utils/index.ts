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
      const subTotal =
        // quantity * jangka sewa * harga barang
        product.quantity * product.rentPeriod * productDetails.price;

      orderPriceDetails.products.push({
        id: product.id,
        quantity: product.quantity,
        rentPeriod: product.rentPeriod,
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
      rentPeriod: product.rentPeriod,
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
