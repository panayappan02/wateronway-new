import {request} from '../../utils';

const createCustomer = async (mobile, fcmToken) => {
  const res = await request(
    'https://0b4n57itb1.execute-api.us-east-1.amazonaws.com/dev/graphql',
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
    'https://0b4n57itb1.execute-api.us-east-1.amazonaws.com/dev/graphql',
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
    'https://0b4n57itb1.execute-api.us-east-1.amazonaws.com/dev/graphql',
    'post',
    {
      query: `
      mutation{
        CreateOrder(
          sellerId: ${Number(sellerId)},
          customerId: ${Number(customerId)},
          orderAmount: ${Number(customerId)},
         
        ){
          id
        }
      }
      `,
    },
  );

  return res;
};
const customerPayment = async (sellerId, customerId, orderAmount) => {
  const res = await request(
    'https://0b4n57itb1.execute-api.us-east-1.amazonaws.com/dev/graphql',
    'post',
    {
      query: `
      mutation{
        CustomerPayment(
          customerId: 10
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
const cancelOrder = async orderId => {
  const res = await request(
    'https://0b4n57itb1.execute-api.us-east-1.amazonaws.com/dev/graphql',
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

export {
  createCustomer,
  updateCustomer,
  createOrder,
  customerPayment,
  cancelOrder,
};
