# Minecraft Hosting Panel

A simple and elegant hosting panel for managing Minecraft servers built with Node.js and Express.

## Features

- 🔐 User authentication and registration
- 🎮 Create and manage multiple Minecraft servers
- 🚀 Start, stop, and restart servers
- 💾 Server configuration management (RAM, MOTD, Port)
- 📊 Console logs and monitoring
- 🎯 Clean and intuitive web dashboard

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sarupya50-eng/minecraft-hosting-panel.git
cd minecraft-hosting-panel
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
NODE_ENV=development
PORT=3000
DATABASE=minecraft_panel.db
JWT_SECRET=your_secure_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

6. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Servers
- `GET /api/servers` - Get all servers (requires auth)
- `POST /api/servers` - Create a new server (requires auth)
- `PUT /api/servers/:id/status` - Update server status (requires auth)
- `DELETE /api/servers/:id` - Delete a server (requires auth)

### Console
- `GET /api/console/:serverId` - Get console logs (requires auth)
- `POST /api/console/:serverId` - Add console message (requires auth)

## Project Structure

```
minecraft-hosting-panel/
├── index.js                 # Main server file
├── config.js               # Configuration file
├── db.js                   # Database initialization
├── package.json
├── .env.example
├── .gitignore
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── servers.js         # Server management routes
│   └── console.js         # Console logging routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
└── public/
    ├── index.html         # Frontend HTML
    ├── style.css          # Frontend styles
    └── app.js             # Frontend JavaScript
```

## Usage

### Creating an Account
1. Click "Register here" on the login page
2. Enter username, email, and password
3. Click Register
4. Login with your credentials

### Creating a Server
1. Login to your account
2. Click "+ Create Server"
3. Enter server details (name, port, RAM, MOTD)
4. Click Create

### Managing Servers
- **Start**: Click the Start button to launch a server
- **Stop**: Click the Stop button to shutdown a server
- **Delete**: Click Delete to remove a server permanently

## Future Enhancements

- [ ] Real server process management
- [ ] Player management and ban lists
- [ ] Server backups and restoration
- [ ] Mod support and plugin management
- [ ] Server statistics and performance monitoring
- [ ] Multi-user support with permissions
- [ ] Docker containerization
- [ ] WebSocket support for real-time updates

## Security Considerations

- Change the default admin credentials immediately
- Use a strong JWT_SECRET in production
- Implement HTTPS in production
- Add rate limiting to API endpoints
- Validate and sanitize all user inputs
- Use environment variables for sensitive data

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please create an issue on GitHub.

---

Made with ❤️ by sarupya50-eng