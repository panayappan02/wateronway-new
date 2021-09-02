import {request} from '../../utils';

const api = 'https://prod.api.wateronway.in';

const createCustomer = async (mobile, fcmToken) => {
  const res = await request(
    api,
    'post',
    {
      query: `
          mutation{
            CreateCustomer(
              mobile: "${mobile}",
              fcmToken: "${fcmToken}"
            ){
              id,
              name,
              mobile,
              email
            }
          }
          `,
    },
  );

  return res;
};
const updateCustomer = async (id, name, email) => {
  console.log('USER ID ', id, 'NAME ', name, 'EMAIL ', email);

  const res = await request(
    api,
    'post',
    {
      query: `
      mutation{
        UpdateCustomer(
          id: ${id},
          name: "${name}",
          email:"${email}",
          
          
        ){
          id,
          name,
          email,
       
        }
      }
          `,
    },
  );

  return res;
};
const createOrder = async (sellerId, customerId, orderAmount) => {
  const res = await request(
    api,
    'post',
    {
      query: `
      mutation{
        CreateOrder(
          sellerId: ${Number(sellerId)},
          customerId: ${Number(customerId)},
          orderAmount: ${Number(orderAmount)},
         
        ){
          id
        }
      }
      `,
    },
  );

  return res;
};
const customerPayment = async (customerId) => {
  const res = await request(
    api,
    'post',
    {
      query: `
      mutation{
        CustomerPayment(
          customerId: ${customerId},
        ){
          totalPendingAmount,
          totalVendors,
          payments {
            
            pendingAmount,
            seller {
              name
            }
          }
        }
      }
      `,
    },
  );
  console.log(res);
  return res;
};
const cancelOrder = async (orderId) => {
  const res = await request(
    api,
    'post',
    {
      query: `
      mutation{
        CancelOrder(
          orderId: ${Number(orderId)},
          CancelType: "CancelledByCustomer"
        ){
          id, status
        }
      }
      `,
    },
  );
  console.log(res);
  return res;
};


const ratingReviewOrder = async (orderId,rating,review) => {
  console.log(orderId);
  console.log(rating);
  console.log(review);
  const res = await request(
    api,
    'post',
    {
      query: `
      mutation{
        RatingReview(
          orderId: ${Number(orderId)},
          rating: ${Number(rating)},
          review: ${review}
        ){
          id
        }
      }
      `,
    },
  );
  console.log(res);
  return res;
};


const updateCustomerFcmToken = async (id,fcmToken) => {
  const res = await request(
    api,
    'post',
    {
      query: `
      mutation{
        UpdateCustomerFCMToken(
          id: ${Number(id)},
          fcmToken: "${fcmToken}"
        ){
          id,
        }
      }
      `,
    },
  );
  console.log(res);
  return res;
};

export {
  createCustomer,
  updateCustomer,
  createOrder,
  customerPayment,
  cancelOrder,
  ratingReviewOrder,
  updateCustomerFcmToken
};
