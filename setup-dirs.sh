#!/bin/bash

# Create backend directory structure
mkdir -p barter-app/backend/src/{config,models,middleware,routes}
mkdir -p barter-app/frontend/src/{screens,components,services,context,navigation}

echo "✓ Directories created successfully!"
echo ""
echo "Next: Copy the source files from .txt templates to their locations"
