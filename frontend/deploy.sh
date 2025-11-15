#!/bin/bash

# Traceon AI Frontend Deployment Script

set -e  # Exit on any error

echo "🚀 Starting Traceon AI Frontend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${1}${2}${NC}\n"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_color $RED "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_color $BLUE "📦 Node.js version: $NODE_VERSION"

# Install dependencies
print_color $YELLOW "📥 Installing dependencies..."
npm ci

# Run type checking
print_color $YELLOW "🔍 Running TypeScript checks..."
npm run type-check

# Run linting
print_color $YELLOW "🧹 Running ESLint..."
npm run lint

# Build the application
print_color $YELLOW "🏗️  Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    print_color $GREEN "✅ Build completed successfully!"
else
    print_color $RED "❌ Build failed!"
    exit 1
fi

# Optional: Start the production server
read -p "Do you want to start the production server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_color $BLUE "🌐 Starting production server..."
    npm start
else
    print_color $GREEN "🎉 Deployment completed! Run 'npm start' to start the production server."
fi
