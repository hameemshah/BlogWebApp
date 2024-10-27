--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-1.pgdg20.04+2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-1.pgdg20.04+2)

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

--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    phone character varying(50) DEFAULT '0'::character varying,
    message text NOT NULL
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_id_seq OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    author character varying(255) DEFAULT 'anonymous'::character varying,
    content text NOT NULL,
    day character(2),
    month character(9),
    year character(4),
    link text,
    imageurl text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (id, name, email, phone, message) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, subtitle, author, content, day, month, year, link, imageurl, created_at) FROM stdin;
79	Future Of AI & ML	Undertanding the difference and impact	hameem	<h1>The Future of AI, Machine Learning, and Deep Learning</h1>\r\n\r\n<h2>Understanding the Differences and Impacts</h2>\r\n\r\n<p>Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning (DL) are rapidly evolving fields that are transforming various industries. Understanding their differences, impacts, and future potential is crucial for anyone looking to enter this exciting domain.</p>\r\n\r\n<h3><strong>What is AI, ML, and DL?</strong></h3>\r\n\r\n<p><strong>Artificial Intelligence (AI)</strong> is the broader concept of machines being able to carry out tasks in a way that we would consider &quot;smart.&quot;</p>\r\n\r\n<p><strong>Machine Learning (ML)</strong>, a subset of AI, refers to the methods and algorithms that allow machines to learn from data without being explicitly programmed.</p>\r\n\r\n<p><strong>Deep Learning (DL)</strong>, a subset of ML, utilizes neural networks with many layers (hence &quot;deep&quot;) to analyze various factors of data.</p>\r\n\r\n<h3><strong>How They Are Impacting Our Lives</strong></h3>\r\n\r\n<p>AI, ML, and DL are impacting numerous fields, including:</p>\r\n\r\n<ul>\r\n\t<li><strong>Healthcare:</strong> Enhancing diagnostics, personalized medicine, and drug discovery.</li>\r\n\t<li><strong>Finance:</strong> Improving fraud detection, algorithmic trading, and customer service through chatbots.</li>\r\n\t<li><strong>Transportation:</strong> Powering autonomous vehicles and optimizing traffic management.</li>\r\n\t<li><strong>Retail:</strong> Personalizing shopping experiences and optimizing supply chain logistics.</li>\r\n</ul>\r\n\r\n<h3><strong>Future Trends</strong></h3>\r\n\r\n<p>The future of AI, ML, and DL looks promising, with trends such as:</p>\r\n\r\n<ul>\r\n\t<li>Increased automation across industries.</li>\r\n\t<li>Greater emphasis on ethical AI.</li>\r\n\t<li>Advancements in natural language processing.</li>\r\n\t<li>Integration of AI in daily life through smart home devices.</li>\r\n</ul>\r\n\r\n<h3><strong>How to Enter the Field</strong></h3>\r\n\r\n<p>If you&#39;re interested in entering the field of AI, ML, and DL, consider the following steps:</p>\r\n\r\n<ol>\r\n\t<li>Start with foundational courses in mathematics and statistics.</li>\r\n\t<li>Learn programming languages such as Python or R.</li>\r\n\t<li>Take online courses in machine learning and deep learning.</li>\r\n\t<li>Work on projects to build a portfolio.</li>\r\n\t<li>Join communities and forums to stay updated.</li>\r\n</ol>\r\n\r\n<h3><strong>Ethical Guidelines</strong></h3>\r\n\r\n<p>Ethical considerations are critical in AI, including:</p>\r\n\r\n<ul>\r\n\t<li>Ensuring transparency in algorithms.</li>\r\n\t<li>Protecting user privacy and data.</li>\r\n\t<li>Avoiding bias in AI models.</li>\r\n\t<li>Considering the societal impacts of AI deployment.</li>\r\n</ul>\r\n	27	October  	2024	http://www.hameem.xyz	https://images.prismic.io/baker-tilly-www/92d3db7a-f918-4e63-b4ec-03d47e6a5d3b_Artificial+intelligence+in+palm+of+mans+hand.jpg?auto=compress,format&rect=0,298,1920,485&w=1670&h=422	2024-10-27 14:30:22.60272
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Name: contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_id_seq', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: contact contact_email_message_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_email_message_key UNIQUE (email, message);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_title_key UNIQUE (title);


--
-- Name: users users_password_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_password_key UNIQUE (password);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

