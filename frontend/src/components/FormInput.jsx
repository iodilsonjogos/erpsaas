import React from "react";

/**
 * Componente de input genérico, reusável.
 * Props: label, name, type, value, onChange, required
 */
export default function FormInput({ label, name, type = "text", value, onChange, required }) {
  return (
    <div className="mb-3">
      <label className="block mb-1" htmlFor={name}>{label}</label>
      <input
        className="w-full border rounded p-2"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
