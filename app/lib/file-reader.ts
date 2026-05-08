export async function readTextFile(
  file: File
) {
  return await file.text();
}