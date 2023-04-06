--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

-- COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS subjects;

CREATE TABLE public.questions (
    questions_uid uuid NOT NULL,
    exam_year integer,
    question character varying(300),
    instruction character varying(150),
    option_a character varying(250),
    option_b character varying(250),
    option_c character varying(250),
    option_d character varying(250),
    option_e character varying(250),
    subject_id uuid NOT NULL
);


ALTER TABLE public.questions OWNER TO fykrxlou;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    student_uid uuid NOT NULL,
    email character varying(150) NOT NULL,
    name character varying(150) NOT NULL,
    password character varying(150) NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.students OWNER TO fykrxlou;

--
-- Name: scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scores (
    time_of_test character varying(150) NOT NULL,
    student_id uuid NOT NULL,
    subject_id uuid NOT NULL,
    score DECIMAL(5,2) NOT NULL
);


ALTER TABLE public.scores OWNER TO fykrxlou;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles(
    role_uid uuid NOT NULL,
    name character varying(150) NOT NULL
);

ALTER TABLE public.roles OWNER TO fykrxlou;

--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    subject_uid uuid NOT NULL,
    name character varying(20)
);


ALTER TABLE public.subjects OWNER TO fykrxlou;

--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- COPY public.questions (questions_uid, exam_year, question, instruction, option_a, option_b, option_c, option_d, option_e, subject_id) FROM stdin;
-- e6356e16-ff87-41db-9ef8-e80819b49629	2003	What the hell	answer all	aaa	bbb	ccc	ddd	eee	f3191c7d-5906-4d38-8177-59e3d2f75dc3
-- 28736fd0-40a7-4eb7-bd13-e5a388226bb3	2003	What the actual hell	Answer all Questions	hahaha	hello world	peep the riz	na God dey run am	God punish devil	f3191c7d-5906-4d38-8177-59e3d2f75dc3
-- b18ae6ad-5ab4-41d0-8db6-80de0f73cbf1	2003	What the actual hell	Answer all Questions	hahaha	hello world	peep the riz	na God dey run am	God punish devil	f3191c7d-5906-4d38-8177-59e3d2f75dc3
-- \.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- COPY public.students (student_uid, admin, email, name, password) FROM stdin;
-- b07cf706-083c-4514-a2d4-6f00aa838299	f	janedoe@gmail.com	John Doe	eaab168aaff983874c96b8cfcb2dca93fefa21edc1efb63d03e822b0cc0c4250b67ca7f99bc31a8c2cacb5b1a5350399079ec0d1faa53913c800246e5d95aeb3
-- 134b11e1-65bc-4903-a0a0-b7e02b79dbc5	f	johndoe@gmail.com	John Doe	5b57e6ef25faa092f95f97f9e6a839bb83a38f0835dd7c2173005d3e15d687b996f99a983a3e63c0be9f5c20efef5b1c5c9791eb62d7774bb28fa21ea1295698
-- \.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- COPY public.subjects (subject_uid, name) FROM stdin;
-- f3191c7d-5906-4d38-8177-59e3d2f75dc3	BIOLOGY
-- f99203bc-5fcf-484d-984a-8b4d57cd69bb	\N
-- 4dcfcbe3-c09e-474c-b7db-e6eeda718635	CHEMISTRY
-- 8f14d2ea-2782-48b4-a62e-2231835cba0d	PHYSICS
-- \.


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (questions_uid);


--
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_uid);

ALTER TABLE ONLY public.students
    ADD CONSTRAINT unique_student_id UNIQUE (student_uid);

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT unique_subject_id UNIQUE (subject_uid);
--
-- Name: subjects subjects_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_name_key UNIQUE (name);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--


ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subject_uid);

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_uid);

--
-- Name: questions questions_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_uid) ON DELETE CASCADE;

ALTER TABLE students
ADD FOREIGN KEY(role_id)
REFERENCES roles(role_uid)
ON DELETE CASCADE;
--
-- PostgreSQL database dump complete
--

ALTER TABLE scores
ADD FOREIGN KEY(student_id)
REFERENCES students(student_uid)
ON DELETE CASCADE;

ALTER TABLE scores
ADD FOREIGN KEY(subject_id)
REFERENCES subjects(subject_uid)
ON DELETE CASCADE;

ALTER TABLE roles ADD CONSTRAINT role_type CHECK(name= 'Admin' OR gender = 'User');