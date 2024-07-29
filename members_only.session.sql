-- CREATE TABLE user_clubs (
--     user_id INTEGER NOT NULL,
--     club_id INTEGER NOT NULL,
--     joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (user_id, club_id),
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
-- );
-- ALTER TABLE clubs ALTER COLUMN description TYPE TEXT;
-- INSERT INTO clubs (name, description, passcode) 
-- VALUES 
-- ('The Book Club', 'The Book Club Club is a community of diverse individuals united by a shared love of reading. We believe that books have the power to enlighten, entertain, and inspire, and we aim to foster meaningful conversations and connections through our shared literary adventures.', 'I love books'), 
-- ('Sci-Fi and Fantasy Alliance', 'Join fellow adventurers as we explore distant galaxies, magical realms, and alternate universes. From classic science fiction to epic fantasy sagas, this club celebrates the boundless imagination of speculative fiction.', 'I love sci-fi');

-- ALTER TABLE messages ALTER COLUMN text TYPE TEXT;
    -- INSERT INTO users_clubs (user_id,club_id)
    -- VALUES (
    -- (SELECT id FROM users where username = $1 ),
    -- (SELECT id FROM clubs where name = $2 ),
    -- ); 
    ALTER TABLE messages
ADD COLUMN club_id INTEGER;

ALTER TABLE messages
ADD CONSTRAINT club_id
FOREIGN KEY (club_id)
REFERENCES clubs(id)
ON DELETE CASCADE;

    