import { randomUUID } from "crypto";
//bycrpt can also be used but this method was lot easier
export default function generatecode() {
  return randomUUID().slice(0, 6);
}
