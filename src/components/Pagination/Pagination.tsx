interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          style={{
            fontWeight: page === i + 1 ? "bold" : "normal",
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}