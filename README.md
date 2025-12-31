# EchoMap

A professional diagnostic tool designed to identify English communication gaps and generate personalized improvement roadmaps. EchoMap provides a comprehensive 15-minute assessment using speech recognition technology, followed by AI-powered analysis and a tailored 7-day action plan.

## Overview

EchoMap is a resourceful, single-page application that helps professionals assess and improve their English communication skills. Through a structured 5-stage assessment covering Daily Life, Descriptive, Opinion, Professional, and Abstract communication contexts, users receive detailed analytics and actionable insights.

## Features

### 🎯 Core Functionality

- **5-Stage Assessment**: Comprehensive evaluation across multiple communication contexts
  - Daily Life scenarios
  - Descriptive communication
  - Opinion expression
  - Professional communication
  - Abstract concepts

- **Real-Time Speech Recognition**: Browser-based speech-to-text using Web Speech API
  - Live transcript display
  - Continuous recognition
  - Cross-platform support (Chrome, Edge)

- **AI-Powered Analysis**: Leverages Google Gemini AI for comprehensive evaluation
  - Syntax scoring (0-100)
  - Lexical range assessment (0-100)
  - Fluidity measurement (0-100)
  - Pattern identification for recurring mistakes

- **Personalized 7-Day Roadmap**: Tailored action plan with daily tasks
  - 15-minute focused exercises
  - Context-specific recommendations
  - "Why it matters" explanations for each task

- **PDF Export**: Professional document generation
  - Downloadable roadmap
  - Optional analytics inclusion
  - Well-structured, print-ready format

### 🎨 Design

- **Vermeer-Inspired Palette**: Elegant color scheme featuring deep blues, soft whites, and ochre accents
- **Monospace Typography**: Clean, utility-focused aesthetic
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Smooth Transitions**: Seamless flow between assessment stages

## Tech Stack

### Core Technologies

- **React 19.2.0**: Modern UI library with hooks
- **TypeScript 5.9.3**: Type-safe development
- **Vite 7.2.4**: Fast build tool and dev server

### Styling

- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **@tailwindcss/vite**: Native Vite integration
- **Lucide React**: Modern icon library

### AI & Utilities

- **@google/generative-ai 0.24.1**: Google Gemini AI integration
- **jsPDF 3.0.4**: Client-side PDF generation

### Development Tools

- **ESLint**: Code quality and linting
- **TypeScript ESLint**: Type-aware linting rules
- **PostCSS**: CSS processing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd echomap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI analysis | Yes |

### Browser Requirements

- **Chrome** (recommended) or **Edge** for full speech recognition support
- Microphone permissions must be granted
- Modern browser with ES6+ support

## Usage

### Assessment Flow

1. **Home Screen**: Click "Begin Assessment" to start
2. **Question Stage**: 
   - Read the question prompt
   - Click "Start Recording"
   - Speak your response naturally
   - View live transcript as you speak
   - Click "Stop Recording" when finished
   - Click "Next Question" to proceed
3. **Analysis**: Wait while AI processes your responses (typically 10-30 seconds)
4. **Results**: Review your scores, patterns, and 7-day roadmap
5. **Export**: Download PDF with optional analytics inclusion

### PDF Export

- **With Analytics**: Includes scores, patterns, and roadmap (default)
- **Roadmap Only**: Contains only the 7-day action plan
- Toggle the checkbox before clicking "Download Roadmap PDF"

## Project Structure

```
echomap/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Assessment.tsx  # 5-stage assessment flow
│   │   ├── Result.tsx      # Results display & PDF export
│   │   └── SpeechRecognition.tsx  # Speech-to-text component
│   ├── utils/              # Utility functions
│   │   ├── aiAnalysis.ts   # Gemini AI integration
│   │   └── generatePDF.ts # PDF generation logic
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles & Tailwind imports
│   └── main.tsx            # Application entry point
├── .env                    # Environment variables (create this)
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for code quality
- Functional components with hooks
- Type-safe props and state management

## Building for Production

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

3. **Deploy**:
   The `dist/` folder contains the production-ready files. Deploy to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

### Environment Variables in Production

Ensure your production environment has the `VITE_GEMINI_API_KEY` variable set. For most hosting platforms, this is configured in the project settings.

## Browser Compatibility

| Browser | Speech Recognition | Status |
|---------|-------------------|--------|
| Chrome | ✅ Full support | Recommended |
| Edge | ✅ Full support | Recommended |
| Firefox | ❌ Not supported | Limited functionality |
| Safari | ⚠️ Partial support | May have issues |

## Troubleshooting

### Speech Recognition Not Working

- **Check browser**: Ensure you're using Chrome or Edge
- **Microphone permissions**: Grant microphone access when prompted
- **HTTPS required**: Some browsers require HTTPS for microphone access (localhost is exempt)

### API Key Issues

- **Invalid key**: Verify your Gemini API key is correct
- **Quota exceeded**: Check your Google Cloud Console for API quotas
- **Network errors**: Ensure your API key has proper permissions

### Build Errors

- **TypeScript errors**: Run `npm run lint` to identify issues
- **Missing dependencies**: Run `npm install` again
- **Tailwind issues**: Ensure `@tailwindcss/vite` is properly configured

## Contributing

This is a private project. For questions or issues, please contact the project maintainer.

## License

This project is private and proprietary. All rights reserved.

## Acknowledgments

- **Google Gemini AI** for natural language processing
- **Web Speech API** for browser-based speech recognition
- **Tailwind CSS** for utility-first styling
- **Vite** for exceptional developer experience

---

**EchoMap** - Mapping your path to better English communication.
