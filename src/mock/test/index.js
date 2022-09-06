export default [
  {
    url: '/api/get',
    method: 'get',
    timeout: 500,
    response: ({ query }) => {
      // console.log('get:', query)
      return {
        code: 0,
        data: {
          name: 'get',
          time: +new Date()
        }
      };
    }
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 800,
    response: ({body}) => {
      // console.log('post:', body)
      return {
        code: 0,
        data: {
          name: 'post'
        }
      }
    }
  },
  {
    url: '/api/post/err',
    method: 'post',
    timeout: 800,
    statusCode: 500,
    response: ({body}) => {
      // console.log('post:', body)
      return {
        code: 9999,
        data: {
          name: 'err'
        },
        message: '请求发生未知错误'
      }
    }
  },
  // {
  //   url: '/api/text',
  //   method: 'post',
  //   rawResponse: async (req, res) => {
  //     let reqbody = '';
  //     await new Promise((resolve) => {
  //       req.on('data', (chunk) => {
  //         reqbody += chunk;
  //       });
  //       req.on('end', () => resolve(undefined));
  //     });
  //     res.setHeader('Content-Type', 'text/plain');
  //     res.statusCode = 200;
  //     res.end(`hello, ${reqbody}`);
  //   }
  // }
];
