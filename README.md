# Semi-Ecommerce Website - CSV Import & Product Display

A semi-ecommerce website that imports product details from CSV files and displays them in an organized manner with category and subcategory navigation.

## Features

- 📤 **CSV Import**: Upload and parse CSV or files to import product data
- 🗂️ **Category Management**: Organize products by categories and subcategories
- 📊 **Product Display**: View products in a table format with associated columns
- 🔍 **Smart Association**: Handles CSV rules (filled cells, empty cells, and dashes)
- 🎨 **Modern UI**: Built with Tailwind CSS and Next.js

## Prerequisites

- Node.js 18+ installed
- A NeonDB PostgreSQL database (or any PostgreSQL database)
- npm or yarn package manager

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Configure Database (NeonDB)

1. Create an account at [NeonDB](https://neon.tech) if you don't have one
2. Create a new project and database
3. Copy your connection string from the NeonDB dashboard
4. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

5. Add your database connection string to `.env`:

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

### 3. Set Up Database Schema

Generate Prisma Client and run migrations:

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply database migrations
npm run prisma:migrate
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Uploading CSV Files

1. Click the "Upload CSV" button
2. Select a CSV file
3. Click "Upload" to process the file

### CSV File Format

Your CSV file should have:

- **Part Number** column: Unique identifier for each product
- **Datasheet URL** column (optional): URL to product datasheet
- **Additional columns**: Represent categories/subcategories or product attributes

#### CSV Rules:

- **Filled Cell**: Indicates the part number is associated with that column
- **Empty Cell**: Indicates the part number is NOT associated with that column
- **Dash (-)**: Although appears empty, signifies the part number IS associated with that column

### Viewing Products

1. Use the cards to browse categories
2. Click over a category to see its subcategories
3. Click on a category or subcategory to view products
4. Products are displayed in a table showing:
   - Part Number
   - Datasheet URL (if available)
   - Associated columns (marked with ✓)

## API Endpoints

### POST `/api/upload`

Upload and import CSV file.

**Request**: FormData with `file` field

**Response**:

```json
{
  "success": true,
  "message": "Successfully imported X rows"
}
```

### GET `/api/products`

Get all products with their columns.

**Response**: Array of products with columns

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database management
- **PostgreSQL** - Database (via NeonDB)
- **Tailwind CSS** - Styling
- **csv-parse** - CSV file parsing

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` in `.env` is correct
- Ensure your NeonDB database is accessible
- Check that SSL mode is set correctly

### Import Errors

- Ensure your CSV file has a "Part Number" column
- Check that the file format is supported (.csv, .xlsx, .xls)
- Verify file encoding (UTF-8 recommended for CSV)

### Prisma Client Issues

- Run `npm run prisma:generate` after schema changes
- Ensure migrations are up to date: `npm run prisma:migrate`

## License

This project is open source and available for use.
