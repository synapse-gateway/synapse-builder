module.exports = [
  {
    "openapi": "3.0.0",
    "servers": [
      {
        "url": "https://dry-mountain-64968.herokuapp.com/api"
      }
    ],
    "info": {
      "version": "1.0.0",
      "title": "authors API",
      "description": "we don't know what we're doing"
    },
    "paths": {
      "/authors": {
        "get": {
          "description": "get all them authors",
          "responses": {
            "200": {
              "description": "Successfully returned list of all authors",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "author": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
]