export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blobPart: BlobPart = new Uint8Array(bytes);
  const blob = new Blob([blobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
