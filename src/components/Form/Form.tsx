import type { FormEvent } from "react";
import styles from "./Form.module.css";
import { FiSearch } from "react-icons/fi";

interface Props {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.search.value.trim();
    if (!value) return;
    onSubmit(value);
    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} name="search" placeholder="Search..." />
      <button className={styles.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}

