#!/bin/bash

cd client

npm install
npm start &

cd ..

cd backend

npm install
npm run dev
