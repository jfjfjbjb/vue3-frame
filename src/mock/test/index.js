export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      // console.log('get: query', query)
      return {
        code: 0,
        data: {
          name: 'get'
        }
      };
    }
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: ({body}) => {
      // console.log('post: ', body)
      return {
        code: 0,
        data: {
          name: 'post'
        }
      }
    }
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    }
  }
];
