# Traceon AI Frontend

A modern, responsive web application for intelligent log analysis and root cause analysis built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Interactive Chat Interface**: Communicate with Traceon AI to initiate analysis and get insights
- **Real-time Analysis Display**: View comprehensive analysis results with visual indicators
- **Integration Support**: Ready for integration with Slack, Sentry, Splunk, Teams, OpenSearch, GitHub, and Datadog
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live updates for analysis progress and results

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks
- **API Layer**: Custom service layer with mock data

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ChatBot.tsx        # Chat interface component
│   └── AnalysisDisplay.tsx # Analysis results component
├── services/              # API service layer
│   └── api.ts            # API service with mock data
├── types/                # TypeScript type definitions
│   └── api.ts            # API types and interfaces
└── styles/               # Global styles
```

## Key Components

### ChatBot Component
- Interactive chat interface
- Supports analysis key recognition
- Real-time message handling
- Integration with analysis requests

### AnalysisDisplay Component
- Comprehensive analysis visualization
- Status indicators and severity levels
- Log entry display with syntax highlighting
- Recommendation and related incident tracking

### API Service
- Centralized API communication
- Mock data for development
- Error handling and retry logic
- Support for all backend endpoints

## Usage

### Initiating Analysis

1. Enter an analysis key in the chat (e.g., "CR-12345", "INCIDENT-789")
2. The system will automatically detect keys and initiate analysis
3. View real-time progress in the analysis panel
4. Interact with the AI for additional insights

### Analysis Key Formats

The system recognizes these key patterns:
- `CR-XXXXX` - Change Requests
- `INCIDENT-XXXXX` - Incident Reports
- `LOG-XXXXX` - Log Analysis Requests
- `#XXXXX` - General Analysis IDs

### Integration Status

The header displays real-time integration status for:
- Slack
- Sentry
- Splunk
- Microsoft Teams
- OpenSearch
- GitHub
- Datadog

## API Integration

### Backend Endpoints

The frontend expects these backend endpoints:

- `POST /api/analysis` - Request new analysis
- `GET /api/analysis/:id` - Get analysis results
- `GET /api/analysis/history` - Get analysis history
- `POST /api/chat` - Send chat messages
- `GET /api/integrations` - Get integration status
- `GET /api/system/health` - System health check

### Mock Data

When `NEXT_PUBLIC_MOCK_API=true`, the application uses mock data for development. This includes:
- Sample analysis results
- Mock log entries
- Simulated API delays
- Error scenarios

## Customization

### Styling

The application uses Tailwind CSS for styling. Key design elements:

- **Color Scheme**: Blue and purple gradients with professional grays
- **Typography**: Clear hierarchy with appropriate font weights
- **Layout**: Responsive grid with mobile-first approach
- **Components**: Consistent spacing and hover effects

### Environment Configuration

Configure the application through environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_MOCK_API=true
NEXT_PUBLIC_ENABLE_INTEGRATIONS=true
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Quality

The project includes:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Git hooks for pre-commit checks

## Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Set these environment variables in production:

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_MOCK_API=false` - Disable mock data
- `NEXT_PUBLIC_ENABLE_INTEGRATIONS=true` - Enable integrations

### Deployment Platforms

The application can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker containers
- Traditional web servers

## Future Enhancements

### Planned Features

- [ ] Real-time WebSocket connections
- [ ] Advanced filtering and search
- [ ] Customizable dashboards
- [ ] Export analysis reports
- [ ] Team collaboration features
- [ ] Mobile application
- [ ] Dark mode support
- [ ] Multi-language support

### Integration Roadmap

- [ ] Slack bot commands
- [ ] Teams app integration
- [ ] Sentry webhook handlers
- [ ] Splunk saved searches
- [ ] GitHub Actions integration
- [ ] Datadog dashboard embedding

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

Built with ❤️ by the Traceon AI team
