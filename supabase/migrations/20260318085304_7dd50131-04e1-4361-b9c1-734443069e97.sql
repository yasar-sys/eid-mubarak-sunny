-- Store visitor names submitted from the Eid experience setup screen
CREATE TABLE IF NOT EXISTS public.visitor_name_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  source_page TEXT NOT NULL DEFAULT 'scene0-setup' CHECK (char_length(source_page) <= 50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_name_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_visitor_name_submissions_created_at
  ON public.visitor_name_submissions (created_at DESC);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'visitor_name_submissions'
      AND policyname = 'Anyone can submit visitor names'
  ) THEN
    CREATE POLICY "Anyone can submit visitor names"
    ON public.visitor_name_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
      char_length(btrim(name)) BETWEEN 1 AND 100
      AND source_page = 'scene0-setup'
    );
  END IF;
END $$;