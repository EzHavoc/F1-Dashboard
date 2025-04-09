from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import asyncio
from typing import Optional

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.openf1.org/v1"

@app.get("/car-data")
async def get_car_data(session_key: Optional[int] = None):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/car_data", params={"session_key": session_key})
        return response.json()

@app.get("/drivers")
async def get_drivers(session_key: Optional[int] = None):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/drivers", params={"session_key": session_key})
        return response.json()

@app.get("/sessions")
async def get_sessions():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/sessions")
        return response.json()

@app.get("/team-radio")
async def get_team_radio(session_key: Optional[int] = None):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/team_radio", params={"session_key": session_key})
        return response.json()

@app.get("/weather")
async def get_weather(session_key: Optional[int] = None):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/weather", params={"session_key": session_key})
        return response.json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)