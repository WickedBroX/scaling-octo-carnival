# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

# Production Deployment Guide (Ubuntu 24.04 LTS)

This guide provides step-by-step instructions to deploy the QuoteFlow application (React Frontend + Node.js Backend + PostgreSQL) on a blank Ubuntu 24.04 VPS.

## 1. Initial Server Setup

Login to your server via SSH:
```bash
ssh root@your_server_ip
```

Update system packages:
```bash
apt update && apt upgrade -y
```

Install essential tools:
```bash
apt install -y curl git unzip ufw fail2ban
```

## 2. Install Dependencies

### Node.js (via NodeSource)
We will use Node.js v20 LTS.
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```
Verify installation:
```bash
node -v
npm -v
```

### PostgreSQL
Install PostgreSQL and contrib package:
```bash
apt install -y postgresql postgresql-contrib
```
Start and enable PostgreSQL:
```bash
systemctl start postgresql
systemctl enable postgresql
```

### Nginx
Install Nginx web server:
```bash
apt install -y nginx
```

## 3. Database Configuration

Switch to the postgres user:
```bash
sudo -u postgres psql
```

Run the following SQL commands to create the database and user (replace `secure_password` with a strong password):
```sql
CREATE DATABASE quoteflow;
CREATE USER quoteflow_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE quoteflow TO quoteflow_user;
-- Grant schema usage to user
GRANT ALL ON SCHEMA public TO quoteflow_user;
\q
```

## 4. Application Setup

### Clone Repository
Navigate to `/var/www` and clone the repo:
```bash
mkdir -p /var/www
cd /var/www
git clone <YOUR_REPO_URL> quoteflow
cd quoteflow
```
*(Replace `<YOUR_REPO_URL>` with the actual git repository URL)*

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd /var/www/quoteflow/server
   ```
2. Install dependencies:
   ```bash
   npm install --production
   ```
3. Initialize the Database:
   Create a temporary `.env` file to run the schema/seed scripts manually or rely on the application to do it if configured. However, since `setup.js` is triggered in code when `isInMemory` is true, for production (Real DB), you must apply the schema manually.

   ```bash
   # Export env vars temporarily to run a manual setup script or use psql
   # Option A: Use psql to import schema
   export PGPASSWORD='secure_password'
   psql -h localhost -U quoteflow_user -d quoteflow -f schema.sql

   # Note: Seeding (categories/quotes) might need to be done manually or via a script if not included in schema.sql.
   # You can run a modified seed script or use the node REPL.
   ```

### Frontend Setup
1. Navigate to the root directory:
   ```bash
   cd /var/www/quoteflow
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
   This will generate the `dist` folder.

## 5. Systemd Service Configuration (Backend)

We will use systemd to keep the backend running.

1. Create a new service file `/etc/systemd/system/quoteflow.service`:
   ```bash
   nano /etc/systemd/system/quoteflow.service
   ```

2. Paste the following content (adjust paths and passwords as needed):
   ```ini
   [Unit]
   Description=QuoteFlow Backend Service
   After=network.target postgresql.service

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/var/www/quoteflow/server
   ExecStart=/usr/bin/node index.js
   Restart=on-failure

   # Environment Variables
   Environment=PORT=3000
   Environment=NODE_ENV=production
   Environment=DATABASE_URL=postgresql://quoteflow_user:secure_password@localhost:5432/quoteflow
   Environment=USE_REAL_DB=true

   [Install]
   WantedBy=multi-user.target
   ```
   *(Note: Ensure `User=www-data` has permissions to access the directory, or change to a dedicated user)*

3. Start and Enable the service:
   ```bash
   # Ensure permissions
   chown -R www-data:www-data /var/www/quoteflow

   systemctl daemon-reload
   systemctl start quoteflow
   systemctl enable quoteflow
   ```

4. Check status:
   ```bash
   systemctl status quoteflow
   ```

## 6. Nginx Configuration (Reverse Proxy)

1. Create a new Nginx configuration file:
   ```bash
   nano /etc/nginx/sites-available/quoteflow
   ```

2. Paste the following content:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com; # Replace with your actual domain or IP

       root /var/www/quoteflow/dist;
       index index.html;

       # Serve Frontend Static Files
       location / {
           try_files $uri $uri/ /index.html;
       }

       # API Proxy
       location /api/ {
           proxy_pass http://localhost:3000/api/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }

       # Security Headers
       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-XSS-Protection "1; mode=block";
       add_header X-Content-Type-Options "nosniff";
   }
   ```

3. Enable the site:
   ```bash
   ln -s /etc/nginx/sites-available/quoteflow /etc/nginx/sites-enabled/
   rm /etc/nginx/sites-enabled/default  # Remove default if not needed
   ```

4. Test and Restart Nginx:
   ```bash
   nginx -t
   systemctl restart nginx
   ```

## 7. Firewall Setup

Allow SSH and Nginx traffic:
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## 8. Verification

- Open your browser and visit `http://your_server_ip` or `http://your_domain.com`.
- You should see the QuoteFlow application.
- Test the API by creating a design or checking the console/network tab to ensure `/api/` requests are working.

## Troubleshooting

- **Backend Logs**: `journalctl -u quoteflow -f`
- **Nginx Logs**: `/var/log/nginx/error.log`
- **Permissions**: Ensure the `www-data` user (or whichever user nginx/node runs as) has access to the files.
