module.exports = [
  {
    "openapi": "3.0.0",
    "servers": [
      {
        "url": "https://vast-peak-35513.herokuapp.com/"
      }
    ],
    "info": {
      "version": "1.0.0",
      "title": "Book Mock Service",
      "description": "Mock API for demo purposes"
    },
    "paths": {
      "/books": {
        "get": {
          "description": "retrieves all books",
          "responses": {
            "200": {
              "description": "successfully retrieves all books",
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
                        "author_id": {
                          "type": "number"
                        },
                        "name": {
                          "type": "string"
                        },
                        "yearPublished": {
                          "type": "number"
                        },
                        "genre": {
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
      },
      "/books/{id}": {
        "get": {
          "description": "retrieve individual Book",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieves single book",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "author_id": {
                        "type": "number"
                      },
                      "name": {
                        "type": "string"
                      },
                      "yearPublished": {
                        "type": "number"
                      },
                      "genre": {
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
]