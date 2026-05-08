export const swaggerSpec = {
  openapi: '3.0.0',

  info: {
    title: 'Loan AI Backend',
    version: '1.0.0',
    description:
      'Loan approval backend using Ollama + Phi'
  },

  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],

  paths: {
    '/api/applications': {
      post: {
        summary:
          'Submit Loan Application',

        tags: ['Applications'],

        requestBody: {
          required: true,

          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',

                required: [
                  'ktp',
                  'npwp',
                  'skck'
                ],

                properties: {
                  ktp: {
                    type: 'string',

                    format: 'binary'
                  },

                  npwp: {
                    type: 'string',

                    format: 'binary'
                  },

                  skck: {
                    type: 'string',

                    format: 'binary'
                  }
                }
              }
            }
          }
        },

        responses: {
          '200': {
            description:
              'Loan Application Result'
          }
        }
      },

      get: {
        summary:
          'Get all applications',

        tags: ['Applications'],

        responses: {
          '200': {
            description:
              'Applications List'
          }
        }
      }
    }
  }
};