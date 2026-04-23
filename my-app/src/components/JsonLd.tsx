// src/components/JsonLd.tsx
// AEO用: JSON-LD構造化データをSSRで確実に出力するコンポーネント

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  const json = Array.isArray(data) ? data : [data]
  return (
    <>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
