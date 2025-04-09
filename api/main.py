from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
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

async def fetch_data(endpoint: str, session_key: Optional[int] = None):
    url = f"{BASE_URL}/{endpoint}"
    
    # Only include filter if session_key is not None
    params = {"session_key": f"eq.{session_key}"} if session_key is not None else {}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        error_detail = e.response.text or "Unknown HTTP error"
        print(f"HTTP error while fetching {url}: {e.response.status_code} - {error_detail}")
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"OpenF1 API error: {error_detail}"
        )
    except Exception as e:
        print(f"Error while fetching {url}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error: " + str(e)
        )

@app.get("/car-data")
async def get_car_data(session_key: Optional[int] = None):
    return await fetch_data("car_data", session_key)

@app.get("/drivers")
async def get_drivers(session_key: Optional[int] = None):
    return await fetch_data("drivers", session_key)

@app.get("/sessions")
async def get_sessions():
    return await fetch_data("sessions")

@app.get("/team-radio")
async def get_team_radio(session_key: Optional[int] = None):
    if session_key is None:
        raise HTTPException(status_code=400, detail="session_key is required for team radio data.")
    return await fetch_data("team_radio", session_key)

@app.get("/weather")
async def get_weather(session_key: Optional[int] = None):
    return await fetch_data("weather", session_key)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
