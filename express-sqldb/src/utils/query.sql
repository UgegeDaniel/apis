SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;


-- QUESTIONS 
CREATE TABLE public.questions (
    questions_uid uuid NOT NULL,
    examYear integer,
    question character varying(300),
    instruction character varying(150),
    number integer,
    optionA character varying(250),
    optionB character varying(250),
    optionC character varying(250),
    optionD character varying(250),
    optionE character varying(250),
    answer character varying(250),
    subjectId uuid NOT NULL
);
ALTER TABLE questions OWNER TO fykrxlou;

-- STUDENTS TABLE
CREATE TABLE public.users (
    users_uid uuid NOT NULL,
    email character varying(150) NOT NULL,
    name character varying(150) NOT NULL,
    password character varying(150) NOT NULL,
    role_id uuid NOT NULL
);
ALTER TABLE users OWNER TO fykrxlou;

-- SCORES TABLE
CREATE TABLE public.scores (
    time_of_test character varying(150) NOT NULL,
    user_id uuid NOT NULL,
    subject_id uuid NOT NULL,
    score DECIMAL(5,2) NOT NULL
);
ALTER TABLE scores OWNER TO fykrxlou;

-- ROLES TABLE
CREATE TABLE public.roles (
    roles_uid uuid NOT NULL,
    name character varying(150) NOT NULL
);
ALTER TABLE roles OWNER TO fykrxlou;

-- SUBJECTS TABLE
CREATE TABLE public.subjects (
    subjects_uid uuid NOT NULL,
    name character varying(20)
);
ALTER TABLE subjects OWNER TO fykrxlou;

-- CONSTRAINTS (PRIMARY KEYS)
ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (questions_uid);

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY (users_uid);

ALTER TABLE ONLY subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subjects_uid);

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (roles_uid);

-- CONSTAINTS (UNIQUE)
ALTER TABLE ONLY users
    ADD CONSTRAINT students_email_key UNIQUE (email);

ALTER TABLE ONLY users
    ADD CONSTRAINT unique_student_id UNIQUE (users_uid);

ALTER TABLE ONLY subjects
    ADD CONSTRAINT unique_subjectId UNIQUE (subjects_uid);

ALTER TABLE ONLY subjects
    ADD CONSTRAINT subjects_name_key UNIQUE (name);

-- CONSTAINTS (FOREIGN KEYS)
ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_subjectId_fkey 
    FOREIGN KEY (subjectId) REFERENCES subjects(subjects_uid) ON DELETE CASCADE;

ALTER TABLE users
    ADD FOREIGN KEY(role_id) REFERENCES roles(roles_uid) ON DELETE CASCADE;

ALTER TABLE scores
    ADD FOREIGN KEY(user_id) REFERENCES users(users_uid) ON DELETE CASCADE;

ALTER TABLE scores
    ADD FOREIGN KEY(subject_id) REFERENCES subjects(subjects_uid) ON DELETE CASCADE;

ALTER TABLE roles
    ADD CONSTRAINT role_type CHECK(name= 'Admin' OR name = 'Student');

INSERT INTO roles (roles_uid, name) VALUES (uuid_generate_v4(), 'Admin');
INSERT INTO roles (roles_uid, name) VALUES (uuid_generate_v4(), 'Student');