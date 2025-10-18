# Telesport Dashboard

A responsive Angular application displaying Olympic Games data with interactive charts and statistics.

## Features

- 📊 **Interactive Charts**: Pie chart for medal distribution and line chart for country details
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎯 **Olympic Data Visualization**: View medals per country and detailed statistics
- 🚀 **Modern Angular**: Built with Angular 20+ standalone components and signals

## Tech Stack

- **Angular 20.3+** with standalone components
- **TypeScript 5.9+**
- **ngx-charts** for data visualization
- **RxJS** for reactive programming
- **SCSS** for styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MaxLeblc/telesport-dashboard.git
cd telesport-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/`

## Project Structure

```
src/
├── app/
│   ├── components/        # Reusable components (charts)
│   ├── core/
│   │   ├── models/        # Data models
│   │   └── services/      # Business logic services
│   ├── pages/             # Route components
│   │   ├── home/          # Home page with overview
│   │   └── detail/        # Country detail page
│   └── assets/            # Static assets and mock data
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Data Source

The application uses mock Olympic Games data located in `src/assets/mock/olympic.json`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
