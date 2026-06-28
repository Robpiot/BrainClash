import PlayPage from "@/components/PlayPage";

interface Props {
  params: { mode?: string };
}

export default function PlayModePage({ params }: Props) {
  const mode = params?.mode;
  const initialTab = mode === "practice" ? "practice" : mode === "versus" ? "versus" : undefined;

  return <PlayPage initialTab={initialTab as any} />;
}


