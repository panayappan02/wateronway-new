import {request} from '../../utils';

const createCustomer = async (mobile, fcmToken) => {
  const res = await request(
    'https://fx16871b8b.execute-api.us-east-1.amazonaws.com/dev/graphql',
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
    'https://fx16871b8b.execute-api.us-east-1.amazonaws.com/dev/graphql',
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
  console.log(
    'SELLER ID ',
    sellerId,
    'CUSTOMER ID  ',
    customerId,
    'ORDER AMOUNT ',
    orderAmount,
  );

  const res = await request(
    'https://fx16871b8b.execute-api.us-east-1.amazonaws.com/dev/graphql',
    'post',
    {
      query: `
      mutation{
        CreateOrder(
          sellerId: ${sellerId},
          customerId: ${customerId},
          orderAmount: ${orderAmount},
         
        ){
          id
        }
      }
      `,
    },
  );

  return res;
};

export {createCustomer, updateCustomer, createOrder};
