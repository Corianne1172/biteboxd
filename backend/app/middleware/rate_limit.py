import time
from collections import defaultdict, deque
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests_per_minute: int = 60):
        super().__init__(app)
        self.max = max_requests_per_minute
        self.window = 60
        self.hits = defaultdict(deque)  # key -> timestamps

    async def dispatch(self, request: Request, call_next):
        ip = request.client.host if request.client else "unknown"
        now = time.time()
        q = self.hits[ip]

        while q and (now - q[0]) > self.window:
            q.popleft()

        if len(q) >= self.max:
            return JSONResponse(
                status_code=429,
                content={"error": {"message": "Too many requests", "type": "rate_limited"}},
            )

        q.append(now)
        return await call_next(request)
