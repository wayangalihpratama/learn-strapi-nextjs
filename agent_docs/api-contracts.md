# API Contracts: Batuan Digital Hub

These contracts define the interaction between the Next.js frontend and the Strapi v5 backend.

## 📡 Attraction (Landmarks)
**Endpoint**: `/api/attractions`

### GET List
- **Purpose**: Homepage featured section.
- **Query**: `?populate=images&pagination[limit]=3`
- **Response Shape**:
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "attributes": {
        "name": "Pura Puseh Batuan",
        "slug": "pura-puseh",
        "images": { "data": [...] }
      }
    }
  ]
}
```

## 🎨 Painting (Gallery)
**Endpoint**: `/api/paintings`

### GET Featured
- **Query**: `?filters[is_featured][$eq]=true&populate=images`

### GET Detail by Slug
- **Query**: `?filters[slug][$eq]=waterfall-painting&populate=*`

## 🎭 Performance (Events)
**Endpoint**: `/api/performances`

### GET Upcoming
- **Query**: `?filters[date][$gte]=2024-03-04&sort=date:asc&populate=images`

## 🛠️ Global Settings
**Endpoint**: `/api/global`
- **Purpose**: Site name, logo, footer contact info.
- **Query**: `?populate=*`
