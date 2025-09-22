import Link from "next/link";

export default function TOC() {
  return (
    <ul>
      <li><Link href="/Labs">Home</Link></li>
      <li><Link href="/Labs/Lab1">Lab 1</Link></li>
      <li><Link href="/Labs/Lab2">Lab 2</Link></li>
      <li><Link href="/Labs/Lab3">Lab 3</Link></li>
    </ul>
  );
}

