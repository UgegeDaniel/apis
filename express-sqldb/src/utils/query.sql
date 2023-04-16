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
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS students;

-- QUESTIONS 
CREATE TABLE public.questions (
    questions_uid uuid NOT NULL,
    examYear integer,
    question character varying(300),
    instruction character varying(150),
    optionA character varying(250),
    optionB character varying(250),
    optionC character varying(250),
    optionD character varying(250),
    optionE character varying(250),
    subjectId uuid NOT NULL
);
ALTER TABLE public.questions OWNER TO fykrxlou;

-- STUDENTS TABLE
CREATE TABLE public.students (
    student_uid uuid NOT NULL,
    email character varying(150) NOT NULL,
    name character varying(150) NOT NULL,
    password character varying(150) NOT NULL,
    role_id uuid NOT NULL
);
ALTER TABLE public.students OWNER TO fykrxlou;

-- SCORES TABLE
CREATE TABLE public.scores (
    time_of_test character varying(150) NOT NULL,
    student_id uuid NOT NULL,
    subjectId uuid NOT NULL,
    score DECIMAL(5,2) NOT NULL
);
ALTER TABLE public.scores OWNER TO fykrxlou;

-- ROLES TABLE
CREATE TABLE public.roles(
    role_uid uuid NOT NULL,
    name character varying(150) NOT NULL
);
ALTER TABLE public.roles OWNER TO fykrxlou;

-- SUBJECTS TABLE
CREATE TABLE public.subjects (
    subject_uid uuid NOT NULL,
    name character varying(20)
);
ALTER TABLE public.subjects OWNER TO fykrxlou;

-- CONSTRAINTS (PRIMARY KEYS)
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (questions_uid);

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_uid);

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subject_uid);

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_uid);

-- CONSTAINTS (UNIQUE)
ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);

ALTER TABLE ONLY public.students
    ADD CONSTRAINT unique_student_id UNIQUE (student_uid);

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT unique_subjectId UNIQUE (subject_uid);

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_name_key UNIQUE (name);

-- CONSTAINTS (FOREIGN KEYS)
ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_subjectId_fkey 
    FOREIGN KEY (subjectId) REFERENCES public.subjects(subject_uid) ON DELETE CASCADE;

ALTER TABLE public.students 
    ADD FOREIGN KEY(role_id) REFERENCES roles(role_uid) ON DELETE CASCADE;

ALTER TABLE public.scores
    ADD FOREIGN KEY(student_id) REFERENCES students(student_uid) ON DELETE CASCADE;

ALTER TABLE public.scores
    ADD FOREIGN KEY(subjectId) REFERENCES subjects(subject_uid) ON DELETE CASCADE;

ALTER TABLE public.roles 
    ADD CONSTRAINT role_type CHECK(name= 'Admin' OR name = 'User');

INSERT INTO public.roles (subject_uid, name) VALUES (uuid_generate_v4(), 'Admin');
INSERT INTO public.roles (subject_uid, name) VALUES (uuid_generate_v4(), 'User');