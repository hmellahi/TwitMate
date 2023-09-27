--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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
-- Name: Community; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."Community" (
    id text NOT NULL,
    name text NOT NULL,
    image text,
    bio text,
    "createdBy" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public."Community" OWNER TO hamza;

--
-- Name: Thread; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."Thread" (
    id text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "authorId" text NOT NULL,
    "communityId" text,
    "parentId" text,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Thread" OWNER TO hamza;

--
-- Name: ThreadImages; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."ThreadImages" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "threadId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageUrl" text NOT NULL
);


ALTER TABLE public."ThreadImages" OWNER TO hamza;

--
-- Name: ThreadLikes; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."ThreadLikes" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "threadId" text NOT NULL,
    "userId" text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ThreadLikes" OWNER TO hamza;

--
-- Name: User; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    bio text,
    onboarded boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO hamza;

--
-- Name: _MemberOf; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."_MemberOf" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_MemberOf" OWNER TO hamza;

--
-- Name: _UserFollows; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public."_UserFollows" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_UserFollows" OWNER TO hamza;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: hamza
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO hamza;

--
-- Data for Name: Community; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."Community" (id, name, image, bio, "createdBy", "createdAt", "updatedAt", slug) FROM stdin;
org_2UtYLa1zam0li5eKgJmCNPjqnuu	Jookers	https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yVWFqUXhJYXpKTVJOTXdZckVyWVhFYkluSm0iLCJyaWQiOiJvcmdfMlV0WUxhMXphbTBsaTVlS2dKbUNOUGpxbnV1IiwiaW5pdGlhbHMiOiJKIn0		user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-03 17:32:16.567	2023-09-03 17:32:16.567	jookers
org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	dsa	https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yVWFqUXhJYXpKTVJOTXdZckVyWVhFYkluSm0iLCJyaWQiOiJvcmdfMlV6WGpqMFNuUFBOUkVNOEtqNlJYZ3VMUTlYIiwiaW5pdGlhbHMiOiJEIn0		user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-05 19:52:04.357	2023-09-05 19:52:04.357	dsa
org_2UzsUmYbJi235y2hRbiIUutgYFn	Testtos	https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yVWFqUXhJYXpKTVJOTXdZckVyWVhFYkluSm0iLCJyaWQiOiJvcmdfMlV6c1VtWWJKaTIzNXkyaFJiaUlVdXRnWUZuIiwiaW5pdGlhbHMiOiJUIn0		user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-05 22:42:45.165	2023-09-05 22:42:45.165	testtos
org_2V2KJUOHXchgcb64VMWGyToCfNk	Jookers	https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yVWFqUXhJYXpKTVJOTXdZckVyWVhFYkluSm0iLCJyaWQiOiJvcmdfMlYyS0pVT0hYY2hnY2I2NFZNV0d5VG9DZk5rIiwiaW5pdGlhbHMiOiJKIn0		user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-06 19:31:05.596	2023-09-06 19:31:05.596	jookerss
org_2VSYJGE0eSyj6HuwMr4Mjx5wKAP	Dudes	https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWU1lKWjNRaExIZ2Z5a0hMY0NXNFFrUjNBbi5qcGVnIn0		user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-16 02:21:20.518	2023-09-16 17:44:53.511	dudes
org_2VSYtzxCH7KCgGCtwb6283HCRM2	1337 students	https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWVGxlVTR0TGpTQ0MzamxCZmFwUTM1cHlqTC5qcGVnIn0		user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-16 02:26:08.611	2023-09-16 20:47:29.297	13
org_2VSXlOHRoyNpFvvgLnrA71bgJlc	$Society$	https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWZ2JzQ1kxMGdVQlNzOXVyT2oyN2ZBZnM5YyJ9		user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-16 02:22:10.233	2023-09-21 01:47:58.343	society
\.


--
-- Data for Name: Thread; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."Thread" (id, text, "createdAt", "authorId", "communityId", "parentId", "updatedAt") FROM stdin;
ca7373a9-418a-48eb-8d0e-893a8b60f886	hEEEYYY, first one threading xD	2023-09-03 16:51:51.529	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-03 16:51:51.529
ed4762ed-2411-467f-adea-65939cc062dd	dsasaadsad	2023-09-05 20:07:36.899	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	\N	ca7373a9-418a-48eb-8d0e-893a8b60f886	2023-09-05 20:07:36.899
e07c6223-7936-457b-bdee-f7bca7a9fb3c	sa	2023-09-05 20:10:30.827	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	\N	ca7373a9-418a-48eb-8d0e-893a8b60f886	2023-09-05 20:10:30.827
ea0ed4a6-8222-438d-97c8-1fababa0c267	Hllo	2023-09-05 23:13:52.817	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	\N	ed4762ed-2411-467f-adea-65939cc062dd	2023-09-05 23:13:52.817
261f536f-a3f0-4b07-a998-96ffddfdaa45	dsaddsa	2023-09-06 18:11:18.796	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	\N	e07c6223-7936-457b-bdee-f7bca7a9fb3c	2023-09-06 18:11:18.796
577cd42c-f9a6-4782-a472-3ad89401fb30	dsadsa	2023-09-06 19:21:39.903	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	\N	261f536f-a3f0-4b07-a998-96ffddfdaa45	2023-09-06 19:21:39.903
6e356ab2-a9d7-4a80-8a19-ee185b0fdbcb	dsadas	2023-09-06 21:30:06.633	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	ed4762ed-2411-467f-adea-65939cc062dd	2023-09-06 21:30:06.633
e945894d-65d2-445a-be8b-0b4f74deb8df	HELLLO	2023-09-08 12:16:58.029	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-08 12:16:58.029
bd93e944-2586-4db4-aee3-b1ad35ac5c30	wqewds	2023-09-08 13:28:29.294	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	261f536f-a3f0-4b07-a998-96ffddfdaa45	2023-09-08 13:28:29.294
cf767c2e-b25a-4b85-a28a-5ad61c1d2ea4		2023-09-24 14:24:48.505	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-24 14:24:48.505
81556c71-6927-47fb-b290-d3d6f4ccc9c9	wttttt	2023-09-08 15:43:12.24	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UtYLa1zam0li5eKgJmCNPjqnuu	\N	2023-09-08 15:43:12.24
199dc587-8441-463c-839e-18123efc55cd	das	2023-09-24 20:21:52.719	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	cf767c2e-b25a-4b85-a28a-5ad61c1d2ea4	2023-09-24 20:21:52.719
c7a38083-5eca-44fe-b08c-cad93cc484e4	dsada	2023-09-08 18:41:14.366	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-08 18:41:14.366
5eaad3a8-3a98-4d38-9d5b-1b5863d6d9d7	dsadsa	2023-09-10 14:47:30.195	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 14:47:30.195
e28a6116-8368-4fe1-832f-8e158a9dd853	dsadsa	2023-09-10 14:47:53.842	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 14:47:53.842
ea238c15-24d4-4b72-8a46-689523450814	dsadsa	2023-09-10 14:48:31.934	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 14:48:31.934
f6d4c4d9-f099-4ce2-a1b6-edb37e393e88	woow!	2023-09-10 15:02:06.833	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	ea238c15-24d4-4b72-8a46-689523450814	2023-09-10 15:02:06.833
40195aef-b8c5-4511-a877-083946094b8f		2023-09-10 15:05:33.165	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 15:05:33.165
6bab9626-9f00-42ad-90d3-6f446b817cff		2023-09-10 15:05:53.015	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 15:05:53.015
4d4e22a3-c254-4224-8170-5b6be2935343	1336!	2023-09-10 15:33:36.083	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 15:33:36.083
75737e5c-0899-4690-83f3-b6ee9d1d79f9	1336!	2023-09-10 15:33:37.185	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-10 15:33:37.185
1fcbf302-9e43-40c1-9509-1dc3d5ba8805	dsa	2023-09-10 17:43:06.822	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-10 17:43:06.822
eef9275e-1adb-4339-8be5-71ad5e0fc0bd		2023-09-10 17:43:15.199	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-10 17:43:15.199
a40aeb35-9e19-4443-a2c5-fcd6ee7f2cc2		2023-09-10 17:43:34.978	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-10 17:43:34.978
c500ffc8-a033-4196-853a-48b91cdf4d06	d	2023-09-19 19:53:34.161	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:53:34.161
78877ed1-df9a-4582-ac6e-80464d4f561a	sfds	2023-09-19 19:54:28.44	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:54:28.44
a08b901c-226b-44ea-8a24-5586eaf63eb5	cxc	2023-09-11 12:26:23.587	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-11 12:26:23.587
98b69a6e-25ee-44e9-8928-23784d9856ab	hggh	2023-09-19 21:57:58.393	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 21:57:58.393
7e5da686-e8b9-487a-be95-6e8907ef812a	Hello Theere	2023-09-11 18:38:29.659	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UtYLa1zam0li5eKgJmCNPjqnuu	\N	2023-09-11 18:38:29.659
cbbb29b4-9c1a-43bf-9415-4c8e84c0dcb4	Hello Theere	2023-09-11 18:38:38.125	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UtYLa1zam0li5eKgJmCNPjqnuu	\N	2023-09-11 18:38:38.125
5bbf94a1-2c82-49f0-8487-79552909d515	dsadsa	2023-09-11 12:38:42.17	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-11 12:38:42.17
17ff2aab-a649-47c3-bdd0-d875cbdba742	Yaay	2023-09-11 18:39:58.07	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UtYLa1zam0li5eKgJmCNPjqnuu	\N	2023-09-11 18:39:58.07
050ad7ac-ac58-43ee-af41-beb5229a127a	hello\n	2023-09-13 08:07:39.049	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-13 08:07:39.049
44b0cf43-9314-43ba-a527-fb0e0b4dad9b	I wanna visit this placee!	2023-09-13 08:09:12.3	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	ea238c15-24d4-4b72-8a46-689523450814	2023-09-13 08:09:12.3
3b2c3668-fc3b-47d6-99e3-4cd9095c86fb	jjj	2023-09-20 08:51:12.599	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSYtzxCH7KCgGCtwb6283HCRM2	\N	2023-09-20 08:51:12.599
6b88f20f-738d-4f53-9a51-968dfb9d2d3b	dsada	2023-09-13 09:53:55.869	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 09:53:55.869
58bebc4f-8c8b-477f-898e-1810debd7fbf	dsa	2023-09-13 09:54:24.696	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 09:54:24.696
95527515-bb27-4f6a-8643-4dbb34d6a8bc		2023-09-13 09:55:22.507	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 09:55:22.507
9cb51092-2fb1-4d85-9952-7a63fe515219		2023-09-13 09:57:54.635	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 09:57:54.635
943ba63a-3107-4fe7-aeff-fe855f480c0a	da	2023-09-13 10:29:01.631	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 10:29:01.631
9c6c285f-c800-40b1-9870-626b0b946342	jjkj	2023-09-13 10:30:58.688	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 10:30:58.688
9bb21b4c-cee9-4947-b76c-f8a515ddbfbf	Wsup losers\n	2023-09-13 10:39:51.428	user_2UsuJyrQnc1kS6xjBzbNTob2drJ	\N	\N	2023-09-13 10:39:51.428
175977bf-8af9-4fbe-9bc7-f3f29ebda782	HELLO MDFS	2023-09-13 10:43:50.993	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 10:43:50.993
6533ad75-9b76-435c-b89b-6308640c9978	HELLO MDFS	2023-09-13 10:43:54.827	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	\N	2023-09-13 10:43:54.827
c434a7ad-936e-480a-b63e-6ba6a2f917ce	11	2023-09-26 10:42:21.717	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	ca7373a9-418a-48eb-8d0e-893a8b60f886	2023-09-26 10:42:21.717
01755764-7d20-4100-8789-0cb961c9376d	dad	2023-09-26 22:46:07.796	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-26 22:46:07.796
90fc552b-c494-47ab-a595-7c11b588b700		2023-09-23 16:18:50.707	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 16:18:50.707
dbbba54b-2fc1-4695-a693-34be465c6dab	sdda	2023-09-19 19:52:11.209	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:52:11.209
a93d48c0-89d6-4488-9c86-f5c18de28b4f	d	2023-09-19 19:52:28.701	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:52:28.701
0d827c30-d897-4332-b5e2-b02f70713fc4	ds	2023-09-19 21:44:35.894	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 21:44:35.894
8d658a57-0ad7-44cb-a752-406b2f641db3	dasdadasda\ndasdadasdadasda\ndasdadasda\ndasda	2023-09-19 22:06:13.786	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 22:06:13.786
d5f96556-d085-4b33-9311-12095a910154	dsa	2023-09-23 16:57:09.101	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 16:57:09.101
205fe639-2246-4f99-ad2c-4b80475fa4e1	12	2023-09-23 17:58:05.176	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 17:58:05.176
0327a126-a4ad-4322-8efa-6fa9b4f90306		2023-09-23 21:13:06.702	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 21:13:06.702
7d4d054f-5a45-48d8-9803-3fc66494f428	dsasddsa	2023-09-23 23:35:23.961	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 23:35:23.961
51d80778-6813-4544-a291-c0a8a78891d7	sda	2023-09-23 15:28:36.331	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	960a1680-7aab-4ecd-ba1f-e621caabe72e	2023-09-23 15:28:36.331
e4490b3e-f8ba-4177-bc8b-7a13fb47c16f	dsa\n	2023-09-23 15:37:35.358	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	51d80778-6813-4544-a291-c0a8a78891d7	2023-09-23 15:37:35.358
f51681f6-94f0-4a5e-bbec-ae835294ed19	czxc	2023-09-23 15:40:53.771	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	51d80778-6813-4544-a291-c0a8a78891d7	2023-09-23 15:40:53.771
d0c9df1f-5176-4a2c-822a-83fc1bbc40f6	A coping mechanism refers to a psychological or behavioral strategy that individuals use to manage, tolerate, or adapt to stress, difficult emotions, challenging situations, or adverse circumstances. Coping mechanisms can vary widely from person to person and may be conscious or unconscious responses to stressors.	2023-09-15 22:18:34.783	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-15 22:18:34.783
a5da97d4-0294-4155-a097-dbe77ef3fc4f		2023-09-15 22:23:47.622	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-15 22:23:47.622
e6a16ae7-88d7-4859-8635-f8e59e5c93e0		2023-09-23 16:11:53.978	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 16:11:53.978
51a56b89-48e6-4cdc-93a0-8aac176b0946	1	2023-09-23 16:19:17.837	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 16:19:17.837
b56414bd-ecb1-456c-9b92-bd976a7dfdca	sda	2023-09-16 01:38:17.937	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-16 01:38:17.937
ce84d2cf-715f-49a6-baa0-3a13e2fefd69	sad	2023-09-16 12:55:47.284	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSYtzxCH7KCgGCtwb6283HCRM2	\N	2023-09-16 12:55:47.284
61a60cbd-bca2-45db-8642-6940e82eb9a2	12	2023-09-23 17:56:36.898	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 17:56:36.898
5ae0e59f-9dfa-49d5-b6fa-3afb2ca8999f	dsa	2023-09-26 22:59:44.231	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-26 22:59:44.231
f0c0115b-b9af-4e4b-bf0e-ef80df12ed7e	a	2023-09-19 19:51:51	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:51:51
dd06c800-f0e5-48fa-ac99-c59a89287fe2	d	2023-09-19 19:53:13.972	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:53:13.972
762b5281-1f27-462b-b690-355476a457d8		2023-09-23 23:56:34.273	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSXlOHRoyNpFvvgLnrA71bgJlc	\N	2023-09-23 23:56:34.273
f4f7005d-caa9-461b-a1f2-200b9ec4696d		2023-09-17 14:00:04.769	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSYtzxCH7KCgGCtwb6283HCRM2	\N	2023-09-17 14:00:04.769
e1e432df-2b8e-4d74-bf1d-2157c67db766		2023-09-17 14:00:05.353	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	org_2VSYtzxCH7KCgGCtwb6283HCRM2	\N	2023-09-17 14:00:05.353
2b4e7c88-9196-433b-93e5-97247267c661	1312	2023-09-19 19:54:19.803	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 19:54:19.803
b7b8d3f4-4a97-4a6d-a21c-2fe8c37591bd	das	2023-09-19 21:57:32.238	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-19 21:57:32.238
dbbe9ddf-e2a3-47b5-96f3-7407a3f67c2b	dsa	2023-09-17 18:32:43.282	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-17 18:32:43.282
960a1680-7aab-4ecd-ba1f-e621caabe72e	ds	2023-09-17 18:33:11.027	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	\N	\N	2023-09-17 18:33:11.027
\.


--
-- Data for Name: ThreadImages; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."ThreadImages" (id, "userId", "threadId", "createdAt", "updatedAt", "imageUrl") FROM stdin;
4cadc401-a4be-4c23-aeb3-f64f2d89b21e	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	5eaad3a8-3a98-4d38-9d5b-1b5863d6d9d7	2023-09-10 14:47:30.452	2023-09-10 14:47:30.452	https://uploadthing.com/f/a96c4c82-4478-47e3-b454-76ea1c97af7c_snowy-tallinn_malle-kolnes-1.jpg
85b5e85d-5e3f-4f9a-93e1-006f246e936d	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	e28a6116-8368-4fe1-832f-8e158a9dd853	2023-09-10 14:47:54.009	2023-09-10 14:47:54.009	https://uploadthing.com/f/177d7476-a987-4bfb-ae2c-8d382325618c_snowy-tallinn_malle-kolnes-1.jpg
47255a9b-77c4-41b0-b824-93bc0da8cf96	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	ea238c15-24d4-4b72-8a46-689523450814	2023-09-10 14:48:32.178	2023-09-10 14:48:32.178	https://uploadthing.com/f/b51bbcfd-b757-4d92-ac4a-9a38b3e45589_snowy-tallinn_malle-kolnes-1.jpg
215451b9-c265-4a60-bff2-3d40c79cb5be	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	40195aef-b8c5-4511-a877-083946094b8f	2023-09-10 15:05:33.415	2023-09-10 15:05:33.415	https://uploadthing.com/f/7130b87c-e71b-4bad-9ded-f3b2bc7dfdc2_snowy-tallinn_malle-kolnes-1.jpg
a1fcb6bc-99d5-4436-9827-35831eb3ca7d	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	6bab9626-9f00-42ad-90d3-6f446b817cff	2023-09-10 15:05:53.178	2023-09-10 15:05:53.178	https://uploadthing.com/f/d1c53bf9-fe92-46dc-8ff0-a30e89bfbb98_snowy-tallinn_malle-kolnes-1.jpg
689b1770-eebb-4d51-8cc9-cc234c09b8c2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	75737e5c-0899-4690-83f3-b6ee9d1d79f9	2023-09-10 15:33:37.33	2023-09-10 15:33:37.33	https://uploadthing.com/f/55c83234-2ab1-4d11-96c4-78856728eca5_cluster.jpg
c05b94a7-2009-4b9e-bc7f-e03cdfe832e8	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	1fcbf302-9e43-40c1-9509-1dc3d5ba8805	2023-09-10 17:43:06.989	2023-09-10 17:43:06.989	https://uploadthing.com/f/b5c0b726-391b-46a6-8ee1-cd296425963e_fight-club-sara-has-art.jpg
c85b5216-9515-4590-815f-3800df1c40f9	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	eef9275e-1adb-4339-8be5-71ad5e0fc0bd	2023-09-10 17:43:15.359	2023-09-10 17:43:15.359	https://uploadthing.com/f/aec2fd97-b2a0-45aa-af01-27f76fcbe052_fight-club-sara-has-art.jpg
418f260b-1ec6-4f01-ad8b-e02431da1116	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	a40aeb35-9e19-4443-a2c5-fcd6ee7f2cc2	2023-09-10 17:43:35.157	2023-09-10 17:43:35.157	https://uploadthing.com/f/bc6ce036-d8e4-4f61-8439-24372e060ec2_fight-club-sara-has-art.jpg
865e55a0-514a-4846-b35a-dde8ba1c25b7	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	a08b901c-226b-44ea-8a24-5586eaf63eb5	2023-09-11 12:26:23.778	2023-09-11 12:26:23.778	https://uploadthing.com/f/0a7561e0-c27d-49b1-a817-3431d694a4cd_snowy-tallinn_malle-kolnes-1.jpg
76668fe4-a4cd-43ce-a3d2-491cc8ba3299	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	cbbb29b4-9c1a-43bf-9415-4c8e84c0dcb4	2023-09-11 18:38:38.283	2023-09-11 18:38:38.283	https://uploadthing.com/f/8989def2-ed14-4dcb-92d5-2d958af8f328_snowy-tallinn_malle-kolnes-1.jpg
68b8f52b-37fd-4ed4-a35c-ba95e9b7ca7a	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	17ff2aab-a649-47c3-bdd0-d875cbdba742	2023-09-11 18:39:58.223	2023-09-11 18:39:58.223	https://uploadthing.com/f/dcc4fa15-d75d-416f-a9cf-63260cfba297_1690219590194.jpeg
dc7a4610-3b2e-4a47-bece-a1b1949e48ff	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	6b88f20f-738d-4f53-9a51-968dfb9d2d3b	2023-09-13 09:53:56.06	2023-09-13 09:53:56.06	https://uploadthing.com/f/4c85be8b-463b-47f4-8b63-012a44e9adbc_snowy-tallinn_malle-kolnes-1.jpg
bcbb2c96-dc90-4f89-8b70-18aec0cb9d64	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	58bebc4f-8c8b-477f-898e-1810debd7fbf	2023-09-13 09:54:24.818	2023-09-13 09:54:24.818	https://uploadthing.com/f/2c17cf10-6276-4b77-aaa1-5a44a659fb16_snowy-tallinn_malle-kolnes-1.jpg
9e921e12-3b78-4e37-a71e-16c8e70428b2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	95527515-bb27-4f6a-8643-4dbb34d6a8bc	2023-09-13 09:55:22.666	2023-09-13 09:55:22.666	https://uploadthing.com/f/c2435943-ac11-4591-a6fe-20ba9e84c45a_snowy-tallinn_malle-kolnes-1.jpg
7923124f-a77b-4073-89c1-9d66c7682827	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	9cb51092-2fb1-4d85-9952-7a63fe515219	2023-09-13 09:57:54.739	2023-09-13 09:57:54.739	https://uploadthing.com/f/0d4d166d-a18d-4e9e-9a73-9af9d0eb6bcf_snowy-tallinn_malle-kolnes-1.jpg
a8979584-de41-4f53-97a1-811380c20828	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	943ba63a-3107-4fe7-aeff-fe855f480c0a	2023-09-13 10:29:01.787	2023-09-13 10:29:01.787	https://uploadthing.com/f/170255f3-1352-4ad3-ac63-1f3dc72ddc49_snowy-tallinn_malle-kolnes-1.jpg
ca77fc41-e84b-491d-9f64-7b177b7054a2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	9c6c285f-c800-40b1-9870-626b0b946342	2023-09-13 10:30:58.839	2023-09-13 10:30:58.839	https://uploadthing.com/f/76d53e71-9355-4ef9-906f-cde8fc40aeac_snowy-tallinn_malle-kolnes-1.jpg
89f1077b-90ed-4b6d-b6df-dc6df6baa988	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	175977bf-8af9-4fbe-9bc7-f3f29ebda782	2023-09-13 10:43:51.096	2023-09-13 10:43:51.096	https://uploadthing.com/f/01fba651-63c1-4dc8-931b-8793640d6d9c_snowy-tallinn_malle-kolnes-1.jpg
7c10bfe8-d86f-4caa-b6eb-e9ab085f0ff9	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	6533ad75-9b76-435c-b89b-6308640c9978	2023-09-13 10:43:54.879	2023-09-13 10:43:54.879	https://uploadthing.com/f/378badcd-6ded-455b-a826-246abbe51247_snowy-tallinn_malle-kolnes-1.jpg
be847000-6ef4-4313-a314-fde08faf6de6	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	a5da97d4-0294-4155-a097-dbe77ef3fc4f	2023-09-15 22:23:47.805	2023-09-15 22:23:47.805	https://uploadthing.com/f/64878c3e-7c23-48ee-b0d5-f1743e2c2a35-ynr1rl.jpeg
189cdd16-6fc5-437a-be45-935f317ad69a	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	b56414bd-ecb1-456c-9b92-bd976a7dfdca	2023-09-16 01:38:18.122	2023-09-16 01:38:18.122	https://uploadthing.com/f/7b83cae5-6e44-4fbf-8471-4021ac2adcaa-vmae9y.jpeg
89737185-44f0-40a2-a272-ffbeb681bca2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	ce84d2cf-715f-49a6-baa0-3a13e2fefd69	2023-09-16 12:55:47.691	2023-09-16 12:55:47.691	https://uploadthing.com/f/bf3b14bb-bf35-4a13-9ec1-e86c85449d8e-ynr1rl.jpeg
cc306f5b-09cc-41fe-8177-23cb60557b6e	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	f4f7005d-caa9-461b-a1f2-200b9ec4696d	2023-09-17 14:00:05.055	2023-09-17 14:00:05.055	https://uploadthing.com/f/b25bc64d-d5c5-4239-9680-b32a7c3953bc-jluleu.jpg
7d7e631a-bc7b-4941-b257-398037c0bada	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	e1e432df-2b8e-4d74-bf1d-2157c67db766	2023-09-17 14:00:05.452	2023-09-17 14:00:05.452	https://uploadthing.com/f/5ee247a5-22bc-438e-817c-5e2b48cbd7ff-jluleu.jpg
937d33b1-4626-46c6-9851-3dd319847069	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	dbbe9ddf-e2a3-47b5-96f3-7407a3f67c2b	2023-09-17 18:32:43.555	2023-09-17 18:32:43.555	https://uploadthing.com/f/d253abfb-e76f-40ca-928b-17604740f4fe-ffqz4u.jpeg
3572f884-acff-45f2-9e6c-83a434f9fb0e	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	960a1680-7aab-4ecd-ba1f-e621caabe72e	2023-09-17 18:33:11.177	2023-09-17 18:33:11.177	https://uploadthing.com/f/97bee483-853f-49b7-9ed8-fd91b2d41cf9-ynr1rl.jpeg
c8dc2d77-d61d-4eef-ba36-d9dc57f49f09	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	98b69a6e-25ee-44e9-8928-23784d9856ab	2023-09-19 21:57:58.662	2023-09-19 21:57:58.662	https://uploadthing.com/f/8fdc7b60-a73f-4e83-b10d-22e888368c98-ef7ym2.jpg
fa781a76-b870-4edd-960b-bf42bca5320c	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	3b2c3668-fc3b-47d6-99e3-4cd9095c86fb	2023-09-20 08:51:12.664	2023-09-20 08:51:12.664	https://uploadthing.com/f/3d020c68-0cff-4d11-808d-40a7c460699d-8qkmq6.jpg
71e2f96f-d3b4-49b3-a305-8cf0e6424512	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	e6a16ae7-88d7-4859-8635-f8e59e5c93e0	2023-09-23 16:11:54.213	2023-09-23 16:11:54.213	https://uploadthing.com/f/c3456476-09ec-458a-9249-78f26be901be-ffqz4u.jpeg
f397fa8d-700f-4699-8dee-723efc690ceb	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	90fc552b-c494-47ab-a595-7c11b588b700	2023-09-23 16:18:50.786	2023-09-23 16:18:50.786	https://uploadthing.com/f/abe6889a-698e-4fc9-81ca-aaa394710455-vmae9y.jpeg
e054da0f-24c0-41b0-819a-9b9f75cabac2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	51a56b89-48e6-4cdc-93a0-8aac176b0946	2023-09-23 16:19:18.071	2023-09-23 16:19:18.071	https://uploadthing.com/f/c9aea434-ff95-49e3-848a-ede3a0dfdd15-l6xlfe.jpeg
e3ee2767-203a-46e6-949d-bed2ee5ea8b5	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	d5f96556-d085-4b33-9311-12095a910154	2023-09-23 16:57:09.339	2023-09-23 16:57:09.339	https://uploadthing.com/f/e21db4e5-c530-4add-aa23-68ad18ba77b3-l6xlfe.jpeg
36f14f5e-9aac-4266-82e9-ba28a3c976c1	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	61a60cbd-bca2-45db-8642-6940e82eb9a2	2023-09-23 17:56:37.166	2023-09-23 17:56:37.166	https://uploadthing.com/f/2fa766a6-41a8-423b-b3f1-b09ea0ac123a-ffqz4u.jpeg
4bd281f4-5087-40f9-8a7c-74a13d39e400	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	205fe639-2246-4f99-ad2c-4b80475fa4e1	2023-09-23 17:58:05.362	2023-09-23 17:58:05.362	https://uploadthing.com/f/315dac22-fea7-4bce-96a2-9b1d3de80153-ffqz4u.jpeg
6b24fcb8-62f7-4a47-81a8-cbcd2292ddaa	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	0327a126-a4ad-4322-8efa-6fa9b4f90306	2023-09-23 21:13:06.86	2023-09-23 21:13:06.86	https://uploadthing.com/f/9e088173-f7fa-42a8-81f4-aa26cd44326f-ffqz4u.jpeg
bd165c49-2f05-4de1-8c87-cdf04c4d0612	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	7d4d054f-5a45-48d8-9803-3fc66494f428	2023-09-23 23:35:24.326	2023-09-23 23:35:24.326	https://res.cloudinary.com/dv2xxj5vi/image/upload/v1695512123/threads-images/z5d5tlqrsnu9fxy83esz.jpg
d6d77d92-8cab-4bdd-b0de-51786a5c16c2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	762b5281-1f27-462b-b690-355476a457d8	2023-09-23 23:56:34.432	2023-09-23 23:56:34.432	https://res.cloudinary.com/dv2xxj5vi/image/upload/v1695513393/threads-images/p4dtooo4rztiwrigl2kh.jpg
3a3526eb-c076-4207-8c96-167e63c7ab53	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	cf767c2e-b25a-4b85-a28a-5ad61c1d2ea4	2023-09-24 14:24:48.849	2023-09-24 14:24:48.849	https://res.cloudinary.com/dv2xxj5vi/image/upload/v1695565488/threads-images/sgaz4ksekr4sraplcydh.jpg
\.


--
-- Data for Name: ThreadLikes; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."ThreadLikes" (id, "createdAt", "threadId", "userId", "updatedAt") FROM stdin;
02c632dd-9f80-4a70-a1d1-a2e3ab2b3d79	2023-09-05 19:59:12.069	ca7373a9-418a-48eb-8d0e-893a8b60f886	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-05 19:59:12.069
9339607b-078a-4a81-baf9-7a33eb476c25	2023-09-05 20:07:41.64	ed4762ed-2411-467f-adea-65939cc062dd	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-05 20:07:41.64
263d6f81-7518-486a-8aed-477b8c5468f1	2023-09-05 23:13:58.582	ea0ed4a6-8222-438d-97c8-1fababa0c267	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-05 23:13:58.582
540ce624-9a9e-4ba1-b6e3-07a6b8e3ef15	2023-09-06 20:54:12.816	261f536f-a3f0-4b07-a998-96ffddfdaa45	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-06 20:54:12.816
fc5f6dd5-69e4-4381-9dee-112bc0416426	2023-09-06 21:28:30.92	577cd42c-f9a6-4782-a472-3ad89401fb30	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	2023-09-06 21:28:30.92
7adae41b-6f09-4af3-afc3-04165e565dad	2023-09-08 13:58:46.133	bd93e944-2586-4db4-aee3-b1ad35ac5c30	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-08 13:58:46.133
0eacbfcf-2f62-4d52-85c2-4e3fac0334d3	2023-09-17 23:02:25.864	e1e432df-2b8e-4d74-bf1d-2157c67db766	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-17 23:02:25.864
e79fe258-5c66-44b3-9306-a9ba0adfa2ed	2023-09-08 16:09:30.847	81556c71-6927-47fb-b290-d3d6f4ccc9c9	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-08 16:09:30.847
127ef4af-460c-42f6-87a6-b10b7e34b798	2023-09-08 18:38:35.458	e07c6223-7936-457b-bdee-f7bca7a9fb3c	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-08 18:38:35.458
7efcbcab-824f-467a-8626-b3645024f31c	2023-09-08 18:43:48.983	577cd42c-f9a6-4782-a472-3ad89401fb30	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-08 18:43:48.983
48d4a217-7e61-48e3-92df-c982a0803507	2023-09-09 17:34:51.561	c7a38083-5eca-44fe-b08c-cad93cc484e4	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-09 17:34:51.561
a305cb60-ce50-4819-a829-2c74f9c97b6b	2023-09-17 23:16:33.399	960a1680-7aab-4ecd-ba1f-e621caabe72e	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-17 23:16:33.399
b1964f00-e008-4f70-9f79-76c853f7ce2c	2023-09-09 17:50:09.794	e945894d-65d2-445a-be8b-0b4f74deb8df	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-09 17:50:09.794
dfe002cb-8726-4c98-b270-0b1f964c6f90	2023-09-09 18:29:38.51	261f536f-a3f0-4b07-a998-96ffddfdaa45	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-09 18:29:38.51
7c27d82c-0b47-44de-a168-7b4d713dc352	2023-09-13 08:49:55.672	17ff2aab-a649-47c3-bdd0-d875cbdba742	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 08:49:55.672
ce6bbeb9-1e8e-434e-b58c-d0332a226170	2023-09-09 20:51:02.524	ed4762ed-2411-467f-adea-65939cc062dd	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-09 20:51:02.524
5efd12cd-ffda-4bd2-8a90-73c78aa02e4c	2023-09-09 20:53:36.755	ea0ed4a6-8222-438d-97c8-1fababa0c267	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-09 20:53:36.755
fe8f9a5c-d1a9-42ad-80a6-3a1c6957756a	2023-09-09 20:53:39.496	6e356ab2-a9d7-4a80-8a19-ee185b0fdbcb	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-09 20:53:39.496
14f34bc5-721e-4670-8308-c2ba28dcd8ba	2023-09-13 08:49:56.626	a08b901c-226b-44ea-8a24-5586eaf63eb5	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 08:49:56.626
a1819477-86a7-4917-af4c-fd9a6c3e3692	2023-09-13 08:49:56.756	a40aeb35-9e19-4443-a2c5-fcd6ee7f2cc2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 08:49:56.756
54a4d5a4-4e5e-42ca-92c7-5af8266e11ec	2023-09-13 08:49:57.997	6bab9626-9f00-42ad-90d3-6f446b817cff	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 08:49:57.997
f51f8e54-1797-4dfc-99e7-369a44d784f4	2023-09-13 08:49:58.23	40195aef-b8c5-4511-a877-083946094b8f	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 08:49:58.23
d8698dc6-e564-46f6-a3e2-f658fe1f333d	2023-09-10 15:35:24.502	5eaad3a8-3a98-4d38-9d5b-1b5863d6d9d7	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-10 15:35:24.502
6f3092ff-a6b7-4ddb-a333-8c1d94acae90	2023-09-13 08:49:58.702	ea238c15-24d4-4b72-8a46-689523450814	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 08:49:58.702
41484cad-91db-4f13-82eb-fe6485781692	2023-09-11 12:33:00.892	ca7373a9-418a-48eb-8d0e-893a8b60f886	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-11 12:33:00.892
832b69aa-6cab-46c1-a028-a482e913f37d	2023-09-18 00:14:10.816	dbbe9ddf-e2a3-47b5-96f3-7407a3f67c2b	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-18 00:14:10.816
1427fa18-96cc-4d04-9562-4e9244c0e55f	2023-09-19 19:53:05.298	a93d48c0-89d6-4488-9c86-f5c18de28b4f	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-19 19:53:05.298
83d9ee59-5538-4b5b-a0bb-9e11303a52d1	2023-09-19 19:53:05.844	dbbba54b-2fc1-4695-a693-34be465c6dab	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-19 19:53:05.844
73fe5cc5-a57c-4bc2-8352-e0bff2624a11	2023-09-19 19:53:32.473	dd06c800-f0e5-48fa-ac99-c59a89287fe2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-19 19:53:32.473
3b9b3169-1806-44b9-971c-0e2def1669b3	2023-09-13 09:15:03.131	e28a6116-8368-4fe1-832f-8e158a9dd853	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 09:15:03.131
1d0e7112-5720-4ed2-862d-bec2eee9fa02	2023-09-20 07:59:34.451	98b69a6e-25ee-44e9-8928-23784d9856ab	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-20 07:59:34.451
5bec1247-02cd-4634-8963-e76b05236556	2023-09-20 22:59:51.534	3b2c3668-fc3b-47d6-99e3-4cd9095c86fb	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-20 22:59:51.534
7c9f6cc8-da9c-44bc-be93-56f88faf7de7	2023-09-22 13:29:55.437	8d658a57-0ad7-44cb-a752-406b2f641db3	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-22 13:29:55.437
8b0925f9-63cb-4620-9d26-9b5579a34cdc	2023-09-23 23:47:15.034	7d4d054f-5a45-48d8-9803-3fc66494f428	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-23 23:47:15.034
f52fa5fc-10bc-496b-b125-a3de8e6a8891	2023-09-24 00:03:20.066	762b5281-1f27-462b-b690-355476a457d8	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-24 00:03:20.066
2a5643ba-f738-4129-bf62-4c3febfbda49	2023-09-24 16:29:32.205	cf767c2e-b25a-4b85-a28a-5ad61c1d2ea4	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-24 16:29:32.205
b6c6f602-3f8d-4d95-8471-ac14e326bf36	2023-09-13 10:40:08.471	9bb21b4c-cee9-4947-b76c-f8a515ddbfbf	user_2UsuJyrQnc1kS6xjBzbNTob2drJ	2023-09-13 10:40:08.471
3998214c-c85a-4cbe-80d2-26cc2a339fb4	2023-09-24 16:29:39.817	0327a126-a4ad-4322-8efa-6fa9b4f90306	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-24 16:29:39.817
636eb139-b279-43fd-a5bf-bfcca4a056a4	2023-09-13 10:43:29.963	9bb21b4c-cee9-4947-b76c-f8a515ddbfbf	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-13 10:43:29.963
403c075a-6d56-4df6-85ac-8b370803ef26	2023-09-26 00:05:38.614	199dc587-8441-463c-839e-18123efc55cd	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-26 00:05:38.614
c2316856-a13b-4efe-a111-02c4341b7048	2023-09-15 22:36:00.348	9c6c285f-c800-40b1-9870-626b0b946342	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-15 22:36:00.348
bc7b05bc-0486-4496-8de0-bbc23db38ad2	2023-09-15 22:36:03.496	943ba63a-3107-4fe7-aeff-fe855f480c0a	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-15 22:36:03.496
6e491e42-1064-4c43-aedd-3517c72f8d84	2023-09-15 22:36:46.915	6533ad75-9b76-435c-b89b-6308640c9978	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-15 22:36:46.915
d49cc241-acc1-4801-b716-02f6e94414db	2023-09-15 22:56:00.917	175977bf-8af9-4fbe-9bc7-f3f29ebda782	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-15 22:56:00.917
9b267fd4-847a-458a-b811-77b9a91ad110	2023-09-15 23:24:45.273	d0c9df1f-5176-4a2c-822a-83fc1bbc40f6	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-15 23:24:45.273
0adb212e-66c7-4ccd-9748-d3852b17c42c	2023-09-15 23:39:15.184	a5da97d4-0294-4155-a097-dbe77ef3fc4f	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-15 23:39:15.184
e52e7d6c-2f79-4e7d-be88-ae7929ea6e9b	2023-09-16 01:26:23.692	cbbb29b4-9c1a-43bf-9415-4c8e84c0dcb4	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-16 01:26:23.692
19f56756-bb7e-4215-98be-661a1ac78fb4	2023-09-16 12:55:33.494	b56414bd-ecb1-456c-9b92-bd976a7dfdca	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-16 12:55:33.494
a426f8dd-46a7-497c-ae7e-58dc1a3cfc29	2023-09-16 12:56:27.638	ce84d2cf-715f-49a6-baa0-3a13e2fefd69	user_2UcEXkMmpicOvQCTkOsO0ocOhLD	2023-09-16 12:56:27.638
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."User" (id, username, name, image, bio, onboarded, "createdAt", "updatedAt") FROM stdin;
user_2UsuNKRCnzTfKRd5VQGNaAwOVlI	World	Hello	https://uploadthing.com/f/5734d3d5-f1f5-47be-911a-e9b06b51988a_elon.jpeg	Wtf men am stuckdsa	t	2023-09-05 19:58:49.254	2023-09-10 18:28:00.732
user_2UsuJyrQnc1kS6xjBzbNTob2drJ	Andrew	Andrew Tate	https://uploadthing.com/f/6c901e24-e4d3-4ac5-9963-9cc8cc11503b_andrew.jpeg	The Masterbaiter	t	2023-09-13 10:39:21.441	2023-09-13 10:39:21.441
user_2UsrgnRackSmFkW3xZ2CLwj06bY	Elon Without Musk	Elon	https://uploadthing.com/f/cd3918a4-142f-4e96-9415-73c36c8d07c8-1ushy.jpeg	Heheheheheh	t	2023-09-16 15:52:12.21	2023-09-16 15:52:12.21
user_2UcEXkMmpicOvQCTkOsO0ocOhLD	hmellahi	Hamza31	https://res.cloudinary.com/dv2xxj5vi/image/upload/v1695753961/threads-images/ilps8hknsjc7xtazkdn1.jpg	Wtff	t	2023-09-03 16:51:29.338	2023-09-26 18:46:02.227
\.


--
-- Data for Name: _MemberOf; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."_MemberOf" ("A", "B") FROM stdin;
org_2UtYLa1zam0li5eKgJmCNPjqnuu	user_2UcEXkMmpicOvQCTkOsO0ocOhLD
org_2UzXjj0SnPPNREM8Kj6RXguLQ9X	user_2UcEXkMmpicOvQCTkOsO0ocOhLD
org_2UzsUmYbJi235y2hRbiIUutgYFn	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI
org_2V2KJUOHXchgcb64VMWGyToCfNk	user_2UsuNKRCnzTfKRd5VQGNaAwOVlI
org_2VSYJGE0eSyj6HuwMr4Mjx5wKAP	user_2UcEXkMmpicOvQCTkOsO0ocOhLD
org_2VSYtzxCH7KCgGCtwb6283HCRM2	user_2UcEXkMmpicOvQCTkOsO0ocOhLD
org_2VSXlOHRoyNpFvvgLnrA71bgJlc	user_2UcEXkMmpicOvQCTkOsO0ocOhLD
\.


--
-- Data for Name: _UserFollows; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public."_UserFollows" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: hamza
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b7fdb01b-f8cf-4b37-bc66-496cae0a7d91	0296b3bff79386b880744a585d1639045fce87a0bd7fdbdd70f055cac1fce61e	2023-09-03 16:42:00.001991+00	20230829221048_init	\N	\N	2023-09-03 16:41:59.506787+00	1
0629b2e8-8ef9-41e4-bc7a-843ed150d3c8	40a4f8787c4b0d0d0e0d7884d386a859a6bd6f8404959063e8cefbeffc017d5f	2023-09-10 14:30:53.388457+00	20230910143051_add_image_url_col	\N	\N	2023-09-10 14:30:52.550397+00	1
b3d14e5a-1298-450a-bf6d-6f7904dfbb09	ae1257df3b0ea9794f5d9aaebf8f82f652e727f04d9bdeb1700e4683aaf31977	2023-09-03 16:42:00.788695+00	20230830082514_init	\N	\N	2023-09-03 16:42:00.160008+00	1
afc8cb33-6059-426b-976d-46f7d3131532	e8b934cd669d2a31f680855fbea39adcc2010960d6b4e3a8edc6dde728ee37e4	2023-09-03 16:42:01.343473+00	20230830101018_make_community_field_optional	\N	\N	2023-09-03 16:42:00.942353+00	1
862e7d90-a58c-4b61-8d43-555dce41c310	12637fba98675fb9a876984690402f5ef37524252a15eebbf196a8be692a6055	2023-09-03 16:42:02.44495+00	20230830151251_init	\N	\N	2023-09-03 16:42:01.555215+00	1
94833a78-7de0-4195-abd9-1858cb97aa23	9167be44507ff38cf52d04f60f14eab378e15bde3847fd61b389334ea7db924b	2023-09-19 14:26:48.380782+00	20230919142647_add_sort_order	\N	\N	2023-09-19 14:26:47.947598+00	1
3de447c5-7f51-46a4-9db2-988d199cde07	9d17bd4a48876885900bb0fb954ecf57c7a5a1d68d79673a2b23364be50da241	2023-09-03 16:42:03.140409+00	20230830155638_remove_unique_constraint	\N	\N	2023-09-03 16:42:02.662541+00	1
8bd04b0d-c559-4c33-a0a2-06486e495ca7	de1728f143b6db2ec080575c6b7feb7d48849f245b311e590976759ecf0bf64d	2023-09-03 16:42:03.717915+00	20230830200853_change_fiedls_names	\N	\N	2023-09-03 16:42:03.293053+00	1
71ca8d16-1b4b-4086-ad54-12b92da0fe1f	5380e0c0416e6c0a87ad6e7eaf600477c734c58355ae9a1dcf9685e8f65e234a	2023-09-03 16:42:04.345705+00	20230831193044_remove_children_from_thread	\N	\N	2023-09-03 16:42:03.943514+00	1
bc01bdf1-3c25-4ccf-a9df-5b316c836bcf	c95398883a97187f487226d93be785ebe8d773491c4e821cbf9edd00283e79a7	2023-09-19 14:35:18.319835+00	20230919143517_add_index_to_user	\N	\N	2023-09-19 14:35:17.907112+00	1
54246102-d5da-4053-a1dd-af9146d16240	0c03e3b165b5d74dff49dd8a7ddb2230e7d1c39c3a0cd443a1c13c19a8bf3643	2023-09-03 16:42:05.004296+00	20230901162154_add_creation_date_to_user_model	\N	\N	2023-09-03 16:42:04.498225+00	1
37fdc4ec-b0a9-412a-9fed-441b66cfb34e	7d46119565609c2108431c9967e333e969150a6f49f2eec7f078adda6f6e77d7	2023-09-03 16:42:05.60961+00	20230902001647_add_thread_likes	\N	\N	2023-09-03 16:42:05.162203+00	1
1a05c29b-c652-4a3f-86d2-ccdc3ae53aa6	3f3f4a20524189dd8be90f38cecfb526a44f299c4cdef7a01d05e3bed6984893	2023-09-03 16:42:06.232469+00	20230902003914_add_thread_and_user_id	\N	\N	2023-09-03 16:42:05.763057+00	1
15486e3a-3206-4552-a104-866d73208339	39c5047e18f0caadd5a403cb2fe9e01b573a6614ffe5fa434395b548e0f895b6	2023-09-03 16:42:06.824339+00	20230902102306_add_parent_childrens_relashionship	\N	\N	2023-09-03 16:42:06.385158+00	1
94d41503-cfb0-4de5-a338-2911964b983d	c28f91c26e5fb5525b46c148caf2b8999e07df85bcc61445debeaa808a4eca67	2023-09-03 16:42:07.398441+00	20230903145117_update_community	\N	\N	2023-09-03 16:42:07.005253+00	1
0b19b6b8-a130-4003-a4ba-bd80f75158ad	2131bbfe5db7daa1c91f955ae483ce341ba820fb2a79271c36e5e25dce9a8d25	2023-09-10 14:30:11.225997+00	20230910143010_add_thread_images	\N	\N	2023-09-10 14:30:10.773731+00	1
\.


--
-- Name: Community Community_pkey; Type: CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."Community"
    ADD CONSTRAINT "Community_pkey" PRIMARY KEY (id);


--
-- Name: ThreadImages ThreadImages_pkey; Type: CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."ThreadImages"
    ADD CONSTRAINT "ThreadImages_pkey" PRIMARY KEY (id);


--
-- Name: ThreadLikes ThreadLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."ThreadLikes"
    ADD CONSTRAINT "ThreadLikes_pkey" PRIMARY KEY (id);


--
-- Name: Thread Thread_pkey; Type: CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ThreadImages_imageUrl_createdAt_userId_threadId_idx; Type: INDEX; Schema: public; Owner: hamza
--

CREATE INDEX "ThreadImages_imageUrl_createdAt_userId_threadId_idx" ON public."ThreadImages" USING btree ("imageUrl", "createdAt", "userId", "threadId");


--
-- Name: ThreadLikes_createdAt_userId_threadId_idx; Type: INDEX; Schema: public; Owner: hamza
--

CREATE INDEX "ThreadLikes_createdAt_userId_threadId_idx" ON public."ThreadLikes" USING btree ("createdAt", "userId", "threadId");


--
-- Name: Thread_text_createdAt_parentId_communityId_authorId_idx; Type: INDEX; Schema: public; Owner: hamza
--

CREATE INDEX "Thread_text_createdAt_parentId_communityId_authorId_idx" ON public."Thread" USING btree (text, "createdAt", "parentId", "communityId", "authorId");


--
-- Name: User_username_image_createdAt_onboarded_bio_name_updatedAt_idx; Type: INDEX; Schema: public; Owner: hamza
--

CREATE INDEX "User_username_image_createdAt_onboarded_bio_name_updatedAt_idx" ON public."User" USING btree (username, image, "createdAt", onboarded, bio, name, "updatedAt");


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: hamza
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: _MemberOf_AB_unique; Type: INDEX; Schema: public; Owner: hamza
--

CREATE UNIQUE INDEX "_MemberOf_AB_unique" ON public."_MemberOf" USING btree ("A", "B");


--
-- Name: _MemberOf_B_index; Type: INDEX; Schema: public; Owner: hamza
--

CREATE INDEX "_MemberOf_B_index" ON public."_MemberOf" USING btree ("B");


--
-- Name: _UserFollows_AB_unique; Type: INDEX; Schema: public; Owner: hamza
--

CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON public."_UserFollows" USING btree ("A", "B");


--
-- Name: _UserFollows_B_index; Type: INDEX; Schema: public; Owner: hamza
--

CREATE INDEX "_UserFollows_B_index" ON public."_UserFollows" USING btree ("B");


--
-- Name: Community Community_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."Community"
    ADD CONSTRAINT "Community_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ThreadImages ThreadImages_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."ThreadImages"
    ADD CONSTRAINT "ThreadImages_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ThreadLikes ThreadLikes_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."ThreadLikes"
    ADD CONSTRAINT "ThreadLikes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Thread Thread_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Thread Thread_communityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES public."Community"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Thread Thread_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _MemberOf _MemberOf_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."_MemberOf"
    ADD CONSTRAINT "_MemberOf_A_fkey" FOREIGN KEY ("A") REFERENCES public."Community"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _MemberOf _MemberOf_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."_MemberOf"
    ADD CONSTRAINT "_MemberOf_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserFollows _UserFollows_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."_UserFollows"
    ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserFollows _UserFollows_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."_UserFollows"
    ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadImages author; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."ThreadImages"
    ADD CONSTRAINT author FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ThreadLikes liker; Type: FK CONSTRAINT; Schema: public; Owner: hamza
--

ALTER TABLE ONLY public."ThreadLikes"
    ADD CONSTRAINT liker FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

