const API_URL = 'http://localhost:3000/api';
let authToken = localStorage.getItem('token');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        showDashboard();
        loadServers();
    } else {
        showLogin();
    }

    // Event listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('server-form').addEventListener('submit', handleCreateServer);
});

// UI Functions
function showLogin() {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.add('hidden');
}

function showRegister() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('register-container').classList.remove('hidden');
    document.getElementById('dashboard-container').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
}

function toggleRegister() {
    if (document.getElementById('login-container').classList.contains('hidden')) {
        showLogin();
    } else {
        showRegister();
    }
}

function showCreateServerForm() {
    document.getElementById('create-server-form').classList.remove('hidden');
}

function hideCreateServerForm() {
    document.getElementById('create-server-form').classList.add('hidden');
    document.getElementById('server-form').reset();
}

// Auth Functions
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('token', authToken);
            showDashboard();
            loadServers();
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please login.');
            showLogin();
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('Registration failed');
    }
}

function logout() {
    authToken = null;
    localStorage.removeItem('token');
    showLogin();
}

// Server Functions
async function loadServers() {
    try {
        const response = await fetch(`${API_URL}/servers`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            const servers = await response.json();
            renderServers(servers);
        } else {
            console.error('Failed to load servers');
        }
    } catch (error) {
        console.error('Error loading servers:', error);
    }
}

function renderServers(servers) {
    const container = document.getElementById('servers-list');
    container.innerHTML = '';

    if (servers.length === 0) {
        container.innerHTML = '<p style="color: white; grid-column: 1/-1;">No servers yet. Create one to get started!</p>';
        return;
    }

    servers.forEach(server => {
        const card = document.createElement('div');
        card.className = 'server-card';
        card.innerHTML = `
            <h3>${server.name}</h3>
            <div class="server-info">
                <strong>Port:</strong> ${server.port}
            </div>
            <div class="server-info">
                <strong>RAM:</strong> ${server.ram}MB
            </div>
            <div class="server-info">
                <strong>MOTD:</strong> ${server.motd}
            </div>
            <span class="status ${server.status}">${server.status}</span>
            <div class="server-actions">
                <button class="start-btn" onclick="startServer(${server.id})">Start</button>
                <button class="stop-btn" onclick="stopServer(${server.id})">Stop</button>
                <button class="delete-btn" onclick="deleteServer(${server.id})">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

async function handleCreateServer(e) {
    e.preventDefault();
    const name = document.getElementById('server-name').value;
    const port = document.getElementById('server-port').value;
    const ram = document.getElementById('server-ram').value;
    const motd = document.getElementById('server-motd').value;

    try {
        const response = await fetch(`${API_URL}/servers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ name, port: parseInt(port), ram: parseInt(ram), motd })
        });

        if (response.ok) {
            hideCreateServerForm();
            loadServers();
        } else {
            const data = await response.json();
            alert(data.error || 'Failed to create server');
        }
    } catch (error) {
        console.error('Error creating server:', error);
        alert('Failed to create server');
    }
}

async function startServer(serverId) {
    updateServerStatus(serverId, 'running');
}

async function stopServer(serverId) {
    updateServerStatus(serverId, 'stopped');
}

async function updateServerStatus(serverId, status) {
    try {
        const response = await fetch(`${API_URL}/servers/${serverId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            loadServers();
        } else {
            alert('Failed to update server status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update server status');
    }
}

async function deleteServer(serverId) {
    if (!confirm('Are you sure you want to delete this server?')) return;

    try {
        const response = await fetch(`${API_URL}/servers/${serverId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            loadServers();
        } else {
            alert('Failed to delete server');
        }
    } catch (error) {
        console.error('Error deleting server:', error);
        alert('Failed to delete server');
    }
}