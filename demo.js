// demo.js - Simple API Test Script
const API_URL = 'http://localhost:3000';

async function runDemo() {
  try {
    console.log('--- Testing API Endpoints ---');

    // 1. Register User
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser_' + Date.now(), password: 'password123' })
    });
    const regData = await regRes.json();
    console.log('1. Register Response:', regData);

    // 2. Fetch All Students from Database
    const studentsRes = await fetch(`${API_URL}/students`);
    const studentsData = await studentsRes.json();
    console.log('2. Fetch Students Response:', studentsData);

  } catch (error) {
    console.error('Demo execution error:', error.message);
  }
}

runDemo();