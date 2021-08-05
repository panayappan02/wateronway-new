import axios from 'axios';

const request = async (url, method, data) => {
  return await axios({
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      // any other headers you require go here
    },
    data,
  })
    .then(res => {
      return {
        status: 'success',
        response: res.data,
      };
    })
    .catch(err => {
      console.log(' OOPS! ', err);
      return {
        status: 'error',
        error: err,
      };
    });
};

export {request};
