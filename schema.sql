create table videos(
id SERIAL PRIMARY KEY,
user_id INTEGER, 
name TEXT,
description TEXT,
url TEXT,
likescount INTEGER DEFAULT 0,
commentcount INTEGER DEFAULT 0,
viewscount INTEGER DEFAULT 0,
createdat DATE DEFAULT CURRENT_DATE
);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
content TEXT,
user_id INTEGER,
video_id INTEGER,
createdat DATE DEFAULT CURRENT_DATE
);

CREATE TABLE likes(
id SERIAL PRIMARY KEY,
user_id INTEGER,
video_id INTEGER
);
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name TEXT,
email TEXT,
avatar TEXT,
likes INTEGER[] DEFAULT {},
views INTEGER[] DEFAULT {},
subscriberscount INTEGER DEFAULT 0
);


alter table users 
add column likes INTEGER[],views INTEGER[];
