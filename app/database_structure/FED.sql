CREATE TABLE users (
   user_id INTEGER NOT NULL AUTO_INCREMENT,
   username TEXT NOT NULL UNIQUE,
   password TEXT NOT NULL,
   salt VARCHAR(255) NOT NULL UNIQUE,
   email TEXT NOT NULL UNIQUE,
   first_name TEXT,
   last_name TEXT,
   birth_date DATE,
   profile_picture_url TEXT,
   CHECK (`email` RLIKE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
   PRIMARY KEY (user_id)
);

CREATE TABLE themes (
    theme_id INTEGER NOT NULL AUTO_INCREMENT,
    theme_name TEXT NOT NULL UNIQUE,
    theme_color TEXT NOT NULL DEFAULT '#FAEAB1',
    PRIMARY KEY (theme_id)
);

CREATE TABLE tasks (
   task_id INTEGER NOT NULL AUTO_INCREMENT,
   title TEXT NOT NULL,
   description TEXT,
   user_id INTEGER NOT NULL,
   theme_id INTEGER NOT NULL,
   task_status BOOLEAN NOT NULL DEFAULT FALSE,
   PRIMARY KEY (task_id),
   FOREIGN KEY (user_id) REFERENCES users(user_id),
   FOREIGN KEY (theme_id) REFERENCES themes(theme_id)
);

CREATE TABLE authorized_themes (
   authorized_theme_id INTEGER NOT NULL AUTO_INCREMENT,
   theme_id INTEGER NOT NULL,
   user_id INTEGER NOT NULL,
   PRIMARY KEY (authorized_theme_id),
   FOREIGN KEY (theme_id) REFERENCES themes(theme_id),
   FOREIGN KEY (user_id) REFERENCES users(user_id)
);
