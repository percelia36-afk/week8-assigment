# Reflection: Building a Dynamic, Database-Driven Blog with Next.js and PostgreSQL

## Overview

This project demonstrates the power and flexibility of Next.js for building dynamic, scalable, and database-driven web applications. By integrating PostgreSQL as the backend, we streamlined data handling and enabled efficient content management, including posts and comments. The use of dynamic routing, server-side data fetching, and modern React patterns made it possible to deliver a user-friendly and robust blog platform.

## Key Achievements

- **Dynamic Data Fetching:** Leveraged Next.js server components to fetch and display posts directly from the database, ensuring up-to-date content and efficient rendering.
- **Dynamic Routing with Params:** Utilized the `params` object in Next.js to create dynamic routes for individual posts, making it easy to fetch and display the correct data for each post.
- **Comment Functionality:** Implemented a client-side comment form that saves comments to a dedicated comments table, associating each comment with its corresponding post via a foreign key. The API route was fixed to use Next.js App Router conventions (`route.js`), and the table is now always linked to the `game_reviews` table with a foreign key. Comments now display instantly after submission by refreshing the page.
- **Post Deletion:** Added a delete button to each post’s page, allowing users to remove posts from the database with a single click.
- **Sorting and User Experience:** Provided options to sort posts in ascending or descending order, improving content discoverability for users.
- **Redirection After Post Creation:** Ensured users are redirected to the main posts page after creating a new post, providing immediate feedback and context.
- **Secure and Scalable Schema:** Designed a SQL schema with proper foreign key relationships between posts and comments, laying the foundation for scalable and maintainable data management.

## Technical Considerations

- **Backend Integration:** Next.js’s backend integration made it simple to connect to PostgreSQL, fetch data, and handle CRUD operations directly within page components or API routes.
- **Security:** While the demo focused on functionality, real-world comment systems require careful attention to security, including SQL injection prevention, user data protection, and moderation tools.
- **Performance:** Next.js’s data fetching and caching strategies (e.g., `revalidatePath`, caching) help maintain fast load times and up-to-date content.
- **Routing and Redirects:** Used Next.js routing fundamentals, including dynamic routes and redirects, to create a seamless navigation experience.

## Database Schema

```sql
CREATE TABLE game_reviews (
	id SERIAL PRIMARY KEY,
	game_title TEXT NOT NULL,
	rating INTEGER,
	review TEXT,
	image_url TEXT,
	image_alt TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	post_id INTEGER NOT NULL REFERENCES game_reviews(id) ON DELETE CASCADE,
	comment TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Attribution

- **Next.js Documentation:** [Introduction](https://nextjs.org/docs), [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing), [redirect](https://nextjs.org/docs/app/api-reference/functions/redirect), [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath), [Data Fetching, Caching, and Revalidating](https://nextjs.org/docs/app/building-your-application/data-fetching)
- **PostgreSQL Tutorial:** [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- **W3Schools:** [SQL Joins](https://www.w3schools.com/sql/sql_join.asp)

## Reflection

## Recent Fixes and Improvements

- Fixed API route for comments to use Next.js App Router conventions (`route.js` in the correct folder structure).
- Ensured the `comments` table is always linked to the `game_reviews` table with a foreign key for data integrity.
- Updated the comment form to refresh the page after submission, so new comments appear instantly without manual reload.

Working with Next.js and PostgreSQL provided a modern, full-stack development experience. The ability to fetch data directly in page components, handle dynamic routes with ease, and integrate backend logic made building a feature-rich blog straightforward. The project highlighted the importance of secure database design, thoughtful user experience (sorting, redirects), and the value of leveraging modern frameworks for rapid development.
