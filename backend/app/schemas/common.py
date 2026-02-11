from pydantic import BaseModel

class PageMeta(BaseModel):
    limit: int
    offset: int
    total: int

class Page(BaseModel):
    meta: PageMeta
    items: list