# Recipe Finder App

A Next.js application that allows users to search for recipes with advanced filters, display results, and view detailed information for each recipe.

## Features

- Search recipes by keyword, cuisine, and maximum preparation time
- View search results with images
- View detailed recipe information including ingredients and preparation time
- Responsive design built with Tailwind CSS
- Server-side rendering with Next.js
- Data caching for improved performance

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/DShpak27/develops-today-task.git
    cd develops-today-task
    ```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `src/app` - Next.js app router pages and layouts
- `src/components` - React components

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Spoonacular API](https://spoonacular.com/food-api) - Recipe data source

### API Rate Limits

The free tier of Spoonacular API has daily request limits. If you encounter API errors, you might have exceeded the daily quota.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
