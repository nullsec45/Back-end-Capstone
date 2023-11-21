type ProductsInRequest = {
  id: string;
  quantity: number;
  rentPeriod: number;
};

type ProductsInfo = {
  id: string;
  price: number;
  stock: number;
  maximumRental: number;
};

const productsInRequest = [
  {
    id: '134046cc-cceb-4ec5-ae48-b14bec589e6c',
    quantity: 1,
    rentPeriod: 1,
  },
  {
    id: '35fb5cf9-0ee8-48c9-8e56-dc61d0073c73',
    quantity: 2,
    rentPeriod: 1,
  },
];

const productInfo = [
  {
    id: '134046cc-cceb-4ec5-ae48-b14bec589e6c',
    price: 250000,
    stock: 20,
    maximumRental: 10,
  },
  {
    id: '35fb5cf9-0ee8-48c9-8e56-dc61d0073c73',
    price: 150000,
    stock: 20,
  },
];

type productPriceDetails = ProductsInRequest & {
  price: number;
  subTotal: number;
};

type OrderPriceDetails = {
  products: productPriceDetails[];
  totalAmount: number;
};

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
