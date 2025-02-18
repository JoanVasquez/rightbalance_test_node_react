export default interface Text {
  id?: string;
  title: string;
  content: string;
  isLocked?: boolean; // e.g., if someone is editing
  updatedAt?: string;
  createdAt?: string;
}
