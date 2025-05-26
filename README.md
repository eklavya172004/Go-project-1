# Movie Management App

A full-stack movie management application built with Go (backend) and React (frontend).





### Vercel Deployent - https://go-project-1-nz6r.vercel.app/
### Railway Deployment - https://go-project-1-production.up.railway.app/movies
- change /movies -- > /movies/{id} for get by id
- change /movies -- > /movies/{id} for delete by id
- change /movies -- > /movies/{id} for update by id with body
- change /movies -- > /movies/ for create with body

## Features

- ✅ Create, read, update, and delete movies
- ✅ Search functionality for movies and directors
- ✅ Modern, responsive UI with glassmorphism design
- ✅ RESTful API with JSON responses
- ✅ Real-time data updates

## Tech Stack

### Backend
- **Go** - Main programming language
- **Gorilla Mux** - HTTP router and URL matcher
- **JSON** - Data format for API responses

### Frontend
- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Modern JavaScript (ES6+)** - Language features

## Project Structure

```


├── main.go          # Main Go application
├── go.mod           # Go module file
└── go.sum           # Go dependencies
├── frontend/
│   ├── public/          # Public assets
│   ├── src/             # React source code
│   │   ├── App.js       # Main React component
│   │   └── index.js     # React entry point
│   ├── package.json     # Node.js dependencies
│   └── ...
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies` | Get all movies |
| GET | `/movies/{id}` | Get movie by ID |
| POST | `/movies` | Create new movie |
| PUT | `/movies/{id}` | Update movie by ID |
| DELETE | `/movies/{id}` | Delete movie by ID |

## Getting Started

### Prerequisites

- Go 1.19 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Go dependencies:
   ```bash
   go mod init movie-backend
   go get github.com/gorilla/mux
   go get github.com/gorilla/handlers
   ```

3. Run the Go server:
   ```bash
   go run main.go
   ```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install additional required packages:
   ```bash
   npm install lucide-react
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Configure Tailwind CSS by adding to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Update `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: { extend: {} },
     plugins: [],
   }
   ```

6. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## Usage

1. Start the Go backend server
2. Start the React frontend application
3. Open your browser to `http://localhost:3000`
4. Use the interface to:
   - View all movies
   - Search for specific movies
   - Add new movies
   - Edit existing movies
   - Delete movies

## Movie Data Structure

```json
{
  "id": "1",
  "isbn": "4328",
  "title": "Movie Title",
  "director": {
    "firstname": "Director First Name",
    "lastname": "Director Last Name"
  }
}
```

## CORS Configuration

The backend includes CORS middleware to allow frontend requests:

```go
corsHandler := handlers.CORS(
    handlers.AllowedOrigins([]string{"http://localhost:3000"}),
    handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
    handlers.AllowedHeaders([]string{"Content-Type"}),
)
```

## Screenshots

[Add screenshots of your application here]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/movie-management-app](https://github.com/yourusername/movie-management-app)
