## API structure

### Server

- **Get a Server** - GET /server/sid
- **Create a Server** - POST /server
- **Edit a Server** - PUT /server/sid
- **Delete a Server** - DELETE /server/sid
- **Get Server Channels** - GET /servers/sid/channels

### Channels

- **Get a Channel ** - GET /channels/cid
- **Create a Channel** - POST /channels
- **Edit a Channel** - PUT /channels/cid
- **Delete a Channel** - DELETE /channels/cid
- **Get Channel Messages** - GET /channels/cid/messages

### Messages

- **Get a Message** - GET /messages/mid
- **Create a Message** - POST /messages
- **Edit a messages** - PUT /messages/mid
- **Delete a messages** - DELETE /messages/mid

### User

- Join a server - POST /user/server/sid
- Join a server - GET /user/server/
