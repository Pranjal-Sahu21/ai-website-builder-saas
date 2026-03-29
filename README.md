# Genixor: AI-powered website builder


**A web app that lets users create and customize websites using AI from simple prompts, manage their projects, and see live previews. Powered by the Step 3.5 model, it makes building website ideas faster and easier without manual setup.**



---

![Preview](https://i.postimg.cc/DySb3DCm/genixor-image.png)

---

## ✨ Features

### Core Features
- **AI Website Generation:** Create full websites from simple text prompts  
- **Easy Customization:** Edit layouts, content, and styles the way you want  
- **Project Management:** Save, organize, and manage your projects  
- **Live Preview:** See your website changes instantly  
- **Fast Prototyping:** Turn ideas into websites quickly  

### Publishing & Control
- **Publish/Unpublish:** Make your website public or private anytime  
- **Download Code:** Export your website code to run locally  
- **Edit Anytime:** Make changes to your website whenever you want  
- **Save Changes:** Keep your custom edits saved and updated  

### AI & Smart Capabilities
- **Step 3.5 Model:** Generates structured and useful website layouts  
- **Prompt-Based Workflow:** Just describe your idea—no coding needed  
- **Iterative Editing:** Improve your site by updating prompts  

### User Experience
- **Clean UI:** Simple and modern interface  
- **Responsive Design:** Works on mobile, tablet, and desktop  
- **Smooth Navigation:** Fast and seamless experience  
- **Feedback System:** Clear responses for user actions  

### Developer-Friendly
- **Modular Structure:** Easy to maintain and scale  
- **API Ready:** Can connect with backend services  
- **Flexible Styling:** Customize design easily  
- **Clean Codebase:** Well-organized and readable  

---

## 🛠️ Tech Stack

### Frontend Architecture
| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React (with TypeScript) | 19.2.0 |
| **Language** | TypeScript | Latest |
| **Routing** | React Router DOM | 7.10.1 |
| **Styling** | Tailwind CSS | 4.1.17 |
| **Build Tool** | Vite | 7.2.4 |

### Authentication & UX
| Feature | Library | Version |
|---------|---------|---------|
| **Authentication** | better-auth | Latest |
| **Animations** | Framer Motion | 12.23.25 |
| **Carousels** | React Slick | 0.31.0 |
| **Notifications** | Sonner | Latest |

### Utilities
| Purpose | Library | Version |
|---------|---------|---------|
| **Icons** | Lucide React | 0.556.0 |
| **Icons (Alternative)** | React Icons | 5.5.0 |
| **HTTP Client** | Axios | 1.13.2 |

### Development Tools
| Tool | Version |
|------|---------|
| **ESLint** | 9.39.1 |
| **TypeScript** | Included |
| **Type Definitions** | React 19.2.5, React DOM 19.2.3 |

### Deployment
- **Hosting:** Netlify with automatic deployments  
- **SPA Routing:** Configured for single-page application  

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

```bash
Node.js (v18.0.0 or higher)
npm (v9.0.0 or higher) or yarn (v3.0.0+)
Git
better-auth (for authentication)
better-auth-ui (ui components made to use better-auth)
sonner (for ready-made ui components)
```

**Verify installation:**
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Pranjal-Sahu21/ai-website-builder-saas.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASEURL=your_backend_url
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (if no other vite project is running locally)

### 5. Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

---

## 📁 Project Structure

```
├── public/                          # Static assets
│
├── src/
│   ├── assets/                      
│   │   ├── assets.ts
│   │   ├── favicon.svg
│   │   └── System Prompt.txt        # Prompts for the model
│   │
│   ├── components/                  # Reusable React components
│   │   ├── ui/                      # Reusable ui folder
│   │   ├── EditorPanel.tsx          
│   │   ├── FAQSection.tsx        
│   │   ├── Features.tsx             
│   │   ├── Footer.jsx               
│   │   ├── HeroSection.css               
│   │   ├── HeroSection.tsx               
│   │   ├── LoaderSteps.tsx        
│   │   ├── Navbar.tsx             
│   │   ├── ProjectPreview.tsx             
│   │   ├── ProtectedRoute.tsx             
│   │   ├── Sidebar.tsx               
│   │   └── Testimonials.tsx          
│   │
│   ├── configs/                     # Custom configurations
│   │        └── axios.config.ts
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useScrollToSection.ts    
│   │
│   ├── lib/                         # Utilities
│   │   ├── auth-client.ts           # Auth client setup
│   │   └── utils.ts
|   |
│   ├── pages/                       # Full page components
|   |   |    └── auth/
|   |   |           └── AuthPage.tsx
|   |   |
│   │   ├── Community.tsx                
│   │   ├── GeneratePage.tsx                
│   │   ├── Home.tsx                
│   │   ├── Loading.tsx                
│   │   ├── MyProjects.tsx                
│   │   ├── NotFound.tsx                
│   │   ├── PreviewPage.tsx                
│   │   ├── Pricing.tsx                
│   │   ├── Projects.tsx                
│   │   ├── Settings.tsx                
│   │   └── View.tsx                
│   │
│   ├── types/                       # Custom types
│   │   └── index.ts 
│   │
│   ├── App.tsx                      # Root component with routing
│   ├── index.css                    # Global styles
│   ├── main.tsx                     # Application entry point
│   └── providers.tsx                # Auth provider setup
│
├── .env                             # Environment variables (not in repo)
├── .gitignore                       # Files to be ignored by git
├── components.json                  # shadcn components 
├── eslint.config.js                 # ESLint configuration
├── index.html                       # main html file
├── netlify.toml                     # Netlify deployment config
├── package-lock.json                # Dependencies & scripts
├── package.json                     # Dependencies & scripts
├── README.md                        # README file
├── tsconfig.app.json                
├── tsconfig.json                    
├── tsconfig.node.json                    
└── vite.config.ts                   # Vite configuration
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).
Access at: `http://localhost:5173`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally before deployment.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality and identify issues.

---

## ⚙️ Configuration

### Vite Configuration
The project uses Vite with React and Tailwind CSS plugins configured in [vite.config.js](vite.config.js).

### ESLint
Code quality rules are defined in [eslint.config.js](eslint.config.js) with support for React and React Hooks.

### Tailwind CSS
Tailwind CSS is integrated via the `@tailwindcss/vite` plugin for optimal performance.

---

## 📡 API Documentation

### Endpoints

| Method | Endpoint | Purpose | Response |
|------|------|------|------|
| `GET` | `/` | Check if the API server is running | "Server is Live!" |
| `GET` | `/user/credits` | Get current user's credits | User credits object |
| `POST` | `/user/project` | Create a new user project | Project object |
| `GET` | `/user/project/:projectId` | Get a specific user project | Project object |
| `GET` | `/user/projects` | Get all user projects | Array of project objects |
| `GET` | `/user/publish-toggle/:projectId` | Toggle project publish status | Updated project object |
| `POST` | `/user/purchase-credits` | Purchase credits for user | Transaction object |
| `GET` | `/project/published` | Get all published projects | Array of published projects |
| `GET` | `/project/published/:projectId` | Get a specific published project | Published project object |
| `GET` | `/project/preview/:projectId` | Get project preview | Project preview data |
| `POST` | `/project/revision/:projectId` | Create a new revision for project | Revision object |
| `PUT` | `/project/save/:projectId` | Save project code | Updated project object |
| `DELETE` | `/project/:projectId` | Delete a project | Success message |


---

## 🔧 Environment Variables

The application uses the following optional environment variables:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_BASEURL` | ✅ Yes | Backend URL | `http://localhost:3000` |

**Setup Instructions:**

1. Create a `.env` file in the root directory
2. Add your base backend URL
3. Never commit `.env` to version control

**.env Example:**
```env
VITE_BASEURL=http://localhost:3000
```

---

## 🚀 Deployment

### Netlify (Recommended)

The project is pre-configured for Netlify deployment with [netlify.toml](netlify.toml).

#### Automatic Deployment (Git Integration)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository
   - Netlify automatically detects `package.json`

3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Add Environment Variables in Netlify UI:
     - `VITE_BASEURL`

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### SPA Routing Configuration
The `netlify.toml` file enables SPA routing:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables on Netlify

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add your backend base url:
   - Key: `VITE_BASEURL`
   - Value: Your Backend URL


---

